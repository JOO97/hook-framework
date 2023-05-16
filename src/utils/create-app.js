export const createHookInstance = function (hook) {
	const instance = {
		uid: 0,
		type: hook,
		proxy: null,
		ctx: {},
		data: {},
		isMounted: false,
	};

	instance.ctx = createDevRenderContext(instance);

	instance.proxy = Object.defineProperty(
		new Proxy(instance.ctx, PublicInstanceProxyHandlers),
		'__skip',
		{
			configurable: true,
			enumerable: false,
			value: true,
		}
	);
	console.log('----instance', instance);

	applyOptions(instance);
};

export const PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		const { ctx, data } = instance;
		if (data !== EMPTY_OBJ && hasOwn(data, key)) return data[key];
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) return ctx[key];
	},
	set({ _: instance }, key, value) {
		const { data, ctx } = instance;
		if (data !== EMPTY_OBJ && hasOwn(data, key)) data[key] = value;
		else ctx[key] = value;
		return true;
	},

	has({ _: { data, ctx } }, key) {
		return (data !== EMPTY_OBJ && hasOwn(data, key)) || hasOwn(ctx, key);
	},

	defineProperty(target, key, descriptor) {
		// if (descriptor.get != null) {
		//   // invalidate key cache of a getter based property #5417
		//   target._.accessCache![key] = 0
		// } else if (hasOwn(descriptor, 'value')) {
		//   this.set(target, key, descriptor.value, null)
		// }
		return Reflect.defineProperty(target, key, descriptor);
	},
};

export function createDevRenderContext(instance) {
	const target = {};

	Object.defineProperty(target, `_`, {
		configurable: true,
		enumerable: false,
		get: () => instance,
	});

	// Object.keys(publicPropertiesMap).forEach((key) => {
	// 	Object.defineProperty(target, key, {
	// 		configurable: true,
	// 		enumerable: false,
	// 		get: () => publicPropertiesMap[key](instance),
	// 		set: NOOP,
	// 	});
	// });

	return target;
}

function createDuplicateChecker() {
	const cache = Object.create(null);
	return (type, key) => {
		if (cache[key]) {
			console.warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
		} else {
			cache[key] = type;
		}
	};
}
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

function callHook(hook, instance, type) {
	callWithAsyncErrorHandling(
		isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
		instance,
		type
	);
}

export function callWithAsyncErrorHandling(fn, instance, type, args) {
	if (isFunction(fn)) {
		const res = callWithErrorHandling(fn, instance, type, args);
		if (res && isPromise(res)) {
			// res.catch((err) => {
			// 	console.log('callWithAsyncErrorHandling err', err);
			// 	// handleError(err, instance, type);
			// });
		}
		return res;
	}

	const values = [];
	for (let i = 0; i < fn.length; i++) {
		values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
	}
	return values;
}

export function callWithErrorHandling(fn, instance, type, args) {
	let res;
	try {
		res = args ? fn(...args) : fn();
	} catch (err) {
		console.log('callWithErrorHandling err', err);
	}
	return res;
}

export function resolveMergedOptions(instance) {
	const base = instance.type;
	// const { mixins, extends: extendsOptions } = base;
	//   const {
	//     mixins: globalMixins,
	//     optionsCache: cache,
	//     config: { optionMergeStrategies }
	//   } = instance.appContext
	// const cached = cache.get(base);

	let resolved = base;

	// if (cached) {
	// 	resolved = cached;
	// } else if (!globalMixins.length && !mixins && !extendsOptions) {
	// 	if (__COMPAT__ && isCompatEnabled(DeprecationTypes.PRIVATE_APIS, instance)) {
	// 		resolved = extend({}, base);
	// 		resolved.parent = instance.parent && instance.parent.proxy;
	// 		resolved.propsData = instance.vnode.props;
	// 	} else {
	// 		resolved = base;
	// 	}
	// } else {
	// 	resolved = {};
	// 	if (globalMixins.length) {
	// 		globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
	// 	}
	// 	mergeOptions(resolved, base, optionMergeStrategies);
	// }
	// if (isObject(base)) {
	// 	cache.set(base, resolved);
	// }

	return resolved;
}

export function applyOptions(instance) {
	try {
		const options = resolveMergedOptions(instance);
		console.log('-options', options);
		const publicThis = instance.proxy;
		const ctx = instance.ctx;

		const { data: dataOptions, methods, mounted } = options;

		const checkDuplicateProperties = createDuplicateChecker();

		// options initialization order (to be consistent with Vue 2):
		// - props (already done outside of this function)
		// - inject
		// - methods
		// - data (deferred since it relies on `this` access)
		// - computed
		// - watch (deferred since it relies on `this` access)

		//   if (injectOptions) {
		//     resolveInjections(injectOptions, ctx, checkDuplicateProperties)
		//   }

		//methods
		if (methods) {
			for (const key in methods) {
				const methodHandler = methods[key];
				if (isFunction(methodHandler)) {
					// In dev mode, we use the `createRenderContext` function to define
					// methods to the proxy target, and those are read-only but
					// reconfigurable, so it needs to be redefined here
					Object.defineProperty(ctx, key, {
						value: methodHandler.bind(publicThis),
						configurable: true,
						enumerable: true,
						writable: true,
					});
					checkDuplicateProperties('methods', key);
				} else {
					console.warn(
						`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` +
							`Did you reference the function correctly?`
					);
				}
			}
		}

		//data
		if (dataOptions) {
			if (!isFunction(dataOptions)) {
				console.warn(
					`The data option must be a function. ` + `Plain object usage is no longer supported.`
				);
			}
			const data = dataOptions.call(publicThis, publicThis);
			if (isPromise(data)) {
				console.warn(
					`data() returned a Promise - note data() cannot be async; If you ` +
						`intend to perform data fetching before component renders, use ` +
						`async setup() + <Suspense>.`
				);
			}
			if (!isObject(data)) {
				console.warn(`data() should return an object.`);
			} else {
				instance.data = reactive(data);
				for (const key in data) {
					checkDuplicateProperties('data', key);
					if (!isReservedPrefix(key[0])) {
						Object.defineProperty(ctx, key, {
							configurable: true,
							enumerable: true,
							get: () => data[key],
							set: NOOP,
						});
					}
				}
			}
		}
		if (mounted) {
			callHook(mounted, instance, 'mounted');
		}
	} catch (error) {
		console.log('-error', error);
	}
}
