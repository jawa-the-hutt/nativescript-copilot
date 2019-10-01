import { VueConstructor, PluginFunction } from 'vue';
import CopilotModal from './components/CopilotModal.vue';
import { Step } from './utils/types';

type ErrorHandler = (err: Error) => void;

export async function install(Vue: VueConstructor, options: any) {

  if(install.installed) {
    console.log('not installed')
    return;
  } else {

    install.installed = true;
    Vue.component('Copilot', CopilotModal);
  }

};

class Copilot {
  static install: PluginFunction<never>;
}

export namespace install {
  export let installed: boolean;
}

export {
  Step
}

Copilot.install = install;

// To auto-install when vue is found
/* global window global */
let GlobalVue!: VueConstructor;
if (typeof window !== "undefined" && typeof (window as any).Vue !== 'undefined') {
  GlobalVue = (window as any).Vue;
} else if (typeof global !== "undefined" && typeof global['Vue'] !== 'undefined') {
  GlobalVue = global['Vue'];
}
if (GlobalVue) {
  GlobalVue.use(Copilot);
}

export default Copilot;

