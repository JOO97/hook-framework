import { getToken } from '@/api/tb';
import { getKeyPair } from '@/api/platform';
import { 登录_tab, 登录_账号密码, 登录_二维码, 登录按钮 } from '../../config/components';

export default {
	loginHandler() {
		const tabPanels = [登录_账号密码, 登录_二维码];
		this.Com(登录_tab).on('richTabClick', ([e]) => {
			const idx = e.id;
			this.Com(tabPanels[idx]).show();
			this.Com(tabPanels[1 - idx]).hide();
		});

		//登录按钮
		this.Com(登录按钮).on('button-clicked', () => {
			this.proxyBE.isLoginExpire = false;
			//账号密码校验
			const { username, password } = this.loginInfo();
			if (!username || !password) return this.showMsg('用户名和密码不能为空', 'warning', 2000);

			//获取密钥
		});
	},
	refreshToken() {
		console.log('refreshToken');
	},
	/**
	 * 获取当前登录状态
	 */
	checkLogin() {
		const user = this.Utils.getLs(this.constants.USER_INFO);
		const token = this.Utils.getLs(this.constants.ACCESS_TOKEN);
		if (token && user && user.accountId) {
			this.cache.user = user;
			return true;
		}
		return false;
	},

	/**
	 * get token
	 */
	async getToken(cb) {
		const res = await getToken();
		this.cache.public.token = res.token;
		cb && cb(res);
	},
};
