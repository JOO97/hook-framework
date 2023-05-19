import home from './home';
import clue from './clue';

import auth from './auth';
import { 提示窗 } from '../config/components';

export default {
	...home, //首页
	...clue, //线索页
	...auth, //权限相关
	showMsg(text, icon = 'warning', hideAfter = 3000) {
		this.Com(提示窗).showMsg({
			text,
			heading: '提示',
			hideAfter,
			icon,
		});
	},

	initScreen() {
		console.log('initScreen');
	},
};
