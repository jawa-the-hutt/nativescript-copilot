<template>
  <StackLayout :marginLeft="tooltipMargin" :marginRight="tooltipMargin">
    <Gridlayout :rows="computedTopGridRows" 
      :columns="`${computedTooltip.middle}`"  :horizontalAlignment="computedTooltip.alignment"
      backgroundColor="rgba(0,0,0,0)" :key="computedTooltip.middle">
      <!-- Arrow XML -->
      <Gridlayout v-show="!currentStep.darkenWholePage" :row="`${computedArrow.location === 'top' ? '1' : '2'}`" col="0" 
        :rows="`${computedArrow.height}`" 
        :columns="`${computedArrow.width}`"  
        :marginLeft="computedArrow.left" :marginRight="computedArrow.right"
        :horizontalAlignment="computedTooltip.alignment">
        <Label :width="computedArrow.width" :height="computedArrow.height" :style="computedArrowStyle" :backgroundColor="computedBackgroundColor" />
      </Gridlayout>
      <!-- End of Arrow XML -->
      <!-- Tool Tipbox XML -->
      <Gridlayout ref="grid" :row="`${computedArrow.location === 'top' ? '2' : '1'}`" col="0" rows="auto, auto" :columns="`${computedTooltip.middle}`" 
        :marginLeft="computedTooltip.left" :marginRight="computedTooltip.right"
        @layoutChanged="gridLoaded()" :key="computedTooltip.middle" 
        :backgroundColor="computedBackgroundColor" paddingTop="15" paddingLeft="15" paddingRight="15" paddingBottom="5" :borderRadius="computedBorderRadius"
      >
        <StackLayout row="0" col="0" v-show="currentStep && currentStep.isCustom">
          <StackLayout @loaded="onCurrentStepChange()" ref="custom">
            <!-- Empty template, later adding custom template if used -->
          </StackLayout>
        </StackLayout>
        <!-- default template -->
        <StackLayout row="0" col="0" v-show="!currentStep.isCustom">
          <Label :text="currentStep.text" textWrap="true" :fontSize="computedTooltipStyle.tooltipFontSize" :color="computedTooltipStyle.tooltipTextColor" :fontFamily="computedTooltipStyle.fontFamily"/>
        </StackLayout>
        <GridLayout row="1" col="0" rows="*" columns="auto, auto, auto" marginTop="10" horizontalAlignment="right" >
          <StackLayout v-if="!currentStep.isLastStep" col="0" @tap="handleStop()" marginLeft="7" marginRight="7" >
            <Label :text="labels.skip || 'Skip'" :fontSize="computedTooltipStyle.buttonFontSize" :color="computedTooltipStyle.accentColor" :fontFamily="computedTooltipStyle.fontFamily"/>
          </StackLayout>
          <StackLayout v-if="!currentStep.isFirstStep" col="1" @tap="handlePrev()" marginLeft="7" marginRight="7" >
            <Label :text="labels.previous || 'Previous'" :fontSize="computedTooltipStyle.buttonFontSize" :color="computedTooltipStyle.accentColor" :fontFamily="computedTooltipStyle.fontFamily" />
          </StackLayout>
          <StackLayout v-if="!currentStep.isLastStep" col="2" @tap="handleNext()" marginLeft="7" marginRight="7" >
            <Label :text="labels.next || 'Next'" :fontSize="computedTooltipStyle.buttonFontSize" :color="computedTooltipStyle.accentColor" :fontFamily="computedTooltipStyle.fontFamily"/>
          </StackLayout>    
          <StackLayout v-if="currentStep.isLastStep" col="2"  @tap="handleStop()" marginLeft="7" marginRight="7" >
            <Label :text="labels.finish || 'Finish'" :fontSize="computedTooltipStyle.buttonFontSize" :color="computedTooltipStyle.accentColor" :fontFamily="computedTooltipStyle.fontFamily"/>
          </StackLayout>      
        </Gridlayout>
      </Gridlayout>
      <!-- End of Tool Tipbox XML -->
    </Gridlayout>
  </StackLayout>

