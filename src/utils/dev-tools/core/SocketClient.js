var Event = require("bcore/event");
var $ = require("jquery");
var _ = require("lodash");

//var EventEmitter = window.EventEmitter;
//var emitter = new EventEmitter();
var emitter = new Event();
class SocketClient {
    constructor(config, o) {
        var self = this;
        this.retry = 0;
        this.screen = {};
        // this.screen = {
        //     id: config.group.id,
        //     name: config.group.cnName,
        //     group: config.group.enName,
        //     mode: config.mode || "",
        //     heartCheck: config.heartCheck
        // };
        Object.assign(this.screen, config);
        this.isReady = false;
        //离线版本版本服务地址
        //this.server = 'ws://192.168.1.1:8080/broadcast/';
        //线上版本
        this.server = `ws://${config.ip}:${config.port}/datav/`;
        //this.server = 'ws://service.datav.aliyun.com/broadcast/'
        this.broadcast = {
            emit: function(event, data, cb) {
                self.send({
                    event: "broadcast",
                    data: {
                        event: event,
                        data: data
                    }
                }, cb);
            },
            on: function(event, cb) {
                emitter.on("broadcast_" + event, cb);
            }
        };
        //心跳检测
        this.heartCheck = {
            timeout: this.screen.heartCheck.timer || 3000, //每隔三秒发送心跳
            //num: 3, //3次心跳均未响应重连
            timeoutObj: null,
            serverTimeoutObj: null,
            start: function() {
                var _this = this;
                var _num = this.num;
                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

                this.timeoutObj = setTimeout(function() {
                    //onmessage拿到返回的心跳就说明连接正常
                    self.ws.send(JSON.stringify({
                        "event": "heartCheck",
                        //"data": "120",
                        "timestamp": new Date().toLocaleTimeString()
                    })); // 心跳包
                }, this.timeout);
                // const status = o.getCache("screen-heart-check");
                // if (status == 1) {}
            }
        }

        this.connection = function() {
            var self = this;
            setTimeout(function() {
                var ws = new WebSocket(self.server, 'echo-protocol');
                self.retry++;
                ws.onclose = function() {
                    o.log("通迅服务重建连接...", "warn");
                    // 重新连接
                    self.connection();
                };
                ws.onopen = function() {
                    self.retry = 0;
                    o.log('通迅服务连接成功', 'success');
                    self.registScreen(self.screen, function(err, data) {
                        console.log(":::::", err);
                        if (err) {
                            return console.error(err);
                        }
                        o.log('通迅服务注册成功', 'success');
                        self.ready(true);
                    });

                    if (self.screen.heartCheck.open) { // 保持全局只开启一个心跳服务,降低无效服务
                        self.heartCheck.start();

                    }
                };
                ws.onmessage = function(evt) {
                    o.log("消息", evt, JSON.stringify(evt.data));
                    var evt = JSON.parse(evt.data);
                    if (evt && evt.event) {
                        switch (evt.event) {
                            case "broadcast":
                                emitter.emit("broadcast_" + evt.data.event, evt.data.data);
                                break;
                            case "heartCheck":
                                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                                // 本次连接是否允许打开心跳检测重置，多端连接全局只允许一个发送端
                                o.log(`心跳检测正常:${new Date().toLocaleTimeString()}`);

                                if (self.screen.heartCheck.open) {
                                    //心跳检测重置
                                    self.heartCheck.start();
                                }
                                break;
                            default:
                                emitter.emit(evt.event, evt.data);
                                break;
                        }
                    }
                };
                self.ws = ws;
            }, this.retry * 1000);
        };
        this.setCallback = function(id, cb) {
            // 注册一个单次监听器
            emitter.once(id, function(data) {
                if (data.isError) {
                    cb(data.data);
                } else {
                    cb(null, data.data);
                }
            })
        };
        this.registScreen = function(screen, cb) {
            this.send(Object.assign({
                event: "register",
                data: {
                    sid: screen.id,
                    name: screen.name,
                    group: screen.group || '默认分组'
                }
            }, (!!config.mode ? {
                mode: "hook"
            } : {})), cb);
        };
        this.send = function(data, cb) {
            //console.log(data);
            if (cb) {
                var callbackId = 'callback_' + (new Date().getTime()) + ("" + Math.random()).replace('0.', '');
                this.setCallback(data.event, cb); //callbackId
                data.callback = callbackId;
            }
            this.ws.send(JSON.stringify(Object.assign(data, (!!config.mode ? {
                mode: "hook"
            } : {}))));
        };
        this.emit = function(event, data, cb) {
            this.broadcast.emit(event, data, cb);
        };
        this.on = function(event, cb) {
            this.broadcast.on(event, cb);
        };
        this.ready = function(state) {
            //console.log("状态", typeof state, typeof this.isState);
            if (typeof state === 'function') {
                if (!this.isState) {
                    emitter.once('ready', state);
                } else {
                    state();
                    console.log("执行")
                }
            } else if (state) {
                this.isReady = true;
                emitter.emit('ready');
            } else {
                this.isReady = false;
            }
        };
        this.connection();
        return this;
    };
};
module.exports = SocketClient;