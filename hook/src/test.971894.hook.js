module.exports = (stage) => {
	const tool = (window.tool = stage.get('@Snxun_datav_sn-cp-tools_OTVf8').hook(stage));
	window.Stage = stage;
	window.G = stage.get;
	window.ENV = 'dev';
	const { Comm, Widget } = tool;

	class HookManager extends Comm {
		constructor() {
			super();

			this.components = {
				浮框层: 'map3d-earth-floatboard_gFnyw',
			};
			this.layers = {
				compose: {},
				list: {},
			};
			this.apiList = {
				AIS渔船: {
					apiType: 'tb',
					url: '/handle/information/viewList?pageNum=1&pageSize=20000',
					options: {
						type: 'get',
						data: {
							shipTypeA: '',
						},
					},
					success: (res) => {
						console.log('ais渔船 success', res);
						// const queryCargo = this.apiList['AIS商船'];
						// const current = this.Utils.moment().valueOf();
						// queryCargo.options.data = {
						// 	queryTimeFrom: this.Utils.moment(current).format('YYYY-MM-DD') + ' ' + '00:00:00',
						// 	queryTimeTo: this.Utils.moment(current).format('YYYY-MM-DD HH:mm:ss'),
						// };
						// queryCargo.success = (res2) => {
						// 	console.log('ais商船 success', res2);
						// 	const data2 = res2.rows
						// 		.filter((item) => item.longitude && item.latitude)
						// 		.map((item) => {
						// 			return Object.assign(item, {
						// 				lng: item.longitude,
						// 				lat: item.latitude,
						// 				rotationAngle: item.cog || 0,
						// 				shipType: '商船',
						// 				time: item.update_time,
						// 				// pos_time: item.update_time,
						// 				name: item.shipname,
						// 				course: item.cog || 0,
						// 				sog: item.sog ? item.sog * 1 : 0,
						// 			});
						// 		});
						// 	const cpn = this.Com(layer);
						// 	const fullShipList = data.concat(data2);
						// 	let searchActive = null;
						// 	if (cpn.__data) {
						// 		searchActive = cpn.__data.find((d) => {
						// 			return Boolean(d.searchActive);
						// 		});
						// 	}
						// 	fullShipList.forEach((f) => {
						// 		if (searchActive && searchActive.shipname === f.shipname) {
						// 			f.searchActive = 'a';
						// 		}
						// 	});
						// 	cpn.__data = fullShipList;
						// 	this.toggleMapLayer(layer, this.cache.mapLayers[layer]);
						// 	this.setTreeNodeName('船舶', 'AIS', fullShipList.length);
						// 	//默认撒点的图层(当地图图层级别>9时显示 使用AIS数据)
						// 	const cpn2 = stage.get('datav-2dmap-icon-scatter_TC3Dg');
						// 	cpn2.render(fullShipList);
						// 	cpn2.show();
						// };
						// queryCargo.error = (err) => {
						// 	console.log('ais商船 error');
						// 	stage.get('datav-2dmap-icon-scatter_TC3Dg').show();
						// };
						// this.requestData()([queryCargo], 0);
					},
					error: (err) => {
						console.log('ais船舶 error');
					},
				},
				// ais图层使用的接口2
				AIS商船: {
					apiType: 'tb',
					url: '/handle/cargo_ship/list?pageNum=1&pageSize=2000',
					options: {
						type: 'get',
						data: {
							queryTimeFrom: '',
							queryTimeTo: '',
						},
					},
					success: (res) => {},
					error: (err) => {},
				},
			};
			this.constants = {};
			this.enum = {};
			this.cache = {};
		}

		/**
		 * 请求接口
		 */
		requestData() {
			const apiRequest = (reqItems, count) => {
				if (this.proxy.isLoginExpire) return;
				let {
					apiType,
					url,
					options: opt,
					success: successHandler,
					error: errorHandler = null,
					before: beforeHandler = null,
					from,
				} = reqItems[count];
				//参数处理
				const options = beforeHandler ? beforeHandler(opt) : Object.assign({}, opt);
				let data = Object.assign({}, options.data || {});
				delete options.data;
				let headers = {};
				if (options.headers) headers = Object.assign({}, options.headers);
				$.ajax({
					type: options.type.toUpperCase(),
					url: `${this.apiConfig.baseUrl[apiType]}${url}`,
					data: options.type === 'post' ? JSON.stringify(data) : data,
					dataType: 'json',
					// headers,
					timeout: this.apiConfig.options.timeout,
					contentType: options.type === 'post' ? 'application/json;charset=utf-8' : false,
					success: (res) => {
						if (res) {
							const { success: successStatus, data: resData } = this.checkSuccess(from, res);
							if (successStatus) successHandler(resData);
							else errorHandler && errorHandler(res);
						} else errorHandler && errorHandler(res);
						if (count < reqItems.length - 1) {
							count++;
							apiRequest(reqItems, count);
						}
					},
					error: (err) => {
						errorHandler && errorHandler(err);
						if (count < reqItems.length - 1) {
							count++;
							apiRequest(reqItems, count);
						}
					},
				});
			};
			return apiRequest;
		}

		/**
		 * 批量执行请求任务
		 */
		runReqTasks(taskList) {
			if (!taskList || !taskList.length) return;
			const taskMap = this.getTaskMap(taskList);
			const tasks = Object.keys(taskMap);
			const newApiGet = this.requestData();
			tasks.forEach((taskId) => {
				const reqItems = [];
				for (const item of taskMap[taskId].keys()) {
					reqItems.push(item);
				}
				return newApiGet(reqItems, 0);
			});
		}

		/**
		 * Generate the map of tasks
		 * @param {Object[]} tasksList
		 * @param {number} [maxReqCount]
		 */
		getTaskMap(tasks, maxReqCount = 6) {
			const tasksList = [];
			tasks.forEach((key) => {
				if (!this.apiList[key]) return;
				tasksList.push(
					Object.assign(this.apiList[key], {
						name: key,
					})
				);
			});
			const tasksMap = {};
			const reqCount = tasksList.length;
			const averageNum = Math.floor(reqCount / maxReqCount);
			const extraNum = reqCount % maxReqCount;
			//得出任务数
			const taskNum = averageNum === 0 ? extraNum : maxReqCount;
			for (let i = 1; i <= taskNum; i++) {
				tasksMap[i] = new Map();
				let data;
				if (taskNum === maxReqCount) {
					data = tasksList.splice(0, averageNum);
				} else {
					data = tasksList.splice(0, 1);
				}
				data.forEach((item) => {
					tasksMap[i].set(item, {});
				});
			}
			if (taskNum === maxReqCount && extraNum) {
				for (let i = 1; i <= extraNum; i++) {
					const [data] = tasksList.splice(0, 1);
					tasksMap[i].set(data, {});
				}
			}
			return !Object.keys(tasksMap).length ? null : tasksMap;
		}

		/**
		 * test浮框层组件
		 */
		testFloatBoard() {
			this.Com('浮框层').setData([
				{
					lng: 0,
					lat: 0,
					content: {
						name: 'CPU2',
						suffix: '%',
						width: 800,
						height: 200,
						titleFontSize: 72,
						titleColor: '#fbf320',
						content: 'CPU ',
						contentColor: '#05478D',
						contentFontSize: 90,
						paddingLeft: 20,
						paddingRight: 60,
						paddingTop: 10,
						fontFamily: '阿里巴巴普惠体',
						contentFontWeight: 600,
						bgImgUrl:
							'https://cdn-upload.datav.aliyun.com/upload/download/1683256947907-bcYQBtkA.png',
					},
				},
			]);
		}

		/* 初始化 */
		init() {
			//   this.panelManager = new Widget.PanelManager(this, this.layers);
			// await new Promise((resolve, reject)=>{
			//   resolve()
			// })
		}
	}

	setTimeout(() => {
		const hookManager = new HookManager();
		window.HM = hookManager;
		hookManager.init();
	}, 2000);
};
