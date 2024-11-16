import F from"./j7PQsUQe.js";import{k as L,l as i,m as x,r as C,n as R,f as j,p as U,o as l,c as p,F as h,q as G,b as N,s as d,h as V}from"./C-S-XXSA.js";import{u as z}from"./DFSkAUFV.js";import"./BR9a4g6i.js";function B(s,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=L(()=>i(s)),r=e.key||x([u,typeof t.value=="string"?t.value:"",...I(e)]);if(!r||typeof r!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+r);const f=r===u?"$f"+r:r;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:b,default:m,transform:c,pick:O,watch:_,immediate:v,getCachedData:A,deep:$,dedupe:T,...D}=e,w=C({...R,...D,cache:typeof e.cache=="boolean"?void 0:e.cache}),E={server:g,lazy:b,default:m,transform:c,pick:O,immediate:v,getCachedData:A,deep:$,dedupe:T,watch:_===!1?[]:[w,t,..._||[]]};let n;return z(f,()=>{var q;(q=n==null?void 0:n.abort)==null||q.call(n,new DOMException("Request aborted as another request to the same endpoint was initiated.","AbortError")),n=typeof AbortController<"u"?new AbortController:{};const k=i(e.timeout);let y;return k&&(y=setTimeout(()=>n.abort(new DOMException("Request aborted due to timeout.","AbortError")),k),n.signal.onabort=()=>clearTimeout(y)),(e.$fetch||globalThis.$fetch)(t.value,{signal:n.signal,...w}).finally(()=>{clearTimeout(y)})},E)}function I(s){var a;const o=[((a=i(s.method))==null?void 0:a.toUpperCase())||"GET",i(s.baseURL)];for(const e of[s.params||s.query]){const u=i(e);if(!u)continue;const t={};for(const[r,f]of Object.entries(u))t[i(r)]=i(f);o.push(t)}return o}const M={key:0},P="https://api.github.com/graphql",H={__name:"GithubPagesList",props:["owner"],async setup(s){let o,a;const e=s,t=j().githubApiToken,r=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:f}=([o,a]=U(()=>B(P,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${r}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(g,b)=>{const m=F;return l(),p("ul",null,[(l(!0),p(h,null,G(V(f).data.repositoryOwner.repositories.nodes,c=>(l(),p(h,null,[c.ref!=null?(l(),p(h,{key:0},[c.ref.repository.isFork?d("",!0):(l(),p(h,{key:0},[c.ref.repository.owner.login==e.owner?(l(),p("li",M,[N(m,{repository:c.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{H as default};
