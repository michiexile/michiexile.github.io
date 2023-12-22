import C from"./LinkToGithubIo.74db007f.js";import{j as L,B as u,C as D,D as T,E as x,F as E,o as p,c as l,G as m,H as j,q as R,y as G,b as U,I as d}from"./entry.b863d7a3.js";import{u as B}from"./asyncData.9115824c.js";import"./nuxt-link.3193f25a.js";function N(n,t,i){const[e={},s]=typeof t=="string"?[{},t]:[t,i],o=L(()=>{let c=n;return typeof c=="function"&&(c=c()),u(c)}),r=e.key||D([s,typeof o.value=="string"?o.value:"",...V(e)]);if(!r||typeof r!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+r);if(!n)throw new Error("[nuxt] [useFetch] request is missing.");const h=r===s?"$f"+r:r;if(!e.baseURL&&typeof o.value=="string"&&o.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:y,lazy:_,default:g,transform:f,pick:A,watch:b,immediate:$,getCachedData:q,deep:v,...F}=e,w=T({...x,...F,cache:typeof e.cache=="boolean"?void 0:e.cache}),O={server:y,lazy:_,default:g,transform:f,pick:A,immediate:$,getCachedData:q,deep:v,watch:b===!1?[]:[w,o,...b||[]]};let a;return B(h,()=>{var k;(k=a==null?void 0:a.abort)==null||k.call(a),a=typeof AbortController<"u"?new AbortController:{};const c=u(e.timeout);return c&&setTimeout(()=>a.abort(),c),(e.$fetch||globalThis.$fetch)(o.value,{signal:a.signal,...w})},O)}function V(n){var i;const t=[((i=u(n.method))==null?void 0:i.toUpperCase())||"GET",u(n.baseURL)];for(const e of[n.params||n.query]){const s=u(e);if(!s)continue;const o={},r=Array.isArray(s)?s:Object.entries(s);for(const[h,y]of r)o[u(h)]=u(y);t.push(o)}return t}const W={key:0},z="https://api.github.com/graphql",Y={__name:"GithubPagesList",props:["owner"],async setup(n){let t,i;const e=n,o=G().githubApiToken,r=`
query {
  repositoryOwner(login:"${e.owner}") {
    repositories(first:100) {
      nodes {
        ref(qualifiedName:"gh-pages") {
          repository {
            name
            owner { login }
            nameWithOwner
            description
            isFork
          }
        }
      }
    }
  }
}`.replaceAll(`
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([t,i]=E(()=>N(z,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${r}" }`},"$dWoZmYjL2R")),t=await t,i(),t);return(y,_)=>{const g=C;return p(),l("ul",null,[(p(!0),l(m,null,j(R(h).data.repositoryOwner.repositories.nodes,f=>(p(),l(m,null,[f.ref!=null?(p(),l(m,{key:0},[f.ref.repository.isFork?d("",!0):(p(),l(m,{key:0},[f.ref.repository.owner.login==e.owner?(p(),l("li",W,[U(g,{repository:f.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{Y as default};
