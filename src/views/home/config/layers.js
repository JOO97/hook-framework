export default {
	compose: {
		全域感知: {
			delay: 0,
			layout: {
				left: ['全域感知_左_全域感知-面板', '全域感知_左_网格管控-面板'],
				right: ['全域感知_右_高效处置-面板', '全域感知_右_监督跟踪-面板'],
				top: [],
				bottom: [],
			},
		},
		事件详情: {
			delay: 0,
			layout: {
				left: ['事件详情_左_案件信息-面板'],
				right: ['事件详情_右_快响指挥-面板'],
				top: [],
				bottom: [],
			},
		},
		行刑衔接: {
			delay: 0,
			layout: {
				left: ['行刑衔接_左_案件详情-面板'],
				right: [],
				top: [],
				bottom: [],
			},
		},
		线索分析: {
			delay: 0,
			layout: {
				left: ['线索分析_左_线索信息-面板'],
				right: [],
				top: [],
				bottom: [],
			},
		},
		执法协同: {
			delay: 0,
			layout: {
				left: ['执法协同_左_发起推送-面板'],
				right: [],
				top: [],
				bottom: [],
			},
		},
		全链跟踪: {
			delay: 0,
			layout: {
				left: ['全链跟踪_左_案件跟踪-面板'],
				right: [],
				top: [],
				bottom: [],
			},
		},
	},
	list: {
		'全域感知_左_全域感知-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'全域感知_左_网格管控-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 789],
		},
		'全域感知_右_高效处置-面板': {
			type: 'panel',
			animation: ['slide-in-right', 'slide-out-right'],
			position: [2008, 115],
		},
		'全域感知_右_监督跟踪-面板': {
			type: 'panel',
			animation: ['slide-in-right', 'slide-out-right'],
			position: [2008, 964],
		},

		'事件详情_左_案件信息-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'事件详情_右_快响指挥-面板': {
			type: 'panel',
			animation: ['slide-in-right', 'slide-out-right'],
			position: [2008, 115],
		},
		'行刑衔接_左_案件详情-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'线索分析_左_线索信息-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'执法协同_左_发起推送-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'全链跟踪_左_案件跟踪-面板': {
			type: 'panel',
			animation: ['slide-in-left', 'slide-out-left'],
			position: [24, 115],
		},
		'all_右_告警-面板': {
			type: 'dialog',
			animation: ['fade-in-right', 'fade-out-right'],
			position: [1854, 115],
			position2: [2376, 115],
		},
		线索列表弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [568, 382],
			actions: {},
			listener: {
				show: ({ type }) => {
					//请求 线索列表数据
					this.apiList['线索列表'].options.data.type = this.enum.clueMap[type];
					this.requestData()([this.apiList['线索列表']], 0);
				},
				hide: function (data) {
					this.Com(`${this.cache.currentClueDiscoveryFlipper}_active`).hide();
					this.cache.currentClueDiscoveryFlipper = '';
					this.Com('线索列表').render([]);
				},
			},
		},

		'树形菜单_感知-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 38],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_感知-弹窗';
					this.cache.tool.activeTools['工具项_感知'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_船舶-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 76],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_船舶-弹窗';
					this.cache.tool.activeTools['工具项_船舶'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_执法-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 112],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_执法-弹窗';
					this.cache.tool.activeTools['工具项_执法'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_气象-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 150],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_气象-弹窗';
					this.cache.tool.activeTools['工具项_气象'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_渔业-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 192],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_渔业-弹窗';
					this.cache.tool.activeTools['工具项_渔业'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_禁捕-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 230],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_禁捕-弹窗';
					this.cache.tool.activeTools['工具项_禁捕'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_采砂-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 268],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_采砂-弹窗';
					this.cache.tool.activeTools['工具项_采砂'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_保护-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-136, 268],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_保护-弹窗';
					this.cache.tool.activeTools['工具项_保护'].show = true;
				},
				hide: function (data) {},
			},
		},
		'树形菜单_图例-弹窗': {
			type: 'dialog',
			animation: ['fade-in-left', 'hides'],
			position: [-300, -17],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.tool.currentTreeMenu = '树形菜单_图例-弹窗';
					this.cache.currentDialog === '树形菜单_图例-弹窗';
					this.cache.tool.activeTools['工具项_图例'].show = true;
					this.cache.tool.activeTools['工具项_图例'].on.show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.cache.tool.activeTools['工具项_图例'].show = false;
					this.cache.tool.activeTools['工具项_图例'].on.hide();
				},
			},
		},
		工具栏: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [1862, 1144],
			position2: [2401, 1144],
		},
		'工具栏-弹窗': {
			type: 'dialog',
			animation: ['slide-in-bottom', 'hides'],
			position: [1756, 766],
			position2: [2295, 766],
			actions: {},
			listener: {
				show: function (data) {},
				hide: (data) => {
					this.cache.tool.expand = false;
					this.cache.tool.currentTreeMenu &&
						this.panelManager.toggleDialog([this.cache.tool.currentTreeMenu], false);

					this.cache.tool.currentTreeMenu = '';
					this.Com('工具栏on').hide();
				},
			},
		},
		'事件_二级-应急救援': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [27, -82],
			actions: {},
			listener: {
				show: (data) => {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.cache.activeCircleMenuItem.name = '';
					this.setCircleMenuCounter();
				},
			},
		},
		'事件_二级-涉海涉岛': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [15, -76],
			actions: {},
			listener: {
				show: (data) => {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.setCircleMenuCounter();
					this.cache.activeCircleMenuItem.name = '';
				},
			},
		},
		'事件_二级-船舶船员': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [12, -76],
			actions: {},
			listener: {
				show: function (data) {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.cache.activeCircleMenuItem.name = '';
					this.setCircleMenuCounter();
				},
			},
		},
		'事件_二级-航道锚地': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [27, -84],
			actions: {},
			listener: {
				show: (data) => {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.cache.activeCircleMenuItem.name = '';
					this.setCircleMenuCounter();
				},
			},
		},
		'事件_二级-港口码头': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [26, -59],
			actions: {},
			listener: {
				show: (data) => {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.cache.activeCircleMenuItem.name = '';
					this.setCircleMenuCounter();
				},
			},
		},
		'事件_二级-其他': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [260, -86],
			actions: {},
			listener: {
				show: (data) => {
					this.setCircleMenuCounter();
				},
				hide: (data) => {
					this.cache.activeCircleMenuItem.name = '';
					this.setCircleMenuCounter();
				},
			},
		},
		案件列表弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [1344, 142],
			actions: {},
			listener: {
				show: ({ value }) => {
					const name = '案件列表弹窗';
					this.cache.currentDialog = name;
					const { childrenInstances } = this.Com(name);
					childrenInstances['main-title_CqqV7'].render([
						{
							url: '',
							value,
						},
					]);
					const type = value.replace('案件', '').replace('发生', '');
					this.apiList['事件列表'].options.data.type = type;
					this.requestData()([this.apiList['事件列表']], 0);
				},
				hide: (data) => {
					this.cache.currentDialog = '';
				},
			},
		},
		船舶统计弹窗: {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [919, 201],
			actions: {},
			listener: {
				show: (data) => {
					const name = '船舶统计弹窗';
					this.cache.currentDialog = name;
					this.reqShipCount(['iTpA9', '5SixJ', 'DR5PQ', 'GBhtf', 'k8UNC', 'igOPX']);
				},
				hide: (data) => {},
			},
		},
		航行船舶统计弹窗: {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [1165, 201],
			actions: {},
			listener: {
				show: (data) => {
					const name = '航行船舶统计弹窗';
					this.cache.currentDialog = name;
					this.reqShipCount(['AQ1T4', 'Jis5O', 'doqgh', 'lEGmw', 'ahpvo', 'Av0IQ'], '航行');
				},
				hide: (data) => {},
			},
		},
		锚泊船舶统计弹窗: {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [1411, 201],
			actions: {},
			listener: {
				show: (data) => {
					const name = '锚泊船舶统计弹窗';
					this.cache.currentDialog = name;
					this.reqShipCount(['YIpen', 'xoqQr', 'pN1rN', 'zByBp', 'YHeZX', 'nbjFo'], '锚泊');
				},
				hide: (data) => {},
			},
		},
		类案推荐弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 253],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '类案推荐弹窗';
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'监控视频-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 196],
			actions: {},
			listener: {
				show: (data) => {
					console.log('监控视频-弹窗 show', data);
					this.resetMapMenus();
					this.cache.currentDialog = '监控视频-弹窗';
					this.cache.currentCameraCode = data.cameraIndexCode;
					this.Com('监控视频-弹窗').childrenInstances['main-title_0Q4XQ'].render([
						{
							value: data.name,
						},
					]);
					//请求视频取流地址
					this.apiList[`${data.type}视频取流地址`].options.data.cameraIndexCode =
						data.cameraIndexCode + '';
					this.requestData()([this.apiList[`${data.type}视频取流地址`]], 0);
				},
				hide: (data) => {
					this.cache.currentCameraCode = '';
					this.Com('监控播放器').clear();
					this.Com('摄像头控制器').hide();
				},
			},
		},
		'监控视频-弹窗2': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 196],
			actions: {},
			listener: {
				show: (url) => {
					console.log('监控视频-弹窗2 show', data);
					this.resetMapMenus();
					this.cache.currentDialog = '监控视频-弹窗2';
					this.Com('监控播放器2').render([{ url }]);
				},
				hide: (data) => {
					this.cache.currentDialog = '';
				},
			},
		},
		'船舶详情-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [937, 259],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '船舶详情-弹窗';
					this.cache.shipDialog.name = data.name || '';
					if (data.searchActive) {
						this.proxyBE.searchActiveShip = data.name;
						const cpn = this.Com('图层_船舶_AIS');
						cpn.__data.forEach((a, index) => {
							if (a.shipname == data.shipname) {
								console.log('find---');
								a.searchActive = 'a';
							}
						});
						this.toggleMapLayer('图层_船舶_AIS', true);
					}
					const fieldsMap = {
						pos_time: 'u3h9q',
						lng: 'b18Fm',
						lat: 'Ijv21',
						mmsi: 'tWPyn',
						name: 'cpdTB',
						shipType: 'UJXc4',
						sog: 'ZhCRx',
					};

					if (data['pos_time']) {
						data['pos_time'] = this.Utils.moment(data['pos_time']).format('MM-DD HH:mm');
					}
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] || data[key] === 0 ? data[key] : '----',
							},
						]);
					});
				},
				hide: function (data) {
					this.proxyBE.searchActiveShip = '';
					this.Com('船舶检索框').clear();
					if (!this.cache.mapLayers['图层_船舶_AIS']) return;
					const cpn = this.Com('图层_船舶_AIS');
					cpn.__data.forEach((a, index) => {
						a.searchActive = '';
					});
					this.toggleMapLayer('图层_船舶_AIS', true);
				},
			},
		},
		'执法船详情-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '执法船详情-弹窗';
					if (data.searchActive) {
						this.proxyBE.searchActiveShip = data.name;
						const cpn = this.Com('图层_执法_执法');
						cpn.__data.forEach((a, index) => {
							if (a.shipname == data.shipname) {
								console.log('find执法船详情---');
								a.searchActive = 'a';
							}
						});
						this.toggleMapLayer('图层_执法_执法', true);
					}
					// 保存当前执法船舶名称
					this.cache.shipDialog.name = data.shipname || '';
					const fieldsMap = {
						lng: 'z9p2U',
						lat: 'zGwM3',
						mmsi: 'xuwSW',
						shipname: 'oGm3u',
						pos_time: '7LF9o',
						sog: 'p72aM',
						cog: 'UK9Mg',
						ship_length: 'AHclG',
						type_width: 'Pcgrw',
						shipTypeA: 'Vwsuh',
						online_status: 'epChK',
					};
					if (data['pos_time']) {
						data['pos_time'] = this.Utils.moment(data['pos_time']).format('YYYY-MM-DD HH:mm:ss');
					}
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] || data[key] === 0 ? data[key] : '----',
							},
						]);
					});

					//请求视频取流地址
					const apiInfo = this.apiList['船舶监控视频取流地址'];
					this.requestData()(
						[
							this.Utils.defaultsDeep(
								{
									options: {
										data: {
											url: `${
												this.constants.FORCE_SHIP_URL
											}/getFishAndOfficialVideoInfo?cm=${encodeURI(data.shipname)}`,
										},
									},
								},
								apiInfo
							),
						],
						0
					);

					// const {
					// 	forceShipCameraCount: countList,
					// 	forceShipCameraList
					// } = this.cache;
					// if (countList[data.shipname]) {
					// 	return this.setShipCameraTab(countList[data.shipname])
					// }
					// const apiInfo = _.cloneDeep(this.apiList['船舶监控视频取流地址']);
					// apiInfo.success = (res) => {
					// 	const apiData = this.shipCameraUrlResHandler(res)
					// 	countList[data.shipname] = apiData ? apiData.length : 0
					// 	this.setShipCameraTab(countList[data.shipname])
					//     forceShipCameraList[data.shipname] = apiData || []
					// }
					// apiInfo.error = () => {
					// 	this.setShipCameraTab()
					// }
				},
				hide: function (data) {
					this.proxyBE.searchActiveShip = '';
					const cpn = this.Com('图层_执法_执法');
					cpn.__data.forEach((a, index) => {
						a.searchActive = '';
					});
					this.toggleMapLayer('图层_执法_执法', true);
					this.Com('船舶检索框').clear();
				},
			},
		},
		'雷达目标-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '雷达目标-弹窗';
					const fieldsMap = {
						id: 'marquee_iXTWM',
						englishName: 'main-title_q0YO9',
						sog: 'main-title_7KMMt',
						lng: 'marquee_TuUOu',
						lat: 'marquee_LUSy3',
						cog: 'main-title_pXO5r',
						createTime: 'main-title_Q6Pjf',
					};
					data.lng = this.toDegrees(data.lng);
					data.lat = this.toDegrees(data.lat);
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(fieldsMap[key]).render([
							{
								value: data[key] || data[key] === 0 ? data[key] : '----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'三色指挥-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [1192, 258],
			actions: {},
			listener: {
				show: ({ type, title }) => {
					stage.get('main-title_wRCuN').render([
						{
							url: '',
							value: title,
							type,
						},
					]);
					this.requestData()([this.apiList['三色指挥']], 0);
				},
				hide: function (data) {},
			},
		},
		网格船舶弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [560, 328],
			position2: [24, 328],
			actions: {},
			listener: {
				show: ({ grid }) => {
					this.cache.currentDialog = '网格船舶弹窗';
					if (!grid) {
						const { value: current } = this.Com('网格select').curSelectValue;
						grid = current;
					}
					const name = grid === 'all' ? '全部' : `${grid}号`;
					stage.get('main-title_vSsgu').render([
						{
							url: '',
							value: `${name}网格`,
						},
					]);
				},
				hide: function (data) {
					this.cache.currentDialog = '';

					this.toggleMapLayer('图层_执法网格_高亮', false);
				},
			},
		},
		全链跟踪_时效提醒弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 253],
			actions: {},
			listener: {
				show: () => {
					console.log('全链跟踪_时效提醒弹窗');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com(`${this.cache.currentFullChainFlipper}_active`).hide();
					this.cache.currentFullChainFlipper = '';
				},
			},
		},
		全链跟踪_监督反馈弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 253],
			actions: {},
			listener: {
				show: () => {},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com(`${this.cache.currentFullChainFlipper}_active`).hide();
					this.cache.currentFullChainFlipper = '';
				},
			},
		},
		全链跟踪_考核考评弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 253],
			actions: {},
			listener: {
				show: () => {},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com(`${this.cache.currentFullChainFlipper}_active`).hide();
					this.cache.currentFullChainFlipper = '';
				},
			},
		},
		全链跟踪_结果晾晒弹窗: {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 253],
			actions: {},
			listener: {
				show: () => {},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com(`${this.cache.currentFullChainFlipper}_active`).hide();
					this.cache.currentFullChainFlipper = '';
				},
			},
		},
		'跨海大桥-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '跨海大桥-弹窗';
					const fieldsMap = {
						bridgeName: 'SA0ro',
						throughDate: 'dln16',
						length: 'D2Ekb',
						lanes: 'Y4KxB',
						speed: 'm19P4',
						tonnage: 'Tzq3r',
					};
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] ? data[key] : '----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'锚地-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '锚地-弹窗';
					const fieldsMap = {
						name: 'main-title_iQivG',
						usefor: 'marquee_KQYPT',
						area: 'main-title_0EPBS',
						depth: 'main-title_oFCop',
						tonnage: 'main-title_8lboW',
					};
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(fieldsMap[key]).render([
							{
								value: data[key] ? data[key] : '----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'航道-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '航道-弹窗';
					const fieldsMap = {
						name: '2GuOG',
						length: 'ttZVW',
						width: 'LoQMC',
						depth: '6KK8R',
						tonnage: '5V6XK',
					};
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] ? data[key] : '----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'电缆-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '电缆-弹窗';
					const fieldsMap = {
						name: 'hHyOl',
						hldy: 'yhfa8',
						hlqd: 'gXAKy',
						hlzd: 'Fkj0R',
					};
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] ? data[key] : '-----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'管线-弹窗': {
			type: 'dialog',
			animation: ['fade-in', 'hides'],
			position: [937, 312],
			actions: {},
			listener: {
				show: (data) => {
					this.cache.currentDialog = '管线-弹窗';
					const fieldsMap = {
						name: 'oy4uQ',
						type: 'SYgiW',
					};
					Object.keys(fieldsMap).forEach((key) => {
						stage.get(`main-title_${fieldsMap[key]}`).render([
							{
								value: data[key] ? data[key] : '-----',
							},
						]);
					});
				},
				hide: function (data) {},
			},
		},
		'指挥-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [0, -45],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '指挥-弹窗';
					this.Com('指挥按钮-active').show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.clearColorfulProcess();
					this.Com('指挥按钮-active').hide();
				},
			},
		},
		'雷达动画-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [647, 278],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '雷达动画-弹窗';
					this.setMapView(122.673373, 30.206651, 13);

					this.Com('情景再现-active').show();
					// this.Com('雷达-视频').hide()
					// this.Com('雷达-文字').hide()
					this.Com('雷达-内容').hide();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('情景再现-active').hide();
				},
			},
		},
		'雷达动画-弹窗2': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [647, 278],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '雷达动画-弹窗2';
					this.setMapView(122.673659, 29.996678, 10.5);
					this.Com('情景再现-active').show();
					this.Com('雷达-内容2').hide();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('情景再现-active').hide();
				},
			},
		},
		'周边信息-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1186, 808],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '周边信息-弹窗';
					this.handleTmpDialogInfo('周边信息');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'周边执法力量-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1186, 930],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '周边执法力量-弹窗';
					this.handleTmpDialogInfo('周边执法力量');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'刑行-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1832, 112],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '刑行-弹窗';
					this.handleTmpDialogInfo('刑行');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'快响-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1684, 104],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '快响-弹窗';
					this.handleTmpDialogInfo('快响');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'执法-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1831, 112],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '执法-弹窗';
					this.handleTmpDialogInfo('执法');
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'派遣-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1691, 118],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '派遣-弹窗';
					this.handleTmpDialogInfo('派遣');
					this.Com('派遣-active').show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('派遣-active').hide();
				},
			},
		},
		'拦截-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1691, 118],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '拦截-弹窗';
					this.handleTmpDialogInfo('拦截');
					this.Com('拦截-active').show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('拦截-active').hide();
				},
			},
		},
		'船舵-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [847, 322],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '船舵-弹窗';
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		'现场连线-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1691, 118],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '现场连线-弹窗';
					this.handleTmpDialogInfo('现场连线');
					this.Com('现场连线-active').show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('现场连线-active').hide();
				},
			},
		},
		'锚泊-弹窗': {
			type: 'dialog',
			animation: ['show1', 'hides'],
			position: [1691, 118],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '锚泊-弹窗';
					this.handleTmpDialogInfo('锚泊');
					this.Com('锚泊-active').show();
				},
				hide: function (data) {
					this.cache.currentDialog = '';
					this.Com('锚泊-active').hide();
				},
			},
		},
		'区域风险-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [956, 400],
			actions: {},
			listener: {
				show: () => {
					this.cache.currentDialog = '区域风险-弹窗';
					const values = [40, 43, 45, 47, 45, 46, 46];
					const data = [];
					values.forEach((value, index) => {
						data.push({
							x: this.Utils.moment()
								.subtract(7 - index, 'days')
								.format('DD'),
							y: value,
							s: '系列1',
						});
					});
					stage.get('@echarts_echarts-line-category_LqhuQ').render(data);
				},
				hide: function (data) {
					this.cache.currentDialog = '';
				},
			},
		},
		登录页: {
			type: 'dialog',
			animation: ['slide-in-top', 'slide-out-top'],
			position: [0, 0],
			actions: {},
			listener: {
				show: () => {
					this.proxyBE.isLoginExpire = false;
					this.qrCodeEventListener(true);
					this.Com('二维码iframe').render([
						{
							url: this.constants.QR_CODE_SITE,
						},
					]);
				},
				hide: function (data) {
					this.Com('二维码iframe').render([
						{
							url: '',
						},
					]);
					this.qrCodeEventListener(false);
					if (!this.checkLogin()) this.panelManager.toggleDialog(['登录页'], true);
				},
			},
		},
		'行刑共治_提前介入-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [0, 0],
			actions: {},
			listener: {
				show: (e) => {
					const prefix = '行刑共治_提前介入-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.cache.currentDialog = `行刑共治_${e.label}-弹窗`;
				},
				hide: () => {
					console.log('hide 行刑共治_提前介入');
					const prefix = '行刑共治_提前介入-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.Com('行刑共治').render(
						this.Com('行刑共治')._data.map((o) =>
							Object.assign(o, {
								active: false,
							})
						)
					);
					this.cache.currentDialog = '';
				},
			},
		},
		'行刑共治_立案监督-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [0, 0],
			actions: {},
			listener: {
				show: (e) => {
					const prefix = '行刑共治_立案监督-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.cache.currentDialog = `行刑共治_${e.label}-弹窗`;
				},
				hide: () => {
					const prefix = '行刑共治_立案监督-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.Com('行刑共治').render(
						this.Com('行刑共治')._data.map((o) =>
							Object.assign(o, {
								active: false,
							})
						)
					);
					this.cache.currentDialog = '';
				},
			},
		},
		'行刑共治_线索移送-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [0, 0],
			actions: {},
			listener: {
				show: (e) => {
					console.log('----------show');
					const prefix = '行刑共治_线索移送-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.cache.currentDialog = `行刑共治_${e.label}-弹窗`;
				},
				hide: () => {
					console.log('----------show');
					const prefix = '行刑共治_线索移送-弹窗';
					this.Com(`${prefix}_流程图`).hide();
					this.Com(`${prefix}_流程图on`).hide();
					this.Com(`${prefix}_详情`).hide();
					this.Com('行刑共治').render(
						this.Com('行刑共治')._data.map((o) =>
							Object.assign(o, {
								active: false,
							})
						)
					);
					this.cache.currentDialog = '';
				},
			},
		},
		'执法船监控-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [776, 196],
			actions: {},
			listener: {
				show: (data) => {
					console.log('执法船监控-弹窗', 'show');
					this.cache.shipDialog.showVideo = true;
					const { forceShipCamIdx } = this.cache.shipDialog;
					const playURL = data[forceShipCamIdx]
						? data[forceShipCamIdx].cameraLive
						: data[0].cameraLive;
					const { inst } = this.hkPlugin;
					inst
						.JS_Play(
							playURL,
							{
								playURL,
								mode: 0, // 解码类型：0=普通模式，1=高级模式，默认为 0
							},
							this.iWind
						)
						.then(
							(res) => {
								console.log(res, '播放成功');
							},
							(err) => {
								console.log(err, '播放失败');
								this.showMsg('播放失败, 请重新尝试', 'error');
								this.panelManager.toggleDialog(['执法船监控-弹窗'], false);
							}
						);
				},
				hide: () => {
					this.Com('执法船监控-弹窗_标题').render([
						{
							value: `执法船监控视频`,
						},
					]);
					this.setTabActive('执法船监控tab');
					const { inst } = this.hkPlugin;
					inst.JS_StopRealPlayAll().then(
						() => {
							console.info('JS_StopRealPlayAll success');
							this.cache.shipDialog.showVideo = false;
						},
						(err) => {
							console.info('JS_StopRealPlayAll failed');
							this.cache.shipDialog.showVideo = false;
						}
					);
				},
			},
		},
		'船舶轨迹-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [590, 180],
			actions: {},
			listener: {
				show: ({ shipname }) => {
					this.cache.currentDialog = '船舶轨迹-弹窗';
					const { occur_time } = this.pageIns.public.clue.clue_detail;
					let url = `${this.constants.WORK_SYS}/trace?`;
					url += `time=${occur_time}`;
					url += `&shipname=${shipname}`;

					const cpn = this.Com('船舶轨迹-弹窗_iframe');
					cpn.render([
						{
							url,
						},
					]);
					cpn.show();
				},
				hide: () => {
					this.cache.currentDialog = '';
					this.Com('船舶轨迹-弹窗_iframe').hide();
				},
			},
		},
		'行刑共治-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [878, 310],
			actions: {},
			listener: {
				show: (data) => {
					console.log('d', data);
					this.cache.currentDialog = '行刑共治-弹窗';
					this.apiList['行刑共治列表'].options.data.turnover_type = data.label;
					this.Com('行刑共治-弹窗_标题').render([
						{
							value: data.label,
						},
					]);
					this.requestData()([this.apiList['行刑共治列表']], 0);
				},
				hide: () => {
					this.cache.currentDialog = '';
					this.Com('行刑共治').render(
						this.Com('行刑共治')._data.map((o) =>
							Object.assign(o, {
								active: false,
							})
						)
					);
				},
			},
		},
		'案件现场图片-弹窗': {
			type: 'dialog',
			animation: ['show', 'hides'],
			position: [622, 180],
			actions: {},
			listener: {
				show: ({ url, title }) => {
					this.cache.currentDialog = '案件现场图片-弹窗';
					this.Com('案件现场图片-弹窗_标题').render([{ value: title }]);
					const cpn = this.Com('案件现场图片-弹窗_iframe');
					cpn.render([
						{
							img: url,
						},
					]);
					cpn.show();
				},
				hide: () => {
					this.cache.currentDialog = '';
					this.Com('案件现场图片-弹窗_iframe').hide();
					this.Com('案件现场图片-弹窗_标题').render([{ value: '' }]);
				},
			},
		},
	},
};
