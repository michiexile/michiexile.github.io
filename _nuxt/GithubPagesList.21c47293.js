import q from"./LinkToGithubIo.fa8f946d.js";import{a as C,u as b,r as x,b as v,w as D,o as i,e as a,F as l,f as L,h as T,i as m}from"./entry.88a0eff5.js";import{u as E}from"./asyncData.6ee525a1.js";function N(c,e,u){const[t={},d]=typeof e=="string"?[{},e]:[e,u],n=t.key||d;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!c)throw new Error("[nuxt] [useFetch] request is missing.");const f="$f"+n,p=C(()=>{let r=c;return typeof r=="function"&&(r=r()),b(r)}),{server:h,lazy:_,default:g,transform:y,pick:s,watch:k,initialCache:A,immediate:F,...O}=t,w=x({...O,cache:typeof t.cache=="boolean"?void 0:t.cache}),$={server:h,lazy:_,default:g,transform:y,pick:s,initialCache:A,immediate:F,watch:[w,p,...k||[]]};let o;return E(f,()=>{var r;return(r=o==null?void 0:o.abort)==null||r.call(o),o=typeof AbortController<"u"?new AbortController:{},$fetch(p.value,{signal:o.signal,...w})},$)}const z={key:0},V={__name:"GithubPagesList",props:["owner"],async setup(c){let e,u;const t=c,n=v().githubApiToken,f="https://api.github.com/graphql",p=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:h}=([e,u]=D(()=>N(f,{method:"POST",headers:{authorization:`bearer ${n}`},body:`{ "query": "${p}" }`},"$dWoZmYjL2R")),e=await e,u(),e);return(_,g)=>{const y=q;return i(),a("ul",null,[(i(!0),a(l,null,L(b(h).data.repositoryOwner.repositories.nodes,s=>(i(),a(l,null,[s.ref!=null?(i(),a(l,{key:0},[s.ref.repository.isFork?m("",!0):(i(),a(l,{key:0},[s.ref.repository.owner.login==t.owner?(i(),a("li",z,[T(y,{repository:s.ref.repository},null,8,["repository"])])):m("",!0)],64))],64)):m("",!0)],64))),256))])}}};export{V as default};
