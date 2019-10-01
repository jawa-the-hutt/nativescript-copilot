import { Vue } from 'vue-property-decorator';
import { Step, Layout, ArrowPosition, TooltipPosition } from '../utils/types';
export default class Tooltip extends Vue {
    handleNext: Function;
    handlePrev: Function;
    handleStop: Function;
    currentStep: Step;
    labels: object;
    tooltipStyle: object;
    tooltipPosition: TooltipPosition;
    layout: Layout;
    tooltipMargin: number;
    arrowClipPath: string;
    arrow: ArrowPosition;
    backgroundColor: string;
    private gridLoaded;
    readonly computedTooltipStyle: object;
    readonly computedTooltip: TooltipPosition;
    readonly computedArrow: ArrowPosition;
    readonly computedArrowStyle: object;
    readonly computedTopGridRows: string;
}
