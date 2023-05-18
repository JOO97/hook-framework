import auth from './auth';
import { 提示窗 } from '../../config/components';

export default {
	...auth,
	showMsg(text, icon = 'warning', hideAfter = 3000) {
		this.Com(提示窗).showMsg({
			text,
			heading: '提示',
			hideAfter,
			icon,
		});
	},
};
