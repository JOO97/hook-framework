export default function (data) {
	return new Proxy(data, {
		get(target, key) {
			return target[key];
		},
		set(target, key, value) {
			return Reflect.set(target, key, value);
		},
	});
}
