import { createHookInstance } from './core/HookController';

// 样式表
import '@/assets/public.css';
import '@/assets/public2.css';

const tool = stage.get('@Snxun_datav_sn-cp-tools_DFCVP').hook(stage);

// if (!stage);
// useInit(stage);
createHookInstance(tool).init();
