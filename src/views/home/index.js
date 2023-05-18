// import HookManager from './core/index';
// import Comm from '@/utils/dev-tools/Comm';

// import useInit from './hooks/use-init';
// import data from './data';
import { createHookInstance } from '@/core/runtime/create-app';
import hook from './module/index';
import '@/assets/public.css';
import '@/assets/public2.css';

// if (!stage);
// useInit(stage);
createHookInstance(hook);

// const This = {
// 	...HM,
// 	...LM,
// 	proxy,
// };

// eventsHook(This);

/**
 * 1. props
 * 2. emit
 * 3. methods
 */

/**
 * 1. components
 * 2. layers
 * 3. cache/data
 * 4. methods
 */
