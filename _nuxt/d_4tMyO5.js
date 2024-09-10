import C from"./BgIJKm9J.js";import{k as R,l as i,m as D,r as x,n as j,p as E,o as l,c as p,F as h,q as U,h as G,f as N,b as V,s as d}from"./CyzxuWhf.js";import{u as z}from"./amx3sqSK.js";import"./BJ5U8Rwd.js";function B(s,o,a){const[e={},u]=typeof o=="string"?[{},o]:[o,a],t=R(()=>i(s)),n=e.key||D([u,typeof t.value=="string"?t.value:"",...I(e)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);const f=n===u?"$f"+n:n;if(!e.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:g,lazy:_,default:m,transform:c,pick:v,watch:b,immediate:$,getCachedData:O,deep:T,dedupe:A,...F}=e,w=x({...j,...F,cache:typeof e.cache=="boolean"?void 0:e.cache}),L={server:g,lazy:_,default:m,transform:c,pick:v,immediate:$,getCachedData:O,deep:T,dedupe:A,watch:b===!1?[]:[w,t,...b||[]]};let r;return z(f,()=>{var q;(q=r==null?void 0:r.abort)==null||q.call(r,"Request aborted as another request to the same endpoint was initiated."),r=typeof AbortController<"u"?new AbortController:{};const k=i(e.timeout);let y;return k&&(y=setTimeout(()=>r.abort("Request aborted due to timeout."),k),r.signal.onabort=()=>clearTimeout(y)),(e.$fetch||globalThis.$fetch)(t.value,{signal:r.signal,...w}).finally(()=>{clearTimeout(y)})},L)}function I(s){var a;const o=[((a=i(s.method))==null?void 0:a.toUpperCase())||"GET",i(s.baseURL)];for(const e of[s.params||s.query]){const u=i(e);if(!u)continue;const t={};for(const[n,f]of Object.entries(u))t[i(n)]=i(f);o.push(t)}return o}const P={key:0},S="https://api.github.com/graphql",J={__name:"GithubPagesList",props:["owner"],async setup(s){let o,a;const e=s,t=N().githubApiToken,n=`
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
`,"").replaceAll(/ +/g," ").replaceAll('"','\\"'),{data:f}=([o,a]=E(()=>B(S,{method:"POST",headers:{authorization:`bearer ${t}`},body:`{ "query": "${n}" }`},"$dWoZmYjL2R")),o=await o,a(),o);return(g,_)=>{const m=C;return l(),p("ul",null,[(l(!0),p(h,null,U(G(f).data.repositoryOwner.repositories.nodes,c=>(l(),p(h,null,[c.ref!=null?(l(),p(h,{key:0},[c.ref.repository.isFork?d("",!0):(l(),p(h,{key:0},[c.ref.repository.owner.login==e.owner?(l(),p("li",P,[V(m,{repository:c.ref.repository},null,8,["repository"])])):d("",!0)],64))],64)):d("",!0)],64))),256))])}}};export{J as default};
