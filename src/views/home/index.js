// import HookManager from './core/index';
import Comm from '@/utils/dev-tools/Comm';
import PanelManager from '@/utils/dev-tools/PanelManager';

import eventsHook from './hooks/events';
import components from './config/components';
import data from './data';

import '@/assets/public';

if (!stage) return;

// const HM = new Comm({ stage, components });
// const LM = new PanelManager({ stage, layers });
// const proxy = data({
// 	userInfo: null,
// });

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
