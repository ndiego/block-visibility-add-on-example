(()=>{"use strict";const e=window.lodash,t=window.wp.i18n,o=window.wp.hooks;function l(e,t,o){var l;return!(t&&!e.hasOwnProperty("exampleControl"))&&!!o.some((e=>"example_control"===e.settingSlug))&&null!==(l=e?.exampleControl?.hideBlock)&&void 0!==l&&l}(0,o.addFilter)("blockVisibility.contextualIndicatorActiveControls","block-visibility-add-on-example/add-contextual-indicators",(function(e,t,o,i,n,r){return{...e,"example-control":l(o,i,n)}}));const i=window.wp.element,n=window.wp.components;function r(o){var l,r;const{enabledControls:a,controlSetAtts:c,setControlAtts:s}=o;if(!a.some((e=>"example_control"===e.settingSlug&&e.isActive)))return null;const d=null!==(l=c?.controls?.exampleControl)&&void 0!==l?l:{},p=null!==(r=d?.hideBlock)&&void 0!==r&&r;return(0,i.createElement)("div",{className:"controls-panel-item add-on-example-control"},(0,i.createElement)("h3",{className:"controls-panel-item__header"},(0,t.__)("Example Control","block-visibility-add-on-example")),(0,i.createElement)("div",{className:"controls-panel-item__description"},(0,t.__)("Add a description for the control.","block-visibility-add-on-example")),(0,i.createElement)("div",{className:"controls-panel-item__fields"},(0,i.createElement)(n.ToggleControl,{label:(0,t.__)("Hide the block if toggled","block-visibility"),checked:p,onChange:()=>s("exampleControl",(0,e.assign)({...d},{hideBlock:!p}))})))}function a(e){return e.push({label:(0,t.__)("Example Control","block-visibility-add-on-example"),attributeSlug:"exampleControl",settingSlug:"example_control"}),e}(0,o.addFilter)("blockVisibility.addControlSetControls","block-visibility-add-on-example/add-control-set-controls",(function(e){return t=>{const{uniqueIndex:o}=t;return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(e,t),(0,i.createElement)(n.Fill,{name:"ControlSetControlsMiddle-"+o},(0,i.createElement)(r,t)))}}),15),(0,o.addFilter)("blockVisibility.attributes","block-visibility-add-on-example/attributes",(function(t){var o;const l=null!==(o=t?.blockVisibility?.properties?.controlSets?.items?.properties)&&void 0!==o?o:null;return l.controls.properties=(0,e.assign)(l.controls.properties,{exampleControl:{type:"object",properties:{hideBlock:{type:"boolean"}}}}),t})),(0,o.addFilter)("blockVisibility.controls","block-visibility-add-on-example/controls",a),(0,o.addFilter)("blockVisibilityPro.controls","block-visibility-add-on-example/controls",a)})();