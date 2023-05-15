import * as C from '../config/components';

export default (H) => {
	console.log('events', H);
	H.Com(C.tab).on('click', (e) => {
		console.log('e', e);
	});
};
