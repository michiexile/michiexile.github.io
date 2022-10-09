import{x as f,m as p,l as E,I,J as c,e as P,K as v,A as m,L as A,a as O,d as e,_ as r,E as D,M as R,N as V,G as y,z as b,O as $,k as S}from"./entry.f6a47575.js";import{u as k}from"./asyncData.c4419afb.js";import"./ContentDoc.3071a977.js";import"./ContentList.1362a0f5.js";import"./ContentQuery.75f86845.js";import"./ContentSlot.84f505de.js";import"./Markdown.17db836d.js";import"./ProseCode.7166901f.js";import"./head.7f4f89c6.js";const x=f({emits:{error(t){return!0}},setup(t,{slots:a,emit:u}){const n=p(null),i=E();return I(o=>{if(!i.isHydrating)return u("error",o),n.value=o,!1}),()=>{var o,l;return n.value?(o=a.error)==null?void 0:o.call(a,{error:n}):(l=a.default)==null?void 0:l.call(a)}}}),j=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),N=f({name:"ClientOnly",props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:a}){const u=p(!1);return c(()=>{u.value=!0}),n=>{var d;if(u.value)return(d=a.default)==null?void 0:d.call(a);const i=a.fallback||a.placeholder;if(i)return i();const o=n.fallback||n.placeholder||"",l=n.fallbackTag||n.placeholderTag||"span";return P(l,null,o)}}}),s=new WeakMap;function C(t){if(s.has(t))return s.get(t);const a={...t};return a.render?a.render=(u,...n)=>{var i;if(u.mounted$){const o=t.render(u,...n);return o.children===null||typeof o.children=="string"?v(o.type,o.props,o.children,o.patchFlag,o.dynamicProps,o.shapeFlag):m(o)}else return m("div",(i=u.$attrs)!=null?i:u._.attrs)}:a.template&&(a.template=`
      <template v-if="mounted$">${t.template}</template>
      <template v-else><div></div></template>
    `),a.setup=(u,n)=>{var o;const i=p(!1);return c(()=>{i.value=!0}),Promise.resolve(((o=t.setup)==null?void 0:o.call(t,u,n))||{}).then(l=>typeof l!="function"?{...l,mounted$:i}:(...d)=>{if(i.value){const _=l(...d);return _.children===null||typeof _.children=="string"?v(_.type,_.props,_.children,_.patchFlag,_.dynamicProps,_.shapeFlag):m(_)}else return m("div",n.attrs)})},s.set(t,a),a}const M=Object.freeze(Object.defineProperty({__proto__:null,default:N,createClientOnly:C},Symbol.toStringTag,{value:"Module"})),z=f({name:"ServerPlaceholder",render(){return P("div")}}),B=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),w=f({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:String,default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"}},setup(t){const a=q({duration:t.duration,throttle:t.throttle}),u=E();return u.hook("page:start",a.start),u.hook("page:finish",a.finish),A(()=>a.clear),()=>m("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:`${a.progress.value}%`,height:`${t.height}px`,opacity:a.isLoading.value?1:0,background:t.color,backgroundSize:`${100/a.progress.value*100}% auto`,transition:"width 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}})}});function q(t){const a=p(0),u=p(!1),n=O(()=>1e4/t.duration);let i=null,o=null;function l(){_(),a.value=0,u.value=!0,t.throttle?o=setTimeout(h,t.throttle):h()}function d(){a.value=100,g()}function _(){clearInterval(i),clearTimeout(o),i=null,o=null}function T(L){a.value=Math.min(100,a.value+L)}function g(){_(),setTimeout(()=>{u.value=!1,setTimeout(()=>{a.value=0},400)},500)}function h(){i=setInterval(()=>{T(n.value)},100)}return{progress:a,isLoading:u,start:l,finish:d,clear:_}}const F=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));e(()=>r(()=>import("./GithubPagesList.ea1dd6d4.js"),["GithubPagesList.ea1dd6d4.js","LinkToGithubIo.66c10fb3.js","entry.f6a47575.js","entry.f4faeb31.css","asyncData.c4419afb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./LinkToGithubIo.66c10fb3.js"),["LinkToGithubIo.66c10fb3.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Footer.c5d6375b.js"),["Footer.c5d6375b.js","entry.f6a47575.js","entry.f4faeb31.css","index.5c3473aa.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./NavBar.3ed45339.js"),["NavBar.3ed45339.js","entry.f6a47575.js","entry.f4faeb31.css","index.5c3473aa.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentDoc.3071a977.js"),["ContentDoc.3071a977.js","entry.f6a47575.js","entry.f4faeb31.css","head.7f4f89c6.js","ContentQuery.75f86845.js","asyncData.c4419afb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentList.1362a0f5.js"),["ContentList.1362a0f5.js","ContentQuery.75f86845.js","entry.f6a47575.js","entry.f4faeb31.css","asyncData.c4419afb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>H),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentQuery.75f86845.js"),["ContentQuery.75f86845.js","entry.f6a47575.js","entry.f4faeb31.css","asyncData.c4419afb.js"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.a0),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.$),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ContentSlot.84f505de.js"),["ContentSlot.84f505de.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.Z),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.a1),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./Markdown.17db836d.js"),["Markdown.17db836d.js","ContentSlot.84f505de.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseA.65403e95.js"),["ProseA.65403e95.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseBlockquote.2022dccd.js"),["ProseBlockquote.2022dccd.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseCode.7166901f.js"),["ProseCode.7166901f.js","ProseCode.e63e49c6.css","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseCodeInline.382ff1a4.js"),["ProseCodeInline.382ff1a4.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseEm.07f02bb9.js"),["ProseEm.07f02bb9.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH1.942b1524.js"),["ProseH1.942b1524.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH2.761f6b45.js"),["ProseH2.761f6b45.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH3.6964b16c.js"),["ProseH3.6964b16c.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH4.ac2dad1f.js"),["ProseH4.ac2dad1f.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH5.d803b953.js"),["ProseH5.d803b953.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseH6.91a269d5.js"),["ProseH6.91a269d5.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseHr.e66c3ff4.js"),["ProseHr.e66c3ff4.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseImg.2635e6b3.js"),["ProseImg.2635e6b3.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseLi.7077d72e.js"),["ProseLi.7077d72e.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseOl.73e115f0.js"),["ProseOl.73e115f0.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseP.3b0ca1ba.js"),["ProseP.3b0ca1ba.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseStrong.f5ac0a07.js"),["ProseStrong.f5ac0a07.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTable.28016502.js"),["ProseTable.28016502.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTbody.9f31d3d4.js"),["ProseTbody.9f31d3d4.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTd.fca54e4d.js"),["ProseTd.fca54e4d.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTh.667a68d4.js"),["ProseTh.667a68d4.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseThead.71beedff.js"),["ProseThead.71beedff.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseTr.02487a8e.js"),["ProseTr.02487a8e.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./ProseUl.f83fdda5.js"),["ProseUl.f83fdda5.js","entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./welcome.f8a0c04b.js"),["welcome.f8a0c04b.js","entry.f6a47575.js","entry.f4faeb31.css","asyncData.c4419afb.js","ContentDoc.3071a977.js","head.7f4f89c6.js","ContentQuery.75f86845.js","ContentList.1362a0f5.js","ContentSlot.84f505de.js","Markdown.17db836d.js","ProseCode.7166901f.js","ProseCode.e63e49c6.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.a2),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>j),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>M),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>B),void 0,import.meta.url).then(t=>t.default||t));e(()=>r(()=>import("./entry.f6a47575.js").then(t=>t.Y),["entry.f6a47575.js","entry.f4faeb31.css"],import.meta.url).then(t=>t.default||t));e(()=>r(()=>Promise.resolve().then(()=>F),void 0,import.meta.url).then(t=>t.default||t));const G=f({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:a}=D(t),u=O(()=>{var i;return typeof((i=a.value)==null?void 0:i.params)=="function"?a.value.params():a.value});if(!u.value&&R("dd-navigation").value){const{navigation:i}=V();return{navigation:i}}const{data:n}=await k(`content-navigation-${y(u.value)}`,()=>$(u.value));return{navigation:n}},render(t){const a=b(),{navigation:u}=t,n=l=>m(S,{to:l._path},()=>l.title),i=(l,d)=>m("ul",d?{"data-level":d}:null,l.map(_=>_.children?m("li",null,[n(_),i(_.children,d+1)]):m("li",null,n(_)))),o=l=>i(l,0);return a!=null&&a.default?a.default({navigation:u,...this.$attrs}):o(u)}}),H=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));export{G as default};
