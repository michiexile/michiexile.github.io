import{G as $,H as U,I as _,J as E,K as Y,L as M,M as T,N as W,O as B,e as R,P as J,y as H,Q as L,x as q}from"./entry.ab72a389.js";const G="memory",b=()=>{const r=new Map;return{name:G,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function k(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function p(r,...t){try{return k(r(...t))}catch(n){return Promise.reject(n)}}function Z(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function F(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function S(r){if(Z(r))return String(r);if(F(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return S(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function N(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const P="base64:";function V(r){if(typeof r=="string")return r;N();const t=Buffer.from(r).toString("base64");return P+t}function Q(r){return typeof r!="string"||!r.startsWith(P)?r:(N(),Buffer.from(r.slice(P.length),"base64"))}const X=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function ee(r,t){if(t=A(t),!t)return r;const n={...r};for(const i of X)n[i]=(o="",...u)=>r[i](t+o,...u);return n.getKeys=(i="",...o)=>r.getKeys(t+i,...o).then(u=>u.map(l=>l.slice(t.length))),n}function y(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function te(...r){return y(r.join(":"))}function A(r){return r=y(r),r?r+":":""}const re="memory",ne=()=>{const r=new Map;return{name:re,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function ie(r={}){const t={mounts:{"":r.driver||ne()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const a of t.mountpoints)if(e.startsWith(a))return{base:a,relativeKey:e.slice(a.length),driver:t.mounts[a]};return{base:"",relativeKey:e,driver:t.mounts[""]}},i=(e,a)=>t.mountpoints.filter(s=>s.startsWith(e)||a&&e.startsWith(s)).map(s=>({relativeBase:e.length>s.length?e.slice(s.length):void 0,mountpoint:s,driver:t.mounts[s]})),o=(e,a)=>{if(!!t.watching){a=y(a);for(const s of t.watchListeners)s(e,a)}},u=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await x(t.mounts[e],o,e)}},l=async()=>{if(!!t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h=(e,a,s)=>{const c=new Map,f=m=>{let d=c.get(m.base);return d||(d={driver:m.driver,base:m.base,items:[]},c.set(m.base,d)),d};for(const m of e){const d=typeof m=="string",v=y(d?m:m.key),w=d?void 0:m.value,I=d||!m.options?a:{...a,...m.options},O=n(v);f(O).items.push({key:v,value:w,relativeKey:O.relativeKey,options:I})}return Promise.all([...c.values()].map(m=>s(m))).then(m=>m.flat())},g={hasItem(e,a={}){e=y(e);const{relativeKey:s,driver:c}=n(e);return p(c.hasItem,s,a)},getItem(e,a={}){e=y(e);const{relativeKey:s,driver:c}=n(e);return p(c.getItem,s,a).then(f=>$(f))},getItems(e,a){return h(e,a,s=>s.driver.getItems?p(s.driver.getItems,s.items.map(c=>({key:c.relativeKey,options:c.options})),a).then(c=>c.map(f=>({key:te(s.base,f.key),value:$(f.value)}))):Promise.all(s.items.map(c=>p(s.driver.getItem,c.relativeKey,c.options).then(f=>({key:c.key,value:$(f)})))))},getItemRaw(e,a={}){e=y(e);const{relativeKey:s,driver:c}=n(e);return c.getItemRaw?p(c.getItemRaw,s,a):p(c.getItem,s,a).then(f=>Q(f))},async setItem(e,a,s={}){if(a===void 0)return g.removeItem(e);e=y(e);const{relativeKey:c,driver:f}=n(e);!f.setItem||(await p(f.setItem,c,S(a),s),f.watch||o("update",e))},async setItems(e,a){await h(e,a,async s=>{s.driver.setItems&&await p(s.driver.setItems,s.items.map(c=>({key:c.relativeKey,value:S(c.value),options:c.options})),a),s.driver.setItem&&await Promise.all(s.items.map(c=>p(s.driver.setItem,c.relativeKey,S(c.value),c.options)))})},async setItemRaw(e,a,s={}){if(a===void 0)return g.removeItem(e,s);e=y(e);const{relativeKey:c,driver:f}=n(e);if(f.setItemRaw)await p(f.setItemRaw,c,a,s);else if(f.setItem)await p(f.setItem,c,V(a),s);else return;f.watch||o("update",e)},async removeItem(e,a={}){typeof a=="boolean"&&(a={removeMata:a}),e=y(e);const{relativeKey:s,driver:c}=n(e);!c.removeItem||(await p(c.removeItem,s,a),a.removeMata&&await p(c.removeItem,s+"$",a),c.watch||o("remove",e))},async getMeta(e,a={}){typeof a=="boolean"&&(a={nativeOnly:a}),e=y(e);const{relativeKey:s,driver:c}=n(e),f=Object.create(null);if(c.getMeta&&Object.assign(f,await p(c.getMeta,s,a)),!a.nativeOnly){const m=await p(c.getItem,s+"$",a).then(d=>$(d));m&&typeof m=="object"&&(typeof m.atime=="string"&&(m.atime=new Date(m.atime)),typeof m.mtime=="string"&&(m.mtime=new Date(m.mtime)),Object.assign(f,m))}return f},setMeta(e,a,s={}){return this.setItem(e+"$",a,s)},removeMeta(e,a={}){return this.removeItem(e+"$",a)},async getKeys(e,a={}){e=A(e);const s=i(e,!0);let c=[];const f=[];for(const m of s){const v=(await p(m.driver.getKeys,m.relativeBase,a)).map(w=>m.mountpoint+y(w)).filter(w=>!c.some(I=>w.startsWith(I)));f.push(...v),c=[m.mountpoint,...c.filter(w=>!w.startsWith(m.mountpoint))]}return e?f.filter(m=>m.startsWith(e)&&!m.endsWith("$")):f.filter(m=>!m.endsWith("$"))},async clear(e,a={}){e=A(e),await Promise.all(i(e,!1).map(async s=>{if(s.driver.clear)return p(s.driver.clear,s.relativeBase,a);if(s.driver.removeItem){const c=await s.driver.getKeys(s.relativeBase||"",a);return Promise.all(c.map(f=>s.driver.removeItem(f,a)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>C(e)))},async watch(e){return await u(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(a=>a!==e),t.watchListeners.length===0&&await l()}},async unwatch(){t.watchListeners=[],await l()},mount(e,a){if(e=A(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((s,c)=>c.length-s.length)),t.mounts[e]=a,t.watching&&Promise.resolve(x(a,o,e)).then(s=>{t.unwatch[e]=s}).catch(console.error),g},async unmount(e,a=!0){e=A(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),a&&await C(t.mounts[e]),t.mountpoints=t.mountpoints.filter(s=>s!==e),delete t.mounts[e])},getMount(e=""){e=y(e)+":";const a=n(e);return{driver:a.driver,base:a.base}},getMounts(e="",a={}){return e=y(e),i(e,a.parents).map(c=>({driver:c.driver,base:c.mountpoint}))}};return g}function x(r,t,n){return r.watch?r.watch((i,o)=>t(i,n+o)):()=>{}}async function C(r){typeof r.dispose=="function"&&await p(r.dispose)}function ae(r={}){const t=se(n,r.operators);function n(i,o){return typeof o!="object"||o instanceof RegExp?t.$eq(i,o):Object.keys(o||{}).every(u=>{const l=o[u];if(u.startsWith("$")&&t[u]){const h=t[u];return typeof h=="function"?h(i,l):!1}return n(U(i,u),l)})}return n}function se(r,t={}){return{$match:(n,i)=>r(n,i),$eq:(n,i)=>i instanceof RegExp?i.test(n):n===i,$ne:(n,i)=>i instanceof RegExp?!i.test(n):n!==i,$not:(n,i)=>!r(n,i),$and:(n,i)=>(_(i,"$and requires an array as condition"),i.every(o=>r(n,o))),$or:(n,i)=>(_(i,"$or requires an array as condition"),i.some(o=>r(n,o))),$in:(n,i)=>E(i).some(o=>Array.isArray(n)?r(n,{$contains:o}):r(n,o)),$contains:(n,i)=>(n=Array.isArray(n)?n:String(n),E(i).every(o=>n.includes(o))),$icontains:(n,i)=>{if(typeof i!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),E(i).every(o=>n.includes(o.toLocaleLowerCase()))},$containsAny:(n,i)=>(_(i,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),i.some(o=>n.includes(o))),$exists:(n,i)=>i?typeof n<"u":typeof n>"u",$type:(n,i)=>typeof n===String(i),$regex:(n,i)=>{if(!(i instanceof RegExp)){const o=String(i).match(/\/(.*)\/([dgimsuy]*)$/);i=o?new RegExp(o[1],o[2]||""):new RegExp(i)}return i.test(String(n||""))},$lt:(n,i)=>n<i,$lte:(n,i)=>n<=i,$gt:(n,i)=>n>i,$gte:(n,i)=>n>=i,...t||{}}}function D(r){const t=ae(),n=(o,{query:u,before:l,after:h})=>{const g=typeof u=="string"?{_path:u}:u,e=o.findIndex(s=>t(s,g));l=l!=null?l:1,h=h!=null?h:1;const a=new Array(l+h).fill(null,0);return e===-1?a:a.map((s,c)=>o[e-l+c+Number(c>=l)]||null)},i=[(o,u)=>o.filter(l=>E(u.where).every(h=>t(l,h))),(o,u)=>E(u.sort).forEach(l=>Y(o,l)),(o,u)=>u.surround?n(o,u.surround):o,(o,u)=>u.skip?o.slice(u.skip):o,(o,u)=>u.limit?o.slice(0,u.limit):o,(o,u)=>M(T(u.without))(o),(o,u)=>M(W(u.only))(o)];return async o=>{const u=await r(),l=o.params(),h=i.reduce((g,e)=>e(g,l)||g,u);return l.first?h[0]:h}}var oe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ue={exports:{}};(function(r,t){(function(n,i,o){r.exports=o(),r.exports.default=o()})("slugify",oe,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E'","\u0538":"Y'","\u0539":"T'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C'","\u053F":"K","\u0540":"H","\u0541":"D'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P'","\u0554":"Q'","\u0555":"O''","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"'","\u2019":"'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}`),i=JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');function o(u,l){if(typeof u!="string")throw new Error("slugify: string argument expected");l=typeof l=="string"?{replacement:l}:l||{};var h=i[l.locale]||{},g=l.replacement===void 0?"-":l.replacement,e=l.trim===void 0?!0:l.trim,a=u.normalize().split("").reduce(function(s,c){var f=h[c];return f===void 0&&(f=n[c]),f===void 0&&(f=c),f===g&&(f=" "),s+f.replace(l.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return l.strict&&(a=a.replace(/[^A-Za-z0-9\s]/g,"")),e&&(a=a.trim()),a=a.replace(/\s+/g,g),l.lower&&(a=a.toLowerCase()),a}return o.extend=function(u){Object.assign(n,u)},o})})(ue);const ce=r=>r.split(/[\s-]/g).map(B).join(" ");function le(r,t){const{navigation:n}=R().public.content,i=u=>({...me(["title",...n.fields])(u),...ge(u==null?void 0:u.navigation)?u.navigation:{}}),o=r.sort((u,l)=>u._path.localeCompare(l._path)).reduce((u,l)=>{const h=l._path.substring(1).split("/"),g=l._id.split(":").slice(1),e=!!g[g.length-1].match(/([1-9][0-9]*\.)?index.md/g),a=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...i(f),...f._draft?{_draft:!0}:{}}),s=a(l);if(e){const f=t[s._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return u;if(l._path!=="/"){const m=a(l);s.children.push(m)}Object.assign(s,i(f))}return h.length===1?(u.push(s),u):(h.slice(0,-1).reduce((f,m,d)=>{const v="/"+h.slice(0,d+1).join("/"),w=t[v];if(typeof(w==null?void 0:w.navigation)<"u"&&!w.navigation)return[];let I=f.find(O=>O._path===v);return I||(I={title:ce(m),_path:v,_file:l._file,children:[],...i(w)},f.push(I)),I.children},u).push(s),u)},[]);return z(o)}const fe=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function z(r){var n;const t=r.sort((i,o)=>fe.compare(i._file,o._file));for(const i of t)(n=i.children)!=null&&n.length?z(i.children):delete i.children,delete i._file;return r}function me(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{}):t)}function ge(r){return Object.prototype.toString.call(r)==="[object Object]"}const he=r=>q(r,R().public.content.api.baseURL),pe=ee(ie({driver:b()}),"@content");function ye(r){async function t(){const n=new Set(await r.getKeys("cache:")),i=L().getPreviewToken();if(i){const u=await r.getItem(`${i}$`).then(g=>g||{});if(Array.isArray(u.ignoreSources)){const g=u.ignoreSources.map(e=>`cache:${e.trim()}:`);for(const e of n)g.some(a=>e.startsWith(a))&&n.delete(e)}const l=await r.getKeys(`${i}:`),h=await Promise.all(l.map(g=>r.getItem(g)));for(const g of h)n.delete(`cache:${g._id}`),g.__deleted||n.add(`${i}:${g._id}`)}return await Promise.all(Array.from(n).map(u=>r.getItem(u)))}return{storage:r,fetch:D(t),query:n=>J(D(t),n)}}let j=null,K=null;async function de(){return K?await K:j||(K=we(),j=await K),j}async function we(){const r=H(),{content:t}=R().public,n=ye(pe),i=await n.storage.getItem("integrity");if(t.integrity!==+(i||0)){const{contents:o,navigation:u}=await $fetch(he(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(o.map(l=>n.storage.setItem(`cache:${l._id}`,l))),await n.storage.setItem("navigation",u),await n.storage.setItem("integrity",t.integrity)}return await r.callHook("content:storage",n.storage),n}async function Ie(r){const t=await de();if(!L().getPreviewToken()&&Object.keys(r||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(r).where({_partial:!1,navigation:{$ne:!1}}).find(),o=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((u,l)=>{var g;((g=l.title)==null?void 0:g.toLowerCase())==="dir"&&(l.title=void 0);const h=l._path.split("/").slice(0,-1).join("/")||"/";return u[h]={...l,...l.body},u},{});return le(n,o)}export{pe as contentStorage,ye as createDB,Ie as generateNavigation,de as useContentDatabase};
