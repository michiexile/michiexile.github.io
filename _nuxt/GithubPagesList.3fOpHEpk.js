import C from"./LinkToGithubIo.KojOY9bZ.js";import{j as L,A as c,B as D,C as T,D as x,E,o as p,c as l,F as y,G as j,q as R,y as G,b as U,H as g}from"./entry.dw-XoQYL.js";import{u as B}from"./asyncData.sy8kVHTz.js";import"./nuxt-link.RRiePPnQ.js";function N(r,t,a){const[e={},u]=typeof t=="string"?[{},t]:[t,a],o=L(()=>{let i=r;return typeof i=="function"&&(i=i()),c(i)}),n=e.key||D([u,typeof o.value=="string"?o.value:"",...V(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const h=n===u?"$f"+n:n;if(!e.baseURL&&typeof o.value=="string"&&o.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:d,lazy:_,default:m,transform:f,pick:$,watch:b,immediate:q,getCachedData:v,deep:A,...F}=e,w=T({...x,...F,cache:typeof e.cache=="boolean"?void 0:e.cache}),O={server:d,lazy:_,default:m,transform:f,pick:$,immediate:q,getCachedData:v,deep:A,watch:b===!1?[]:[w,o,...b||[]]};let s;return B(h,()=>{var k;(k=s==null?void 0:s.abort)==null||k.call(s),s=typeof AbortController<"u"?new AbortController:{};const i=c(e.timeout);return i&&setTimeout(()=>s.abort(),i),(e.$fetch||globalThis.$fetch)(o.value,{signal:s.signal,...w})},O)}function V(r){var a;const t=[((a=c(r.method))==null?void 0:a.toUpperCase())||"GET",c(r.baseURL)];for(const e of[r.params||r.query]){const u=c(e);if(!u)continue;const o={};for(const[n,h]of Object.entries(u))o[c(n)]=c(h);t.push(o)}return t}const W={key:0},z="https://api.github.com/graphql",Y={__name:"GithubPagesList",props:["owner"],async setup(r){let t,a;const e=r,o=G().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([t,a]=E(()=>N(z,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),t=await t,a(),t);return(d,_)=>{const m=C;return p(),l("ul",null,[(p(!0),l(y,null,j(R(h).data.repositoryOwner.repositories.nodes,f=>(p(),l(y,null,[f.ref!=null?(p(),l(y,{key:0},[f.ref.repository.isFork?g("",!0):(p(),l(y,{key:0},[f.ref.repository.owner.login==e.owner?(p(),l("li",W,[U(m,{repository:f.ref.repository},null,8,["repository"])])):g("",!0)],64))],64)):g("",!0)],64))),256))])}}};export{Y as default};
