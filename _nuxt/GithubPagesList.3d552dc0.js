import q from"./LinkToGithubIo.26a86538.js";import{a as A,u as g,b as x,w as C,o as n,e as s,F as p,r as D,f as L,h as y}from"./entry.2dba99c8.js";import{u as T}from"./asyncData.1b9ac5a9.js";function v(i,e,a){const[t={},m]=typeof e=="string"?[{},e]:[e,a],o=t.key||m;if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!i)throw new Error("[nuxt] [useFetch] request is missing.");const l="$f"+o,c=A(()=>{let u=i;return typeof u=="function"&&(u=u()),g(u)}),{server:f,lazy:_,default:d,transform:h,pick:r,watch:w,initialCache:k,immediate:b,...F}=t,O={...F,cache:typeof t.cache=="boolean"?void 0:t.cache},$={server:f,lazy:_,default:d,transform:h,pick:r,initialCache:k,immediate:b,watch:[c,...w||[]]};return T(l,()=>$fetch(c.value,O),$)}const E={key:0},P={__name:"GithubPagesList",props:["owner"],async setup(i){let e,a;const t=i,o=x().githubApiToken,l="https://api.github.com/graphql",c=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:f}=([e,a]=C(()=>v(l,{method:"POST",headers:{authorization:`bearer ${o}`},body:`{ "query": "${c}" }`},"$dWoZmYjL2R")),e=await e,a(),e);return(_,d)=>{const h=q;return n(),s("ul",null,[(n(!0),s(p,null,D(g(f).data.repositoryOwner.repositories.nodes,r=>(n(),s(p,null,[r.ref!=null?(n(),s(p,{key:0},[r.ref.repository.isFork?y("",!0):(n(),s(p,{key:0},[r.ref.repository.owner.login==t.owner?(n(),s("li",E,[L(h,{repository:r.ref.repository},null,8,["repository"])])):y("",!0)],64))],64)):y("",!0)],64))),256))])}}};export{P as default};
