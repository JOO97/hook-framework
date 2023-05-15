/**
 * 公共类
 */
export default class Comm {
	constructor({ stage, cfg }) {
		this.stage = stage;
		this.components = cfg.components;

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
	 * 获取组件
	 * @params id:组件ID
	 */
	G(id) {
		return this.stage.get(id);
	}

	/**
	 * 控制台打印
	 * @param {*} msg 打印消息
	 * @param {*} type 日志类型或者 对象
	 */
	log(msg, type) {
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
}
