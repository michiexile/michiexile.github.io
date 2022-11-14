import $ from"./LinkToGithubIo.9383dc48.js";import{a as q,u as b,r as x,b as C,w as v,o as a,e as i,F as l,f as D,h as L,i as d}from"./entry.5709e6b6.js";import{u as T}from"./asyncData.38ef4412.js";function E(c,e,u){const[o={},f]=typeof e=="string"?[{},e]:[e,u],t=o.key||f;if(!t||typeof t!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+t);if(!c)throw new Error("[nuxt] [useFetch] request is missing.");const y=t===f?"$f"+t:t,p=q(()=>{let n=c;return typeof n=="function"&&(n=n()),b(n)}),{server:h,lazy:_,default:g,transform:m,pick:s,watch:k,immediate:A,...F}=o,w=x({...F,cache:typeof o.cache=="boolean"?void 0:o.cache}),O={server:h,lazy:_,default:g,transform:m,pick:s,immediate:A,watch:[w,p,...k||[]]};let r;return T(y,()=>{var n;return(n=r==null?void 0:r.abort)==null||n.call(r),r=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:r.signal,...w})},O)}const N={key:0},R={__name:"GithubPagesList",props:["owner"],async setup(c){let e,u;const o=c,t=C().githubApiToken,y="https://api.github.com/graphql",p=`
query {
  repositoryOwner(login:"${o.owner}") {
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([e,u]=v(()=>E(y,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${p}" }`},"$dWoZmYjL2R")),e=await e,u(),e);return(_,g)=>{const m=$;return a(),i("ul",null,[(a(!0),i(l,null,D(b(h).data.repositoryOwner.repositories.nodes,s=>(a(),i(l,null,[s.ref!=null?(a(),i(l,{key:0},[s.ref.repository.isFork?d("",!0):(a(),i(l,{key:0},[s.ref.repository.owner.login==o.owner?(a(),i("li",N,[L(m,{repository:s.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{R as default};
