import{a0 as P,r as d,a1 as C,a2 as w,a3 as x,a4 as m,M as b,u as O,a5 as M,q as B,W as k}from"./entry.90b0be8e.js";function R(...o){var h;const l=typeof o[o.length-1]=="string"?o.pop():void 0;typeof o[0]!="string"&&o.unshift(l);let[a,u,e={}]=o;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof u!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const t=O(),D=()=>null,v=()=>t.isHydrating?t.payload.data[a]:t.static.data[a];e.server=e.server??!0,e.default=e.default??D,e.getCachedData=e.getCachedData??v,e.lazy=e.lazy??!1,e.immediate=e.immediate??!0,e.deep=e.deep??P.deep;const f=()=>![null,void 0].includes(e.getCachedData(a));if(!t._asyncData[a]||!e.immediate){(h=t.payload._errors)[a]??(h[a]=null);const r=e.deep?d:C;t._asyncData[a]={data:r(e.getCachedData(a)??e.default()),pending:d(!f()),error:w(t.payload._errors,a),status:d("idle")}}const s={...t._asyncData[a]};s.refresh=s.execute=(r={})=>{if(t._asyncDataPromises[a]){if(r.dedupe===!1)return t._asyncDataPromises[a];t._asyncDataPromises[a].cancelled=!0}if((r._initial||t.isHydrating&&r._initial!==!1)&&f())return Promise.resolve(e.getCachedData(a));s.pending.value=!0,s.status.value="pending";const c=new Promise((n,i)=>{try{n(u(t))}catch(g){i(g)}}).then(n=>{if(c.cancelled)return t._asyncDataPromises[a];let i=n;e.transform&&(i=e.transform(n)),e.pick&&(i=E(i,e.pick)),t.payload.data[a]=i,s.data.value=i,s.error.value=null,s.status.value="success"}).catch(n=>{if(c.cancelled)return t._asyncDataPromises[a];s.error.value=M(n),s.data.value=B(e.default()),s.status.value="error"}).finally(()=>{c.cancelled||(s.pending.value=!1,delete t._asyncDataPromises[a])});return t._asyncDataPromises[a]=c,t._asyncDataPromises[a]};const y=()=>s.refresh({_initial:!0}),_=e.server!==!1&&t.payload.serverRendered;{const r=k();if(r&&!r._nuxtOnBeforeMountCbs){r._nuxtOnBeforeMountCbs=[];const n=r._nuxtOnBeforeMountCbs;r&&(x(()=>{n.forEach(i=>{i()}),n.splice(0,n.length)}),m(()=>n.splice(0,n.length)))}_&&t.isHydrating&&(s.error.value||f())?(s.pending.value=!1,s.status.value=s.error.value?"error":"success"):r&&(t.payload.serverRendered&&t.isHydrating||e.lazy)&&e.immediate?r._nuxtOnBeforeMountCbs.push(y):e.immediate&&y(),e.watch&&b(e.watch,()=>s.refresh());const c=t.hook("app:data:refresh",async n=>{(!n||n.includes(a))&&await s.refresh()});r&&m(c)}const p=Promise.resolve(t._asyncDataPromises[a]).then(()=>s);return Object.assign(p,s),p}function E(o,l){const a={};for(const u of l)a[u]=o[u];return a}export{R as u};
