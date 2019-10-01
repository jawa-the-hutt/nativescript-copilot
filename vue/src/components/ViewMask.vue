<template>
  <ContentView 
    :style="computedHighlightBox" 
    @loaded="setupAnimation(1)"
  />
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { TWEEN } from 'nativescript-tweenjs';

  import { Layout, ValueXY, Points } from '../utils/types';

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
    
    @Prop() public size!: ValueXY;
    @Prop() public position!: ValueXY;
    @Prop() public layout!: Layout;
    @Prop() public easing!: Function;
    @Prop() public animationDuration!: number;
    @Prop({default: true}) public animated!: boolean;
    @Prop({default: 'rgb(0, 0, 0, 0.4)'}) public overlayColor!: string;

    @Watch('position')
    onPositionChanged(): void {
      this.setupAnimation(this.animationDuration, this.position, this.size);
    }

    @Watch('size')
    onSizeChanged(): void {
      this.setupAnimation(this.animationDuration, this.position, this.size);
    }

    public setupAnimation(animationDuration, position?, size? ): void {
      this.animate(animationDuration, position !== undefined ? position : this.position, size !== undefined ? size : this.size);
    }

    get computedHighlightBox(): object {
      const {
        left,
        top,
        right,
        bottom
      } = this.points;

      return {
          clipPath: `polygon(0% 0%, 0% 100%, ${left}% 100%, ${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%,${left}% 100%, 100% 100%, 100% 0%);`,
          backgroundColor: this.overlayColor
      };

    }

    // animate the highlight box in the overlay. Since the highlight box is based on a clip-path
    // we must calculate the location based on percentages
    private animate(animationDuration, position, size): void {
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
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
