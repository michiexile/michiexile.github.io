import{M as j,a4 as U,a5 as $,a6 as I,a7 as Y,a8 as R,a9 as T,aa as W,b as K,ab as B,p as J,J as x,a3 as b}from"./entry.0c3110f7.js";import{p as H}from"./index.68c44503.js";const q="memory",G=()=>{const r=new Map;return{name:q,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function Z(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function g(r,...t){try{return Z(r(...t))}catch(n){return Promise.reject(n)}}function F(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function V(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function D(r){if(F(r))return String(r);if(V(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return D(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function L(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const _="base64:";function Q(r){if(typeof r=="string")return r;L();const t=Buffer.from(r).toString("base64");return _+t}function X(r){return typeof r!="string"||!r.startsWith(_)?r:(L(),Buffer.from(r.slice(_.length),"base64"))}const k=["hasItem","getItem","setItem","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function ee(r,t){if(t=v(t),!t)return r;const n={...r};for(const i of k)n[i]=(s="",...c)=>r[i](t+s,...c);return n.getKeys=(i="",...s)=>r.getKeys(t+i,...s).then(c=>c.map(u=>u.slice(t.length))),n}function p(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function v(r){return r=p(r),r?r+":":""}const te="memory",re=()=>{const r=new Map;return{name:te,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function ne(r={}){const t={mounts:{"":r.driver||re()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const a of t.mountpoints)if(e.startsWith(a))return{base:a,relativeKey:e.slice(a.length),driver:t.mounts[a]};return{base:"",relativeKey:e,driver:t.mounts[""]}},i=(e,a)=>t.mountpoints.filter(o=>o.startsWith(e)||a&&e.startsWith(o)).map(o=>({relativeBase:e.length>o.length?e.slice(o.length):void 0,mountpoint:o,driver:t.mounts[o]})),s=(e,a)=>{if(!!t.watching){a=p(a);for(const o of t.watchListeners)o(e,a)}},c=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await P(t.mounts[e],s,e)}},u=async()=>{if(!!t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h={hasItem(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return g(f.hasItem,o,a)},getItem(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return g(f.getItem,o,a).then(m=>j(m))},getItemRaw(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return f.getItemRaw?g(f.getItemRaw,o,a):g(f.getItem,o,a).then(m=>X(m))},async setItem(e,a,o={}){if(a===void 0)return h.removeItem(e);e=p(e);const{relativeKey:f,driver:m}=n(e);!m.setItem||(await g(m.setItem,f,D(a),o),m.watch||s("update",e))},async setItemRaw(e,a,o={}){if(a===void 0)return h.removeItem(e,o);e=p(e);const{relativeKey:f,driver:m}=n(e);if(m.setItemRaw)await g(m.setItemRaw,f,a,o);else if(m.setItem)await g(m.setItem,f,Q(a),o);else return;m.watch||s("update",e)},async removeItem(e,a={}){typeof a=="boolean"&&(a={removeMata:a}),e=p(e);const{relativeKey:o,driver:f}=n(e);!f.removeItem||(await g(f.removeItem,o,a),a.removeMata&&await g(f.removeItem,o+"$",a),f.watch||s("remove",e))},async getMeta(e,a={}){typeof a=="boolean"&&(a={nativeOnly:a}),e=p(e);const{relativeKey:o,driver:f}=n(e),m=Object.create(null);if(f.getMeta&&Object.assign(m,await g(f.getMeta,o,a)),!a.nativeOnly){const l=await g(f.getItem,o+"$",a).then(w=>j(w));l&&typeof l=="object"&&(typeof l.atime=="string"&&(l.atime=new Date(l.atime)),typeof l.mtime=="string"&&(l.mtime=new Date(l.mtime)),Object.assign(m,l))}return m},setMeta(e,a,o={}){return this.setItem(e+"$",a,o)},removeMeta(e,a={}){return this.removeItem(e+"$",a)},async getKeys(e,a={}){e=v(e);const o=i(e,!0);let f=[];const m=[];for(const l of o){const E=(await g(l.driver.getKeys,l.relativeBase,a)).map(d=>l.mountpoint+p(d)).filter(d=>!f.some(y=>d.startsWith(y)));m.push(...E),f=[l.mountpoint,...f.filter(d=>!d.startsWith(l.mountpoint))]}return e?m.filter(l=>l.startsWith(e)&&!l.endsWith("$")):m.filter(l=>!l.endsWith("$"))},async clear(e,a={}){e=v(e),await Promise.all(i(e,!1).map(async o=>{if(o.driver.clear)return g(o.driver.clear,o.relativeBase,a);if(o.driver.removeItem){const f=await o.driver.getKeys(o.relativeBase,a);return Promise.all(f.map(m=>o.driver.removeItem(m)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>C(e)))},async watch(e){return await c(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(a=>a!==e),t.watchListeners.length===0&&await u()}},async unwatch(){t.watchListeners=[],await u()},mount(e,a){if(e=v(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((o,f)=>f.length-o.length)),t.mounts[e]=a,t.watching&&Promise.resolve(P(a,s,e)).then(o=>{t.unwatch[e]=o}).catch(console.error),h},async unmount(e,a=!0){e=v(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),a&&await C(t.mounts[e]),t.mountpoints=t.mountpoints.filter(o=>o!==e),delete t.mounts[e])},getMount(e=""){e=p(e)+":";const a=n(e);return{driver:a.driver,base:a.base}},getMounts(e="",a={}){return e=p(e),i(e,a.parents).map(f=>({driver:f.driver,base:f.mountpoint}))}};return h}function P(r,t,n){return r.watch?r.watch((i,s)=>t(i,n+s)):()=>{}}async function C(r){typeof r.dispose=="function"&&await g(r.dispose)}function ie(r={}){const t=ae(n,r.operators);function n(i,s){return typeof s!="object"||s instanceof RegExp?t.$eq(i,s):Object.keys(s||{}).every(c=>{const u=s[c];if(c.startsWith("$")&&t[c]){const h=t[c];return typeof h=="function"?h(i,u):!1}return n(U(i,c),u)})}return n}function ae(r,t={}){return{$match:(n,i)=>r(n,i),$eq:(n,i)=>i instanceof RegExp?i.test(n):n===i,$ne:(n,i)=>i instanceof RegExp?!i.test(n):n!==i,$not:(n,i)=>!r(n,i),$and:(n,i)=>($(i,"$and requires an array as condition"),i.every(s=>r(n,s))),$or:(n,i)=>($(i,"$or requires an array as condition"),i.some(s=>r(n,s))),$in:(n,i)=>I(i).some(s=>Array.isArray(n)?r(n,{$contains:s}):r(n,s)),$contains:(n,i)=>(n=Array.isArray(n)?n:String(n),I(i).every(s=>n.includes(s))),$icontains:(n,i)=>{if(typeof i!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),I(i).every(s=>n.includes(s.toLocaleLowerCase()))},$containsAny:(n,i)=>($(i,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),i.some(s=>n.includes(s))),$exists:(n,i)=>i?typeof n<"u":typeof n>"u",$type:(n,i)=>typeof n===String(i),$regex:(n,i)=>{if(!(i instanceof RegExp)){const s=String(i).match(/\/(.*)\/([dgimsuy]*)$/);i=s?new RegExp(s[1],s[2]||""):new RegExp(i)}return i.test(String(n||""))},$lt:(n,i)=>n<i,$lte:(n,i)=>n<=i,$gt:(n,i)=>n>i,$gte:(n,i)=>n>=i,...t||{}}}function M(r){const t=ie(),n=(s,{query:c,before:u,after:h})=>{const e=typeof c=="string"?{_path:c}:c,a=s.findIndex(f=>t(f,e));u=u!=null?u:1,h=h!=null?h:1;const o=new Array(u+h).fill(null,0);return a===-1?o:o.map((f,m)=>s[a-u+m+Number(m>=u)]||null)},i=[(s,c)=>s.filter(u=>I(c.where).every(h=>t(u,h))),(s,c)=>I(c.sort).forEach(u=>Y(s,u)),(s,c)=>c.surround?n(s,c.surround):s,(s,c)=>c.skip?s.slice(c.skip):s,(s,c)=>c.limit?s.slice(0,c.limit):s,(s,c)=>R(T(c.without))(s),(s,c)=>R(W(c.only))(s)];return async s=>{const c=await r(),u=s.params(),h=i.reduce((e,a)=>a(e,u)||e,c);return u.first?h[0]:h}}var se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},oe={exports:{}};(function(r,t){(function(n,i,s){r.exports=s(),r.exports.default=s()})("slugify",se,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E'","\u0538":"Y'","\u0539":"T'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C'","\u053F":"K","\u0540":"H","\u0541":"D'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P'","\u0554":"Q'","\u0555":"O''","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"'","\u2019":"'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}`),i=JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');function s(c,u){if(typeof c!="string")throw new Error("slugify: string argument expected");u=typeof u=="string"?{replacement:u}:u||{};var h=i[u.locale]||{},e=u.replacement===void 0?"-":u.replacement,a=u.trim===void 0?!0:u.trim,o=c.normalize().split("").reduce(function(f,m){var l=h[m];return l===void 0&&(l=n[m]),l===void 0&&(l=m),l===e&&(l=" "),f+l.replace(u.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return u.strict&&(o=o.replace(/[^A-Za-z0-9\s]/g,"")),a&&(o=o.trim()),o=o.replace(/\s+/g,e),u.lower&&(o=o.toLowerCase()),o}return s.extend=function(c){Object.assign(n,c)},s})})(oe);const ce=r=>r.split(/[\s-]/g).map(H).join(" ");function ue(r,t){const{navigation:n}=K().public.content,i=c=>({...fe(["title",...n.fields])(c),...me(c==null?void 0:c.navigation)?c.navigation:{}}),s=r.sort((c,u)=>c._path.localeCompare(u._path)).reduce((c,u)=>{const h=u._path.substring(1).split("/"),e=u._id.split(":").slice(1),a=!!e[e.length-1].match(/([1-9][0-9]*\.)?index.md/g),o=l=>({title:l.title,_path:l._path,_file:l._file,children:[],...i(l),...l._draft?{_draft:!0}:{}}),f=o(u);if(a){const l=t[f._path];if(typeof(l==null?void 0:l.navigation)<"u"&&!(l!=null&&l.navigation))return c;if(u._path!=="/"){const w=o(u);f.children.push(w)}Object.assign(f,i(l))}return h.length===1?(c.push(f),c):(h.slice(0,-1).reduce((l,w,E)=>{const d="/"+h.slice(0,E+1).join("/"),y=t[d];if(typeof(y==null?void 0:y.navigation)<"u"&&!y.navigation)return[];let A=l.find(z=>z._path===d);return A||(A={title:ce(w),_path:d,_file:u._file,children:[],...i(y)},l.push(A)),A.children},c).push(f),c)},[]);return N(s)}const le=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function N(r){var n;const t=r.sort((i,s)=>le.compare(i._file,s._file));for(const i of t)(n=i.children)!=null&&n.length?N(i.children):delete i.children,delete i._file;return r}function fe(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{}):t)}function me(r){return Object.prototype.toString.call(r)==="[object Object]"}const he=r=>b(r,K().public.content.api.baseURL),ge=ee(ne({driver:G()}),"@content");function pe(r){async function t(){const n=new Set(await r.getKeys("cache:")),i=x().getPreviewToken();if(i){const c=await r.getItem(`${i}$`).then(e=>e||{});if(Array.isArray(c.ignoreSources)){const e=c.ignoreSources.map(a=>`cache:${a.trim()}:`);for(const a of n)e.some(o=>a.startsWith(o))&&n.delete(a)}const u=await r.getKeys(`${i}:`),h=await Promise.all(u.map(e=>r.getItem(e)));for(const e of h)n.delete(`cache:${e._id}`),e.__deleted||n.add(`${i}:${e._id}`)}return await Promise.all(Array.from(n).map(c=>r.getItem(c)))}return{storage:r,fetch:M(t),query:n=>B(M(t),n)}}let S=null,O=null;async function de(){return O?await O:S||(O=ye(),S=await O),S}async function ye(){const r=J(),{content:t}=K().public,n=pe(ge),i=await n.storage.getItem("integrity");if(t.integrity!==+(i||0)){const{contents:s,navigation:c}=await $fetch(he(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(s.map(u=>n.storage.setItem(`cache:${u._id}`,u))),await n.storage.setItem("navigation",c),await n.storage.setItem("integrity",t.integrity)}return await r.callHook("content:storage",n.storage),n}async function Ie(r){const t=await de();if(!x().getPreviewToken()&&Object.keys(r||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(r).where({_partial:!1,navigation:{$ne:!1}}).find(),s=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((c,u)=>{var e;((e=u.title)==null?void 0:e.toLowerCase())==="dir"&&(u.title=void 0);const h=u._path.split("/").slice(0,-1).join("/")||"/";return c[h]={...u,...u.body},c},{});return ue(n,s)}export{ge as contentStorage,pe as createDB,Ie as generateNavigation,de as useContentDatabase};
