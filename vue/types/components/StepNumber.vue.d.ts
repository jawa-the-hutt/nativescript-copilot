import { Vue } from 'vue-property-decorator';
import { Layout, ValueXY, Points } from '../utils/types';
export default class StepNumber extends Vue {
    private points;
    private circleSize;
    size: ValueXY;
    position: ValueXY;
    layout: Layout;
    easing: Function;
    animationDuration: number;
    animated: boolean;
    accentColor: string;
    backgroundColor: string;
    stepNumber: string;
    safeArea: Points;
    numberFontFamilyStyle: string;
    onPositionChanged(): void;
    onSizeChanged(): void;
    setupAnimation(animationDuration: any, position?: any, size?: any): void;
    readonly computedPosition: object;
    private animate;
    readonly computedSafeArea: Points;
}
