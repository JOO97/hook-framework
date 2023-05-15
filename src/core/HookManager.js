// import utils from '@/utils/';

import components from '../views/home/config/components';

const setup = (tool) => {
	const { Comm, Widget } = tool;

	class HookManager extends Comm {
		constructor() {
			super();

			this.components = components;
			this.layers = {
				compose: {},
				list: {},
			};
			// 支持传callback
			this.apiList = {};
			this.constants = {};
			this.enum = {};
			this.cache = {};
		}

		// /* 初始化 */
		// init() {
		// 	console.log('-----test');
		// }
	}
	return HookManager;
};

export const mounted = (this) => {



};

export default setup;
