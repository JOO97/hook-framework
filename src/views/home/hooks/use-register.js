import * as C from '../config/components';

export default function () {
	//登录按钮
	this.Com(C.登录按钮).on('button-clicked', () => {
		this.cache.isLoginExpire = false;
		//账号密码校验
		const { username, password } = this.loginInfo();
		if (!username || !password) return this.showMsg('用户名和密码不能为空', 'warning', 2000);
		//获取密钥
		this.getKeyPair();
	});
}
