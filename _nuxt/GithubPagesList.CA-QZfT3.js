import L from"./LinkToGithubIo.BA1KJdNw.js";import{j as D,C as c,D as T,E as x,F as E,G as j,o as f,c as l,H as m,I as R,s as G,z as U,b as z,J as d}from"./entry.DWAqlkSY.js";import{u as N}from"./asyncData.Cl3bVwvV.js";import"./nuxt-link.Dz6ukN5c.js";function V(r,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=D(()=>{let i=r;return typeof i=="function"&&(i=i()),c(i)}),n=e.key||T([u,typeof t.value=="string"?t.value:"",...B(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const h=n===u?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:_,default:y,transform:p,pick:v,watch:b,immediate:$,getCachedData:F,deep:O,dedupe:q,...A}=e,w=x({...E,...A,cache:typeof e.cache=="boolean"?void 0:e.cache}),C={server:g,lazy:_,default:y,transform:p,pick:v,immediate:$,getCachedData:F,deep:O,dedupe:q,watch:b===!1?[]:[w,t,...b||[]]};let s;return N(h,()=>{var k;(k=s==null?void 0:s.abort)==null||k.call(s),s=typeof AbortController<"u"?new AbortController:{};const i=c(e.timeout);return i&&setTimeout(()=>s.abort(),i),(e.$fetch||globalThis.$fetch)(t.value,{signal:s.signal,...w})},C)}function B(r){var a;const o=[((a=c(r.method))==null?void 0:a.toUpperCase())||"GET",c(r.baseURL)];for(const e of[r.params||r.query]){const u=c(e);if(!u)continue;const t={};for(const[n,h]of Object.entries(u))t[c(n)]=c(h);o.push(t)}return o}const I={key:0},P="https://api.github.com/graphql",Y={__name:"GithubPagesList",props:["owner"],async setup(r){let o,a;const e=r,t=U().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([o,a]=j(()=>V(P,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(g,_)=>{const y=L;return f(),l("ul",null,[(f(!0),l(m,null,R(G(h).data.repositoryOwner.repositories.nodes,p=>(f(),l(m,null,[p.ref!=null?(f(),l(m,{key:0},[p.ref.repository.isFork?d("",!0):(f(),l(m,{key:0},[p.ref.repository.owner.login==e.owner?(f(),l("li",I,[z(y,{repository:p.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{Y as default};
