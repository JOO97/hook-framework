export const isFunction = (val) => typeof val === 'function';
export const isPromise = (val) => {
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
export const isObject = (val) => val !== null && typeof val === 'object';
export const EMPTY_OBJ = {};
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
export function reactive(data) {
	return new Proxy(data, {
		get(target, key) {
			return target[key];
		},
		set(target, key, value) {
			return Reflect.set(target, key, value);
		},
	});
}

export const isReservedPrefix = (key) => key === '_' || key === '$';
export const NOOP = () => {};
export const isArray = Array.isArray;
