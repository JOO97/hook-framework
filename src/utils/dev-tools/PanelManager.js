/**
 * 面板与浮窗的动画类
 * 动画方画：侧滑(进出同向：abab，进出反向：abba)
 * 
 */
class PanelAnimation {
    constructor(o, layers) {
        // 父域
        this.parent = o;
        // 图层
        this.layers = layers;
        // 缓存
        this.cache = {
            dialogs: [], // 已打开的面板
            tasks: [], // 任务队列：解决用户快速操作场景
            lock: false,
            init: false // 是否初始化
        };
        // 事件
        this.events = [];
        this.init();
        return this;
    }
    init() {
        if (this.layers) {
            const self = this;
            let result = [];
            this.reset();
            Object.keys(this.layers).forEach(function(v) {
                const t = self.layers[v];
                const dom = self.parent.Dom(v);
                if (dom) {
                    $(dom).addClass("__init__ _hidden");
                    if (t.actions && t.actions.length != 0) {
                        t.actions.forEach(function(it) {
                            const actionCom = self.parent.Com(it.comId);
                            if (actionCom) {
                                $(actionCom.container).click(function() {
                                    it.fn && it.fn.call(t, t);
                                })
                            }
                        })
                    }
                    result.push(v);
                }
            });
            this.batchTogglePanelShow(result, false, {
                hide: true
            });
        }
    };
    /**
     * 切换组件/图层显式操作
     * @param {*} el 组件ID
     * @param {*} isShow true:显示,false:隐藏
     * @param {*} win 窗口配制
     * @param {*} params {
     *       cache: false, 窗口是否缓存
     *       data: null,   附属数据
     *       hide: false   是否显藏模式
     *   } 
     * @returns 
     */
    toggleComponentShow(el, isShow, win, params) {
        const self = this;
        let opt = {
            cache: false,
            data: null,
            hide: false
        };
        Object.assign(opt, params);

        return new Promise((resolve, reject) => {
            const dom = this.parent.Dom(el);
            if (!dom) {
                this.emit("error", `${el}图层无法索引到`)
                resolve(false);
                return false;
            }
            let $dom = $(dom);

            // dom.addClass("_hidden");
            // 假设当前图层在隐藏的状态，又来一个指令执行隐藏，不予处理

            if (!$dom.hasClass("__init__") && $dom.hasClass("_hidden") && !isShow) {
                resolve(true);
                return false;
            }
            // 假设当前图层在显示的状态，又来一个指令执行显示，不予处理
            if (!$dom.hasClass("__init__") && $dom.hasClass("_active") && isShow) {
                resolve(true);

                // 弹窗回调 (win.extends弹窗配置中支持show/hide两种扩展回调)
                if (win.extends && params.data) {
                    !!win.extends[isShow ? "show" : "hide"] && win.extends[isShow ? "show" : "hide"].call(win, params.data || null);
                }
                return false;
            }
            $dom.removeClass("__init__");
            if (params.cache) {
                this.cache.dialogs.push(el);
            }
            let t = this.getAnimationSchemesCss(isShow, win, el);



            $dom.stop(true, true).animate({ // 静默到达动画开始状态(位置、透明度)
                opacity: isShow ? 0 : 1,
                left: 0,
                top: 0,
                scale: 1,
                ...t[0],
                "z-index": 0
            }, 10, "linear", () => {
                $dom.stop(true, true).animate({ // 切换到达动画指定状态(位置、透明度)
                    opacity: isShow ? 1 : 0,
                    scale: 1,
                    ...t[1],
                }, 800, "linear", () => {
                    resolve(true);
                    $dom.css({
                        "z-index": isShow ? 99 : -1
                    });

                    if (isShow) {
                        $dom.removeClass("_hidden");
                        $dom.addClass("_active");
                    } else {
                        $dom.addClass("_hidden");
                        $dom.removeClass("_active");
                    }
                    // 弹窗回调 (win.extends弹窗配置中支持show/hide两种扩展回调)
                    if (win.extends && params.data) {
                        !!win.extends[isShow ? "show" : "hide"] && win.extends[isShow ? "show" : "hide"].call(win, params.data || null);
                    }
                });
            });
            // if (!opt.hide) {} else {
            //     $dom.stop(true, true).animate({ // 切换到达动画指定状态(位置、透明度)
            //         opacity: 0,
            //         scale: 1,
            //         ...t[1],
            //     }, 800, "linear", () => {
            //         resolve(true);
            //         $dom.css({
            //             "z-index": isShow ? 99 : -1
            //         });
            //         // 弹窗回调 (win.extends弹窗配置中支持show/hide两种扩展回调)
            //         //console.log("===", isShow, win.extends, data)
            //         if (win.extends && params.data) {
            //             !!win.extends[isShow ? "show" : "hide"] && win.extends[isShow ? "show" : "hide"].call(win, params.data || null);
            //         }
            //     });
            // }
        })
    };

