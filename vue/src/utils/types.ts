
export type Step = {
  name: string;
  text: string;
  order: number;
  // visible: boolean;
  target: any;
  animated?: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  darkenWholePage?: boolean;
  verticalOffset?: number;
  showNumber?: boolean;
  numberAccentColor?: string;
  numberBackgroundColor?: string;
  isCustom?: boolean;
  customBackgroundColor?: string;
  customBorderRadius?: string;
  itemTemplate?: string;
  customTooltipStyle?: object;
  customLabels?: object;
  highlightBorderRadius?: number;
  highlightPadding?: number;

};

export type ValueXY = {
  x: number;
  y: number;
};

export type Layout = {
  width: number;
  height: number;
}

export type ArrowPosition = {
  width: number;
  height: number;
  location: string;
  left: number | string;
  top: number | string;
  right: number | string;
  bottom: number | string;
}

export type TooltipPosition = {
  left: number | string;
  top: number | string;
  right: number | string;
  bottom: number | string;
  middle: number | string;
  alignment: string;
}

export type Points = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type ViewLocationProperties = {
  width: number;
  height: number;
  left: number;
  top: number;
}
