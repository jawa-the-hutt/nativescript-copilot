<template>
  <Page actionBarHidden="true" backgroundColor="white"  @loaded="copilotLoaded()">
    <Gridlayout rows="*" columns="*">
      <GridLayout row="0" rows="50, *, 50">
        <GridLayout row="0" columns="*, *, *" backgroundColor="#2980b9">
          <StackLayout col="0" verticalAlignment="middle" horizontalAlignment="left">
            <Label ref="step1" text="Top Left" textWrap="true" marginLeft="15" verticalAlignment="middle" horizontalAlignment="left" color="white" borderWidth="0"/>
          </StackLayout>
          <StackLayout col="1" verticalAlignment="middle" horizontalAlignment="center">
            <Image ref="step2" src="~/assets/logo.png" height="50%" width="50%" borderWidth="0"/>
          </StackLayout> 
          <StackLayout col="2" verticalAlignment="middle" horizontalAlignment="right">
            <Label ref="step3" text="Top Right" textWrap="true" marginRight="15" verticalAlignment="middle" horitzontalAlignment="right" color="white" borderWidth="0"/>
          </StackLayout> 
        </GridLayout>
        <GridLayout row="1" rows="*, *">
          <StackLayout row="0" verticalAlignment="middle" horizontalAlignment="center" height="50%" width="50%">
            <Image ref="step4" src="~/assets/logo.png"  borderWidth="0"/>
          </StackLayout> 
          <StackLayout row="1" ref="step5" class="startButton" verticalAlignment="top" horizontalAlignment="center" @tap="startTour()">
            <Label text="START THE TUTORIAL!" color="white" verticalAlignment="middle" horizontalAlignment="center"/>
          </StackLayout>
        </GridLayout>
        <GridLayout row="2" columns="*, *, *" backgroundColor="#2980b9">
          <StackLayout col="0" verticalAlignment="middle" horizontalAlignment="left">
            <Label ref="step6" text="Bottom Left" textWrap="true"  marginLeft="15" verticalAlignment="middle" horizontalAlignment="left" color="white" borderWidth="0"/>
          </StackLayout>
          <StackLayout col="1" verticalAlignment="middle" horitzontalAlignment="center">
            <Image ref="step7" src="~/assets/logo.png" height="50%" width="50%" borderWidth="0"/>
          </StackLayout>
          <StackLayout col="2" verticalAlignment="middle" horitzontalAlignment="right">
            <Label ref="step8" text="Bottom Right" textWrap="true"  verticalAlignment="middle" horitzontalAlignment="right" marginRight="15" color="white" borderWidth="0"/>
          </StackLayout>
        </GridLayout>
      </GridLayout> 
      <Copilot
        :steps="computedSteps"
        :animationDuration="animationDuration"
        :labels="labels"
        :tooltipStyle="tooltipStyle"
        :overlayColor="overlayColor"
        :backgroundColor="backgroundColor"
        :accentColor="accentColor"
        ref="copilot"
      />
    </Gridlayout>

  </Page>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import { Step } from '../../';

  @Component({
  })
  export default class App extends Vue {
    private steps: Step[] = [];
    private animationDuration: number = 300;
    private androidStatusBarVisible: boolean = false;
    private labels: object = {
      skip: 'Skip',
      previous: 'Previous',
      next: 'Next',
      finish: 'Finish'
    };
    private tooltipStyle: object = {
      fontFamily: 'Avenir-Light',
      tooltipFontSize: 14,
      tooltipTextColor: 'black',
      buttonFontSize: 14,
      accentColor: 'green'
    }
    private overlayColor: string = 'rgba(0, 0, 0, 0.4)';
    private accentColor: string = 'green';
    private backgroundColor: string = 'white';

    // private tooltipComponent!: any;
    // private stepNumberComponent!: any; 
    // private easing!: Function;

    private startTour() {
      // @ts-ignore
      this.$refs.copilot.start(); 
    }

    private copilotLoaded() {
      this.steps = [
        {
          name: 'Top Left',
          text: 'here is an item on the top left.',
          order: 1,
          // @ts-ignore
          target: this.$refs.step1.nativeView,
          animated: true,
          isFirstStep: true
        },
        {
          name: 'Second',
          text: 'here is an image on the top center.',
          order: 2,
          // @ts-ignore
          target: this.$refs.step2.nativeView,
          animated: true
        },
        {
          name: 'Third',
          text: 'here is some text that should hopefully be long enought to cause a wrap.  What will happen if the text is too long. Find out!',
          order: 3,
          // @ts-ignore
          target: this.$refs.step3.nativeView,
          animated: true
        },
        {
          name: 'Fourth',
          text: 'Here is an Image!',
          order: 4,
          // @ts-ignore
          target: this.$refs.step4.nativeView,
          animated: true,

        },
        {
          name: 'Fifth',
          text: 'This has a veritcal offset of -5 which will push the step 5dp towards the top',
          order: 5,
          // @ts-ignore
          target: this.$refs.step5.nativeView,
          verticalOffset: -5
        },
        {
          name: 'Bottom Left',
          text: 'here is an item on the bottom left.',
          order: 6,
          // @ts-ignore
          target: this.$refs.step6.nativeView,
          animated: true
        },
        {
          name: 'Bottom Center',
          text: 'here is some text that should hopefully be long enought to cause a wrap.  What will happen if the text is too long. Find out!',
          order: 7,
          // @ts-ignore
          target: this.$refs.step7.nativeView,
          animated: true
        },
        {
          name: 'Bottom Right',
          text: 'here is and item on the bottom right.',
          order: 8,
          // @ts-ignore
          target: this.$refs.step8.nativeView,
          animated: true,
          isLastStep: true
        }
      ]
    }

    get computedSteps() {
      return this.steps;
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .startButton {
    background-color: #2980b9;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 6;
    padding-right: 6;
    height: 40;
  }
</style>