    /**
     * 清除缓存的弹窗
     */
    closeCacheDialog() {
        if (this.cache.dialogs.length != 0) {
            this.cache.dialogs.forEach(v => {
                let layer = this.layers[v];
                this.toggleComponentShow(v, false, layer, {
                    hide: true
                });
            })
        }
        this.cache.dialogs = [];
    };
    /**
     * 批量更新面板的样式（面板侧滑）
     * @param {*} panels 面板集
     * @param {*} isShow 是否显示
     * @param {*} params {
     *       cache: false, 窗口是否缓存
     *       data: null,   附属数据
     *       hide: false   是否显藏模式
     *   } 
     */
    batchTogglePanelShow(panels, isShow, params) {
        const self = this;

        const result = [];

        let opt = Object.assign({
            cache: false, // 是否缓存
            clearCache: true, // 是否清除缓存
            hide: false, // 立即隐藏
            data: {} // 附属数据
        }, params)

        //opt.clearCache && this.closeCacheDialog();

        if (!this.cache.lock) {
            this.cache.lock = true;
            panels.forEach(v => {
                let layer = this.layers[v];
                result.push(this.toggleComponentShow(v, isShow, layer, {
                    cache: opt.cache,
                    data: opt.data,
                    hide: opt.hide
                }))
            });
            // 将所有面板动画返回统一处理
            Promise.all(result).then(function() {
                // 是否初始化
                if (!self.cache.init) {
                    self.cache.init = true;
                    //self.reset();
                    self.emit("initEnd", null)
                }
                self.cache.lock = false;
                let task = self.cache.tasks.shift();
                if (task) {
                    self.batchTogglePanelShow(task.panels, task.isShow, task.opt);
                }
            });
        } else {
            this.cache.tasks.push({
                panels: panels,
                isShow: isShow,
                opt: opt
            })
        }
    };
    /**
     * 清除原有样式
     */
    reset() {
        Object.keys(this.layers).forEach((v) => {
            const t = this.layers[v];
            const dom = this.parent.Dom(v);
            dom.style.opacity = 0;
            dom.style.transform = `translate(0px, 0px)`;
        })
    };
    /**
     * 监听事件
     * @param {*} key 事件键名
     * @param {*} fn  事件回调
     * @param {*} once  是否一次性事件 true:表是,false表否
     */
    on(key, fn, once = false) {
        let isExist = false;
        for (let i = 0, len = this.events.length; i < len; i++) {
            if (this.events[i].key == key) {
                isExist = true;
            }
        }
        if (!isExist) {
            this.events.push({
                key,
                fn,
                once: once
            })
        }
        return this;
    };
    /**
     * 触发事件
     * @param {*} key 事件键名
     * @param {*} data  数据
     */
    emit(key, data) {
        let delTag = -1;
        for (let i = 0, len = this.events.length; i < len; i++) {
            if (this.events[i].key == key && Object.prototype.toString.call(this.events[i].fn) == '[object Function]') {
                this.events[i].fn.call(this, data);
                if (this.events[i].once) {
                    delTag = i;
                }
            }
        }
        if (delTag != -1) {
            this.events.splice(delTag, 1);
        }
    };
    /**
     * 依据显隐/位置/动画方案制定配套的样式
     * @param {*} isShow 是否显隐
     * @param {*} cfg 配置信息
     * @param {*} el 操作对象
     * @returns 
     */
    getAnimationSchemesCss(isShow, cfg, el) {
        let position = null;
        let css = [];
        try {
            // todo:优化
            switch (cfg.animationScheme) {
                case "abab": // 进出同向
                    position = {
                        "left": 1, // 左侧
                        "right": -1, // 右侧
                        "origin": 0 // 原地
                    };
                    // css = isShow ? [{
                    //     left: cfg.x + cfg.offset[0] * position[cfg.position] * -1, // 动画始位置
                    //     top: cfg.y + cfg.offset[1]
                    // }, {
                    //     left: cfg.x, // 动画结束位置
                    //     top: cfg.y
                    // }] : [{
                    //     left: cfg.x,
                    //     top: cfg.y
                    // }, {
                    //     left: cfg.x + cfg.offset[0] * (position[cfg.position]),
                    //     top: cfg.y + cfg.offset[1]
                    // }];
                    css = [{
                        left: cfg.x + cfg.offset[0] * position[cfg.position] * (isShow ? -1 : 1), // 动画始位置
                        top: cfg.y + cfg.offset[1]
                    }, {
                        left: cfg.x, // 动画结束位置
                        top: cfg.y
                    }];
                    if (!isShow) {
                        css = css.reverse();
                    }
                    break;
                case "abba": // 进出相反
                    position = {
                        "left": -1, // 左侧
                        "right": 1, // 右侧
                        "origin": 0 // 原地
                    };
                    css = [{
                        left: cfg.x + cfg.offset[0] * position[cfg.position], // 动画始位置
                        top: cfg.y + cfg.offset[1]
                    }, {
                        left: cfg.x, // 动画结束位置
                        top: cfg.y
                    }];
                    if (!isShow) {
                        css = css.reverse();
                    }
                    // css = isShow ? [{
                    //     left: cfg.x + cfg.offset[0] * position[cfg.position], // 动画始位置
                    //     top: cfg.y + cfg.offset[1]
                    // }, {
                    //     left: cfg.x, // 动画结束位置
                    //     top: cfg.y
                    // }] : [{
                    //     left: cfg.x,
                    //     top: cfg.y
                    // }, {
                    //     left: cfg.x + cfg.offset[0] * position[cfg.position],
                    //     top: cfg.y + cfg.offset[1]
                    // }];
                    break;
                case "fadeIn":
                    position = {
                        "left": 1, // 左侧
                        "right": -1, // 右侧
                        "origin": 0 // 原地
                    };
                    css = isShow ? [{
                        left: cfg.x + cfg.offset[0],
                        top: cfg.y + cfg.offset[1],
                        scale: 0.5
                    }, {
                        left: cfg.x,
                        top: cfg.y,
                        scale: 1
                    }] : [{
                        left: cfg.x,
                        top: cfg.y,
                        scale: 1
                    }, {
                        // left: cfg.x,
                        // top: cfg.y,
                        left: cfg.x + cfg.offset[0],
                        top: cfg.y + cfg.offset[1],
                        scale: 0.5
                    }];
                    break;
                case "fadeOut":
                    break;
            }
        } catch (ep) {
            console.error(el, isShow, cfg);
        }
        return css;
    };
}
module.exports = PanelAnimation;