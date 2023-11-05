import L from"./LinkToGithubIo.9caaa3bd.js";import{j as O,q as c,B as x,C as E,D as T,E as R,o as a,c as i,F as h,G,y as U,b as W,H as d}from"./entry.a6fef617.js";import{u as B}from"./asyncData.627d1ee0.js";import"./nuxt-link.c3ed3c55.js";function N(p,o,l){var k;const[e={},f]=typeof o=="string"?[{},o]:[o,l],t=O(()=>{let u=p;return typeof u=="function"&&(u=u()),c(u)}),r=e.key||x([f,((k=c(e.method))==null?void 0:k.toUpperCase())||"GET",c(e.baseURL),typeof t.value=="string"?t.value:"",c(e.params||e.query),c(e.headers)]);if(!r||typeof r!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+r);if(!p)throw new Error("[nuxt] [useFetch] request is missing.");const y=r===f?"$f"+r:r;if(!e.baseURL&&typeof t.value=="string"&&t.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:_,default:m,transform:n,pick:$,watch:w,immediate:q,getCachedData:F,deep:A,...C}=e,b=E({...T,...C,cache:typeof e.cache=="boolean"?void 0:e.cache}),D={server:g,lazy:_,default:m,transform:n,pick:$,immediate:q,getCachedData:F,deep:A,watch:w===!1?[]:[b,t,...w||[]]};let s;return B(y,()=>{var v;return(v=s==null?void 0:s.abort)==null||v.call(s),s=typeof AbortController<"u"?new AbortController:{},typeof t.value=="string"&&t.value.startsWith("/"),(e.$fetch||globalThis.$fetch)(t.value,{signal:s.signal,...b})},D)}const j={key:0},z="https://api.github.com/graphql",Q={__name:"GithubPagesList",props:["owner"],async setup(p){let o,l;const e=p,t=U().githubApiToken,r=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:y}=([o,l]=R(()=>N(z,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${r}" }`},"$dWoZmYjL2R")),o=await o,l(),o);return(g,_)=>{const m=L;return a(),i("ul",null,[(a(!0),i(h,null,G(c(y).data.repositoryOwner.repositories.nodes,n=>(a(),i(h,null,[n.ref!=null?(a(),i(h,{key:0},[n.ref.repository.isFork?d("",!0):(a(),i(h,{key:0},[n.ref.repository.owner.login==e.owner?(a(),i("li",j,[W(m,{repository:n.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{Q as default};
