import { Vue } from 'vue-property-decorator';
import { Layout, ValueXY } from '../utils/types';
export default class ViewMask extends Vue {
    private points;
    size: ValueXY;
    position: ValueXY;
    layout: Layout;
    easing: Function;
    animationDuration: number;
    animated: boolean;
    overlayColor: string;
    wholePage: boolean;
    onPositionChanged(): void;
    onSizeChanged(): void;
    setupAnimation(animationDuration: any, position?: any, size?: any): void;
    readonly computedHighlightBox: object;
    private animate;
    private absorbTap;
}
