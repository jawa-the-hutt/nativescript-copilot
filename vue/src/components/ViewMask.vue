<template>
    <Gridlayout @loaded="setupAnimation(1)" :rows="`${this.computedMaskLocation.top}, auto, *`" 
      :columns="`*, auto, ${computedMaskLocation.right}`" class="overlay" :horizontalAlignment="computedMask.alignment"
      backgroundColor="transparent">
      <!-- Start Highlight box -->
      <StackLayout row="1" col="1">
        <AbsoluteLayout :style="computedHighlightBox" :width="(points.right-points.left) + (highlightPadding * 2)" :height="(points.bottom-points.top) + (highlightPadding * 2)">
          <Gridlayout ref="grid" class="mask"
            @tap="$emit('highlight-tap')"
            @layoutChanged="gridLoaded()"
            :width="(points.right-points.left) + (highlightPadding * 2) + computedBorderWidth"
            :height="(points.bottom-points.top) + (highlightPadding * 2) + computedBorderWidth"
            :top="-(computedBorderWidth/2)" :left="-(computedBorderWidth/2)"
            :backgroundColor="'transparent'"  :borderColor="overlayColor" :borderRadius="computedRadius" :borderWidth="computedBorderWidth"
          />
        </AbsoluteLayout>
      </StackLayout>
      <!-- End of Highlight box -->
      <!-- Darkened overlay -->
      <StackLayout row="0" col="0" height="100%" width="100%" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="2" col="0" height="100%" width="100%" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="1" col="0" height="auto" width="auto" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="0" col="1" height="auto" width="auto" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="2" col="1" height="auto" width="auto" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="1" col="2" height="auto" width="auto" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="0" col="2" height="100%" width="100%" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <StackLayout row="2" col="2" height="100%" width="100%" @tap="absorbTap()" :backgroundColor="overlayColor"/>
      <!-- End Darkened overlay -->
    </Gridlayout>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { TWEEN } from 'nativescript-tweenjs';
  import { Layout, ValueXY, Points, TooltipPosition, Step } from '../utils/types';

  @Component({
    name: 'view-mask'
  })
  export default class ViewMask extends Vue {

    private points: Points = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };

    private clipPoints: Points = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };

    // Alertnates numbers constantly
    private maskLocation: Points = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }

    private radius: any = {
      r: 0,
    }
    
    @Prop() public size!: ValueXY;
    @Prop() public position!: ValueXY;
    @Prop() public layout!: Layout;
    @Prop() public easing!: Function;
    @Prop() public animationDuration!: number;
    @Prop({default: true}) public animated!: boolean;
    @Prop({default: 'rgb(0, 0, 0, 0.4)'}) public overlayColor!: string;
    @Prop({default: true}) public wholePage!: boolean;
    @Prop() public mask!: TooltipPosition;
    @Prop({default: 5}) public highlightPadding!: number;
    @Prop({default: 0}) public highlightBorderRadius!: number;

    @Watch('position')
    onPositionChanged(): void {
      // console.log('size: ', poaitionthis.size);
      this.setupAnimation(this.animationDuration, this.position, this.size);
    }

    @Watch('size')
    onSizeChanged(): void {
      // console.log('size: ', this.size);
      this.setupAnimation(this.animationDuration, this.position, this.size);
    }

    public setupAnimation(animationDuration, position?, size? ): void {
      this.animateSize(animationDuration, position !== undefined ? position : this.position, size !== undefined ? size : this.size);
      this.animatePosition(animationDuration, this.computedMask);
      this.animateBorderRadius(animationDuration, this.highlightBorderRadius);
      // this.animateClipPath(animationDuration, position !== undefined ? position : this.position, size !== undefined ? size : this.size);
    }

    private gridLoaded(): void {
      // @ts-ignore
      const grid = this.$refs.grid.nativeView;
      const gridWidth = grid.getActualSize().width;

      if((gridWidth > this.layout.width)) {
        const mask: TooltipPosition = {...this.mask};
        mask.left = 0;
        mask.right = 0;
        mask.middle = '*';

        this.mask = mask;
      }

      // if (this.currentStep.darkenWholePage && this.currentStep.darkenWholePage === true) {
      //   const mask: TooltipPosition = {...this.mask};
      //   mask.left = 'auto';
      //   mask.right = 'auto';
      //   mask.middle = '*';

      //   this.mask = mask;
      // }

    }

    get computedBorderWidth(): number {
      return this.computedRadius/1.5;
    }

    get computedMaskLocation(): Points {
      let mask = {...this.maskLocation};
      // console.log('These are the point values for location AFTER: right:', mask.right, 'left:', mask.left, 'bottom:', mask.bottom,  'top:', mask.top);
      return mask;
    }

    get computedMask(): TooltipPosition {
      return this.mask
    }

    get computedHighlightBox(): object {
      let position = this.position;
      let size = this.size;
      const right = ((position.x + size.x));
      const bottom = ((position.y) + size.y);
      return {
        //clip-path: polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)
          clipPath: ` polygon(0 0, ${right} 0, ${right} ${bottom}, 0 ${bottom});`
      };
    }

    get computedRadius(): number {

      let width = this.points.right - this.points.left;
      let height = this.points.bottom - this.points.top;
      let radius = this.radius.r;
      let max = (width > height ? width : height) / 2;
      // console.log('radius before:', max);

      // let r = this.computedRadius === 0 ? 1: this.computedRadius;
      let r = radius === 0 ? 0 : max * (radius * 0.01);
      // console.log('radius after:', r);

      return r;
    }

    // animate the highlight box in the overlay. Since the highlight box is based on a clip-path
    // we must calculate the location based on percentages
    private animateSize(animationDuration, position, size): void {
      // const left = (Math.max((((position.x) / this.layout.width) * 100), 0));
      // const top = (Math.max((((position.y) / this.layout.height) * 100), 0));
      // const right = (Math.max((((position.x + size.x) / this.layout.width) * 100), 0));
      // const bottom = (Math.max(((((position.y) + size.y) / this.layout.height) * 100), 0));
      const left = ((position.x));
      const top = ((position.y));
      const right = ((position.x + size.x));
      const bottom = ((position.y) + size.y);
      // console.log('These are the point values:', right, left, bottom, top);
      
      const to = {
        left,
        top,
        right,
        bottom
      };

      if(this.animated) {
        new TWEEN.Tween(this.points)
          .to(to, animationDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      } else {
        new TWEEN.Tween(this.points)
          .to(to, 1)
          .start();
      }
    }

    private animateClipPath(animationDuration, position, size): void {
      const left = (Math.max((((position.x) / this.layout.width) * 100), 0));
      const top = (Math.max((((position.y) / this.layout.height) * 100), 0));
      const right = (Math.max((((position.x + size.x) / this.layout.width) * 100), 0));
      const bottom = (Math.max(((((position.y) + size.y) / this.layout.height) * 100), 0));
      
      const to = {
        left,
        top,
        right,
        bottom
      };
      if(this.animated) {
        new TWEEN.Tween(this.clipPoints)
          .to(to, animationDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      } else {
        new TWEEN.Tween(this.clipPoints)
          .to(to, 1)
          .start();
      }
    }

    private animatePosition(animationDuration, mask): void {
      // const left = (Math.max((((position.x) / this.layout.width) * 100), 0));
      // const top = (Math.max((((position.y) / this.layout.height) * 100), 0));
      // const right = (Math.max((((position.x + size.x) / this.layout.width) * 100), 0));
      // const bottom = (Math.max(((((position.y) + size.y) / this.layout.height) * 100), 0));
      const left = 0;
      const top = (mask.top) - this.highlightPadding;
      const right = (mask.right) - this.highlightPadding;
      const bottom = 0;
      
      const to = {
        left,
        top,
        right,
        bottom
      };

      if(this.animated) {
        new TWEEN.Tween(this.maskLocation)
          .to(to, animationDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      } else {
        new TWEEN.Tween(this.maskLocation)
          .to(to, 1)
          .start();
      }
    }

    private animateBorderRadius(animationDuration, radius): void {
      // const left = (Math.max((((position.x) / this.layout.width) * 100), 0));
      // const top = (Math.max((((position.y) / this.layout.height) * 100), 0));
      // const right = (Math.max((((position.x + size.x) / this.layout.width) * 100), 0));
      // const bottom = (Math.max(((((position.y) + size.y) / this.layout.height) * 100), 0));
      const r = radius;
      const to = {
        r
      };

      if(this.animated) {
        new TWEEN.Tween(this.radius)
          .to(to, animationDuration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      } else {
        new TWEEN.Tween(this.maskLocation)
          .to(to, 1)
          .start();
      }
    }

    // absorb tap allows the mask to not be able to be clicked through on android
    private absorbTap() {
      // console.log('This tap was absorbed by the ViewMask');
    }

  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
