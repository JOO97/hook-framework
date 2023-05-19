import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_TB;

axios.get();
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code != 200) {
			return Promise.reject(new Error('Error'));
		}
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
