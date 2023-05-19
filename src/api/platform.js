import request from '@/utils/request';

const baseURL = import.meta.env.VITE_BASE_URL_PLATFORM;
const basePath = '/platform';

/**
 * 获取密钥
 * @returns
 */
export function getKeyPair() {
	return request.get(`${basePath}/login/key_pair`, { baseURL });
}

/**
 * 账号密码登录
 * @param {*} params
 * @returns
 */
export function loginByNameAndPsw(params) {
	return request.get(`${basePath}/login/login`, {
		params,
		baseURL,
	});
}
