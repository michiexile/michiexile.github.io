import $ from"./LinkToGithubIo.e1956d80.js";import{h as x,u as f,a as C,r as L,b as q,e as v,w as D,o as i,f as c,F as l,i as T,j as E,k as d}from"./entry.129790bd.js";function N(s,t,u){const[e={},h]=typeof t=="string"?[{},t]:[t,u],o=e.key||x([h,f(e.baseURL),typeof s=="string"?s:"",f(e.params)]);if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const y=o===h?"$f"+o:o,p=C(()=>{let r=s;return typeof r=="function"&&(r=r()),f(r)}),{server:_,lazy:g,default:m,transform:a,pick:b,watch:k,immediate:A,...F}=e,w=L({...F,cache:typeof e.cache=="boolean"?void 0:e.cache}),O={server:_,lazy:g,default:m,transform:a,pick:b,immediate:A,watch:[w,p,...k||[]]};let n;return q(y,()=>{var r;return(r=n==null?void 0:n.abort)==null||r.call(n),n=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:n.signal,...w})},O)}const R={key:0},j="https://api.github.com/graphql",P={__name:"GithubPagesList",props:["owner"],async setup(s){let t,u;const e=s,o=v().githubApiToken,y=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:p}=([t,u]=D(()=>N(j,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${y}" }`},"$dWoZmYjL2R")),t=await t,u(),t);return(_,g)=>{const m=$;return i(),c("ul",null,[(i(!0),c(l,null,T(f(p).data.repositoryOwner.repositories.nodes,a=>(i(),c(l,null,[a.ref!=null?(i(),c(l,{key:0},[a.ref.repository.isFork?d("",!0):(i(),c(l,{key:0},[a.ref.repository.owner.login==e.owner?(i(),c("li",R,[E(m,{repository:a.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{P as default};
