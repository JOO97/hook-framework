export default {
	100: {
		name: '场景一',
		mounted: {
			/**
			 *  离开场景前
			 */
			beforeLeaveScene: function () {
				return new Promise((resolve, reject) => {
					const t = setTimeout(() => {
						console.log(`离开【${this.name}】前，延迟1秒作业`, this);
						resolve(true); // 注意：异步调用，一定需要返回事
					}, 1000);
				});
			},
			/**
			 *  离开场景后
			 */
			afterLeaveScene: function () {
				return new Promise((resolve, reject) => {
					const t = setTimeout(() => {
						console.log(`离开【${this.name}】后，延迟1秒作业`, this);
						resolve(true);
					}, 1000);
					//  this.timer.push(t)
				});
			},
			/**
			 *  进入场景前
			 */
			beforeEnterScene: function () {
				console.log(`进入【${this.name}】前，延迟5秒作业`, this);
				// 测试延迟时间
				return new Promise((resolve, reject) => {
					const t = setTimeout(() => {
						resolve({
							params: {
								say: '我是从上一个节点传递过来的参数值',
							},
						});
					}, 5000);
				});
			},
			/**
			 *  进入场景中
			 */
			enterScene: function (data) {
				console.log(`进入【${this.name}】中`, this, data);
			},
			/**
			 *  再次进入场景中
			 */
			reEnter: function () {
				self.log(`重新进入【${this.name}】场景...............`, 'error');
			},
		},
	},
};
