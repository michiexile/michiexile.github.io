import{A as s,B as y,C as g,D as C,E as o}from"./entry.e1aacc9a.js";import{u as p}from"./head.3eb9d617.js";import D from"./ContentRenderer.4b8ba8ea.js";import v from"./ContentQuery.d645ff97.js";import"./composables.33d3d011.js";import"./ContentRendererMarkdown.f7beb144.js";import"./index.68c44503.js";import"./asyncData.de74dc2c.js";const O=s({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(f){const e=y(),{tag:m,excerpt:i,path:d,query:r,head:a}=f,c={...r||{},path:d||(r==null?void 0:r.path)||g(C().path),find:"one"},l=(t,n)=>o("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:t,data:n},null,2));return o(v,c,{default:e!=null&&e.default?({data:t,refresh:n,isPartial:h})=>{var u;return a&&p(t),(u=e.default)==null?void 0:u.call(e,{doc:t,refresh:n,isPartial:h,excerpt:i,...this.$attrs})}:({data:t})=>(a&&p(t),o(D,{value:t,excerpt:i,tag:m,...this.$attrs},{empty:n=>e!=null&&e.empty?e.empty(n):l("default",t)})),empty:t=>{var n;return((n=e==null?void 0:e.empty)==null?void 0:n.call(e,t))||o("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":t=>{var n;return((n=e==null?void 0:e["not-found"])==null?void 0:n.call(e,t))||o("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}});export{O as default};
