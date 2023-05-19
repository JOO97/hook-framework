import Comm from '@/utils/dev-tools/Comm';

import useLayers from './use-layer';
import eventsHook from './use-event';
import components from '../config/components';

export default async function (stage) {
	const _this = new Comm(stage);
	const { panelManager } = useLayers({
		bind: _this,
		layers: {
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
			},
			list: {
				'全域感知_左_全域感知-面板': {
					type: 'panel',
					animation: ['slide-in-left', 'slide-out-left'],
					position: [24, 115],
				},
				线索列表弹窗: {
					type: 'dialog',
					animation: ['show', 'hides'],
					position: [568, 382],
					actions: {},
					listener: {
						show: () => {},
						hide: () => {},
					},
				},
			},
		},
	});

	eventsHook({ bind: _this });
}
