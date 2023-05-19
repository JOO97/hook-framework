export default {
	compose: {},
	list: {
		登录页: {
			type: 'dialog',
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
