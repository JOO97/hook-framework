import request from '@/utils/request';

const BASE_URL = import.meta.env.URL_PLATFORM;
const basePath = '/platform';

const config = { baseURL };

/**
 * 获取密钥
 * @returns
 */
export function getKeyPair() {
	return request.get(`${basePath}/login/key_pair`, {}, config);
}
