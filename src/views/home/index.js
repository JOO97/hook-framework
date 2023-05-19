import { createHookInstance } from './core/HookController';

// 样式表
import '@/assets/style/public.css';
import '@/assets/style/public2.css';

// TODO 通过npm引入工具包
const tool = stage.get('@Snxun_datav_sn-cp-tools_DFCVP').hook(stage);

const hookController = createHookInstance(tool);
setTimeout(() => hookController.init(), 2000);
