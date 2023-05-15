import request from '@/utils/request';

const BASE_URL = import.meta.env.URL_PLATFORM;
const basePath = '/platform';

/**
 * 根据code获取token
 * @param authCode
 * @returns
 */
export function getTokenByCode() {
	return (
		request.post < IResToken,
		IRes <
			IResToken >>
				(`${baseUrl}/getTokenByDingCode`,
				{ authCode },
				{ baseURL: BASE_URL, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
	);
}
