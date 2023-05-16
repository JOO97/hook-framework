import * as C from '../config/components';

export default ({ bind }) => {
	console.log('events', bind);
	H.Com(C.tab).on('click', (e) => {
		console.log('e', e);
	});
};
