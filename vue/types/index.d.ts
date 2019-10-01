import { VueConstructor, PluginFunction } from 'vue';
import { Step } from './utils/types';
export declare function install(Vue: VueConstructor, options: any): Promise<void>;
declare class Copilot {
    static install: PluginFunction<never>;
}
export declare namespace install {
    let installed: boolean;
}
export { Step };
export default Copilot;
