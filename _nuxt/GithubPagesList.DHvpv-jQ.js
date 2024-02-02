import C from"./LinkToGithubIo.5Dc4y1ma.js";import{j as L,C as c,D,E as T,F as x,G as E,o as l,c as p,H as m,I as j,s as R,z as G,b as U,J as g}from"./entry.la0ufMkR.js";import{u as z}from"./asyncData.IKgbFfhA.js";import"./nuxt-link.T-_lfDUA.js";function N(r,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=L(()=>{let i=r;return typeof i=="function"&&(i=i()),c(i)}),n=e.key||D([u,typeof t.value=="string"?t.value:"",...V(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const h=n===u?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:d,lazy:_,default:y,transform:f,pick:v,watch:b,immediate:$,getCachedData:F,deep:O,...q}=e,w=T({...x,...q,cache:typeof e.cache=="boolean"?void 0:e.cache}),A={server:d,lazy:_,default:y,transform:f,pick:v,immediate:$,getCachedData:F,deep:O,watch:b===!1?[]:[w,t,...b||[]]};let s;return z(h,()=>{var k;(k=s==null?void 0:s.abort)==null||k.call(s),s=typeof AbortController<"u"?new AbortController:{};const i=c(e.timeout);return i&&setTimeout(()=>s.abort(),i),(e.$fetch||globalThis.$fetch)(t.value,{signal:s.signal,...w})},A)}function V(r){var a;const o=[((a=c(r.method))==null?void 0:a.toUpperCase())||"GET",c(r.baseURL)];for(const e of[r.params||r.query]){const u=c(e);if(!u)continue;const t={};for(const[n,h]of Object.entries(u))t[c(n)]=c(h);o.push(t)}return o}const B={key:0},I="https://api.github.com/graphql",Q={__name:"GithubPagesList",props:["owner"],async setup(r){let o,a;const e=r,t=G().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([o,a]=E(()=>N(I,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(d,_)=>{const y=C;return l(),p("ul",null,[(l(!0),p(m,null,j(R(h).data.repositoryOwner.repositories.nodes,f=>(l(),p(m,null,[f.ref!=null?(l(),p(m,{key:0},[f.ref.repository.isFork?g("",!0):(l(),p(m,{key:0},[f.ref.repository.owner.login==e.owner?(l(),p("li",B,[U(y,{repository:f.ref.repository},null,8,["repository"])])):g("",!0)],64))],64)):g("",!0)],64))),256))])}}};export{Q as default};
