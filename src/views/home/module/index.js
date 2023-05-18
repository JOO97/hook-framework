import Comm from '@/utils/';
import components from '../config/components';

// Comm PanelManager SceneManager
export default {
	mixins: [],
	data() {
		return {
			components,
			name: '',
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {},
	},
};

function getName() {
	console.log('getName', this);
}

class C {
	constructor() {}
	getName = getName;
}

new C().getName();
