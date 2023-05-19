export default function useProxy<T>(data) {
	return new Proxy(data, {
		get(target, key) {
			return target[key];
		},
		set(target, key, value) {
			return Reflect.set(target, key, value);
		},
	}) as T;
}
