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
    toolTipBorderRadius: string;
    private gridLoaded;
    onCurrentStepChange(): void;
    readonly computedTooltipStyle: object;
    readonly computedTooltip: TooltipPosition;
    readonly computedArrow: ArrowPosition;
    readonly computedArrowStyle: object;
    readonly computedBackgroundColor: string;
    readonly computedBorderRadius: string;
    readonly computedTopGridRows: string;
}
