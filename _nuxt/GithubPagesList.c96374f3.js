import q from"./LinkToGithubIo.c8f81784.js";import{a as C,u as w,b as x,w as D,o as i,e as a,F as l,r as L,f as T,h as m}from"./entry.18cc8296.js";import{u as v}from"./asyncData.d0564717.js";function E(c,e,u){const[t={},d]=typeof e=="string"?[{},e]:[e,u],n=t.key||d;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!c)throw new Error("[nuxt] [useFetch] request is missing.");const f="$f"+n,p=C(()=>{let r=c;return typeof r=="function"&&(r=r()),w(r)}),{server:h,lazy:_,default:g,transform:y,pick:s,watch:b,initialCache:k,immediate:A,...F}=t,O={...F,cache:typeof t.cache=="boolean"?void 0:t.cache},$={server:h,lazy:_,default:g,transform:y,pick:s,initialCache:k,immediate:A,watch:[p,...b||[]]};let o;return v(f,()=>{var r;return(r=o==null?void 0:o.abort)==null||r.call(o),o=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:o.signal,...O})},$)}const N={key:0},R={__name:"GithubPagesList",props:["owner"],async setup(c){let e,u;const t=c,n=x().githubApiToken,f="https://api.github.com/graphql",p=`
query {
  repositoryOwner(login:"${t.owner}") {
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([e,u]=D(()=>E(f,{method:"POST",headers:{authorization:`bearer ${n}`},body:`{ "query": "${p}" }`},"$dWoZmYjL2R")),e=await e,u(),e);return(_,g)=>{const y=q;return i(),a("ul",null,[(i(!0),a(l,null,L(w(h).data.repositoryOwner.repositories.nodes,s=>(i(),a(l,null,[s.ref!=null?(i(),a(l,{key:0},[s.ref.repository.isFork?m("",!0):(i(),a(l,{key:0},[s.ref.repository.owner.login==t.owner?(i(),a("li",N,[T(y,{repository:s.ref.repository},null,8,["repository"])])):m("",!0)],64))],64)):m("",!0)],64))),256))])}}};export{R as default};
