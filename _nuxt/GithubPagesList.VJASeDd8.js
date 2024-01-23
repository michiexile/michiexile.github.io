import C from"./LinkToGithubIo.8SsY_bSR.js";import{j as L,B as c,C as D,D as T,E as x,F as E,o as l,c as p,G as y,H as j,q as R,y as G,b as U,I as g}from"./entry.qjSeWgbS.js";import{u as B}from"./asyncData.n9pHyUQB.js";import"./nuxt-link.QrXV5w29.js";function N(r,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=L(()=>{let i=r;return typeof i=="function"&&(i=i()),c(i)}),n=e.key||D([u,typeof t.value=="string"?t.value:"",...V(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!r)throw new Error("[nuxt] [useFetch] request is missing.");const h=n===u?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:d,lazy:_,default:m,transform:f,pick:v,watch:b,immediate:$,getCachedData:q,deep:F,...O}=e,w=T({...x,...O,cache:typeof e.cache=="boolean"?void 0:e.cache}),A={server:d,lazy:_,default:m,transform:f,pick:v,immediate:$,getCachedData:q,deep:F,watch:b===!1?[]:[w,t,...b||[]]};let s;return B(h,()=>{var k;(k=s==null?void 0:s.abort)==null||k.call(s),s=typeof AbortController<"u"?new AbortController:{};const i=c(e.timeout);return i&&setTimeout(()=>s.abort(),i),(e.$fetch||globalThis.$fetch)(t.value,{signal:s.signal,...w})},A)}function V(r){var a;const o=[((a=c(r.method))==null?void 0:a.toUpperCase())||"GET",c(r.baseURL)];for(const e of[r.params||r.query]){const u=c(e);if(!u)continue;const t={};for(const[n,h]of Object.entries(u))t[c(n)]=c(h);o.push(t)}return o}const z={key:0},I="https://api.github.com/graphql",Y={__name:"GithubPagesList",props:["owner"],async setup(r){let o,a;const e=r,t=G().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([o,a]=E(()=>N(I,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(d,_)=>{const m=C;return l(),p("ul",null,[(l(!0),p(y,null,j(R(h).data.repositoryOwner.repositories.nodes,f=>(l(),p(y,null,[f.ref!=null?(l(),p(y,{key:0},[f.ref.repository.isFork?g("",!0):(l(),p(y,{key:0},[f.ref.repository.owner.login==e.owner?(l(),p("li",z,[U(m,{repository:f.ref.repository},null,8,["repository"])])):g("",!0)],64))],64)):g("",!0)],64))),256))])}}};export{Y as default};
