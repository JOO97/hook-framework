import components from '../config/components';
import layers from '../config/layers';
import eventRegister from '../hooks/use-event';
// import usePanel from '../hooks/use-panel';
import publicMethods from '../logic/public';
import homeMethods from '../logic/home';

import config from '../config/system';

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
			// 组件集合
			this.components = components;
			// 面板配置
			// this.layers = layers;

			this.cache = {
				public: {
					userInfo: null,
					hkPlugin: null,
				},
				home: {},
				clue: {},
			};

			// 方法
			bindMethods.apply(this, publicMethods, homeMethods);
		}

		/**
		 * 初始化
		 */
		async init() {
			/* 
               1、socket的创建
               3、各种widget的初始化
               4、各种需求的实始化
            */
			this.panelManager = new Widget.PanelManager(this, this.layers);

			const res = await this.Utils.loadScriptByUrl(config.encryptScript);
			if (res.indexOf('error') !== -1) this.showMsg('外部资源加载失败, 请刷新页面');
			else {
				this.Utils.JSEncrypt = window.JSEncrypt;
				this.loginHandler();
				const loginStatus = Boolean(this.checkLogin());
				this.panelManager.toggleDialog(['登录页'], !loginStatus);

				this.getToken(() => {
					loginStatus && this.initScreen();
				});
			}
		}

		/**
		 * 事件注册
		 */
		register = eventRegister;

		/**
		 * 指令广播
		 * @param {*} commandId  广播指令编号
		 * @param {*} params 广播数据
		 */
		broadcastCommand(commandId, params = {}) {}
	}

	return HookController;
}
