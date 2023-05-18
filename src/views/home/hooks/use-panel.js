// import PanelManager from '@/utils/dev-tools/PanelManager';

export default function usePanelManager({ PanelManager }) {
	if (!this.layers) return console.warn('xxxx');
	return new PanelManager(this, this.layers);
}
