import L from"./LinkToGithubIo.24831e47.js";import{j as O,q as c,B as x,C as E,D as T,E as R,o as a,c as i,F as h,G,y as U,b as B,H as d}from"./entry.21e63004.js";import{u as N}from"./asyncData.ff3fd7b0.js";import"./nuxt-link.2bafe790.js";function W(p,t,l){var k;const[e={},f]=typeof t=="string"?[{},t]:[t,l],o=O(()=>{let u=p;return typeof u=="function"&&(u=u()),c(u)}),r=e.key||x([f,((k=c(e.method))==null?void 0:k.toUpperCase())||"GET",c(e.baseURL),typeof o.value=="string"?o.value:"",c(e.params||e.query),c(e.headers)]);if(!r||typeof r!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+r);if(!p)throw new Error("[nuxt] [useFetch] request is missing.");const y=r===f?"$f"+r:r;if(!e.baseURL&&typeof o.value=="string"&&o.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:_,default:m,transform:n,pick:q,watch:w,immediate:F,getCachedData:v,deep:A,...C}=e,b=E({...T,...C,cache:typeof e.cache=="boolean"?void 0:e.cache}),D={server:g,lazy:_,default:m,transform:n,pick:q,immediate:F,getCachedData:v,deep:A,watch:w===!1?[]:[b,o,...w||[]]};let s;return N(y,()=>{var $;return($=s==null?void 0:s.abort)==null||$.call(s),s=typeof AbortController<"u"?new AbortController:{},(e.$fetch||globalThis.$fetch)(o.value,{signal:s.signal,...b})},D)}const j={key:0},z="https://api.github.com/graphql",Q={__name:"GithubPagesList",props:["owner"],async setup(p){let t,l;const e=p,o=U().githubApiToken,r=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:y}=([t,l]=R(()=>W(z,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${r}" }`},"$dWoZmYjL2R")),t=await t,l(),t);return(g,_)=>{const m=L;return a(),i("ul",null,[(a(!0),i(h,null,G(c(y).data.repositoryOwner.repositories.nodes,n=>(a(),i(h,null,[n.ref!=null?(a(),i(h,{key:0},[n.ref.repository.isFork?d("",!0):(a(),i(h,{key:0},[n.ref.repository.owner.login==e.owner?(a(),i("li",j,[B(m,{repository:n.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{Q as default};
