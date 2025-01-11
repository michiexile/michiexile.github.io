import F from"./CBXQxLCq.js";import{j as L,k as i,l as x,r as C,m as R,n as j,o as l,c as p,F as h,p as U,g as G,u as N,b as V,q as y}from"./BC6zR4O5.js";import{u as z}from"./BWgowRgh.js";import"./BvLkfF43.js";function B(s,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=L(()=>i(s)),n=e.key||x([u,typeof t.value=="string"?t.value:"",...I(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);const f=n===u?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:b,default:m,transform:c,pick:O,watch:_,immediate:A,getCachedData:$,deep:v,dedupe:T,...D}=e,w=C({...R,...D,cache:typeof e.cache=="boolean"?void 0:e.cache}),E={server:g,lazy:b,default:m,transform:c,pick:O,immediate:A,getCachedData:$,deep:v,dedupe:T,watch:_===!1?[]:[w,t,..._||[]]};let r;return z(f,()=>{var q;(q=r==null?void 0:r.abort)==null||q.call(r,new DOMException("Request aborted as another request to the same endpoint was initiated.","AbortError")),r=typeof AbortController<"u"?new AbortController:{};const k=i(e.timeout);let d;return k&&(d=setTimeout(()=>r.abort(new DOMException("Request aborted due to timeout.","AbortError")),k),r.signal.onabort=()=>clearTimeout(d)),(e.$fetch||globalThis.$fetch)(t.value,{signal:r.signal,...w}).finally(()=>{clearTimeout(d)})},E)}function I(s){var a;const o=[((a=i(s.method))==null?void 0:a.toUpperCase())||"GET",i(s.baseURL)];for(const e of[s.params||s.query]){const u=i(e);if(!u)continue;const t={};for(const[n,f]of Object.entries(u))t[i(n)]=i(f);o.push(t)}return o}const M={key:0},P="https://api.github.com/graphql",H={__name:"GithubPagesList",props:["owner"],async setup(s){let o,a;const e=s,t=N().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:f}=([o,a]=j(()=>B(P,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(g,b)=>{const m=F;return l(),p("ul",null,[(l(!0),p(h,null,U(G(f).data.repositoryOwner.repositories.nodes,c=>(l(),p(h,null,[c.ref!=null?(l(),p(h,{key:0},[c.ref.repository.isFork?y("",!0):(l(),p(h,{key:0},[c.ref.repository.owner.login==e.owner?(l(),p("li",M,[V(m,{repository:c.ref.repository},null,8,["repository"])])):y("",!0)],64))],64)):y("",!0)],64))),256))])}}};export{H as default};
