import components from '../config/components';
import layers from '../config/layers';
import scenes from '../config/scenes';

import useRegister from '../hooks/use-register';
import useProxy from '../hooks/use-proxy';

import mainLogic from '../logic';

function bindMethods(...modules) {
	modules.forEach((methods) => {
		for (const methodName in methods) {
			if (typeof methods[methodName] === 'function') {
				this[methodName] = methods[methodName];
			}
		}
	});
}

export function createHookInstance({ Comm, Widget }) {
	class HookController extends Comm {
		constructor() {
			super();
			// 组件
			this.components = components;
			// 面板
			this.layers = layers;
			// 场景
			// this._sceneController = scenes;
			// 数据
			this.cache = useProxy({
				isLoginExpire: false,
				public: {
					userInfo: null,
					hkPlugin: null,
				},
				home: {},
				clue: {},
			});
			// 方法
			bindMethods.apply(this, [mainLogic]);
		}

		/**
		 * 初始化
		 */
		async init() {
			this.panelManager = new Widget.PanelManager(this, this.layers);
			// this.sceneManager = new Widget.SceneManager(this, this.scenes).init();
			this.register();

			const loginStatus = this.checkLogin();
			this.panelManager.toggleDialog(['登录页'], !loginStatus);

			// 获取token
			this.getToken(() => {
				loginStatus && this.initScreen();
			});
		}

		/**
		 * 事件注册
		 */
		register = useRegister;

		/**
		 * 指令广播
		 * @param {*} commandId  广播指令编号
		 * @param {*} params 广播数据
		 */
		broadcastCommand(commandId, params = {}) {}
	}

	return new HookController();
}
