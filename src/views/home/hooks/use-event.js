import * as C from '../config/components';

export default function () {
	this.Com(C.浮框层).on('click', (e) => {
		console.log('e', e);
	});
}
