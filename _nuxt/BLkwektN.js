import{f as _,k as A,j as b,ai as k,r as C,aj as B,ak as L,al as N,am as j,R as T,an as w,q,a8 as U,ao as I,ap as V,aq as D,ar as E,z as F,u as R,as as O,M as z,at as H}from"./H3Bht4wv.js";const M=(...t)=>t.find(l=>l!==void 0);function $(t){const l=t.componentName||"NuxtLink";function u(e,s){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return S(e,t.trailingSlash);const n="path"in e&&e.path!==void 0?e.path:s(e).path;return{...e,name:void 0,path:S(n,t.trailingSlash)}}return _({name:l,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(e,{slots:s}){const n=A(),m=F(),a=b(()=>{const r=e.to||e.href||"";return u(r,n.resolve)}),c=b(()=>typeof a.value=="string"&&k(a.value,{acceptRelative:!0})),g=b(()=>e.target&&e.target!=="_self"),p=b(()=>e.external||g.value?!0:typeof a.value=="object"?!1:a.value===""||c.value),x=C(!1),v=C(null),P=r=>{var f;v.value=e.custom?(f=r==null?void 0:r.$el)==null?void 0:f.nextElementSibling:r==null?void 0:r.$el};if(e.prefetch!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!W()){const f=R();let d,i=null;B(()=>{const y=Q();L(()=>{d=N(()=>{var o;(o=v==null?void 0:v.value)!=null&&o.tagName&&(i=y.observe(v.value,async()=>{i==null||i(),i=null;const h=typeof a.value=="string"?a.value:n.resolve(a.value).fullPath;await Promise.all([f.hooks.callHook("link:prefetch",h).catch(()=>{}),!p.value&&j(a.value,n).catch(()=>{})]),x.value=!0}))})})}),T(()=>{d&&w(d),i==null||i(),i=null})}return()=>{var i,y;if(!p.value){const o={ref:P,to:a.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(x.value&&(o.class=e.prefetchedClass||t.prefetchedClass),o.rel=e.rel||void 0),q(U("RouterLink"),o,s.default)}const r=typeof a.value=="object"?((i=n.resolve(a.value))==null?void 0:i.href)??null:a.value&&!e.external&&!c.value?u(I(m.app.baseURL,a.value),n.resolve):a.value||null,f=e.target||null,d=M(e.noRel?"":e.rel,t.externalRelAttribute,c.value||g.value?"noopener noreferrer":"")||null;if(e.custom){if(!s.default)return null;const o=()=>O(r,{replace:e.replace,external:e.external});return s.default({href:r,navigate:o,get route(){if(!r)return;const h=V(r);return{path:h.pathname,fullPath:h.pathname,get query(){return D(h.search)},hash:h.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:r}},rel:d,target:f,isExternal:p.value,isActive:!1,isExactActive:!1})}return q("a",{ref:v,href:r,rel:d,target:f},(y=s.default)==null?void 0:y.call(s))}}})}const J=$(E);function S(t,l){const u=l==="append"?z:H;return k(t)&&!t.startsWith("http")?t:u(t,!0)}function Q(){const t=R();if(t._observer)return t._observer;let l=null;const u=new Map,e=(n,m)=>(l||(l=new IntersectionObserver(a=>{for(const c of a){const g=u.get(c.target);(c.isIntersecting||c.intersectionRatio>0)&&g&&g()}})),u.set(n,m),l.observe(n),()=>{u.delete(n),l.unobserve(n),u.size===0&&(l.disconnect(),l=null)});return t._observer={observe:e}}function W(){const t=navigator.connection;return!!(t&&(t.saveData||/2g/.test(t.effectiveType)))}export{J as _};
