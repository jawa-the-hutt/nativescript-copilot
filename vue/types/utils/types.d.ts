export declare type Step = {
    name: string;
    text: string;
    order: number;
    target: any;
    animated?: boolean;
    isFirstStep?: boolean;
    isLastStep?: boolean;
    darkenWholePage?: boolean;
    verticalOffset?: number;
};
export declare type ValueXY = {
    x: number;
    y: number;
};
export declare type Layout = {
    width: number;
    height: number;
};
export declare type ArrowPosition = {
    width: number;
    height: number;
    location: string;
    left: number | string;
    top: number | string;
    right: number | string;
    bottom: number | string;
};
export declare type TooltipPosition = {
    left: number | string;
    top: number | string;
    right: number | string;
    bottom: number | string;
    middle: number | string;
    alignment: string;
};
export declare type Points = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare type ViewLocationProperties = {
    width: number;
    height: number;
    left: number;
    top: number;
};
