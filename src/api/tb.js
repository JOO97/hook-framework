import request from '@/utils/request';

const baseURL = import.meta.env.VITE_BASE_URL_TB;
const basePath = '/enforce_law_data';

/**
 * ais船舶
 * @param {*} param0
 * @returns
 */
export function getAisShip(shipTypeA = '', orgId = 3309, pageNum = 1, pageSize = 20) {
	return request.get(
		`${basePath}/handle/information/viewList`,
		{ orgId, shipTypeA, pageNum, pageSize },
		{ baseURL }
	);
}
