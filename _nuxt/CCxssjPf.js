import L from"./C__MYIX8.js";import{j as D,C as i,D as T,E as x,F as E,G as j,o as p,c as l,H as h,I as R,s as G,z as U,b as z,J as y}from"./DVFnKfB1.js";import{u as N}from"./azq_lW-j.js";import"./DBdm8-_f.js";function V(s,o,a){const[e={},c]=typeof o=="string"?[{},o]:[o,a],t=D(()=>i(s)),n=e.key||T([c,typeof t.value=="string"?t.value:"",...B(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const f=n===c?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:d,lazy:g,default:m,transform:u,pick:v,watch:_,immediate:$,getCachedData:F,deep:O,dedupe:q,...A}=e,b=x({...E,...A,cache:typeof e.cache=="boolean"?void 0:e.cache}),C={server:d,lazy:g,default:m,transform:u,pick:v,immediate:$,getCachedData:F,deep:O,dedupe:q,watch:_===!1?[]:[b,t,..._||[]]};let r;return N(f,()=>{var k;(k=r==null?void 0:r.abort)==null||k.call(r),r=typeof AbortController<"u"?new AbortController:{};const w=i(e.timeout);return w&&setTimeout(()=>r.abort(),w),(e.$fetch||globalThis.$fetch)(t.value,{signal:r.signal,...b})},C)}function B(s){var a;const o=[((a=i(s.method))==null?void 0:a.toUpperCase())||"GET",i(s.baseURL)];for(const e of[s.params||s.query]){const c=i(e);if(!c)continue;const t={};for(const[n,f]of Object.entries(c))t[i(n)]=i(f);o.push(t)}return o}const I={key:0},P="https://api.github.com/graphql",Y={__name:"GithubPagesList",props:["owner"],async setup(s){let o,a;const e=s,t=U().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:f}=([o,a]=j(()=>V(P,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(d,g)=>{const m=L;return p(),l("ul",null,[(p(!0),l(h,null,R(G(f).data.repositoryOwner.repositories.nodes,u=>(p(),l(h,null,[u.ref!=null?(p(),l(h,{key:0},[u.ref.repository.isFork?y("",!0):(p(),l(h,{key:0},[u.ref.repository.owner.login==e.owner?(p(),l("li",I,[z(m,{repository:u.ref.repository},null,8,["repository"])])):y("",!0)],64))],64)):y("",!0)],64))),256))])}}};export{Y as default};
