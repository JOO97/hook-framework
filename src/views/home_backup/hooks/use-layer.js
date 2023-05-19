import PanelManager from '@/utils/dev-tools/PanelManager';

const useLayerManager = ({ bind, layers }) => {
	const panelManager = new PanelManager(bind, layers);
	return { panelManager };
};

export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
