<template>
  <GridLayout :rows="`${computedPosition.rows}`" :columns="`${computedPosition.columns}`">
    <GridLayout row="1" col="1" :rows="`${circleSize}`" :columns="`${circleSize}`" borderRadius="50%" :backgroundColor="backgroundColor" horizontalAlignment="center" verticalAlignment="middle">
      <GridLayout :rows="`${circleSize - 4 }`" :columns="`${circleSize - 4}`" borderRadius="50%" :backgroundColor="accentColor" horizontalAlignment="center" verticalAlignment="middle">
        <StackLayout borderRadius="50%" :width="`${circleSize- 6}`" :height="`${circleSize - 6}`" horizontalAlignment="center" verticalAlignment="middle">
          <Label :text="stepNumber" :color="backgroundColor" horizontalAlignment="center" verticalAlignment="middle" :fontSize="`${circleSize / 2.5}`" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { TWEEN } from 'nativescript-tweenjs';
  import * as platform from "tns-core-modules/platform";
  import { Layout, ValueXY, Points } from '../utils/types';
  import { STEP_NUMBER_RADIUS, STEP_NUMBER_DIAMETER } from '../utils/constants';

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
    private circleSize: number = STEP_NUMBER_DIAMETER;

    @Prop() public size!: ValueXY;
    @Prop() public position!: ValueXY;
    @Prop() public layout!: Layout;
    @Prop() public easing!: Function;
    @Prop() public animationDuration!: number;
    @Prop({default: true}) public animated!: boolean;
    @Prop({default: 'green'}) public accentColor!: string;
    @Prop({default: 'white'}) public backgroundColor!: string;
    @Prop() public stepNumber!: string;
    @Prop() public safeArea!: Points;

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

    get computedPosition(): object {
      const {
        left,
        top,
        right,
        bottom
      } = this.points;

      return {
          rows: `${top}, ${STEP_NUMBER_DIAMETER}, ${bottom}`,
          columns: `${left}, ${STEP_NUMBER_DIAMETER}, ${right}`
      };

    }

    // handle the animation/reposition of the stepNumber element.
    // we factor in the screen safeArea based on if Android/IOS with values passed in from parent component.
    // if the position is too close the sides of the screen, we will move the stepNumber to a different
    // location.
    private animate(animationDuration, position, size): void {

      const safeAreaTop = platform.isAndroid ? 0 : this.computedSafeArea.top;

      const left = position.x < STEP_NUMBER_DIAMETER 
        ? ((position.x + size.x) - STEP_NUMBER_RADIUS) 
        : (position.x - STEP_NUMBER_RADIUS);
      const top = position.y < (safeAreaTop + STEP_NUMBER_DIAMETER)
        ? ((position.y + size.y) - (safeAreaTop + STEP_NUMBER_RADIUS)) 
        : (position.y - (safeAreaTop + STEP_NUMBER_RADIUS));
      const right = position.x < STEP_NUMBER_DIAMETER 
        ? (position.x + size.x) + STEP_NUMBER_RADIUS 
        : position.x + STEP_NUMBER_RADIUS;
      const bottom = position.y < (safeAreaTop + STEP_NUMBER_DIAMETER) 
        ? ((position.y + size.y) + (safeAreaTop + STEP_NUMBER_RADIUS)) 
        : (position.y + (safeAreaTop + STEP_NUMBER_RADIUS));

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

    get computedSafeArea(): Points {
      return this.safeArea;
    }

  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
