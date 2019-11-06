var NativescriptVueCopilot=(function(exports,vuePropertyDecorator,platform,app,nativescriptTweenjs,builder){'use strict';/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}let ViewMask = class ViewMask extends vuePropertyDecorator.Vue {
    constructor() {
        super(...arguments);
        this.points = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.clipPoints = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.maskLocation = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.radius = {
            r: 0,
        };
    }
    onPositionChanged() {
        this.setupAnimation(this.animationDuration, this.position, this.size);
    }
    onSizeChanged() {
        this.setupAnimation(this.animationDuration, this.position, this.size);
    }
    setupAnimation(animationDuration, position, size) {
        this.animateSize(animationDuration, position !== undefined ? position : this.position, size !== undefined ? size : this.size);
        this.animatePosition(animationDuration, this.computedMask);
        this.animateBorderRadius(animationDuration, this.highlightBorderRadius);
    }
    gridLoaded() {
        const grid = this.$refs.grid.nativeView;
        const gridWidth = grid.getActualSize().width;
        if ((gridWidth > this.layout.width)) {
            const mask = { ...this.mask };
            mask.left = 0;
            mask.right = 0;
            mask.middle = '*';
            this.mask = mask;
        }
    }
    get computedBorderWidth() {
        return this.computedRadius / 1.5;
    }
    get computedMaskLocation() {
        let mask = { ...this.maskLocation };
        return mask;
    }
    get computedMask() {
        return this.mask;
    }
    get computedHighlightBox() {
        let position = this.position;
        let size = this.size;
        const right = ((position.x + size.x));
        const bottom = ((position.y) + size.y);
        return {
            clipPath: ` polygon(0 0, ${right} 0, ${right} ${bottom}, 0 ${bottom});`
        };
    }
    get computedRadius() {
        let width = this.points.right - this.points.left;
        let height = this.points.bottom - this.points.top;
        let radius = this.radius.r;
        let max = (width > height ? width : height) / 2;
        let r = radius === 0 ? 0 : max * (radius * 0.01);
        return r;
    }
    animateSize(animationDuration, position, size) {
        const left = ((position.x));
        const top = ((position.y));
        const right = ((position.x + size.x));
        const bottom = ((position.y) + size.y);
        const to = {
            left,
            top,
            right,
            bottom
        };
        if (this.animated) {
            new nativescriptTweenjs.TWEEN.Tween(this.points)
                .to(to, animationDuration)
                .easing(nativescriptTweenjs.TWEEN.Easing.Quadratic.Out)
                .start();
        }
        else {
            new nativescriptTweenjs.TWEEN.Tween(this.points)
                .to(to, 1)
                .start();
        }
    }
    animateClipPath(animationDuration, position, size) {
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
        if (this.animated) {
            new nativescriptTweenjs.TWEEN.Tween(this.clipPoints)
                .to(to, animationDuration)
                .easing(nativescriptTweenjs.TWEEN.Easing.Quadratic.Out)
                .start();
        }
        else {
            new nativescriptTweenjs.TWEEN.Tween(this.clipPoints)
                .to(to, 1)
                .start();
        }
    }
    animatePosition(animationDuration, mask) {
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
        if (this.animated) {
            new nativescriptTweenjs.TWEEN.Tween(this.maskLocation)
                .to(to, animationDuration)
                .easing(nativescriptTweenjs.TWEEN.Easing.Quadratic.Out)
                .start();
        }
        else {
            new nativescriptTweenjs.TWEEN.Tween(this.maskLocation)
                .to(to, 1)
                .start();
        }
    }
    animateBorderRadius(animationDuration, radius) {
        const r = radius;
        const to = {
            r
        };
        if (this.animated) {
            new nativescriptTweenjs.TWEEN.Tween(this.radius)
                .to(to, animationDuration)
                .easing(nativescriptTweenjs.TWEEN.Easing.Quadratic.Out)
                .start();
        }
        else {
            new nativescriptTweenjs.TWEEN.Tween(this.maskLocation)
                .to(to, 1)
                .start();
        }
    }
    absorbTap() {
    }
};
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "size", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "position", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "layout", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "easing", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "animationDuration", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true })
], ViewMask.prototype, "animated", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'rgb(0, 0, 0, 0.4)' })
], ViewMask.prototype, "overlayColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true })
], ViewMask.prototype, "wholePage", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], ViewMask.prototype, "mask", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 5 })
], ViewMask.prototype, "highlightPadding", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 0 })
], ViewMask.prototype, "highlightBorderRadius", void 0);
__decorate([
    vuePropertyDecorator.Watch('position')
], ViewMask.prototype, "onPositionChanged", null);
__decorate([
    vuePropertyDecorator.Watch('size')
], ViewMask.prototype, "onSizeChanged", null);
ViewMask = __decorate([
    vuePropertyDecorator.Component({
        name: 'view-mask'
    })
], ViewMask);
var script = ViewMask;function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Gridlayout',{staticClass:"overlay",attrs:{"rows":((this.computedMaskLocation.top) + ", auto, *"),"columns":("*, auto, " + (_vm.computedMaskLocation.right)),"horizontalAlignment":_vm.computedMask.alignment,"backgroundColor":"transparent"},on:{"loaded":function($event){return _vm.setupAnimation(1)}}},[_c('StackLayout',{attrs:{"row":"1","col":"1"}},[_c('AbsoluteLayout',{style:(_vm.computedHighlightBox),attrs:{"width":(_vm.points.right-_vm.points.left) + (_vm.highlightPadding * 2),"height":(_vm.points.bottom-_vm.points.top) + (_vm.highlightPadding * 2)}},[_c('Gridlayout',{ref:"grid",staticClass:"mask",attrs:{"width":(_vm.points.right-_vm.points.left) + (_vm.highlightPadding * 2) + _vm.computedBorderWidth,"height":(_vm.points.bottom-_vm.points.top) + (_vm.highlightPadding * 2) + _vm.computedBorderWidth,"top":-(_vm.computedBorderWidth/2),"left":-(_vm.computedBorderWidth/2),"backgroundColor":'transparent',"borderColor":_vm.overlayColor,"borderRadius":_vm.computedRadius,"borderWidth":_vm.computedBorderWidth},on:{"tap":function($event){return _vm.$emit('highlight-tap')},"layoutChanged":function($event){return _vm.gridLoaded()}}})],1)],1),_vm._v(" "),_c('StackLayout',{attrs:{"row":"0","col":"0","height":"100%","width":"100%","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{attrs:{"row":"2","col":"0","height":"100%","width":"100%","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{attrs:{"row":"1","col":"0","height":"auto","width":"auto","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{attrs:{"row":"0","col":"1","height":"auto","width":"auto","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{attrs:{"row":"2","col":"1","height":"auto","width":"auto","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{directives:[{name:"show",rawName:"v-show",value:(_vm.computedMaskLocation.right > 0),expression:"computedMaskLocation.right > 0"}],attrs:{"row":"1","col":"2","height":"auto","width":"auto","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{directives:[{name:"show",rawName:"v-show",value:(_vm.computedMaskLocation.right > 0),expression:"computedMaskLocation.right > 0"}],attrs:{"row":"0","col":"2","height":"100%","width":"100%","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}}),_vm._v(" "),_c('StackLayout',{directives:[{name:"show",rawName:"v-show",value:(_vm.computedMaskLocation.right > 0),expression:"computedMaskLocation.right > 0"}],attrs:{"row":"2","col":"2","height":"100%","width":"100%","backgroundColor":_vm.overlayColor},on:{"tap":function($event){return _vm.absorbTap()}}})],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-a05d928c";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ViewMask$1 = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );let Tooltip = class Tooltip extends vuePropertyDecorator.Vue {
    gridLoaded() {
        const grid = this.$refs.grid.nativeView;
        const gridWidth = grid.getActualSize().width;
        if ((gridWidth > this.layout.width)) {
            const tooltip = { ...this.tooltipPosition };
            tooltip.left = this.tooltipMargin;
            tooltip.right = this.tooltipMargin;
            tooltip.middle = '*';
            this.tooltipPosition = tooltip;
        }
        if (this.currentStep.darkenWholePage && this.currentStep.darkenWholePage === true) {
            const tooltip = { ...this.tooltipPosition };
            tooltip.left = 'auto';
            tooltip.right = 'auto';
            tooltip.middle = '*';
            this.tooltipPosition = tooltip;
        }
    }
    onCurrentStepChange() {
        if (this.currentStep.isCustom) {
            if (this.currentStep.itemTemplate) {
                let stack = this.$refs.custom.nativeView;
                stack.removeChildren();
                let xml = this.currentStep.itemTemplate;
                let component;
                try {
                    component = builder.parse(xml);
                    stack.addChild(component);
                }
                catch (e) {
                    console.log('nativescript-copilot - error - invalid custom layout, unable to parse');
                    console.log(e.message);
                }
            }
        }
        else {
            let stack = this.$refs.custom.nativeView;
            stack.removeChildren();
        }
    }
    get computedTooltipStyle() {
        return this.tooltipStyle;
    }
    get computedTooltip() {
        return this.tooltipPosition;
    }
    get computedArrow() {
        return this.arrow;
    }
    get computedArrowStyle() {
        return {
            'clip-path': this.arrowClipPath
        };
    }
    get computedBackgroundColor() {
        if (this.currentStep.customBackgroundColor) {
            return this.currentStep.customBackgroundColor;
        }
        else {
            return this.backgroundColor;
        }
    }
    get computedBorderRadius() {
        if (this.currentStep.customBorderRadius) {
            return this.currentStep.customBorderRadius;
        }
        else {
            return this.toolTipBorderRadius;
        }
    }
    get computedTopGridRows() {
        let str = '';
        if (this.computedArrow.location === 'top') {
            str = `${this.computedTooltip.top}, ${this.computedArrow.height}, auto, ${this.computedTooltip.bottom}`;
        }
        else {
            str = `${this.computedTooltip.top}, auto, ${this.computedArrow.height}, ${this.computedTooltip.bottom}`;
        }
        return str;
    }
};
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "handleNext", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "handlePrev", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "handleStop", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "currentStep", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "labels", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "tooltipStyle", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "tooltipPosition", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "layout", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 13 })
], Tooltip.prototype, "tooltipMargin", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "arrowClipPath", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], Tooltip.prototype, "arrow", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'white' })
], Tooltip.prototype, "backgroundColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: '3' })
], Tooltip.prototype, "toolTipBorderRadius", void 0);
__decorate([
    vuePropertyDecorator.Watch('currentStep')
], Tooltip.prototype, "onCurrentStepChange", null);
Tooltip = __decorate([
    vuePropertyDecorator.Component({
        name: 'tooltip',
    })
], Tooltip);
var script$1 = Tooltip;/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('StackLayout',{attrs:{"marginLeft":_vm.tooltipMargin,"marginRight":_vm.tooltipMargin}},[_c('Gridlayout',{key:_vm.computedTooltip.middle,attrs:{"rows":_vm.computedTopGridRows,"columns":("" + (_vm.computedTooltip.middle)),"horizontalAlignment":_vm.computedTooltip.alignment,"backgroundColor":"rgba(0,0,0,0)"}},[_c('Gridlayout',{directives:[{name:"show",rawName:"v-show",value:(!_vm.currentStep.darkenWholePage),expression:"!currentStep.darkenWholePage"}],attrs:{"row":("" + (_vm.computedArrow.location === 'top' ? '1' : '2')),"col":"0","rows":("" + (_vm.computedArrow.height)),"columns":("" + (_vm.computedArrow.width)),"marginLeft":_vm.computedArrow.left,"marginRight":_vm.computedArrow.right,"horizontalAlignment":_vm.computedTooltip.alignment}},[_c('Label',{style:(_vm.computedArrowStyle),attrs:{"width":_vm.computedArrow.width,"height":_vm.computedArrow.height,"backgroundColor":_vm.computedBackgroundColor}})],1),_vm._v(" "),_c('Gridlayout',{key:_vm.computedTooltip.middle,ref:"grid",attrs:{"row":("" + (_vm.computedArrow.location === 'top' ? '2' : '1')),"col":"0","rows":"auto, auto","columns":("" + (_vm.computedTooltip.middle)),"marginLeft":_vm.computedTooltip.left,"marginRight":_vm.computedTooltip.right,"backgroundColor":_vm.computedBackgroundColor,"paddingTop":"15","paddingLeft":"15","paddingRight":"15","paddingBottom":"5","borderRadius":_vm.computedBorderRadius},on:{"layoutChanged":function($event){return _vm.gridLoaded()}}},[_c('StackLayout',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentStep && _vm.currentStep.isCustom),expression:"currentStep && currentStep.isCustom"}],attrs:{"row":"0","col":"0"}},[_c('StackLayout',{ref:"custom",on:{"loaded":function($event){return _vm.onCurrentStepChange()}}})],1),_vm._v(" "),_c('StackLayout',{directives:[{name:"show",rawName:"v-show",value:(!_vm.currentStep.isCustom),expression:"!currentStep.isCustom"}],attrs:{"row":"0","col":"0"}},[_c('Label',{attrs:{"text":_vm.currentStep.text,"textWrap":"true","fontSize":_vm.computedTooltipStyle.tooltipFontSize,"color":_vm.computedTooltipStyle.tooltipTextColor,"fontFamily":_vm.computedTooltipStyle.fontFamily}})],1),_vm._v(" "),_c('GridLayout',{attrs:{"row":"1","col":"0","rows":"*","columns":"auto, auto, auto","marginTop":"10","horizontalAlignment":"right"}},[(!_vm.currentStep.isLastStep)?_c('StackLayout',{attrs:{"col":"0","marginLeft":"7","marginRight":"7"},on:{"tap":function($event){return _vm.handleStop()}}},[_c('Label',{attrs:{"text":_vm.labels.skip || 'Skip',"fontSize":_vm.computedTooltipStyle.buttonFontSize,"color":_vm.computedTooltipStyle.accentColor,"fontFamily":_vm.computedTooltipStyle.fontFamily}})],1):_vm._e(),_vm._v(" "),(!_vm.currentStep.isFirstStep)?_c('StackLayout',{attrs:{"col":"1","marginLeft":"7","marginRight":"7"},on:{"tap":function($event){return _vm.handlePrev()}}},[_c('Label',{attrs:{"text":_vm.labels.previous || 'Previous',"fontSize":_vm.computedTooltipStyle.buttonFontSize,"color":_vm.computedTooltipStyle.accentColor,"fontFamily":_vm.computedTooltipStyle.fontFamily}})],1):_vm._e(),_vm._v(" "),(!_vm.currentStep.isLastStep)?_c('StackLayout',{attrs:{"col":"2","marginLeft":"7","marginRight":"7"},on:{"tap":function($event){return _vm.handleNext()}}},[_c('Label',{attrs:{"text":_vm.labels.next || 'Next',"fontSize":_vm.computedTooltipStyle.buttonFontSize,"color":_vm.computedTooltipStyle.accentColor,"fontFamily":_vm.computedTooltipStyle.fontFamily}})],1):_vm._e(),_vm._v(" "),(_vm.currentStep.isLastStep)?_c('StackLayout',{attrs:{"col":"2","marginLeft":"7","marginRight":"7"},on:{"tap":function($event){return _vm.handleStop()}}},[_c('Label',{attrs:{"text":_vm.labels.finish || 'Finish',"fontSize":_vm.computedTooltipStyle.buttonFontSize,"color":_vm.computedTooltipStyle.accentColor,"fontFamily":_vm.computedTooltipStyle.fontFamily}})],1):_vm._e()],1)],1)],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = "data-v-5efe2bfb";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Tooltip$1 = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );const STEP_NUMBER_RADIUS = 14;
const STEP_NUMBER_DIAMETER = STEP_NUMBER_RADIUS * 2;
const MARGIN = 13;
const OFFSET_WIDTH = 4;
const ARROW_SIZE = 8;
const ANDROID_STATUSBAR_OFFSET = 24;let StepNumber = class StepNumber extends vuePropertyDecorator.Vue {
    constructor() {
        super(...arguments);
        this.points = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.circleSize = STEP_NUMBER_DIAMETER;
    }
    onPositionChanged() {
        this.setupAnimation(this.animationDuration, this.position, this.size);
    }
    onSizeChanged() {
        this.setupAnimation(this.animationDuration, this.position, this.size);
    }
    setupAnimation(animationDuration, position, size) {
        this.animate(animationDuration, position !== undefined ? position : this.position, size !== undefined ? size : this.size);
    }
    get computedPosition() {
        const { left, top, right, bottom } = this.points;
        return {
            rows: `${top}, ${STEP_NUMBER_DIAMETER}, ${bottom}`,
            columns: `${left}, ${STEP_NUMBER_DIAMETER}, ${right}`
        };
    }
    animate(animationDuration, position, size) {
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
        if (this.animated) {
            new nativescriptTweenjs.TWEEN.Tween(this.points)
                .to(to, animationDuration)
                .easing(nativescriptTweenjs.TWEEN.Easing.Quadratic.Out)
                .start();
        }
        else {
            new nativescriptTweenjs.TWEEN.Tween(this.points)
                .to(to, 1)
                .start();
        }
    }
    get computedSafeArea() {
        return this.safeArea;
    }
};
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "size", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "position", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "layout", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "easing", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "animationDuration", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true })
], StepNumber.prototype, "animated", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'green' })
], StepNumber.prototype, "accentColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'white' })
], StepNumber.prototype, "backgroundColor", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "stepNumber", void 0);
__decorate([
    vuePropertyDecorator.Prop()
], StepNumber.prototype, "safeArea", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'Avenir-Light' })
], StepNumber.prototype, "numberFontFamilyStyle", void 0);
__decorate([
    vuePropertyDecorator.Watch('position')
], StepNumber.prototype, "onPositionChanged", null);
__decorate([
    vuePropertyDecorator.Watch('size')
], StepNumber.prototype, "onSizeChanged", null);
StepNumber = __decorate([
    vuePropertyDecorator.Component({
        name: 'step-number'
    })
], StepNumber);
var script$2 = StepNumber;/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('GridLayout',{attrs:{"rows":("" + (_vm.computedPosition.rows)),"columns":("" + (_vm.computedPosition.columns))}},[_c('GridLayout',{attrs:{"row":"1","col":"1","rows":("" + _vm.circleSize),"columns":("" + _vm.circleSize),"borderRadius":"50%","backgroundColor":_vm.backgroundColor,"horizontalAlignment":"center","verticalAlignment":"middle"}},[_c('GridLayout',{attrs:{"rows":("" + (_vm.circleSize - 4)),"columns":("" + (_vm.circleSize - 4)),"borderRadius":"50%","backgroundColor":_vm.accentColor,"horizontalAlignment":"center","verticalAlignment":"middle"}},[_c('StackLayout',{attrs:{"borderRadius":"50%","width":("" + (_vm.circleSize- 6)),"height":("" + (_vm.circleSize - 6)),"horizontalAlignment":"center","verticalAlignment":"middle"}},[_c('Label',{attrs:{"text":_vm.stepNumber,"color":_vm.backgroundColor,"horizontalAlignment":"center","verticalAlignment":"middle","fontSize":("" + (_vm.circleSize / 2.5)),"fontFamily":_vm.numberFontFamilyStyle}})],1)],1)],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = "data-v-5b5f8a06";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var StepNumber$1 = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );let CopilotModal = class CopilotModal extends vuePropertyDecorator.Vue {
    constructor() {
        super(...arguments);
        this.tooltip = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            middle: '*',
            alignment: 'left'
        };
        this.mask = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            middle: '*',
            alignment: 'left'
        };
        this.arrow = {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            location: ''
        };
        this.arrowClipPath = '';
        this.layout = {
            width: 0,
            height: 0
        };
        this.stepNumberPosition = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.safeArea = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.size = {
            x: 0,
            y: 0
        };
        this.position = {
            x: 0,
            y: 0
        };
        this.margin = MARGIN;
        this.currentStep = {
            name: 'First',
            text: 'here is some text',
            order: 1,
            target: '',
            animated: true
        };
        this.stepCount = 0;
        this.copilotVisible = false;
        this.loaded = false;
    }
    onLoaded() {
        if (platform.isAndroid) {
            this.getDeviceInfoAndroid();
        }
        else {
            this.getDeviceInfoIOS();
        }
        const page = this.$refs.container.nativeView;
        let safeArea = page.getSafeAreaInsets();
        if (platform.isAndroid) {
            safeArea = {
                left: safeArea.left,
                top: safeArea.top === 0 ? ANDROID_STATUSBAR_OFFSET : safeArea.top,
                right: safeArea.right,
                bottom: safeArea.bottom
            };
        }
        else {
            safeArea = {
                left: safeArea.left / this.screenScale,
                top: safeArea.top / this.screenScale,
                right: safeArea.right / this.screenScale,
                bottom: safeArea.bottom / this.screenScale
            };
        }
        this.safeArea = safeArea;
        this.loaded = true;
        this.currentStep = this.computedSteps[0];
    }
    getDeviceInfoAndroid() {
        const metrics = app.android.context.getResources().getDisplayMetrics();
        this.screenScale = metrics.density;
        const config = app.android.context.getResources().getConfiguration();
        this.layout = {
            height: config.screenHeightDp,
            width: config.screenWidthDp
        };
    }
    getDeviceInfoIOS() {
        const screen = UIScreen.mainScreen;
        this.layout = {
            height: screen.nativeBounds.size.height / screen.scale,
            width: screen.nativeBounds.size.width / screen.scale
        };
        this.screenScale = screen.scale;
    }
    async animateMove(view, verticalOffset, darkenWholePage) {
        const layout = { ...this.layout };
        const tooltip = { ...this.tooltip };
        const mask = { ...this.mask };
        const tooltipStyle = { ...this.tooltipStyle };
        const arrow = { ...this.arrow };
        let arrowClipPath = '';
        let dim = view.getActualSize();
        let pos = view.getLocationInWindow();
        if (darkenWholePage) {
            dim = {
                width: 0,
                height: 0
            };
            pos = {
                x: this.computedLayout.width / 2,
                y: this.computedLayout.height / 2
            };
        }
        const obj = {
            width: dim.width + OFFSET_WIDTH,
            height: dim.height + OFFSET_WIDTH,
            left: pos.x - (OFFSET_WIDTH / 2),
            top: ((pos.y - (platform.isAndroid ? this.safeArea.top : 0)) - (OFFSET_WIDTH / 2)) + verticalOffset
        };
        const objCenter = {
            x: obj.left + (obj.width / 2),
            y: obj.top + (obj.height / 2),
        };
        const relativeToLeft = objCenter.x;
        const relativeToTop = objCenter.y;
        const relativeToBottom = Math.abs(objCenter.y - layout.height);
        const relativeToRight = Math.abs(objCenter.x - layout.width);
        const verticalPosition = relativeToBottom > relativeToTop ? 'bottom' : 'top';
        const horizontalPosition = relativeToLeft > relativeToRight ? 'left' : 'right';
        const objRight = Math.max(layout.width - (obj.left + obj.width), 0);
        const objLeft = Math.max(obj.left, 0);
        tooltip.top = "*";
        tooltip.bottom = "*";
        tooltip.left = "*";
        tooltip.right = "*";
        tooltip.middle = "auto";
        mask.top = "*";
        mask.bottom = "*";
        mask.left = "*";
        mask.right = "*";
        mask.middle = "auto";
        arrow.height = ARROW_SIZE;
        arrow.width = ARROW_SIZE * 2;
        arrow.right = '*';
        arrow.left = '*';
        if (verticalPosition === 'bottom') {
            tooltip.top = ((obj.top + obj.height) - (platform.isAndroid ? 0 : this.safeArea.top)) + MARGIN;
            arrow.location = 'top';
            arrowClipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`;
        }
        else {
            tooltip.bottom = (layout.height - (obj.top + (this.safeArea.bottom - this.safeArea.top))) - MARGIN;
            arrow.location = 'bottom';
            arrowClipPath = `polygon(50% 100%, 0% 0%, 100% 0%)`;
        }
        if (horizontalPosition === 'left') {
            tooltip.right = objRight;
            tooltip.alignment = 'right';
            arrow.right = objRight < MARGIN ? objRight + (MARGIN * 2) : objRight + MARGIN + this.computedHighlightPadding;
        }
        else {
            tooltip.left = objLeft;
            tooltip.alignment = 'left';
            arrow.left = objLeft < MARGIN ? objLeft + (MARGIN * 2) : objLeft + MARGIN + this.computedHighlightPadding;
        }
        mask.top = ((obj.top) - (platform.isAndroid ? 0 : this.safeArea.top));
        mask.right = objRight;
        this.mask = mask;
        this.tooltip = tooltip;
        this.tooltipStyle = tooltipStyle;
        this.arrow = arrow;
        this.arrowClipPath = arrowClipPath;
        this.layout = layout;
        this.size = {
            x: obj.width,
            y: obj.height,
        };
        this.position = {
            x: (Math.max(obj.left, 0)),
            y: (Math.max(obj.top, 0)),
        };
    }
    onUnloaded() {
        this.stop();
    }
    start() {
        if (this.computedSteps && this.computedSteps[0]) {
            const step = this.computedSteps[0];
            if (step.target && step.target.isLoaded && step.target.isLayoutValid) {
                this.copilotVisible = true;
                this.$emit('start');
            }
            else {
                this.$emit('not-ready');
            }
        }
    }
    next() {
        this.stepCount = this.stepCount === this.steps.length - 1 ? 0 : this.stepCount + 1;
        this.currentStep = this.steps[this.stepCount];
        this.$emit('step-change', { stepLeaving: this.steps[this.stepCount - 1], stepArriving: this.steps[this.stepCount] });
    }
    prev() {
        this.stepCount = this.stepCount === 0 ? this.steps.length - 1 : this.stepCount - 1;
        this.currentStep = this.steps[this.stepCount];
        this.$emit('step-change', { stepLeaving: this.steps[this.stepCount + 1], stepArriving: this.steps[this.stepCount] });
    }
    stop() {
        this.copilotVisible = false;
        this.stepCount = 0;
        this.$emit('stop');
        this.currentStep = {
            name: 'First',
            text: 'here is some text',
            order: 1,
            target: '',
            animated: true
        };
        this.arrow = {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            location: ''
        };
        this.loaded = false;
        this.tooltip = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            middle: '*',
            alignment: 'left'
        };
        this.layout = {
            width: 0,
            height: 0
        };
        this.stepNumberPosition = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this.size = {
            x: 0,
            y: 0
        };
        this.position = {
            x: 0,
            y: 0
        };
    }
    get computedCopilotVisible() {
        return this.copilotVisible;
    }
    get computedCurrentStep() {
        const verticalOffset = this.currentStep.verticalOffset === undefined ? 0 : this.currentStep.verticalOffset;
        if (this.currentStep.target && this.loaded) {
            if (!this.currentStep.darkenWholePage) {
                this.currentStep.darkenWholePage = false;
            }
            this.animateMove(this.currentStep.target, verticalOffset, this.currentStep.darkenWholePage);
        }
        return this.currentStep;
    }
    get computedSize() {
        return this.size;
    }
    get computedSteps() {
        return this.steps;
    }
    get computedPosition() {
        return this.position;
    }
    get computedLayout() {
        return this.layout;
    }
    get computedTooltip() {
        return this.tooltip;
    }
    get computedMask() {
        return this.mask;
    }
    get computedTooltipStyle() {
        if (this.computedCurrentStep && this.computedCurrentStep.customTooltipStyle) {
            return this.computedCurrentStep.customTooltipStyle;
        }
        else {
            return this.tooltipStyle;
        }
    }
    get computedArrow() {
        return this.arrow;
    }
    get computedArrowClipPath() {
        return this.arrowClipPath;
    }
    get computedSafeArea() {
        return this.safeArea;
    }
    get computedShowNumber() {
        if (this.computedCurrentStep && this.computedCurrentStep.showNumber !== undefined) {
            return this.computedCurrentStep.showNumber;
        }
        else {
            return this.showNumber;
        }
    }
    get computedNumberAccentColor() {
        if (this.computedCurrentStep && this.computedCurrentStep.numberAccentColor) {
            return this.computedCurrentStep.numberAccentColor;
        }
        else {
            return this.numberAccentColor;
        }
    }
    get computedNumberBackgroundColor() {
        if (this.computedCurrentStep && this.computedCurrentStep.numberBackgroundColor) {
            return this.computedCurrentStep.numberBackgroundColor;
        }
        else {
            return this.numberBackgroundColor;
        }
    }
    get computedLabels() {
        if (this.computedCurrentStep && this.computedCurrentStep.customLabels) {
            return this.computedCurrentStep.customLabels;
        }
        else {
            return this.labels;
        }
    }
    get computedHighlightBorderRadius() {
        if (this.computedCurrentStep && ((this.computedCurrentStep.highlightBorderRadius && this.computedCurrentStep.highlightBorderRadius !== undefined) || this.computedCurrentStep.highlightBorderRadius === 0)) {
            return this.computedCurrentStep.highlightBorderRadius;
        }
        else {
            return this.highlightBorderRadius;
        }
    }
    get computedHighlightPadding() {
        if (this.computedCurrentStep && this.computedCurrentStep.highlightPadding) {
            return this.computedCurrentStep.highlightPadding;
        }
        else {
            return this.highlightPadding;
        }
    }
};
__decorate([
    vuePropertyDecorator.Prop()
], CopilotModal.prototype, "steps", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 300 })
], CopilotModal.prototype, "animationDuration", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: {
            fontFamily: 'Avenir-Light',
            tooltipFontSize: 14,
            tooltipTextColor: 'black',
            buttonFontSize: 14,
            accentColor: 'green',
        } })
], CopilotModal.prototype, "tooltipStyle", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: false })
], CopilotModal.prototype, "androidStatusBarVisible", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'rgba(0, 0, 0, 0.4)' })
], CopilotModal.prototype, "overlayColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: {
            skip: 'Skip',
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish'
        } })
], CopilotModal.prototype, "labels", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'green' })
], CopilotModal.prototype, "numberAccentColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'white' })
], CopilotModal.prototype, "numberBackgroundColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 'white' })
], CopilotModal.prototype, "toolTipBackgroundColor", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: '3' })
], CopilotModal.prototype, "toolTipBorderRadius", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true })
], CopilotModal.prototype, "showNumber", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 0 })
], CopilotModal.prototype, "highlightBorderRadius", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 5 })
], CopilotModal.prototype, "highlightPadding", void 0);
CopilotModal = __decorate([
    vuePropertyDecorator.Component({
        name: 'copilot-modal',
        components: {
            ViewMask: ViewMask$1,
            Tooltip: Tooltip$1,
            StepNumber: StepNumber$1
        }
    })
], CopilotModal);
var script$3 = CopilotModal;/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.computedCopilotVisible)?_c('Gridlayout',{ref:"container",attrs:{"rows":"*","columns":"*"},on:{"loaded":function($event){return _vm.onLoaded()}}},[_c('ViewMask',{attrs:{"row":"0","height":"100%","animated":_vm.computedCurrentStep.animated,"size":_vm.computedSize,"position":_vm.computedPosition,"layout":_vm.computedLayout,"easing":_vm.easing,"mask":_vm.computedMask,"highlightPadding":_vm.computedHighlightPadding,"highlightBorderRadius":_vm.computedHighlightBorderRadius,"wholePage":_vm.computedCurrentStep.wholePage,"animationDuration":_vm.animationDuration,"overlayColor":_vm.overlayColor},on:{"highlight-tap":function($event){return _vm.$emit('highlight-tap')}}}),_vm._v(" "),_c('StepNumber',{directives:[{name:"show",rawName:"v-show",value:(_vm.computedShowNumber),expression:"computedShowNumber"}],attrs:{"row":"0","height":"100%","animated":_vm.computedCurrentStep.animated,"size":_vm.computedSize,"position":_vm.computedPosition,"layout":_vm.computedLayout,"easing":_vm.easing,"animationDuration":"100","accentColor":_vm.computedNumberAccentColor,"backgroundColor":_vm.computedNumberBackgroundColor,"stepNumber":_vm.computedCurrentStep.order,"stepNumberPosition":_vm.computedStepNumberPosition,"safeArea":_vm.computedSafeArea,"numberFontFamilyStyle":_vm.computedTooltipStyle.fontFamily}}),_vm._v(" "),_c('Tooltip',{ref:"tooltip",attrs:{"row":"0","backgroundColor":_vm.toolTipBackgroundColor,"toolTipBorderRadius":_vm.toolTipBorderRadius,"currentStep":_vm.computedCurrentStep,"handleNext":_vm.next,"handlePrev":_vm.prev,"handleStop":_vm.stop,"labels":_vm.computedLabels,"tooltipStyle":_vm.computedTooltipStyle,"tooltipPosition":_vm.computedTooltip,"layout":_vm.computedLayout,"tooltipMargin":_vm.margin,"arrowClipPath":_vm.computedArrowClipPath,"arrow":_vm.computedArrow,"padding":"0"}})],1):_vm._e()};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var CopilotModal$1 = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );async function install(Vue, options) {
    if (install.installed) {
        console.log('not installed');
        return;
    }
    else {
        install.installed = true;
        Vue.component('Copilot', CopilotModal$1);
    }
}
class Copilot {
}
(function (install) {
})(install || (install = {}));
Copilot.install = install;
let GlobalVue;
if (typeof window !== "undefined" && typeof window.Vue !== 'undefined') {
    GlobalVue = window.Vue;
}
else if (typeof global !== "undefined" && typeof global['Vue'] !== 'undefined') {
    GlobalVue = global['Vue'];
}
if (GlobalVue) {
    GlobalVue.use(Copilot);
}exports.default=Copilot;exports.install=install;return exports;}({},vuePropertyDecorator,platform,application,nativescriptTweenjs,builder));