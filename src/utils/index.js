/**
 * 服务请求公共方法
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @return 成功信息或者执行失败信息
 */
export function Services(url, data, option) {
	let defaultOption = {
		url: url,
		data: data || {},
		type: 'get', // 请求类型
		dataType: 'json', // 接收数据类型
		async: true, // 异步请求
		cache: false, // 浏览器历史缓存
	};
	return new Promise((resolve, reject) => {
		// option = _.defaultsDeep(defaultOption, option, {
		let opt = Object.assign(defaultOption, option, {
			success: function (res) {
				//layer.closeAll("loading");
				resolve(res);
			},
			error: function (error) {
				//layer.closeAll("loading");
				reject(error);
				console.error('服务请求错误', url, error);
			},
			beforeSend: function () {
				if (option && option.loading) {
					//layer.load();
				}
			},
		});
		$.ajax(opt);
	});
}
/**
 * 加载样式文件
 * @param {*} url
 */
export function loadCSSByUrl(url) {
	return new Promise((resolve, reject) => {
		const css = document.createElement('link');

		css.async = false;
		css.rel = 'stylesheet';
		css.href = url;
		document.body.appendChild(css);
		css.onload = function () {
			resolve('success load');
		};
		css.onerror = function () {
			resolve(`load ${url} error!`);
		};
	});
}
/**
 * 加载脚本文件
 * @param {*} url
 */
export function loadScriptByUrl(url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = false;
		script.src = url;
		document.body.appendChild(script);
		script.onload = function () {
			resolve('success load');
		};
		script.onerror = function () {
			resolve(`load ${url} error!`);
		};
	});
}
/**
 * 日期格式
 * @param {*} fmt 时间格式 yyyy-MM-dd mm:ss:qq
 * @param {*} date 需要格式的时间
 */
export function dateFtt(fmt, date) {
	var o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			);
	return fmt;
}

/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 * @param {*} num1 加数1
 * @param {*} num2 加数2
 */
export function numAdd(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	try {
		baseNum1 = num1.toString().split('.')[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split('.')[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	return (num1 * baseNum + num2 * baseNum) / baseNum;
}
/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * @param {*} num1 被减数
 * @param {*} num2 减数
 */
export function numSub(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	var precision; // 精度
	try {
		baseNum1 = num1.toString().split('.')[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split('.')[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
	return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}
