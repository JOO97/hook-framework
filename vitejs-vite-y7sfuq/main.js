import { setupCounter } from './counter.js';

const tool = (window.tool = stage
  .get('@Snxun_datav_sn-cp-tools_OTVf8')
  .hook(stage));

window.Stage = stage;
window.G = stage.get;
window.ENV = 'dev';
const { Comm, Widget } = tool;

console.log('----utils', setupCounter);

class HookManager extends Comm {
  constructor() {
    super();

    this.components = {
      浮框层: 'map3d-earth-floatboard_gFnyw',
    };
    this.layers = {
      compose: {},
      list: {},
    };
    this.apiList = {};
    this.constants = {};
    this.enum = {};
    this.cache = {};
  }

  /* 初始化 */
  init() {
    console.log('-----test');
  }
}

setTimeout(() => {
  const hookManager = new HookManager();
  window.HM = hookManager;
  hookManager.init();
}, 500);
