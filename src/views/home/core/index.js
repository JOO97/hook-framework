// import utils from '@/utils/';
import eventsHook from '../hooks/events';
import initHook from '../hooks/init';
import setupProxy, { data } from './data';
import Comm from '@/utils/dev-tools';

class HookManager extends Comm {
	constructor(cfg) {
		super();
		this.components = cfg.components;
	}
	created() {
		// 一些初始化操作
	}
	mounted() {
		//面板注册
		//事件注册
		//网络请求
	}
}

const mounted = () => {
	// 支持传callback
	this.apiList = {};
	this.enum = {};
	this.cache = data;
	this.proxy = setupProxy.apply(this);
	eventsHook.apply(this);
	initHook.apply(this);
};

// export { createHook, mounted };

export default {
	data: {},
	mounted() {
		this.init();
	},
	methods: {
		init() {},
	},
};
