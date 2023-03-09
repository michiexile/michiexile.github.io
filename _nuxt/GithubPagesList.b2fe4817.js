import $ from"./LinkToGithubIo.f00e754d.js";import{h as x,u as f,a as C,r as L,b as q,w as v,o as i,e as c,F as l,f as D,i as T,j as _}from"./entry.ea672042.js";import{u as E}from"./asyncData.825c103a.js";function N(s,t,u){const[e={},h]=typeof t=="string"?[{},t]:[t,u],o=e.key||x([h,f(e.baseURL),typeof s=="string"?s:"",f(e.params)]);if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const y=o===h?"$f"+o:o,p=C(()=>{let n=s;return typeof n=="function"&&(n=n()),f(n)}),{server:m,lazy:g,default:w,transform:d,pick:a,watch:k,immediate:A,...F}=e,b=L({...F,cache:typeof e.cache=="boolean"?void 0:e.cache}),O={server:m,lazy:g,default:w,transform:d,pick:a,immediate:A,watch:[b,p,...k||[]]};let r;return E(y,()=>{var n;return(n=r==null?void 0:r.abort)==null||n.call(r),r=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:r.signal,...b})},O)}const R={key:0},P={__name:"GithubPagesList",props:["owner"],async setup(s){let t,u;const e=s,o=q().githubApiToken,y="https://api.github.com/graphql",p=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:m}=([t,u]=v(()=>N(y,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${p}" }`},"$dWoZmYjL2R")),t=await t,u(),t);return(g,w)=>{const d=$;return i(),c("ul",null,[(i(!0),c(l,null,D(f(m).data.repositoryOwner.repositories.nodes,a=>(i(),c(l,null,[a.ref!=null?(i(),c(l,{key:0},[a.ref.repository.isFork?_("",!0):(i(),c(l,{key:0},[a.ref.repository.owner.login==e.owner?(i(),c("li",R,[T(d,{repository:a.ref.repository},null,8,["repository"])])):_("",!0)],64))],64)):_("",!0)],64))),256))])}}};export{P as default};