</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { Step, Layout, ArrowPosition, TooltipPosition } from '../utils/types';
  import * as builder from "tns-core-modules/ui/builder";

  @Component({
    name: 'tooltip',
  })
  export default class Tooltip extends Vue {
    @Prop() public handleNext!: Function;
    @Prop() public handlePrev!: Function;
    @Prop() public handleStop!: Function;
    @Prop() public currentStep!: Step;
    @Prop() public labels!: object; 
    @Prop() public tooltipStyle!: object; 
    @Prop() public tooltipPosition!: TooltipPosition; 
    @Prop() public layout!: Layout;
    @Prop({ default: 13}) public tooltipMargin!: number;
    @Prop() public arrowClipPath!: string; 
    @Prop() public arrow!: ArrowPosition; 
    @Prop({ default: 'white' }) public backgroundColor!: string;
    @Prop({ default: '3' }) public toolTipBorderRadius!: string;

    // this function solves an issue with the grid not auto-sizing a column correctly if the contents of the column 
    // are larger than the width of the screen.  In the event this happens, we change the column to '*' so that
    // it will resize appropriately
    private gridLoaded(): void {
      // @ts-ignore
      const grid = this.$refs.grid.nativeView;
      const gridWidth = grid.getActualSize().width;

      if((gridWidth > this.layout.width)) {
        const tooltip: TooltipPosition = {...this.tooltipPosition};
        tooltip.left = this.tooltipMargin;
        tooltip.right = this.tooltipMargin;
        tooltip.middle = '*';

        this.tooltipPosition = tooltip;
      }

      if (this.currentStep.darkenWholePage && this.currentStep.darkenWholePage === true) {
        const tooltip: TooltipPosition = {...this.tooltipPosition};
        tooltip.left = 'auto';
        tooltip.right = 'auto';
        tooltip.middle = '*';

        this.tooltipPosition = tooltip;
      }

    }


    

    @Watch('currentStep')
    onCurrentStepChange(): void {
      // check to see if there is a custom component active
      if (this.currentStep.isCustom) {
        //check for item template, otherwise, warn in console
        if (this.currentStep.itemTemplate) {
          //@ts-ignore
          let stack = this.$refs.custom.nativeView;
          stack.removeChildren();
          // console.log('Building template');
          let xml = this.currentStep.itemTemplate;
          let component;
          // try to parse the itemTemplate string into a component, if fails, warn in console
          try {
            component = builder.parse(xml);
            stack.addChild(component);
          } catch (e) {
            console.log('nativescript-copilot - error - invalid custom layout, unable to parse');
            console.log(e.message);
          }
        }
      } else {
        //@ts-ignore
        let stack = this.$refs.custom.nativeView;
        stack.removeChildren();
      }
    }

    get computedTooltipStyle(): object {
      return this.tooltipStyle;
    }

    get computedTooltip(): TooltipPosition {
      return this.tooltipPosition
    }

    get computedArrow(): ArrowPosition {
      return this.arrow
    }

    // set the shape/size/location of the tooltip arrow
    get computedArrowStyle(): object {
      return {
        'clip-path': this.arrowClipPath
      }
    }

    get computedBackgroundColor(): string {
      // decided between the default or by step
      if (this.currentStep.customBackgroundColor) {
        return this.currentStep.customBackgroundColor;
      } else {
        return this.backgroundColor;
      }
    }

    get computedBorderRadius(): string {
      // decided between the default or by step
      if (this.currentStep.customBorderRadius) {
        return this.currentStep.customBorderRadius;
      } else {
        return this.toolTipBorderRadius;
      }
    }

    // dynamically determine if the arrow is on top or bottom and then setup the grid rows/columns appropriately
    get computedTopGridRows(): string {
      let str = '';

      if(this.computedArrow.location === 'top') {
        str = `${this.computedTooltip.top}, ${this.computedArrow.height}, auto, ${this.computedTooltip.bottom}`;
      } else {
        str = `${this.computedTooltip.top}, auto, ${this.computedArrow.height}, ${this.computedTooltip.bottom}`;
      }

      return str;
    }
  }

</script>
<style lang="scss" scoped>
</style>
