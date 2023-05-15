/**
 * 公共类
 */
export default class Comm {
	constructor() {
		const self = this;
		// 全局配置
		this.setting = {
			// 服务端
			server: {
				ip: '127.0.0.1',
			},
			socket: {
				// socket相关配置
				ip: '127.0.0.1', // socket服务地址
				port: '8689', // socket服务端口
				id: 506055, // 频道编号
				group: 'VISIX-DataV', // 频道英文名
				name: 'VISIX可视化大屏', // 频道组中文名
				// group: { // 频道组信息
				//     id: 506055, // 频道编号
				//     cnName: '杭州海事可视化大屏', // 频道组中文名
				//     enName: 'huanzhou-sunxun-hsj' // 频道英文名
				// },
				mode: 'hook',
				heartCheck: {
					// 是否具带心跳服务
					open: false,
					timer: 5000,
				},
			},

			// 是否关闭所有控制端信息
			log: true,
		};

		this.animationSchemes = {
			0: 'abab', // "进出同向"
			1: 'abba', // "进出反向"
			2: 'fadeIn', // 进场浙隐
			3: 'fadeOut', // 出场浙隐
		};
		// 缓存配置
		this.cache = {
			// 场景
			scene: {
				current: '',
				prev: '',
			},
			dialog: [],
		};
		// 控制台打印配色方案
		this.theme = {
			content: ['font-size：12px', 'color:#000'],
			success: [
				'font-size:12px',
				'color:#fff',
				'background:#00c200',
				'font-weight:bolder',
				'border-radius:3px',
				'padding:2px',
			],
			info: [
				'font-size:12px',
				'color:#fff',
				'background:#00aa7f',
				'font-weight:bolder',
				'border-radius:3px',
				'padding:2px',
			],
			warn: [
				'font-size:12px',
				'color:#fff',
				'font-weight:bolder',
				'background:#e79a00',
				'border-radius:3px',
				'padding:2px',
			],
			error: [
				'font-size:12px',
				'color:#fff',
				'font-weight:bolder',
				'background:#e30000',
				'border-radius:3px',
				'padding:2px',
			],
		};
	}
	/**
	 * 获取缓存值
	 * @param {*} key 缓存键值
	 * @returns
	 */
	getCache(key) {
		var value = localStorage.getItem(key);
		return value;
	}
	/**
	 * 设置缓存值
	 * @param {*} key 缓存键值
	 * @param {*} value 缓存值
	 */
	setCache(key, value) {
		localStorage.setItem(key, value);
	}
	/**
	 * 移除缓存值
	 * @param {*} key 缓存键值
	 * @returns
	 */
	removeCache(key) {
		localStorage.removeItem(key);
	}
	/**
	 * 控制台打印
	 * @param {*} msg 打印消息
	 * @param {*} type 日志类型或者 对象
	 */
	log(msg, type) {
		//%o%O
		if (Object.prototype.toString.call(type) == '[object Object]') {
			console.log(
				'%c VISIX %c %s %o',
				this.theme.info.join(';'),
				this.theme.content.join(';'),
				msg,
				type
			);
		} else {
			const t = this.theme[!type ? 'info' : type];
			if (t && this.setting.log) {
				console.log('%c VISIX %c %s', t.join(';'), this.theme.content.join(';'), msg);
			}
		}
	}
	/**
	 * 修改心跳服务的开关状态
	 * @status {*} 开关状态 true:开,false:关
	 */
	toggleHeartCheck(status) {
		this.log(`通迅心跳检测已${status ? '开启' : '关闭'}`, 'warn');
		this.setCache('screen-heart-check', status ? 1 : 0);
		//this.heartCheck;
		this.utils.broadcast.heartCheck.start();
		// console.log(this);
		// status ? this.heartCheck.start() : this.heartCheck.stop();
		// this.setting.heartCheck.open = status;
	}
	/**
	 * 切换地图图层的显隐
	 * @param {*} comps 地图图层集
	 * @param {*} status 显隐状态 true:显示，false:隐藏
	 * @param {*} fn 回调
	 */
	toggleMapComponent(comps, status, fn) {
		if (Array.isArray(comps)) {
			comps.forEach((v) => {
				const t = this.Com(v);
				if (t) {
					// this.log(`${v}:${status}`)
					t[status ? 'show' : 'hide']();
				}
			});
		}
		fn && fn.call(this);
	}
	/**
	 * 获取组件对象
	 * @param {*} name 组件名称
	 * @param {*} debug 是否打印组件实例
	 * @returns 组件实例对象
	 */
	Com(name, debug) {
		if (!!this.utils && !!this.utils.G) {
			const com = this.utils.G(this.components[name]);
			if (debug) {
				if (com) {
					this.log(`${name}`, com);
				} else {
					this.log(`${name}不存在`, 'error');
				}
			}
			return com;
		} else {
			this.log(`this.utils对象未挂载`, 'error');
			return null;
		}
	}
	/**
	 * 获取组件Dom对象
	 * @param {*} name 组件名称
	 * @param {*} debug 是否打印组件实例
	 * @returns 组件Dom对象
	 */
	Dom(name, debug) {
		const com = this.Com(name, debug);
		if (com) {
			return com.container;
		}
		return null;
	}
	/**
     * 创建socket通迅端
     * @param {*} socket 通迅配置 
     * @param {*} opt {
                        mscreen: false, // 注册mscreen服务
                        hook: true // 创建Hook服务
                        heartCheck:false  // 是否开启心跳服务
                      } 
     */
	createSocket(
		socket,
		opt = {
			mscreen: false,
			hook: true,
			heartCheck: false,
		}
	) {
		return new Promise((resolve, reject) => {
			if (!!this.utils) {
				// client to mscreen
				if (opt.mscreen) {
					this.utils.loadScriptByUrl(`http://${socket.ip}:3200/socket.js`).then(() => {
						if (window.io) {
							this.utils.socket = io(`http://${socket.ip}:3010`);
						} else {
							this.log(`mscreen服务文件未加载`, 'error');
						}
					});
				}
				// page client to page client
				// this.utils.broadcast = new this.socket(socket);
				if (opt.hook) {
					this.utils.broadcast = new SocketClient(socket, this);
				}
				resolve(true);
			} else {
				this.log(`this.utils对象未挂载`, 'error');
				resolve(false);
			}
		});
	}
	/**
	 * 向mscreen平台输送一条指令
	 * @param {*} action 扩播频道
	 * @param {*} data  扩播数据
	 */
	sendMsgToMscreen(action, data) {
		this.utils.socket && this.utils.socket.emit(action, data);
	}
	/**
	 * 广播一条信息
	 * @param {*} action 扩播频道
	 * @param {*} data  扩播数据
	 */
	broadcastMsg(action, data) {
		this.utils.broadcast && this.utils.broadcast.emit(action, data);
	}
	/**
	 * 监听广播
	 * @param {Object} action 扩播频道
	 * @param {Object} cb 回调函数
	 */
	broadcastListen(action, cb) {
		this.utils.broadcast && this.utils.broadcast.on(action, cb);
	}
	// coordtransform: {bd09togcj02: ƒ, gcj02tobd09: ƒ, wgs84togcj02: ƒ, gcj02towgs84
	/**
	 * 84转gcj2000
	 * @param {*} lnglats [{lng:111,lat:2222},......]
	 */
	coordtransform(lng, lat) {
		const t = this.utils.coordtransform.wgs84togcj02;
		const temp = t(lng, lat);
		return {
			lng: temp[0] * 1,
			lat: temp[1] * 1,
		};
	}
	/**
	 * 84转gcj2000
	 * @param {*} lnglats [{lng:111,lat:2222},......]
	 */
	coordtransformList(
		lnglats,
		keyMap = {
			lng: 'lng',
			lat: 'lat',
		}
	) {
		var result = [];
		if (Object.prototype.toString.call(lnglats) == '[object Array]') {
			const t = this.utils.coordtransform.wgs84togcj02;
			result = lnglats.map((v) => {
				const temp = t(v[keyMap.lng], v[keyMap.lat]);
				return Object.assign(v, {
					lng: temp[0] * 1,
					lat: temp[1] * 1,
				});
			});
		}
		return result;
	}
}
