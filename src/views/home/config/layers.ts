const layers: ILayers = {
	compose: {
		态势感知: {
			delay: 0,
			layout: { left: [], right: [], top: [], bottom: [] },
		},
	},
	list: {
		登录页: {
			type: LayerType.Dialog,
			animation: ['slide-in-top', 'slide-out-top'],
			position: [0, 0],
			actions: {},
			listener: {
				show: function () {
					this.cache.isLoginExpire = false;
				},
				hide: function () {
					if (!this.checkLogin()) this.panelManager.toggleDialog(['登录页'], true);
				},
			},
		},
	},
};

export default layers;
