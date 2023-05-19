import { getAisShip } from '@/api/tb';

export default async function () {
	const res = await getAisShip();
	console.log('res', res);
}
