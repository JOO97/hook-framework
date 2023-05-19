import request from '@/utils/request';

const baseURL = import.meta.env.VITE_BASE_URL_TB;
const basePath = '/enforce_law_data';

/**
 * ais船舶
 * @param {*} param0
 * @returns
 */
export function getAisShip(shipTypeA = '', orgId = 3309, pageNum = 1, pageSize = 20) {
	return request.get(`${basePath}/handle/information/viewList`, {
		params: { orgId, shipTypeA, pageNum, pageSize },
		baseURL,
	});
}

/**
 * 获取token
 * @returns
 */
export function getToken() {
	return request.get(`${basePath}/getToken`, { baseURL });
}
