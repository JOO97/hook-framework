import JSEncrypt from 'jsencrypt';

import { getToken } from '@/api/tb';
import { getKeyPair, loginByNameAndPsw } from '@/api/platform';

export default {
	/**
	 * 获取/重置登录表单信息
	 */
	loginInfo(reset = false) {
		const username = this.Com('账号');
		const password = this.Com('密码');
		if (reset) {
			username.render([
				{
					value: '',
				},
			]);
			password.render([
				{
					value: '',
				},
			]);
		}

		return {
			username: username.value,
			password: password.value,
		};
	},

	/**
	 * 请求登录接口的处理逻辑
	 * @param {*} status true-成功 false-失败
	 */
	afterLoginHandler(status, res) {
		if (!status) {
			this.showMsg(res.msg || '登录失败', 'warning', 2000);
			return;
		}
		if (res['cockpitStatus'] !== '1') return this.showMsg('无权限', 'warning', 2000);
		this.showMsg('登录成功', 'success', 2000);
		this.cache.isLoginExpire = false;
		this.cache.user = res;
		this.panelManager.toggleDialog(['登录页'], false);
		this.initScreen();
	},

	refreshToken() {
		console.log('refreshToken');
	},
	/**
	 * 获取当前登录状态
	 */
	checkLogin() {
		// const user = this.Utils.getLs(this.constants.USER_INFO);
		// const token = this.Utils.getLs(this.constants.ACCESS_TOKEN);
		// if (token && user && user.accountId) {
		// 	this.cache.user = user;
		// 	return true;
		// }
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

	/**
	 * 获取密钥
	 */
	async getKeyPair() {
		const res = await getKeyPair();
		const { public: publicKey = '', private: privateKey = '' } = res.data.data;
		//加密
		const encrypt = new JSEncrypt();
		encrypt.setPublicKey(publicKey);
		const { username, password } = this.loginInfo();
		// 登录
		this.loginByNameAndPsw(privateKey, username, encrypt.encrypt(password));
	},

	/**
	 * 账号密码登录
	 */
	async loginByNameAndPsw(keyPair, login_name, password) {
		const res = await loginByNameAndPsw({ keyPair, login_name, password });
		this.afterLoginHandler(true, res.data);
	},
};

/**
 * HookController
 * index.ts: import home.ts
 * home.ts:
 */
