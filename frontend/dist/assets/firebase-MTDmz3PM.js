var xc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b=function(n,e){if(!n)throw Gn(e)},Gn=function(n){return new Error("Firebase Database ("+kh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},T_=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],a=n[t++],l=n[t++],c=((s&7)<<18|(r&63)<<12|(a&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],a=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|a&63)}}return e.join("")},Ia={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],a=s+1<n.length,l=a?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,f=r>>2,_=(r&3)<<4|l>>4;let m=(l&15)<<2|h>>6,A=h&63;c||(A=64,a||(m=64)),i.push(t[f],t[_],t[m],t[A])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Nh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):T_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const _=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||l==null||h==null||_==null)throw new w_;const m=r<<2|l>>4;if(i.push(m),h!==64){const A=l<<4&240|h>>2;if(i.push(A),_!==64){const S=h<<6&192|_;i.push(S)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class w_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dh=function(n){const e=Nh(n);return Ia.encodeByteArray(e,!0)},Gs=function(n){return Dh(n).replace(/\./g,"")},Ks=function(n){try{return Ia.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(n){return Oh(void 0,n)}function Oh(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!A_(t)||(n[t]=Oh(n[t],e[t]));return n}function A_(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_=()=>R_().__FIREBASE_DEFAULTS__,P_=()=>{if(typeof process>"u"||typeof xc>"u")return;const n=xc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},b_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ks(n[1]);return e&&JSON.parse(e)},Tr=()=>{try{return S_()||P_()||b_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Lh=n=>{var e,t;return(t=(e=Tr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Mh=n=>{const e=Lh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},xh=()=>{var n;return(n=Tr())===null||n===void 0?void 0:n.config},Vh=n=>{var e;return(e=Tr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Gs(JSON.stringify(t)),Gs(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function k_(){var n;const e=(n=Tr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function N_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function D_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Uh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function O_(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function L_(){return kh.NODE_ADMIN===!0}function M_(){return!k_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function x_(){try{return typeof indexedDB=="object"}catch{return!1}}function V_(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="FirebaseError";class vt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=F_,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ji.prototype.create)}}class Ji{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],a=r?U_(r,i):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new vt(s,l,i)}}function U_(n,e){return n.replace(B_,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const B_=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(n){return JSON.parse(n)}function ye(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Fi(Ks(r[0])||""),t=Fi(Ks(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},q_=function(n){const e=Bh(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},W_=function(n){const e=Bh(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function xn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Mo(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qs(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ys(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],a=e[s];if(Vc(r)&&Vc(a)){if(!Ys(r,a))return!1}else if(r!==a)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Vc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function wi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function Ci(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let _=0;_<16;_++)i[_]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let _=0;_<16;_++)i[_]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let _=16;_<80;_++){const m=i[_-3]^i[_-8]^i[_-14]^i[_-16];i[_]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],a=this.chain_[2],l=this.chain_[3],c=this.chain_[4],h,f;for(let _=0;_<80;_++){_<40?_<20?(h=l^r&(a^l),f=1518500249):(h=r^a^l,f=1859775393):_<60?(h=r&a|l&(r|a),f=2400959708):(h=r^a^l,f=3395469782);const m=(s<<5|s>>>27)+h+c+f+i[_]&4294967295;c=l,l=a,a=(r<<30|r>>>2)&4294967295,r=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let a=this.inbuf_;for(;s<t;){if(a===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(r),a=0;break}}else for(;s<t;)if(r[a]=e[s],++a,++s,a===this.blockSize){this.compress_(r),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function H_(n,e){const t=new $_(n,e);return t.subscribe.bind(t)}class $_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");z_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=go),s.error===void 0&&(s.error=go),s.complete===void 0&&(s.complete=go);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function z_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function go(){}function qh(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,b(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(r<<10)+a}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},wr=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n){return n&&n._delegate?n._delegate:n}class Vt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Ta;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Y_(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&a.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const a=this.instances.get(s);return a&&e(a,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Q_(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Q_(n){return n===Yt?void 0:n}function Y_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new K_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const J_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Z_=H.INFO,eg={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},tg=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=eg[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Cr{constructor(e){this.name=e,this._logLevel=Z_,this._logHandler=tg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?J_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const ng=(n,e)=>e.some(t=>n instanceof t);let Fc,Uc;function ig(){return Fc||(Fc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function sg(){return Uc||(Uc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Wh=new WeakMap,xo=new WeakMap,jh=new WeakMap,mo=new WeakMap,Ca=new WeakMap;function rg(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",a)},r=()=>{t(Ot(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Wh.set(t,n)}).catch(()=>{}),Ca.set(e,n),e}function og(n){if(xo.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",a),n.removeEventListener("abort",a)},r=()=>{t(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",a),n.addEventListener("abort",a)});xo.set(n,e)}let Vo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return xo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||jh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ag(n){Vo=n(Vo)}function lg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(yo(this),e,...t);return jh.set(i,e.sort?e.sort():[e]),Ot(i)}:sg().includes(n)?function(...e){return n.apply(yo(this),e),Ot(Wh.get(this))}:function(...e){return Ot(n.apply(yo(this),e))}}function cg(n){return typeof n=="function"?lg(n):(n instanceof IDBTransaction&&og(n),ng(n,ig())?new Proxy(n,Vo):n)}function Ot(n){if(n instanceof IDBRequest)return rg(n);if(mo.has(n))return mo.get(n);const e=cg(n);return e!==n&&(mo.set(n,e),Ca.set(e,n)),e}const yo=n=>Ca.get(n);function ug(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(n,e),l=Ot(a);return i&&a.addEventListener("upgradeneeded",c=>{i(Ot(a.result),c.oldVersion,c.newVersion,Ot(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const hg=["get","getKey","getAll","getAllKeys","count"],dg=["put","add","delete","clear"],vo=new Map;function Bc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(vo.get(e))return vo.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=dg.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||hg.includes(t)))return;const r=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let h=c.store;return i&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return vo.set(e,r),r}ag(n=>({...n,get:(e,t,i)=>Bc(e,t)||n.get(e,t,i),has:(e,t)=>!!Bc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(pg(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function pg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Fo="@firebase/app",qc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=new Cr("@firebase/app"),_g="@firebase/app-compat",gg="@firebase/analytics-compat",mg="@firebase/analytics",yg="@firebase/app-check-compat",vg="@firebase/app-check",Eg="@firebase/auth",Ig="@firebase/auth-compat",Tg="@firebase/database",wg="@firebase/data-connect",Cg="@firebase/database-compat",Ag="@firebase/functions",Rg="@firebase/functions-compat",Sg="@firebase/installations",Pg="@firebase/installations-compat",bg="@firebase/messaging",kg="@firebase/messaging-compat",Ng="@firebase/performance",Dg="@firebase/performance-compat",Og="@firebase/remote-config",Lg="@firebase/remote-config-compat",Mg="@firebase/storage",xg="@firebase/storage-compat",Vg="@firebase/firestore",Fg="@firebase/vertexai-preview",Ug="@firebase/firestore-compat",Bg="firebase",qg="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo="[DEFAULT]",Wg={[Fo]:"fire-core",[_g]:"fire-core-compat",[mg]:"fire-analytics",[gg]:"fire-analytics-compat",[vg]:"fire-app-check",[yg]:"fire-app-check-compat",[Eg]:"fire-auth",[Ig]:"fire-auth-compat",[Tg]:"fire-rtdb",[wg]:"fire-data-connect",[Cg]:"fire-rtdb-compat",[Ag]:"fire-fn",[Rg]:"fire-fn-compat",[Sg]:"fire-iid",[Pg]:"fire-iid-compat",[bg]:"fire-fcm",[kg]:"fire-fcm-compat",[Ng]:"fire-perf",[Dg]:"fire-perf-compat",[Og]:"fire-rc",[Lg]:"fire-rc-compat",[Mg]:"fire-gcs",[xg]:"fire-gcs-compat",[Vg]:"fire-fst",[Ug]:"fire-fst-compat",[Fg]:"fire-vertex","fire-js":"fire-js",[Bg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs=new Map,jg=new Map,Bo=new Map;function Wc(n,e){try{n.container.addComponent(e)}catch(t){_t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rn(n){const e=n.name;if(Bo.has(e))return _t.debug(`There were multiple attempts to register component ${e}.`),!1;Bo.set(e,n);for(const t of Xs.values())Wc(t,n);for(const t of jg.values())Wc(t,n);return!0}function Ar(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ge(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new Ji("app","Firebase",Hg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Vt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=qg;function zg(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Uo,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Lt.create("bad-app-name",{appName:String(s)});if(t||(t=xh()),!t)throw Lt.create("no-options");const r=Xs.get(s);if(r){if(Ys(t,r.options)&&Ys(i,r.config))return r;throw Lt.create("duplicate-app",{appName:s})}const a=new X_(s);for(const c of Bo.values())a.addComponent(c);const l=new $g(t,i,a);return Xs.set(s,l),l}function Aa(n=Uo){const e=Xs.get(n);if(!e&&n===Uo&&xh())return zg();if(!e)throw Lt.create("no-app",{appName:n});return e}function Ze(n,e,t){var i;let s=(i=Wg[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),a=e.match(/\s|\//);if(r||a){const l=[`Unable to register library "${s}" with version "${e}":`];r&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_t.warn(l.join(" "));return}rn(new Vt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg="firebase-heartbeat-database",Kg=1,Ui="firebase-heartbeat-store";let Eo=null;function Hh(){return Eo||(Eo=ug(Gg,Kg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ui)}catch(t){console.warn(t)}}}}).catch(n=>{throw Lt.create("idb-open",{originalErrorMessage:n.message})})),Eo}async function Qg(n){try{const t=(await Hh()).transaction(Ui),i=await t.objectStore(Ui).get($h(n));return await t.done,i}catch(e){if(e instanceof vt)_t.warn(e.message);else{const t=Lt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});_t.warn(t.message)}}}async function jc(n,e){try{const i=(await Hh()).transaction(Ui,"readwrite");await i.objectStore(Ui).put(e,$h(n)),await i.done}catch(t){if(t instanceof vt)_t.warn(t.message);else{const i=Lt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});_t.warn(i.message)}}}function $h(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg=1024,Xg=30*24*60*60*1e3;class Jg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new em(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Hc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(a=>a.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Xg}),this._storage.overwrite(this._heartbeatsCache))}catch(i){_t.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Hc(),{heartbeatsToSend:i,unsentEntries:s}=Zg(this._heartbeatsCache.heartbeats),r=Gs(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return _t.warn(t),""}}}function Hc(){return new Date().toISOString().substring(0,10)}function Zg(n,e=Yg){const t=[];let i=n.slice();for(const s of n){const r=t.find(a=>a.agent===s.agent);if(r){if(r.dates.push(s.date),$c(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),$c(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class em{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return x_()?V_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Qg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return jc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return jc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function $c(n){return Gs(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n){rn(new Vt("platform-logger",e=>new fg(e),"PRIVATE")),rn(new Vt("heartbeat",e=>new Jg(e),"PRIVATE")),Ze(Fo,qc,n),Ze(Fo,qc,"esm2017"),Ze("fire-js","")}tm("");function Ra(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function zh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const nm=zh,Gh=new Ji("auth","Firebase",zh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js=new Cr("@firebase/auth");function im(n,...e){Js.logLevel<=H.WARN&&Js.warn(`Auth (${_n}): ${n}`,...e)}function Us(n,...e){Js.logLevel<=H.ERROR&&Js.error(`Auth (${_n}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(n,...e){throw Pa(n,...e)}function Ye(n,...e){return Pa(n,...e)}function Sa(n,e,t){const i=Object.assign(Object.assign({},nm()),{[e]:t});return new Ji("auth","Firebase",i).create(e,{appName:n.name})}function dt(n){return Sa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sm(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&He(n,"argument-error"),Sa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Pa(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Gh.create(n,...e)}function V(n,e,...t){if(!n)throw Pa(e,...t)}function lt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Us(e),new Error(e)}function gt(n,e){n||lt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function rm(){return zc()==="http:"||zc()==="https:"}function zc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rm()||D_()||"connection"in navigator)?navigator.onLine:!0}function am(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e,t){this.shortDelay=e,this.longDelay=t,gt(t>e,"Short delay should be less than long delay!"),this.isMobile=wa()||Uh()}get(){return om()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n,e){gt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;lt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;lt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;lt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm=new Zi(3e4,6e4);function jt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function It(n,e,t,i,s={}){return Qh(n,s,async()=>{let r={},a={};i&&(e==="GET"?a=i:r={body:JSON.stringify(i)});const l=Kn(Object.assign({key:n.config.apiKey},a)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},r);return N_()||(h.referrerPolicy="no-referrer"),Kh.fetch()(Yh(n,n.config.apiHost,t,l),h)})}async function Qh(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},lm),e);try{const s=new hm(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await r.json();if("needConfirmation"in a)throw Ds(n,"account-exists-with-different-credential",a);if(r.ok&&!("errorMessage"in a))return a;{const l=r.ok?a.errorMessage:a.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ds(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Ds(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Ds(n,"user-disabled",a);const f=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Sa(n,f,h);He(n,f)}}catch(s){if(s instanceof vt)throw s;He(n,"network-request-failed",{message:String(s)})}}async function es(n,e,t,i,s={}){const r=await It(n,e,t,i,s);return"mfaPendingCredential"in r&&He(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Yh(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?ba(n.config,s):`${n.config.apiScheme}://${s}`}function um(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class hm{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ye(this.auth,"network-request-failed")),cm.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ds(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ye(n,e,i);return s.customData._tokenResponse=t,s}function Gc(n){return n!==void 0&&n.enterprise!==void 0}class dm{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return um(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function fm(n,e){return It(n,"GET","/v2/recaptchaConfig",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pm(n,e){return It(n,"POST","/v1/accounts:delete",e)}async function Xh(n,e){return It(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _m(n,e=!1){const t=xe(n),i=await t.getIdToken(e),s=ka(i);V(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,a=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:Pi(Io(s.auth_time)),issuedAtTime:Pi(Io(s.iat)),expirationTime:Pi(Io(s.exp)),signInProvider:a||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Io(n){return Number(n)*1e3}function ka(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Us("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ks(t);return s?JSON.parse(s):(Us("Failed to decode base64 JWT payload"),null)}catch(s){return Us("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Kc(n){const e=ka(n);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof vt&&gm(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function gm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pi(this.lastLoginAt),this.creationTime=Pi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zs(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Vn(n,Xh(t,{idToken:i}));V(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const a=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Jh(r.providerUserInfo):[],l=vm(n.providerData,a),c=n.isAnonymous,h=!(n.email&&r.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,_={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:l,metadata:new Wo(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(n,_)}async function ym(n){const e=xe(n);await Zs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function vm(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Jh(n){return n.map(e=>{var{providerId:t}=e,i=Ra(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Em(n,e){const t=await Qh(n,{},async()=>{const i=Kn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,a=Yh(n,s,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Kh.fetch()(a,{method:"POST",headers:l,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Im(n,e){return It(n,"POST","/v2/accounts:revokeToken",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Kc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){V(e.length!==0,"internal-error");const t=Kc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(V(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Em(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,a=new Pn;return i&&(V(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(V(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),r&&(V(typeof r=="number","internal-error",{appName:e}),a.expirationTime=r),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pn,this.toJSON())}_performRefresh(){return lt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(n,e){V(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ct{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Ra(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new mm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Wo(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Vn(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return _m(this,e)}reload(){return ym(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ct(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Zs(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(dt(this.auth));const e=await this.getIdToken();return await Vn(this,pm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,a,l,c,h,f;const _=(i=t.displayName)!==null&&i!==void 0?i:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,A=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,S=(a=t.photoURL)!==null&&a!==void 0?a:void 0,O=(l=t.tenantId)!==null&&l!==void 0?l:void 0,N=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,Q=(h=t.createdAt)!==null&&h!==void 0?h:void 0,J=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:Z,emailVerified:re,isAnonymous:je,providerData:ue,stsTokenManager:I}=t;V(Z&&I,e,"internal-error");const g=Pn.fromJSON(this.name,I);V(typeof Z=="string",e,"internal-error"),Rt(_,e.name),Rt(m,e.name),V(typeof re=="boolean",e,"internal-error"),V(typeof je=="boolean",e,"internal-error"),Rt(A,e.name),Rt(S,e.name),Rt(O,e.name),Rt(N,e.name),Rt(Q,e.name),Rt(J,e.name);const v=new ct({uid:Z,auth:e,email:m,emailVerified:re,displayName:_,isAnonymous:je,photoURL:S,phoneNumber:A,tenantId:O,stsTokenManager:g,createdAt:Q,lastLoginAt:J});return ue&&Array.isArray(ue)&&(v.providerData=ue.map(E=>Object.assign({},E))),N&&(v._redirectEventId=N),v}static async _fromIdTokenResponse(e,t,i=!1){const s=new Pn;s.updateFromServerResponse(t);const r=new ct({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Zs(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];V(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Jh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),l=new Pn;l.updateFromIdToken(i);const c=new ct({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Wo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc=new Map;function ut(n){gt(n instanceof Function,"Expected a class definition");let e=Qc.get(n);return e?(gt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Qc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zh.type="NONE";const Yc=Zh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(n,e,t){return`firebase:${n}:${e}:${t}`}class bn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Bs(this.userKey,s.apiKey,r),this.fullPersistenceKey=Bs("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ct._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new bn(ut(Yc),e,i);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let r=s[0]||ut(Yc);const a=Bs(i,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){const _=ct._fromJSON(e,f);h!==r&&(l=_),r=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new bn(r,e,i):(r=c[0],l&&await r._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==r)try{await h._remove(a)}catch{}})),new bn(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ed(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rd(e))return"Blackberry";if(od(e))return"Webos";if(td(e))return"Safari";if((e.includes("chrome/")||nd(e))&&!e.includes("edge/"))return"Chrome";if(sd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function ed(n=De()){return/firefox\//i.test(n)}function td(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nd(n=De()){return/crios\//i.test(n)}function id(n=De()){return/iemobile/i.test(n)}function sd(n=De()){return/android/i.test(n)}function rd(n=De()){return/blackberry/i.test(n)}function od(n=De()){return/webos/i.test(n)}function Na(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Tm(n=De()){var e;return Na(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function wm(){return O_()&&document.documentMode===10}function ad(n=De()){return Na(n)||sd(n)||od(n)||rd(n)||/windows phone/i.test(n)||id(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ld(n,e=[]){let t;switch(n){case"Browser":t=Xc(De());break;case"Worker":t=`${Xc(De())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_n}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((a,l)=>{try{const c=e(r);a(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Am(n,e={}){return It(n,"GET","/v2/passwordPolicy",jt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm=6;class Sm{constructor(e){var t,i,s,r;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Rm,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,a,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsUppercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(a=c.containsNumericCharacter)!==null&&a!==void 0?a:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jc(this),this.idTokenSubscription=new Jc(this),this.beforeStateQueue=new Cm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ut(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await bn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Xh(this,{idToken:e}),i=await ct._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ge(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Zs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=am()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(dt(this));const t=e?xe(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Am(this),t=new Sm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ji("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Im(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ut(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await bn.create(this,[ut(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(V(l,this,"internal-error"),l.then(()=>{a||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ld(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&im(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ht(n){return xe(n)}class Jc{constructor(e){this.auth=e,this.observer=null,this.addObserver=H_(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bm(n){Rr=n}function cd(n){return Rr.loadJS(n)}function km(){return Rr.recaptchaEnterpriseScript}function Nm(){return Rr.gapiScript}function Dm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Om="recaptcha-enterprise",Lm="NO_RECAPTCHA";class Mm{constructor(e){this.type=Om,this.auth=Ht(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(a,l)=>{fm(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new dm(c);return r.tenantId==null?r._agentRecaptchaConfig=h:r._tenantRecaptchaConfigs[r.tenantId]=h,a(h.siteKey)}}).catch(c=>{l(c)})})}function s(r,a,l){const c=window.grecaptcha;Gc(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:e}).then(h=>{a(h)}).catch(()=>{a(Lm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,a)=>{i(this.auth).then(l=>{if(!t&&Gc(window.grecaptcha))s(l,r,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=km();c.length!==0&&(c+=l),cd(c).then(()=>{s(l,r,a)}).catch(h=>{a(h)})}}).catch(l=>{a(l)})})}}async function Zc(n,e,t,i=!1){const s=new Mm(n);let r;try{r=await s.verify(t)}catch{r=await s.verify(t,!0)}const a=Object.assign({},e);return i?Object.assign(a,{captchaResp:r}):Object.assign(a,{captchaResponse:r}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function jo(n,e,t,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Zc(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Zc(n,e,t,t==="getOobCode");return i(n,a)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xm(n,e){const t=Ar(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Ys(r,e??{}))return s;He(s,"already-initialized")}return t.initialize({options:e})}function Vm(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(ut);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Fm(n,e,t){const i=Ht(n);V(i._canInitEmulator,i,"emulator-config-failed"),V(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=ud(e),{host:a,port:l}=Um(e),c=l===null?"":`:${l}`;i.config.emulator={url:`${r}//${a}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),Bm()}function ud(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Um(n){const e=ud(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:eu(i.substr(r.length+1))}}else{const[r,a]=i.split(":");return{host:r,port:eu(a)}}}function eu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Bm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return lt("not implemented")}_getIdTokenResponse(e){return lt("not implemented")}_linkToIdToken(e,t){return lt("not implemented")}_getReauthenticationResolver(e){return lt("not implemented")}}async function qm(n,e){return It(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wm(n,e){return es(n,"POST","/v1/accounts:signInWithPassword",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jm(n,e){return es(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}async function Hm(n,e){return es(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi extends Da{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Bi(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Bi(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return jo(e,t,"signInWithPassword",Wm);case"emailLink":return jm(e,{email:this._email,oobCode:this._password});default:He(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return jo(e,i,"signUpPassword",qm);case"emailLink":return Hm(e,{idToken:t,email:this._email,oobCode:this._password});default:He(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kn(n,e){return es(n,"POST","/v1/accounts:signInWithIdp",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m="http://localhost";class on extends Da{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new on(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):He("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Ra(t,["providerId","signInMethod"]);if(!i||!s)return null;const a=new on(i,s);return a.idToken=r.idToken||void 0,a.accessToken=r.accessToken||void 0,a.secret=r.secret,a.nonce=r.nonce,a.pendingToken=r.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return kn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,kn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,kn(e,t)}buildRequest(){const e={requestUri:$m,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Gm(n){const e=wi(Ci(n)).link,t=e?wi(Ci(e)).deep_link_id:null,i=wi(Ci(n)).deep_link_id;return(i?wi(Ci(i)).link:null)||i||t||e||n}class Oa{constructor(e){var t,i,s,r,a,l;const c=wi(Ci(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(i=c.oobCode)!==null&&i!==void 0?i:null,_=zm((s=c.mode)!==null&&s!==void 0?s:null);V(h&&f&&_,"argument-error"),this.apiKey=h,this.operation=_,this.code=f,this.continueUrl=(r=c.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(a=c.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Gm(e);try{return new Oa(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(){this.providerId=Qn.PROVIDER_ID}static credential(e,t){return Bi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Oa.parseLink(t);return V(i,"argument-error"),Bi._fromEmailAndCode(e,i.code,i.tenantId)}}Qn.PROVIDER_ID="password";Qn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts extends La{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends ts{constructor(){super("facebook.com")}static credential(e){return on._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends ts{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return on._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Pt.credential(t,i)}catch{return null}}}Pt.GOOGLE_SIGN_IN_METHOD="google.com";Pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends ts{constructor(){super("github.com")}static credential(e){return on._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.GITHUB_SIGN_IN_METHOD="github.com";bt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends ts{constructor(){super("twitter.com")}static credential(e,t){return on._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return kt.credential(t,i)}catch{return null}}}kt.TWITTER_SIGN_IN_METHOD="twitter.com";kt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Km(n,e){return es(n,"POST","/v1/accounts:signUp",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await ct._fromIdTokenResponse(e,i,s),a=tu(i);return new an({user:r,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=tu(i);return new an({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function tu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er extends vt{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,er.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new er(e,t,i,s)}}function hd(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?er._fromErrorAndOperation(n,r,e,i):r})}async function Qm(n,e,t=!1){const i=await Vn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return an._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ym(n,e,t=!1){const{auth:i}=n;if(Ge(i.app))return Promise.reject(dt(i));const s="reauthenticate";try{const r=await Vn(n,hd(i,s,e,n),t);V(r.idToken,i,"internal-error");const a=ka(r.idToken);V(a,i,"internal-error");const{sub:l}=a;return V(n.uid===l,i,"user-mismatch"),an._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&He(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dd(n,e,t=!1){if(Ge(n.app))return Promise.reject(dt(n));const i="signIn",s=await hd(n,i,e),r=await an._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Xm(n,e){return dd(Ht(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fd(n){const e=Ht(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function uA(n,e,t){if(Ge(n.app))return Promise.reject(dt(n));const i=Ht(n),a=await jo(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Km).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&fd(n),c}),l=await an._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(l.user),l}function hA(n,e,t){return Ge(n.app)?Promise.reject(dt(n)):Xm(xe(n),Qn.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&fd(n),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jm(n,e){return It(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dA(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=xe(n),r={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Vn(i,Jm(i.auth,r));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;const l=i.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=i.displayName,l.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function Zm(n,e,t,i){return xe(n).onIdTokenChanged(e,t,i)}function ey(n,e,t){return xe(n).beforeAuthStateChanged(e,t)}function fA(n,e,t,i){return xe(n).onAuthStateChanged(e,t,i)}function pA(n){return xe(n).signOut()}const tr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(tr,"1"),this.storage.removeItem(tr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=1e3,ny=10;class _d extends pd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ad(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},r=this.storage.getItem(i);wm()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ny):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},ty)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}_d.type="LOCAL";const iy=_d;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd extends pd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gd.type="SESSION";const md=gd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Sr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,r)),c=await sy(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,a;return new Promise((l,c)=>{const h=Ma("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(_){const m=_;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(m.data.response);break;default:clearTimeout(f),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function oy(n){et().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function ay(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ly(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function cy(){return yd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="firebaseLocalStorageDb",uy=1,nr="firebaseLocalStorage",Ed="fbase_key";class ns{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Pr(n,e){return n.transaction([nr],e?"readwrite":"readonly").objectStore(nr)}function hy(){const n=indexedDB.deleteDatabase(vd);return new ns(n).toPromise()}function Ho(){const n=indexedDB.open(vd,uy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(nr,{keyPath:Ed})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(nr)?e(i):(i.close(),await hy(),e(await Ho()))})})}async function nu(n,e,t){const i=Pr(n,!0).put({[Ed]:e,value:t});return new ns(i).toPromise()}async function dy(n,e){const t=Pr(n,!1).get(e),i=await new ns(t).toPromise();return i===void 0?null:i.value}function iu(n,e){const t=Pr(n,!0).delete(e);return new ns(t).toPromise()}const fy=800,py=3;class Id{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ho(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>py)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return yd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sr._getInstance(cy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ay(),!this.activeServiceWorker)return;this.sender=new ry(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ly()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ho();return await nu(e,tr,"1"),await iu(e,tr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>nu(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>dy(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>iu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Pr(s,!1).getAll();return new ns(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Id.type="LOCAL";const _y=Id;new Zi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Td(n,e){return e?ut(e):(V(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa extends Da{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gy(n){return dd(n.auth,new xa(n),n.bypassAuthState)}function my(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),Ym(t,new xa(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return V(t,e,"internal-error"),Qm(t,new xa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gy;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return my;default:He(this.auth,"internal-error")}}resolve(e){gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=new Zi(2e3,1e4);async function _A(n,e,t){if(Ge(n.app))return Promise.reject(Ye(n,"operation-not-supported-in-this-environment"));const i=Ht(n);sm(n,e,La);const s=Td(i,t);return new Jt(i,"signInViaPopup",e,s).executeNotNull()}class Jt extends wd{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Jt.currentPopupAction&&Jt.currentPopupAction.cancel(),Jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){gt(this.filter.length===1,"Popup operations only handle one event");const e=Ma();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vy.get())};e()}}Jt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="pendingRedirect",qs=new Map;class Iy extends wd{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=qs.get(this.auth._key());if(!e){try{const i=await Ty(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}qs.set(this.auth._key(),e)}return this.bypassAuthState||qs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ty(n,e){const t=Ay(e),i=Cy(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function wy(n,e){qs.set(n._key(),e)}function Cy(n){return ut(n._redirectPersistence)}function Ay(n){return Bs(Ey,n.config.apiKey,n.name)}async function Ry(n,e,t=!1){if(Ge(n.app))return Promise.reject(dt(n));const i=Ht(n),s=Td(i,e),a=await new Iy(i,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=10*60*1e3;class Py{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!by(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Cd(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ye(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(su(e))}saveEventToCache(e){this.cachedEventUids.add(su(e)),this.lastProcessedEventTime=Date.now()}}function su(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Cd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function by(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Cd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(n,e={}){return It(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dy=/^https?/;async function Oy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ky(n);for(const t of e)try{if(Ly(t))return}catch{}He(n,"unauthorized-domain")}function Ly(n){const e=qo(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!Dy.test(t))return!1;if(Ny.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const My=new Zi(3e4,6e4);function ru(){const n=et().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xy(n){return new Promise((e,t)=>{var i,s,r;function a(){ru(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ru(),t(Ye(n,"network-request-failed"))},timeout:My.get()})}if(!((s=(i=et().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=et().gapi)===null||r===void 0)&&r.load)a();else{const l=Dm("iframefcb");return et()[l]=()=>{gapi.load?a():t(Ye(n,"network-request-failed"))},cd(`${Nm()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Ws=null,e})}let Ws=null;function Vy(n){return Ws=Ws||xy(n),Ws}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fy=new Zi(5e3,15e3),Uy="__/auth/iframe",By="emulator/auth/iframe",qy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Wy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jy(n){const e=n.config;V(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ba(e,By):`https://${n.config.authDomain}/${Uy}`,i={apiKey:e.apiKey,appName:n.name,v:_n},s=Wy.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Kn(i).slice(1)}`}async function Hy(n){const e=await Vy(n),t=et().gapi;return V(t,n,"internal-error"),e.open({where:document.body,url:jy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qy,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const a=Ye(n,"network-request-failed"),l=et().setTimeout(()=>{r(a)},Fy.get());function c(){et().clearTimeout(l),s(i)}i.ping(c).then(c,()=>{r(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zy=500,Gy=600,Ky="_blank",Qy="http://localhost";class ou{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Yy(n,e,t,i=zy,s=Gy){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c=Object.assign(Object.assign({},$y),{width:i.toString(),height:s.toString(),top:r,left:a}),h=De().toLowerCase();t&&(l=nd(h)?Ky:t),ed(h)&&(e=e||Qy,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[A,S])=>`${m}${A}=${S},`,"");if(Tm(h)&&l!=="_self")return Xy(e||"",l),new ou(null);const _=window.open(e||"",l,f);V(_,n,"popup-blocked");try{_.focus()}catch{}return new ou(_)}function Xy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="__/auth/handler",Zy="emulator/auth/handler",ev=encodeURIComponent("fac");async function au(n,e,t,i,s,r){V(n.config.authDomain,n,"auth-domain-config-required"),V(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:_n,eventId:s};if(e instanceof La){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Mo(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,_]of Object.entries({}))a[f]=_}if(e instanceof ts){const f=e.getScopes().filter(_=>_!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${ev}=${encodeURIComponent(c)}`:"";return`${tv(n)}?${Kn(l).slice(1)}${h}`}function tv({config:n}){return n.emulator?ba(n,Zy):`https://${n.authDomain}/${Jy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To="webStorageSupport";class nv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=md,this._completeRedirectFn=Ry,this._overrideRedirectResult=wy}async _openPopup(e,t,i,s){var r;gt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const a=await au(e,t,i,qo(),s);return Yy(e,a,Ma())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await au(e,t,i,qo(),s);return oy(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(gt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Hy(e),i=new Py(e);return t.register("authEvent",s=>(V(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(To,{type:To},s=>{var r;const a=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[To];a!==void 0&&t(!!a),He(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Oy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ad()||td()||Na()}}const iv=nv;var lu="@firebase/auth",cu="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ov(n){rn(new Vt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=i.options;V(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ld(n)},h=new Pm(i,s,r,c);return Vm(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),rn(new Vt("auth-internal",e=>{const t=Ht(e.getProvider("auth").getImmediate());return(i=>new sv(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ze(lu,cu,rv(n)),Ze(lu,cu,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const av=5*60,lv=Vh("authIdTokenMaxAge")||av;let uu=null;const cv=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>lv)return;const s=t==null?void 0:t.token;uu!==s&&(uu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function gA(n=Aa()){const e=Ar(n,"auth");if(e.isInitialized())return e.getImmediate();const t=xm(n,{popupRedirectResolver:iv,persistence:[_y,iy,md]}),i=Vh("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const a=cv(r.toString());ey(t,a,()=>a(t.currentUser)),Zm(t,l=>a(l))}}const s=Lh("auth");return s&&Fm(t,`http://${s}`),t}function uv(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}bm({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Ye("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",uv().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ov("Browser");var hu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tn,Ad;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function v(){}v.prototype=g.prototype,I.D=g.prototype,I.prototype=new v,I.prototype.constructor=I,I.C=function(E,T,C){for(var y=Array(arguments.length-2),st=2;st<arguments.length;st++)y[st-2]=arguments[st];return g.prototype[T].apply(E,y)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,v){v||(v=0);var E=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)E[T]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(T=0;16>T;++T)E[T]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=I.g[0],v=I.g[1],T=I.g[2];var C=I.g[3],y=g+(C^v&(T^C))+E[0]+3614090360&4294967295;g=v+(y<<7&4294967295|y>>>25),y=C+(T^g&(v^T))+E[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=T+(v^C&(g^v))+E[2]+606105819&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(g^T&(C^g))+E[3]+3250441966&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(C^v&(T^C))+E[4]+4118548399&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(T^g&(v^T))+E[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=T+(v^C&(g^v))+E[6]+2821735955&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(g^T&(C^g))+E[7]+4249261313&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(C^v&(T^C))+E[8]+1770035416&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(T^g&(v^T))+E[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=T+(v^C&(g^v))+E[10]+4294925233&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(g^T&(C^g))+E[11]+2304563134&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(C^v&(T^C))+E[12]+1804603682&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(T^g&(v^T))+E[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=T+(v^C&(g^v))+E[14]+2792965006&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(g^T&(C^g))+E[15]+1236535329&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(T^C&(v^T))+E[1]+4129170786&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(g^v))+E[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(C^g))+E[11]+643717713&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(T^C))+E[0]+3921069994&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^C&(v^T))+E[5]+3593408605&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(g^v))+E[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(C^g))+E[15]+3634488961&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(T^C))+E[4]+3889429448&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^C&(v^T))+E[9]+568446438&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(g^v))+E[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(C^g))+E[3]+4107603335&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(T^C))+E[8]+1163531501&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^C&(v^T))+E[13]+2850285829&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(g^v))+E[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(C^g))+E[7]+1735328473&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(T^C))+E[12]+2368359562&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(v^T^C)+E[5]+4294588738&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^T)+E[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=T+(C^g^v)+E[11]+1839030562&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^g)+E[14]+4259657740&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^C)+E[1]+2763975236&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^T)+E[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=T+(C^g^v)+E[7]+4139469664&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^g)+E[10]+3200236656&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^C)+E[13]+681279174&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^T)+E[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=T+(C^g^v)+E[3]+3572445317&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^g)+E[6]+76029189&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^C)+E[9]+3654602809&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^T)+E[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=T+(C^g^v)+E[15]+530742520&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^g)+E[2]+3299628645&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(T^(v|~C))+E[0]+4096336452&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~T))+E[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=T+(g^(C|~v))+E[14]+2878612391&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~g))+E[5]+4237533241&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~C))+E[12]+1700485571&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~T))+E[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=T+(g^(C|~v))+E[10]+4293915773&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~g))+E[1]+2240044497&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~C))+E[8]+1873313359&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~T))+E[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=T+(g^(C|~v))+E[6]+2734768916&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~g))+E[13]+1309151649&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~C))+E[4]+4149444226&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~T))+E[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=T+(g^(C|~v))+E[2]+718787259&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+C&4294967295}i.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var v=g-this.blockSize,E=this.B,T=this.h,C=0;C<g;){if(T==0)for(;C<=v;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<g;)if(E[T++]=I.charCodeAt(C++),T==this.blockSize){s(this,E),T=0;break}}else for(;C<g;)if(E[T++]=I[C++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=g},i.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var v=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=v&255,v/=256;for(this.u(I),I=Array(16),g=v=0;4>g;++g)for(var E=0;32>E;E+=8)I[v++]=this.g[g]>>>E&255;return I};function r(I,g){var v=l;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=g(I)}function a(I,g){this.h=g;for(var v=[],E=!0,T=I.length-1;0<=T;T--){var C=I[T]|0;E&&C==g||(v[T]=C,E=!1)}this.g=v}var l={};function c(I){return-128<=I&&128>I?r(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return _;if(0>I)return N(h(-I));for(var g=[],v=1,E=0;I>=v;E++)g[E]=I/v|0,v*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return N(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),E=_,T=0;T<I.length;T+=8){var C=Math.min(8,I.length-T),y=parseInt(I.substring(T,T+C),g);8>C?(C=h(Math.pow(g,C)),E=E.j(C).add(h(y))):(E=E.j(v),E=E.add(h(y)))}return E}var _=c(0),m=c(1),A=c(16777216);n=a.prototype,n.m=function(){if(O(this))return-N(this).m();for(var I=0,g=1,v=0;v<this.g.length;v++){var E=this.i(v);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(S(this))return"0";if(O(this))return"-"+N(this).toString(I);for(var g=h(Math.pow(I,6)),v=this,E="";;){var T=re(v,g).g;v=Q(v,T.j(g));var C=((0<v.g.length?v.g[0]:v.h)>>>0).toString(I);if(v=T,S(v))return C+E;for(;6>C.length;)C="0"+C;E=C+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function S(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function O(I){return I.h==-1}n.l=function(I){return I=Q(this,I),O(I)?-1:S(I)?0:1};function N(I){for(var g=I.g.length,v=[],E=0;E<g;E++)v[E]=~I.g[E];return new a(v,~I.h).add(m)}n.abs=function(){return O(this)?N(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0,T=0;T<=g;T++){var C=E+(this.i(T)&65535)+(I.i(T)&65535),y=(C>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);E=y>>>16,C&=65535,y&=65535,v[T]=y<<16|C}return new a(v,v[v.length-1]&-2147483648?-1:0)};function Q(I,g){return I.add(N(g))}n.j=function(I){if(S(this)||S(I))return _;if(O(this))return O(I)?N(this).j(N(I)):N(N(this).j(I));if(O(I))return N(this.j(N(I)));if(0>this.l(A)&&0>I.l(A))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,v=[],E=0;E<2*g;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<I.g.length;T++){var C=this.i(E)>>>16,y=this.i(E)&65535,st=I.i(T)>>>16,ti=I.i(T)&65535;v[2*E+2*T]+=y*ti,J(v,2*E+2*T),v[2*E+2*T+1]+=C*ti,J(v,2*E+2*T+1),v[2*E+2*T+1]+=y*st,J(v,2*E+2*T+1),v[2*E+2*T+2]+=C*st,J(v,2*E+2*T+2)}for(E=0;E<g;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=g;E<2*g;E++)v[E]=0;return new a(v,0)};function J(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function Z(I,g){this.g=I,this.h=g}function re(I,g){if(S(g))throw Error("division by zero");if(S(I))return new Z(_,_);if(O(I))return g=re(N(I),g),new Z(N(g.g),N(g.h));if(O(g))return g=re(I,N(g)),new Z(N(g.g),g.h);if(30<I.g.length){if(O(I)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var v=m,E=g;0>=E.l(I);)v=je(v),E=je(E);var T=ue(v,1),C=ue(E,1);for(E=ue(E,2),v=ue(v,2);!S(E);){var y=C.add(E);0>=y.l(I)&&(T=T.add(v),C=y),E=ue(E,1),v=ue(v,1)}return g=Q(I,T.j(g)),new Z(T,g)}for(T=_;0<=I.l(g);){for(v=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),C=h(v),y=C.j(g);O(y)||0<y.l(I);)v-=E,C=h(v),y=C.j(g);S(C)&&(C=m),T=T.add(C),I=Q(I,y)}return new Z(T,I)}n.A=function(I){return re(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)&I.i(E);return new a(v,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)|I.i(E);return new a(v,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)^I.i(E);return new a(v,this.h^I.h)};function je(I){for(var g=I.g.length+1,v=[],E=0;E<g;E++)v[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(v,I.h)}function ue(I,g){var v=g>>5;g%=32;for(var E=I.g.length-v,T=[],C=0;C<E;C++)T[C]=0<g?I.i(C+v)>>>g|I.i(C+v+1)<<32-g:I.i(C+v);return new a(T,I.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,Ad=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,tn=a}).apply(typeof hu<"u"?hu:typeof self<"u"?self:typeof window<"u"?window:{});var Os=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Rd,Ai,Sd,js,$o,Pd,bd,kd;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Os=="object"&&Os];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var i=t(this);function s(o,u){if(u)e:{var d=i;o=o.split(".");for(var p=0;p<o.length-1;p++){var w=o[p];if(!(w in d))break e;d=d[w]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function r(o,u){o instanceof String&&(o+="");var d=0,p=!1,w={next:function(){if(!p&&d<o.length){var R=d++;return{value:u(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(o){return o||function(){return r(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function _(o,u,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,p),o.apply(u,w)}}return function(){return o.apply(u,arguments)}}function m(o,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:_,m.apply(null,arguments)}function A(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function S(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,w,R){for(var k=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)k[ee-2]=arguments[ee];return u.prototype[w].apply(p,k)}}function O(o){const u=o.length;if(0<u){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function N(o,u){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(c(p)){const w=o.length||0,R=p.length||0;o.length=w+R;for(let k=0;k<R;k++)o[w+k]=p[k]}else o.push(p)}}class Q{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function J(o){return/^[\s\xa0]*$/.test(o)}function Z(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function re(o){return re[" "](o),o}re[" "]=function(){};var je=Z().indexOf("Gecko")!=-1&&!(Z().toLowerCase().indexOf("webkit")!=-1&&Z().indexOf("Edge")==-1)&&!(Z().indexOf("Trident")!=-1||Z().indexOf("MSIE")!=-1)&&Z().indexOf("Edge")==-1;function ue(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function I(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function g(o){const u={};for(const d in o)u[d]=o[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,u){let d,p;for(let w=1;w<arguments.length;w++){p=arguments[w];for(d in p)o[d]=p[d];for(let R=0;R<v.length;R++)d=v[R],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function T(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function C(o){l.setTimeout(()=>{throw o},0)}function y(){var o=$r;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class st{constructor(){this.h=this.g=null}add(u,d){const p=ti.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var ti=new Q(()=>new qp,o=>o.reset());class qp{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ni,ii=!1,$r=new st,xl=()=>{const o=l.Promise.resolve(void 0);ni=()=>{o.then(Wp)}};var Wp=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(d){C(d)}var u=ti;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ii=!1};function Tt(){this.s=this.s,this.C=this.C}Tt.prototype.s=!1,Tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var jp=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return o}();function si(o,u){if(we.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(je){e:{try{re(u.nodeName);var w=!0;break e}catch{}w=!1}w||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Hp[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&si.aa.h.call(this)}}S(si,we);var Hp={2:"touch",3:"pen",4:"mouse"};si.prototype.h=function(){si.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var fs="closure_listenable_"+(1e6*Math.random()|0),$p=0;function zp(o,u,d,p,w){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=w,this.key=++$p,this.da=this.fa=!1}function ps(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function _s(o){this.src=o,this.g={},this.h=0}_s.prototype.add=function(o,u,d,p,w){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var k=Gr(o,u,p,w);return-1<k?(u=o[k],d||(u.fa=!1)):(u=new zp(u,this.src,R,!!p,w),u.fa=d,o.push(u)),u};function zr(o,u){var d=u.type;if(d in o.g){var p=o.g[d],w=Array.prototype.indexOf.call(p,u,void 0),R;(R=0<=w)&&Array.prototype.splice.call(p,w,1),R&&(ps(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Gr(o,u,d,p){for(var w=0;w<o.length;++w){var R=o[w];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==p)return w}return-1}var Kr="closure_lm_"+(1e6*Math.random()|0),Qr={};function Vl(o,u,d,p,w){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Vl(o,u[R],d,p,w);return null}return d=Bl(d),o&&o[fs]?o.K(u,d,h(p)?!!p.capture:!1,w):Gp(o,u,d,!1,p,w)}function Gp(o,u,d,p,w,R){if(!u)throw Error("Invalid event type");var k=h(w)?!!w.capture:!!w,ee=Xr(o);if(ee||(o[Kr]=ee=new _s(o)),d=ee.add(u,d,p,k,R),d.proxy)return d;if(p=Kp(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)jp||(w=k),w===void 0&&(w=!1),o.addEventListener(u.toString(),p,w);else if(o.attachEvent)o.attachEvent(Ul(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Kp(){function o(d){return u.call(o.src,o.listener,d)}const u=Qp;return o}function Fl(o,u,d,p,w){if(Array.isArray(u))for(var R=0;R<u.length;R++)Fl(o,u[R],d,p,w);else p=h(p)?!!p.capture:!!p,d=Bl(d),o&&o[fs]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],d=Gr(R,d,p,w),-1<d&&(ps(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=Xr(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Gr(u,d,p,w)),(d=-1<o?u[o]:null)&&Yr(d))}function Yr(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[fs])zr(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(Ul(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=Xr(u))?(zr(d,o),d.h==0&&(d.src=null,u[Kr]=null)):ps(o)}}}function Ul(o){return o in Qr?Qr[o]:Qr[o]="on"+o}function Qp(o,u){if(o.da)o=!0;else{u=new si(u,this);var d=o.listener,p=o.ha||o.src;o.fa&&Yr(o),o=d.call(p,u)}return o}function Xr(o){return o=o[Kr],o instanceof _s?o:null}var Jr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bl(o){return typeof o=="function"?o:(o[Jr]||(o[Jr]=function(u){return o.handleEvent(u)}),o[Jr])}function Ce(){Tt.call(this),this.i=new _s(this),this.M=this,this.F=null}S(Ce,Tt),Ce.prototype[fs]=!0,Ce.prototype.removeEventListener=function(o,u,d,p){Fl(this,o,u,d,p)};function Oe(o,u){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new we(u,o);else if(u instanceof we)u.target=u.target||o;else{var w=u;u=new we(p,o),E(u,w)}if(w=!0,d)for(var R=d.length-1;0<=R;R--){var k=u.g=d[R];w=gs(k,p,!0,u)&&w}if(k=u.g=o,w=gs(k,p,!0,u)&&w,w=gs(k,p,!1,u)&&w,d)for(R=0;R<d.length;R++)k=u.g=d[R],w=gs(k,p,!1,u)&&w}Ce.prototype.N=function(){if(Ce.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],p=0;p<d.length;p++)ps(d[p]);delete o.g[u],o.h--}}this.F=null},Ce.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},Ce.prototype.L=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function gs(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var w=!0,R=0;R<u.length;++R){var k=u[R];if(k&&!k.da&&k.capture==d){var ee=k.listener,Ee=k.ha||k.src;k.fa&&zr(o.i,k),w=ee.call(Ee,p)!==!1&&w}}return w&&!p.defaultPrevented}function ql(o,u,d){if(typeof o=="function")d&&(o=m(o,d));else if(o&&typeof o.handleEvent=="function")o=m(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function Wl(o){o.g=ql(()=>{o.g=null,o.i&&(o.i=!1,Wl(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Yp extends Tt{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Wl(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ri(o){Tt.call(this),this.h=o,this.g={}}S(ri,Tt);var jl=[];function Hl(o){ue(o.g,function(u,d){this.g.hasOwnProperty(d)&&Yr(u)},o),o.g={}}ri.prototype.N=function(){ri.aa.N.call(this),Hl(this)},ri.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zr=l.JSON.stringify,Xp=l.JSON.parse,Jp=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function eo(){}eo.prototype.h=null;function $l(o){return o.h||(o.h=o.i())}function zl(){}var oi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function to(){we.call(this,"d")}S(to,we);function no(){we.call(this,"c")}S(no,we);var zt={},Gl=null;function ms(){return Gl=Gl||new Ce}zt.La="serverreachability";function Kl(o){we.call(this,zt.La,o)}S(Kl,we);function ai(o){const u=ms();Oe(u,new Kl(u))}zt.STAT_EVENT="statevent";function Ql(o,u){we.call(this,zt.STAT_EVENT,o),this.stat=u}S(Ql,we);function Le(o){const u=ms();Oe(u,new Ql(u,o))}zt.Ma="timingevent";function Yl(o,u){we.call(this,zt.Ma,o),this.size=u}S(Yl,we);function li(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function ci(){this.g=!0}ci.prototype.xa=function(){this.g=!1};function Zp(o,u,d,p,w,R){o.info(function(){if(o.g)if(R)for(var k="",ee=R.split("&"),Ee=0;Ee<ee.length;Ee++){var K=ee[Ee].split("=");if(1<K.length){var Ae=K[0];K=K[1];var Re=Ae.split("_");k=2<=Re.length&&Re[1]=="type"?k+(Ae+"="+K+"&"):k+(Ae+"=redacted&")}}else k=null;else k=R;return"XMLHTTP REQ ("+p+") [attempt "+w+"]: "+u+`
`+d+`
`+k})}function e_(o,u,d,p,w,R,k){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+w+"]: "+u+`
`+d+`
`+R+" "+k})}function yn(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+n_(o,d)+(p?" "+p:"")})}function t_(o,u){o.info(function(){return"TIMEOUT: "+u})}ci.prototype.info=function(){};function n_(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var w=p[1];if(Array.isArray(w)&&!(1>w.length)){var R=w[0];if(R!="noop"&&R!="stop"&&R!="close")for(var k=1;k<w.length;k++)w[k]=""}}}}return Zr(d)}catch{return u}}var ys={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Xl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},io;function vs(){}S(vs,eo),vs.prototype.g=function(){return new XMLHttpRequest},vs.prototype.i=function(){return{}},io=new vs;function wt(o,u,d,p){this.j=o,this.i=u,this.l=d,this.R=p||1,this.U=new ri(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Jl}function Jl(){this.i=null,this.g="",this.h=!1}var Zl={},so={};function ro(o,u,d){o.L=1,o.v=ws(rt(u)),o.m=d,o.P=!0,ec(o,null)}function ec(o,u){o.F=Date.now(),Es(o),o.A=rt(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),pc(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Jl,o.g=Dc(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Yp(m(o.Y,o,o.g),o.O)),u=o.U,d=o.g,p=o.ca;var w="readystatechange";Array.isArray(w)||(w&&(jl[0]=w.toString()),w=jl);for(var R=0;R<w.length;R++){var k=Vl(d,w[R],p||u.handleEvent,!1,u.h||u);if(!k)break;u.g[k.key]=k}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),ai(),Zp(o.i,o.u,o.A,o.l,o.R,o.m)}wt.prototype.ca=function(o){o=o.target;const u=this.M;u&&ot(o)==3?u.j():this.Y(o)},wt.prototype.Y=function(o){try{if(o==this.g)e:{const Re=ot(this.g);var u=this.g.Ba();const In=this.g.Z();if(!(3>Re)&&(Re!=3||this.g&&(this.h.h||this.g.oa()||Ic(this.g)))){this.J||Re!=4||u==7||(u==8||0>=In?ai(3):ai(2)),oo(this);var d=this.g.Z();this.X=d;t:if(tc(this)){var p=Ic(this.g);o="";var w=p.length,R=ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gt(this),ui(this);var k="";break t}this.h.i=new l.TextDecoder}for(u=0;u<w;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(R&&u==w-1)});p.length=0,this.h.g+=o,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=d==200,e_(this.i,this.u,this.A,this.l,this.R,Re,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ee,Ee=this.g;if((ee=Ee.g?Ee.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!J(ee)){var K=ee;break t}}K=null}if(d=K)yn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ao(this,d);else{this.o=!1,this.s=3,Le(12),Gt(this),ui(this);break e}}if(this.P){d=!0;let $e;for(;!this.J&&this.C<k.length;)if($e=i_(this,k),$e==so){Re==4&&(this.s=4,Le(14),d=!1),yn(this.i,this.l,null,"[Incomplete Response]");break}else if($e==Zl){this.s=4,Le(15),yn(this.i,this.l,k,"[Invalid Chunk]"),d=!1;break}else yn(this.i,this.l,$e,null),ao(this,$e);if(tc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Re!=4||k.length!=0||this.h.h||(this.s=1,Le(16),d=!1),this.o=this.o&&d,!d)yn(this.i,this.l,k,"[Invalid Chunked Response]"),Gt(this),ui(this);else if(0<k.length&&!this.W){this.W=!0;var Ae=this.j;Ae.g==this&&Ae.ba&&!Ae.M&&(Ae.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),po(Ae),Ae.M=!0,Le(11))}}else yn(this.i,this.l,k,null),ao(this,k);Re==4&&Gt(this),this.o&&!this.J&&(Re==4?Pc(this.j,this):(this.o=!1,Es(this)))}else E_(this.g),d==400&&0<k.indexOf("Unknown SID")?(this.s=3,Le(12)):(this.s=0,Le(13)),Gt(this),ui(this)}}}catch{}finally{}};function tc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function i_(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?so:(d=Number(u.substring(d,p)),isNaN(d)?Zl:(p+=1,p+d>u.length?so:(u=u.slice(p,p+d),o.C=p+d,u)))}wt.prototype.cancel=function(){this.J=!0,Gt(this)};function Es(o){o.S=Date.now()+o.I,nc(o,o.I)}function nc(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=li(m(o.ba,o),u)}function oo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}wt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(t_(this.i,this.A),this.L!=2&&(ai(),Le(17)),Gt(this),this.s=2,ui(this)):nc(this,this.S-o)};function ui(o){o.j.G==0||o.J||Pc(o.j,o)}function Gt(o){oo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Hl(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ao(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||lo(d.h,o))){if(!o.K&&lo(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var w=p;if(w[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)bs(d),Ss(d);else break e;fo(d),Le(18)}}else d.za=w[1],0<d.za-d.T&&37500>w[2]&&d.F&&d.v==0&&!d.C&&(d.C=li(m(d.Za,d),6e3));if(1>=rc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Qt(d,11)}else if((o.K||d.g==o)&&bs(d),!J(u))for(w=d.Da.g.parse(u),u=0;u<w.length;u++){let K=w[u];if(d.T=K[0],K=K[1],d.G==2)if(K[0]=="c"){d.K=K[1],d.ia=K[2];const Ae=K[3];Ae!=null&&(d.la=Ae,d.j.info("VER="+d.la));const Re=K[4];Re!=null&&(d.Aa=Re,d.j.info("SVER="+d.Aa));const In=K[5];In!=null&&typeof In=="number"&&0<In&&(p=1.5*In,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const $e=o.g;if($e){const Ns=$e.g?$e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ns){var R=p.h;R.g||Ns.indexOf("spdy")==-1&&Ns.indexOf("quic")==-1&&Ns.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(co(R,R.h),R.h=null))}if(p.D){const _o=$e.g?$e.g.getResponseHeader("X-HTTP-Session-Id"):null;_o&&(p.ya=_o,ie(p.I,p.D,_o))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var k=o;if(p.qa=Nc(p,p.J?p.ia:null,p.W),k.K){oc(p.h,k);var ee=k,Ee=p.L;Ee&&(ee.I=Ee),ee.B&&(oo(ee),Es(ee)),p.g=k}else Rc(p);0<d.i.length&&Ps(d)}else K[0]!="stop"&&K[0]!="close"||Qt(d,7);else d.G==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?Qt(d,7):ho(d):K[0]!="noop"&&d.l&&d.l.ta(K),d.v=0)}}ai(4)}catch{}}var s_=class{constructor(o,u){this.g=o,this.map=u}};function ic(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function sc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function rc(o){return o.h?1:o.g?o.g.size:0}function lo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function co(o,u){o.g?o.g.add(u):o.h=u}function oc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}ic.prototype.cancel=function(){if(this.i=ac(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ac(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return O(o.i)}function r_(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],d=o.length,p=0;p<d;p++)u.push(o[p]);return u}u=[],d=0;for(p in o)u[d++]=o[p];return u}function o_(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const p in o)u[d++]=p;return u}}}function lc(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=o_(o),p=r_(o),w=p.length,R=0;R<w;R++)u.call(void 0,p[R],d&&d[R],o)}var cc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function a_(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),w=null;if(0<=p){var R=o[d].substring(0,p);w=o[d].substring(p+1)}else R=o[d];u(R,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Kt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Kt){this.h=o.h,Is(this,o.j),this.o=o.o,this.g=o.g,Ts(this,o.s),this.l=o.l;var u=o.i,d=new fi;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),uc(this,d),this.m=o.m}else o&&(u=String(o).match(cc))?(this.h=!1,Is(this,u[1]||"",!0),this.o=hi(u[2]||""),this.g=hi(u[3]||"",!0),Ts(this,u[4]),this.l=hi(u[5]||"",!0),uc(this,u[6]||"",!0),this.m=hi(u[7]||"")):(this.h=!1,this.i=new fi(null,this.h))}Kt.prototype.toString=function(){var o=[],u=this.j;u&&o.push(di(u,hc,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(di(u,hc,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(di(d,d.charAt(0)=="/"?u_:c_,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",di(d,d_)),o.join("")};function rt(o){return new Kt(o)}function Is(o,u,d){o.j=d?hi(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Ts(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function uc(o,u,d){u instanceof fi?(o.i=u,f_(o.i,o.h)):(d||(u=di(u,h_)),o.i=new fi(u,o.h))}function ie(o,u,d){o.i.set(u,d)}function ws(o){return ie(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function hi(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function di(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,l_),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function l_(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var hc=/[#\/\?@]/g,c_=/[#\?:]/g,u_=/[#\?]/g,h_=/[#\?@]/g,d_=/#/g;function fi(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Ct(o){o.g||(o.g=new Map,o.h=0,o.i&&a_(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=fi.prototype,n.add=function(o,u){Ct(this),this.i=null,o=vn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function dc(o,u){Ct(o),u=vn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function fc(o,u){return Ct(o),u=vn(o,u),o.g.has(u)}n.forEach=function(o,u){Ct(this),this.g.forEach(function(d,p){d.forEach(function(w){o.call(u,w,p,this)},this)},this)},n.na=function(){Ct(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let p=0;p<u.length;p++){const w=o[p];for(let R=0;R<w.length;R++)d.push(u[p])}return d},n.V=function(o){Ct(this);let u=[];if(typeof o=="string")fc(this,o)&&(u=u.concat(this.g.get(vn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return Ct(this),this.i=null,o=vn(this,o),fc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function pc(o,u,d){dc(o,u),0<d.length&&(o.i=null,o.g.set(vn(o,u),O(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var p=u[d];const R=encodeURIComponent(String(p)),k=this.V(p);for(p=0;p<k.length;p++){var w=R;k[p]!==""&&(w+="="+encodeURIComponent(String(k[p]))),o.push(w)}}return this.i=o.join("&")};function vn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function f_(o,u){u&&!o.j&&(Ct(o),o.i=null,o.g.forEach(function(d,p){var w=p.toLowerCase();p!=w&&(dc(this,p),pc(this,w,d))},o)),o.j=u}function p_(o,u){const d=new ci;if(l.Image){const p=new Image;p.onload=A(At,d,"TestLoadImage: loaded",!0,u,p),p.onerror=A(At,d,"TestLoadImage: error",!1,u,p),p.onabort=A(At,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=A(At,d,"TestLoadImage: timeout",!1,u,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function __(o,u){const d=new ci,p=new AbortController,w=setTimeout(()=>{p.abort(),At(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(w),R.ok?At(d,"TestPingServer: ok",!0,u):At(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(w),At(d,"TestPingServer: error",!1,u)})}function At(o,u,d,p,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),p(d)}catch{}}function g_(){this.g=new Jp}function m_(o,u,d){const p=d||"";try{lc(o,function(w,R){let k=w;h(w)&&(k=Zr(w)),u.push(p+R+"="+encodeURIComponent(k))})}catch(w){throw u.push(p+"type="+encodeURIComponent("_badmap")),w}}function Cs(o){this.l=o.Ub||null,this.j=o.eb||!1}S(Cs,eo),Cs.prototype.g=function(){return new As(this.l,this.j)},Cs.prototype.i=function(o){return function(){return o}}({});function As(o,u){Ce.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(As,Ce),n=As.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,_i(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,pi(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_c(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function _c(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?pi(this):_i(this),this.readyState==3&&_c(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,pi(this))},n.Qa=function(o){this.g&&(this.response=o,pi(this))},n.ga=function(){this.g&&pi(this)};function pi(o){o.readyState=4,o.l=null,o.j=null,o.v=null,_i(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function _i(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(As.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function gc(o){let u="";return ue(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function uo(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=gc(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ie(o,u,d))}function oe(o){Ce.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(oe,Ce);var y_=/^https?$/i,v_=["POST","PUT"];n=oe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():io.g(),this.v=this.o?$l(this.o):$l(io),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){mc(this,R);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var w in p)d.set(w,p[w]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),w=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(v_,u,void 0))||p||w||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,k]of d)this.g.setRequestHeader(R,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ec(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){mc(this,R)}};function mc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,yc(o),Rs(o)}function yc(o){o.A||(o.A=!0,Oe(o,"complete"),Oe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Oe(this,"complete"),Oe(this,"abort"),Rs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Rs(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?vc(this):this.bb())},n.bb=function(){vc(this)};function vc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ot(o)!=4||o.Z()!=2)){if(o.u&&ot(o)==4)ql(o.Ea,0,o);else if(Oe(o,"readystatechange"),ot(o)==4){o.h=!1;try{const k=o.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=k===0){var w=String(o.D).match(cc)[1]||null;!w&&l.self&&l.self.location&&(w=l.self.location.protocol.slice(0,-1)),p=!y_.test(w?w.toLowerCase():"")}d=p}if(d)Oe(o,"complete"),Oe(o,"success");else{o.m=6;try{var R=2<ot(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",yc(o)}}finally{Rs(o)}}}}function Rs(o,u){if(o.g){Ec(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Oe(o,"ready");try{d.onreadystatechange=p}catch{}}}function Ec(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ot(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ot(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Xp(u)}};function Ic(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function E_(o){const u={};o=(o.g&&2<=ot(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(J(o[p]))continue;var d=T(o[p]);const w=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[w]||[];u[w]=R,R.push(d)}I(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function gi(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Tc(o){this.Aa=0,this.i=[],this.j=new ci,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=gi("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=gi("baseRetryDelayMs",5e3,o),this.cb=gi("retryDelaySeedMs",1e4,o),this.Wa=gi("forwardChannelMaxRetries",2,o),this.wa=gi("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ic(o&&o.concurrentRequestLimit),this.Da=new g_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Tc.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,p){Le(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Nc(this,null,this.W),Ps(this)};function ho(o){if(wc(o),o.G==3){var u=o.U++,d=rt(o.I);if(ie(d,"SID",o.K),ie(d,"RID",u),ie(d,"TYPE","terminate"),mi(o,d),u=new wt(o,o.j,u),u.L=2,u.v=ws(rt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=Dc(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Es(u)}kc(o)}function Ss(o){o.g&&(po(o),o.g.cancel(),o.g=null)}function wc(o){Ss(o),o.u&&(l.clearTimeout(o.u),o.u=null),bs(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Ps(o){if(!sc(o.h)&&!o.s){o.s=!0;var u=o.Ga;ni||xl(),ii||(ni(),ii=!0),$r.add(u,o),o.B=0}}function I_(o,u){return rc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=li(m(o.Ga,o,u),bc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const w=new wt(this,this.j,o);let R=this.o;if(this.S&&(R?(R=g(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(w.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Ac(this,w,u),d=rt(this.I),ie(d,"RID",o),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),mi(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(gc(R)))+"&"+u:this.m&&uo(d,this.m,R)),co(this.h,w),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",u),ie(d,"SID","null"),w.T=!0,ro(w,d,null)):ro(w,d,u),this.G=2}}else this.G==3&&(o?Cc(this,o):this.i.length==0||sc(this.h)||Cc(this))};function Cc(o,u){var d;u?d=u.l:d=o.U++;const p=rt(o.I);ie(p,"SID",o.K),ie(p,"RID",d),ie(p,"AID",o.T),mi(o,p),o.m&&o.o&&uo(p,o.m,o.o),d=new wt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ac(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),co(o.h,d),ro(d,p,u)}function mi(o,u){o.H&&ue(o.H,function(d,p){ie(u,p,d)}),o.l&&lc({},function(d,p){ie(u,p,d)})}function Ac(o,u,d){d=Math.min(o.i.length,d);var p=o.l?m(o.l.Na,o.l,o):null;e:{var w=o.i;let R=-1;for(;;){const k=["count="+d];R==-1?0<d?(R=w[0].g,k.push("ofs="+R)):R=0:k.push("ofs="+R);let ee=!0;for(let Ee=0;Ee<d;Ee++){let K=w[Ee].g;const Ae=w[Ee].map;if(K-=R,0>K)R=Math.max(0,w[Ee].g-100),ee=!1;else try{m_(Ae,k,"req"+K+"_")}catch{p&&p(Ae)}}if(ee){p=k.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,p}function Rc(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ni||xl(),ii||(ni(),ii=!0),$r.add(u,o),o.v=0}}function fo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=li(m(o.Fa,o),bc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Sc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=li(m(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Le(10),Ss(this),Sc(this))};function po(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Sc(o){o.g=new wt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=rt(o.qa);ie(u,"RID","rpc"),ie(u,"SID",o.K),ie(u,"AID",o.T),ie(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&ie(u,"TO",o.ja),ie(u,"TYPE","xmlhttp"),mi(o,u),o.m&&o.o&&uo(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=ws(rt(u)),d.m=null,d.P=!0,ec(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Ss(this),fo(this),Le(19))};function bs(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Pc(o,u){var d=null;if(o.g==u){bs(o),po(o),o.g=null;var p=2}else if(lo(o.h,u))d=u.D,oc(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var w=o.B;p=ms(),Oe(p,new Yl(p,d)),Ps(o)}else Rc(o);else if(w=u.s,w==3||w==0&&0<u.X||!(p==1&&I_(o,u)||p==2&&fo(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),w){case 1:Qt(o,5);break;case 4:Qt(o,10);break;case 3:Qt(o,6);break;default:Qt(o,2)}}}function bc(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Qt(o,u){if(o.j.info("Error code "+u),u==2){var d=m(o.fb,o),p=o.Xa;const w=!p;p=new Kt(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Is(p,"https"),ws(p),w?p_(p.toString(),d):__(p.toString(),d)}else Le(2);o.G=0,o.l&&o.l.sa(u),kc(o),wc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Le(2)):(this.j.info("Failed to ping google.com"),Le(1))};function kc(o){if(o.G=0,o.ka=[],o.l){const u=ac(o.h);(u.length!=0||o.i.length!=0)&&(N(o.ka,u),N(o.ka,o.i),o.h.i.length=0,O(o.i),o.i.length=0),o.l.ra()}}function Nc(o,u,d){var p=d instanceof Kt?rt(d):new Kt(d);if(p.g!="")u&&(p.g=u+"."+p.g),Ts(p,p.s);else{var w=l.location;p=w.protocol,u=u?u+"."+w.hostname:w.hostname,w=+w.port;var R=new Kt(null);p&&Is(R,p),u&&(R.g=u),w&&Ts(R,w),d&&(R.l=d),p=R}return d=o.D,u=o.ya,d&&u&&ie(p,d,u),ie(p,"VER",o.la),mi(o,p),p}function Dc(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new oe(new Cs({eb:d})):new oe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oc(){}n=Oc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ks(){}ks.prototype.g=function(o,u){return new qe(o,u)};function qe(o,u){Ce.call(this),this.g=new Tc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!J(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!J(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new En(this)}S(qe,Ce),qe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qe.prototype.close=function(){ho(this.g)},qe.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Zr(o),o=d);u.i.push(new s_(u.Ya++,o)),u.G==3&&Ps(u)},qe.prototype.N=function(){this.g.l=null,delete this.j,ho(this.g),delete this.g,qe.aa.N.call(this)};function Lc(o){to.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}S(Lc,to);function Mc(){no.call(this),this.status=1}S(Mc,no);function En(o){this.g=o}S(En,Oc),En.prototype.ua=function(){Oe(this.g,"a")},En.prototype.ta=function(o){Oe(this.g,new Lc(o))},En.prototype.sa=function(o){Oe(this.g,new Mc)},En.prototype.ra=function(){Oe(this.g,"b")},ks.prototype.createWebChannel=ks.prototype.g,qe.prototype.send=qe.prototype.o,qe.prototype.open=qe.prototype.m,qe.prototype.close=qe.prototype.close,kd=function(){return new ks},bd=function(){return ms()},Pd=zt,$o={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ys.NO_ERROR=0,ys.TIMEOUT=8,ys.HTTP_ERROR=6,js=ys,Xl.COMPLETE="complete",Sd=Xl,zl.EventType=oi,oi.OPEN="a",oi.CLOSE="b",oi.ERROR="c",oi.MESSAGE="d",Ce.prototype.listen=Ce.prototype.K,Ai=zl,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,Rd=oe}).apply(typeof Os<"u"?Os:typeof self<"u"?self:typeof window<"u"?window:{});const du="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Pe.UNAUTHENTICATED=new Pe(null),Pe.GOOGLE_CREDENTIALS=new Pe("google-credentials-uid"),Pe.FIRST_PARTY=new Pe("first-party-uid"),Pe.MOCK_USER=new Pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new Cr("@firebase/firestore");function yi(){return ln.logLevel}function L(n,...e){if(ln.logLevel<=H.DEBUG){const t=e.map(Va);ln.debug(`Firestore (${Yn}): ${n}`,...t)}}function mt(n,...e){if(ln.logLevel<=H.ERROR){const t=e.map(Va);ln.error(`Firestore (${Yn}): ${n}`,...t)}}function Fn(n,...e){if(ln.logLevel<=H.WARN){const t=e.map(Va);ln.warn(`Firestore (${Yn}): ${n}`,...t)}}function Va(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n="Unexpected state"){const e=`FIRESTORE (${Yn}) INTERNAL ASSERTION FAILED: `+n;throw mt(e),new Error(e)}function ce(n,e){n||B()}function z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Pe.UNAUTHENTICATED))}shutdown(){}}class dv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class fv{constructor(e){this.t=e,this.currentUser=Pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ce(this.o===void 0);let i=this.i;const s=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let r=new nn;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new nn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const c=r;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{L("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(L("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new nn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(L("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ce(typeof i.accessToken=="string"),new Nd(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ce(e===null||typeof e=="string"),new Pe(e)}}class pv{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=Pe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class _v{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new pv(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Pe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class gv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mv{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ce(this.o===void 0);const i=r=>{r.error!=null&&L("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const a=r.token!==this.R;return this.R=r.token,L("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>i(r))};const s=r=>{L("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?s(r):L("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ce(typeof t.token=="string"),this.R=t.token,new gv(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const s=yv(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%e.length))}return i}}function Y(n,e){return n<e?-1:n>e?1:0}function Un(n,e,t){return n.length===e.length&&n.every((i,s)=>t(i,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new M(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ue.fromMillis(Date.now())}static fromDate(e){return Ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new Ue(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new Ue(0,0))}static max(){return new U(new Ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,i){t===void 0?t=0:t>e.length&&B(),i===void 0?i=e.length-t:i>e.length-t&&B(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return qi.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qi?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const r=e.get(s),a=t.get(s);if(r<a)return-1;if(r>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ae extends qi{construct(e,t,i){return new ae(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new M(D.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const vv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Me extends qi{construct(e,t,i){return new Me(e,t,i)}static isValidIdentifier(e){return vv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Me.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Me(["__name__"])}static fromServerFormat(e){const t=[];let i="",s=0;const r=()=>{if(i.length===0)throw new M(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new M(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new M(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(i+=l,s++):(r(),s++)}if(r(),a)throw new M(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Me(t)}static emptyPath(){return new Me([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(ae.fromString(e))}static fromName(e){return new x(ae.fromString(e).popFirst(5))}static empty(){return new x(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new ae(e.slice()))}}function Ev(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=U.fromTimestamp(i===1e9?new Ue(t+1,0):new Ue(t,i));return new Ft(s,x.empty(),e)}function Iv(n){return new Ft(n.readTime,n.key,-1)}class Ft{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Ft(U.min(),x.empty(),-1)}static max(){return new Ft(U.max(),x.empty(),-1)}}function Tv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Cv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fa(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==wv)throw n;L("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,i)=>{t(e)})}static reject(e){return new P((t,i)=>{i(e)})}static waitFor(e){return new P((t,i)=>{let s=0,r=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++r,a&&r===s&&t()},c=>i(c))}),a=!0,r===s&&t()})}static or(e){let t=P.resolve(!1);for(const i of e)t=t.next(s=>s?P.resolve(s):i());return t}static forEach(e,t){const i=[];return e.forEach((s,r)=>{i.push(t.call(this,s,r))}),this.waitFor(i)}static mapArray(e,t){return new P((i,s)=>{const r=e.length,a=new Array(r);let l=0;for(let c=0;c<r;c++){const h=c;t(e[h]).next(f=>{a[h]=f,++l,l===r&&i(a)},f=>s(f))}})}static doWhile(e,t){return new P((i,s)=>{const r=()=>{e()===!0?t().next(()=>{r()},s):i()};r()})}}function Av(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function is(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Ua.oe=-1;function br(n){return n==null}function zo(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function kr(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Rv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ve=class Go{constructor(e,t){this.comparator=e,this.root=t||Mt.EMPTY}insert(e,t){return new Go(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Mt.BLACK,null,null))}remove(e){return new Go(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Mt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ls(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ls(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ls(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ls(this.root,e,this.comparator,!0)}},Ls=class{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Mt=class at{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??at.RED,this.left=s??at.EMPTY,this.right=r??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new at(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return at.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}};Mt.EMPTY=null,Mt.RED=!0,Mt.BLACK=!1;Mt.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,i,s,r){return this}insert(e,t,i){return new Mt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new pu(this.data.getIterator())}getIteratorFrom(e){return new pu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof Ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ie(this.comparator);return t.data=e,t}}class pu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.fields=e,e.sort(Me.comparator)}static empty(){return new Nt([])}unionWith(e){let t=new Ie(Me.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Nt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Un(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Od("Invalid base64 string: "+r):r}}(e);return new Te(t)}static fromUint8Array(e){const t=function(s){let r="";for(let a=0;a<s.length;++a)r+=String.fromCharCode(s[a]);return r}(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const Sv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ut(n){if(ce(!!n),typeof n=="string"){let e=0;const t=Sv.exec(n);if(ce(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function cn(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function qa(n){const e=n.mapValue.fields.__previous_value__;return Ba(e)?qa(e):e}function Wi(n){const e=Ut(n.mapValue.fields.__local_write_time__.timestampValue);return new Ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(e,t,i,s,r,a,l,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}class ji{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ji("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ji&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ms={mapValue:{}};function un(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ba(n)?4:kv(n)?9007199254740991:bv(n)?10:11:B()}function nt(n,e){if(n===e)return!0;const t=un(n);if(t!==un(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Wi(n).isEqual(Wi(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const a=Ut(s.timestampValue),l=Ut(r.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,r){return cn(s.bytesValue).isEqual(cn(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,r){return he(s.geoPointValue.latitude)===he(r.geoPointValue.latitude)&&he(s.geoPointValue.longitude)===he(r.geoPointValue.longitude)}(n,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return he(s.integerValue)===he(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const a=he(s.doubleValue),l=he(r.doubleValue);return a===l?zo(a)===zo(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Un(n.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return function(s,r){const a=s.mapValue.fields||{},l=r.mapValue.fields||{};if(fu(a)!==fu(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!nt(a[c],l[c])))return!1;return!0}(n,e);default:return B()}}function Hi(n,e){return(n.values||[]).find(t=>nt(t,e))!==void 0}function Bn(n,e){if(n===e)return 0;const t=un(n),i=un(e);if(t!==i)return Y(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(r,a){const l=he(r.integerValue||r.doubleValue),c=he(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return _u(n.timestampValue,e.timestampValue);case 4:return _u(Wi(n),Wi(e));case 5:return Y(n.stringValue,e.stringValue);case 6:return function(r,a){const l=cn(r),c=cn(a);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(r,a){const l=r.split("/"),c=a.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=Y(l[h],c[h]);if(f!==0)return f}return Y(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,a){const l=Y(he(r.latitude),he(a.latitude));return l!==0?l:Y(he(r.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return gu(n.arrayValue,e.arrayValue);case 10:return function(r,a){var l,c,h,f;const _=r.fields||{},m=a.fields||{},A=(l=_.value)===null||l===void 0?void 0:l.arrayValue,S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,O=Y(((h=A==null?void 0:A.values)===null||h===void 0?void 0:h.length)||0,((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0);return O!==0?O:gu(A,S)}(n.mapValue,e.mapValue);case 11:return function(r,a){if(r===Ms.mapValue&&a===Ms.mapValue)return 0;if(r===Ms.mapValue)return 1;if(a===Ms.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let _=0;_<c.length&&_<f.length;++_){const m=Y(c[_],f[_]);if(m!==0)return m;const A=Bn(l[c[_]],h[f[_]]);if(A!==0)return A}return Y(c.length,f.length)}(n.mapValue,e.mapValue);default:throw B()}}function _u(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Ut(n),i=Ut(e),s=Y(t.seconds,i.seconds);return s!==0?s:Y(t.nanos,i.nanos)}function gu(n,e){const t=n.values||[],i=e.values||[];for(let s=0;s<t.length&&s<i.length;++s){const r=Bn(t[s],i[s]);if(r)return r}return Y(t.length,i.length)}function qn(n){return Ko(n)}function Ko(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=Ut(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return cn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",s=!0;for(const r of t.values||[])s?s=!1:i+=",",i+=Ko(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const a of i)r?r=!1:s+=",",s+=`${a}:${Ko(t.fields[a])}`;return s+"}"}(n.mapValue):B()}function Qo(n){return!!n&&"integerValue"in n}function Wa(n){return!!n&&"arrayValue"in n}function mu(n){return!!n&&"nullValue"in n}function yu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function wo(n){return!!n&&"mapValue"in n}function bv(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function bi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return kr(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=bi(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=bi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function kv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.value=e}static empty(){return new Je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!wo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=bi(t)}setAll(e){let t=Me.emptyPath(),i={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,s),i={},s=[],t=l.popLast()}a?i[l.lastSegment()]=bi(a):s.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){const t=this.field(e.popLast());wo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];wo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){kr(t,(s,r)=>e[s]=r);for(const s of i)delete e[s]}clone(){return new Je(bi(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t,i,s,r,a,l){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=a,this.documentState=l}static newInvalidDocument(e){return new be(e,0,U.min(),U.min(),U.min(),Je.empty(),0)}static newFoundDocument(e,t,i,s){return new be(e,1,t,U.min(),i,s,0)}static newNoDocument(e,t){return new be(e,2,t,U.min(),U.min(),Je.empty(),0)}static newUnknownDocument(e,t){return new be(e,3,t,U.min(),U.min(),Je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t){this.position=e,this.inclusive=t}}function vu(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){const r=e[s],a=n.position[s];if(r.field.isKeyField()?i=x.comparator(x.fromName(a.referenceValue),t.key):i=Bn(a,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function Eu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!nt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Nv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{}class fe extends Ld{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new Ov(e,t,i):t==="array-contains"?new xv(e,i):t==="in"?new Vv(e,i):t==="not-in"?new Fv(e,i):t==="array-contains-any"?new Uv(e,i):new fe(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new Lv(e,i):new Mv(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bn(t,this.value)):t!==null&&un(this.value)===un(t)&&this.matchesComparison(Bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends Ld{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new it(e,t)}matches(e){return Md(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Md(n){return n.op==="and"}function xd(n){return Dv(n)&&Md(n)}function Dv(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function Yo(n){if(n instanceof fe)return n.field.canonicalString()+n.op.toString()+qn(n.value);if(xd(n))return n.filters.map(e=>Yo(e)).join(",");{const e=n.filters.map(t=>Yo(t)).join(",");return`${n.op}(${e})`}}function Vd(n,e){return n instanceof fe?function(i,s){return s instanceof fe&&i.op===s.op&&i.field.isEqual(s.field)&&nt(i.value,s.value)}(n,e):n instanceof it?function(i,s){return s instanceof it&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,a,l)=>r&&Vd(a,s.filters[l]),!0):!1}(n,e):void B()}function Fd(n){return n instanceof fe?function(t){return`${t.field.canonicalString()} ${t.op} ${qn(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(Fd).join(" ,")+"}"}(n):"Filter"}class Ov extends fe{constructor(e,t,i){super(e,t,i),this.key=x.fromName(i.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Lv extends fe{constructor(e,t){super(e,"in",t),this.keys=Ud("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Mv extends fe{constructor(e,t){super(e,"not-in",t),this.keys=Ud("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ud(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>x.fromName(i.referenceValue))}class xv extends fe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wa(t)&&Hi(t.arrayValue,this.value)}}class Vv extends fe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Hi(this.value.arrayValue,t)}}class Fv extends fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Hi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Hi(this.value.arrayValue,t)}}class Uv extends fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Hi(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e,t=null,i=[],s=[],r=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=a,this.endAt=l,this.ue=null}}function Iu(n,e=null,t=[],i=[],s=null,r=null,a=null){return new Bv(n,e,t,i,s,r,a)}function ja(n){const e=z(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>Yo(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),br(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>qn(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>qn(i)).join(",")),e.ue=t}return e.ue}function Ha(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Nv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Vd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Eu(n.startAt,e.startAt)&&Eu(n.endAt,e.endAt)}function Xo(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t=null,i=[],s=[],r=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=a,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function qv(n,e,t,i,s,r,a,l){return new Nr(n,e,t,i,s,r,a,l)}function $a(n){return new Nr(n)}function Tu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Wv(n){return n.collectionGroup!==null}function ki(n){const e=z(n);if(e.ce===null){e.ce=[];const t=new Set;for(const r of e.explicitOrderBy)e.ce.push(r),t.add(r.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new Ie(Me.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.ce.push(new sr(r,i))}),t.has(Me.keyField().canonicalString())||e.ce.push(new sr(Me.keyField(),i))}return e.ce}function tt(n){const e=z(n);return e.le||(e.le=jv(e,ki(n))),e.le}function jv(n,e){if(n.limitType==="F")return Iu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new sr(s.field,r)});const t=n.endAt?new ir(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new ir(n.startAt.position,n.startAt.inclusive):null;return Iu(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function Jo(n,e,t){return new Nr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Dr(n,e){return Ha(tt(n),tt(e))&&n.limitType===e.limitType}function Bd(n){return`${ja(tt(n))}|lt:${n.limitType}`}function wn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(s=>Fd(s)).join(", ")}]`),br(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(s=>qn(s)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(s=>qn(s)).join(",")),`Target(${i})`}(tt(n))}; limitType=${n.limitType})`}function Or(n,e){return e.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):x.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,e)&&function(i,s){for(const r of ki(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,e)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,e)&&function(i,s){return!(i.startAt&&!function(a,l,c){const h=vu(a,l,c);return a.inclusive?h<=0:h<0}(i.startAt,ki(i),s)||i.endAt&&!function(a,l,c){const h=vu(a,l,c);return a.inclusive?h>=0:h>0}(i.endAt,ki(i),s))}(n,e)}function Hv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function qd(n){return(e,t)=>{let i=!1;for(const s of ki(n)){const r=$v(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function $v(n,e,t){const i=n.field.isKeyField()?x.comparator(e.key,t.key):function(r,a,l){const c=a.data.field(r),h=l.data.field(r);return c!==null&&h!==null?Bn(c,h):B()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return B()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){kr(this.inner,(t,i)=>{for(const[s,r]of i)e(s,r)})}isEmpty(){return Rv(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv=new ve(x.comparator);function Bt(){return zv}const Wd=new ve(x.comparator);function Ri(...n){let e=Wd;for(const t of n)e=e.insert(t.key,t);return e}function Gv(n){let e=Wd;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function Zt(){return Ni()}function jd(){return Ni()}function Ni(){return new Xn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Kv=new Ie(x.comparator);function G(...n){let e=Kv;for(const t of n)e=e.add(t);return e}const Qv=new Ie(Y);function Yv(){return Qv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xv(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zo(e)?"-0":e}}function Jv(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(){this._=void 0}}function Zv(n,e,t){return n instanceof Zo?function(s,r){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Ba(r)&&(r=qa(r)),r&&(a.fields.__previous_value__=r),{mapValue:a}}(t,e):n instanceof rr?Hd(n,e):n instanceof or?$d(n,e):function(s,r){const a=tE(s,r),l=wu(a)+wu(s.Pe);return Qo(a)&&Qo(s.Pe)?Jv(l):Xv(s.serializer,l)}(n,e)}function eE(n,e,t){return n instanceof rr?Hd(n,e):n instanceof or?$d(n,e):t}function tE(n,e){return n instanceof ea?function(i){return Qo(i)||function(r){return!!r&&"doubleValue"in r}(i)}(e)?e:{integerValue:0}:null}class Zo extends Lr{}class rr extends Lr{constructor(e){super(),this.elements=e}}function Hd(n,e){const t=zd(e);for(const i of n.elements)t.some(s=>nt(s,i))||t.push(i);return{arrayValue:{values:t}}}class or extends Lr{constructor(e){super(),this.elements=e}}function $d(n,e){let t=zd(e);for(const i of n.elements)t=t.filter(s=>!nt(s,i));return{arrayValue:{values:t}}}class ea extends Lr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function wu(n){return he(n.integerValue||n.doubleValue)}function zd(n){return Wa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function nE(n,e){return n.field.isEqual(e.field)&&function(i,s){return i instanceof rr&&s instanceof rr||i instanceof or&&s instanceof or?Un(i.elements,s.elements,nt):i instanceof ea&&s instanceof ea?nt(i.Pe,s.Pe):i instanceof Zo&&s instanceof Zo}(n.transform,e.transform)}class sn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new sn}static exists(e){return new sn(void 0,e)}static updateTime(e){return new sn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Hs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class za{}function Gd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new sE(n.key,sn.none()):new Ga(n.key,n.data,sn.none());{const t=n.data,i=Je.empty();let s=new Ie(Me.comparator);for(let r of e.fields)if(!s.has(r)){let a=t.field(r);a===null&&r.length>1&&(r=r.popLast(),a=t.field(r)),a===null?i.delete(r):i.set(r,a),s=s.add(r)}return new Mr(n.key,i,new Nt(s.toArray()),sn.none())}}function iE(n,e,t){n instanceof Ga?function(s,r,a){const l=s.value.clone(),c=Au(s.fieldTransforms,r,a.transformResults);l.setAll(c),r.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Mr?function(s,r,a){if(!Hs(s.precondition,r))return void r.convertToUnknownDocument(a.version);const l=Au(s.fieldTransforms,r,a.transformResults),c=r.data;c.setAll(Kd(s)),c.setAll(l),r.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(s,r,a){r.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Di(n,e,t,i){return n instanceof Ga?function(r,a,l,c){if(!Hs(r.precondition,a))return l;const h=r.value.clone(),f=Ru(r.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,i):n instanceof Mr?function(r,a,l,c){if(!Hs(r.precondition,a))return l;const h=Ru(r.fieldTransforms,c,a),f=a.data;return f.setAll(Kd(r)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(_=>_.field))}(n,e,t,i):function(r,a,l){return Hs(r.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Cu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&Un(i,s,(r,a)=>nE(r,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ga extends za{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Mr extends za{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function Kd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Au(n,e,t){const i=new Map;ce(n.length===t.length);for(let s=0;s<t.length;s++){const r=n[s],a=r.transform,l=e.data.field(r.field);i.set(r.field,eE(a,l,t[s]))}return i}function Ru(n,e,t){const i=new Map;for(const s of n){const r=s.transform,a=t.data.field(s.field);i.set(s.field,Zv(r,a,e))}return i}class sE extends za{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&iE(r,e,i[s])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Di(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Di(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=jd();return this.mutations.forEach(s=>{const r=e.get(s.key),a=r.overlayedDocument;let l=this.applyToLocalView(a,r.mutatedFields);l=t.has(s.key)?null:l;const c=Gd(a,l);c!==null&&i.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(U.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&Un(this.mutations,e.mutations,(t,i)=>Cu(t,i))&&Un(this.baseMutations,e.baseMutations,(t,i)=>Cu(t,i))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de,$;function Qd(n){if(n===void 0)return mt("GRPC error has no .code"),D.UNKNOWN;switch(n){case de.OK:return D.OK;case de.CANCELLED:return D.CANCELLED;case de.UNKNOWN:return D.UNKNOWN;case de.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case de.INTERNAL:return D.INTERNAL;case de.UNAVAILABLE:return D.UNAVAILABLE;case de.UNAUTHENTICATED:return D.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case de.NOT_FOUND:return D.NOT_FOUND;case de.ALREADY_EXISTS:return D.ALREADY_EXISTS;case de.PERMISSION_DENIED:return D.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case de.ABORTED:return D.ABORTED;case de.OUT_OF_RANGE:return D.OUT_OF_RANGE;case de.UNIMPLEMENTED:return D.UNIMPLEMENTED;case de.DATA_LOSS:return D.DATA_LOSS;default:return B()}}($=de||(de={}))[$.OK=0]="OK",$[$.CANCELLED=1]="CANCELLED",$[$.UNKNOWN=2]="UNKNOWN",$[$.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",$[$.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",$[$.NOT_FOUND=5]="NOT_FOUND",$[$.ALREADY_EXISTS=6]="ALREADY_EXISTS",$[$.PERMISSION_DENIED=7]="PERMISSION_DENIED",$[$.UNAUTHENTICATED=16]="UNAUTHENTICATED",$[$.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",$[$.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",$[$.ABORTED=10]="ABORTED",$[$.OUT_OF_RANGE=11]="OUT_OF_RANGE",$[$.UNIMPLEMENTED=12]="UNIMPLEMENTED",$[$.INTERNAL=13]="INTERNAL",$[$.UNAVAILABLE=14]="UNAVAILABLE",$[$.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=new tn([4294967295,4294967295],0);function Su(n){const e=lE().encode(n),t=new Ad;return t.update(e),new Uint8Array(t.digest())}function Pu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new tn([t,i],0),new tn([s,r],0)]}class Ka{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new Si(`Invalid padding: ${t}`);if(i<0)throw new Si(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Si(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new Si(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=tn.fromNumber(this.Ie)}Ee(e,t,i){let s=e.add(t.multiply(tn.fromNumber(i)));return s.compare(cE)===1&&(s=new tn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Su(e),[i,s]=Pu(t);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);if(!this.de(a))return!1}return!0}static create(e,t,i){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),a=new Ka(r,s,t);return i.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=Su(e),[i,s]=Pu(t);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class Si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const s=new Map;return s.set(e,ss.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new xr(U.min(),s,new ve(Y),Bt(),G())}}class ss{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new ss(i,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e,t,i,s){this.Re=e,this.removedTargetIds=t,this.key=i,this.Ve=s}}class Yd{constructor(e,t){this.targetId=e,this.me=t}}class Xd{constructor(e,t,i=Te.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}}class bu{constructor(){this.fe=0,this.ge=Nu(),this.pe=Te.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=G(),t=G(),i=G();return this.ge.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:B()}}),new ss(this.pe,this.ye,e,t,i)}Ce(){this.we=!1,this.ge=Nu()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ce(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class uE{constructor(e){this.Le=e,this.Be=new Map,this.ke=Bt(),this.qe=ku(),this.Qe=new ve(Y)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const i=this.Ge(t);switch(e.state){case 0:this.ze(t)&&i.De(e.resumeToken);break;case 1:i.Oe(),i.Se||i.Ce(),i.De(e.resumeToken);break;case 2:i.Oe(),i.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(i.Ne(),i.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),i.De(e.resumeToken));break;default:B()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((i,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,i=e.me.count,s=this.Je(t);if(s){const r=s.target;if(Xo(r))if(i===0){const a=new x(r.path);this.Ue(t,a,be.newNoDocument(a,U.min()))}else ce(i===1);else{const a=this.Ye(t);if(a!==i){const l=this.Ze(e),c=l?this.Xe(l,e,a):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=t;let a,l;try{a=cn(i).toUint8Array()}catch(c){if(c instanceof Od)return Fn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Ka(a,s,r)}catch(c){return Fn(c instanceof Si?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,t,i){return t.me.count===i-this.nt(e,t.targetId)?0:2}nt(e,t){const i=this.Le.getRemoteKeysForTarget(t);let s=0;return i.forEach(r=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,r,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((r,a)=>{const l=this.Je(a);if(l){if(r.current&&Xo(l.target)){const c=new x(l.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,be.newNoDocument(c,e))}r.be&&(t.set(a,r.ve()),r.Ce())}});let i=G();this.qe.forEach((r,a)=>{let l=!0;a.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(r))}),this.ke.forEach((r,a)=>a.setReadTime(e));const s=new xr(e,t,this.Qe,this.ke,i);return this.ke=Bt(),this.qe=ku(),this.Qe=new ve(Y),s}$e(e,t){if(!this.ze(e))return;const i=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,i),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,i){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),i&&(this.ke=this.ke.insert(t,i))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new bu,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ie(Y),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||L("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new bu),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function ku(){return new ve(x.comparator)}function Nu(){return new ve(x.comparator)}const hE={asc:"ASCENDING",desc:"DESCENDING"},dE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fE={and:"AND",or:"OR"};class pE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ta(n,e){return n.useProto3Json||br(e)?e:{value:e}}function _E(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function gE(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Nn(n){return ce(!!n),U.fromTimestamp(function(t){const i=Ut(t);return new Ue(i.seconds,i.nanos)}(n))}function mE(n,e){return na(n,e).canonicalString()}function na(n,e){const t=function(s){return new ae(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Jd(n){const e=ae.fromString(n);return ce(sf(e)),e}function Co(n,e){const t=Jd(e);if(t.get(1)!==n.databaseId.projectId)throw new M(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(ef(t))}function Zd(n,e){return mE(n.databaseId,e)}function yE(n){const e=Jd(n);return e.length===4?ae.emptyPath():ef(e)}function Du(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ef(n){return ce(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function vE(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(ce(f===void 0||typeof f=="string"),Te.fromBase64String(f||"")):(ce(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Te.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?D.UNKNOWN:Qd(h.code);return new M(f,h.message||"")}(a);t=new Xd(i,s,r,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=Co(n,i.document.name),r=Nn(i.document.updateTime),a=i.document.createTime?Nn(i.document.createTime):U.min(),l=new Je({mapValue:{fields:i.document.fields}}),c=be.newFoundDocument(s,r,a,l),h=i.targetIds||[],f=i.removedTargetIds||[];t=new $s(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=Co(n,i.document),r=i.readTime?Nn(i.readTime):U.min(),a=be.newNoDocument(s,r),l=i.removedTargetIds||[];t=new $s([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=Co(n,i.document),r=i.removedTargetIds||[];t=new $s([],r,s,null)}else{if(!("filter"in e))return B();{e.filter;const i=e.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,a=new aE(s,r),l=i.targetId;t=new Yd(l,a)}}return t}function EE(n,e){return{documents:[Zd(n,e.path)]}}function IE(n,e){const t={structuredQuery:{}},i=e.path;let s;e.collectionGroup!==null?(s=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Zd(n,s);const r=function(h){if(h.length!==0)return nf(it.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const a=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:Cn(m.field),direction:CE(m.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=ta(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function TE(n){let e=yE(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let s=null;if(i>0){ce(i===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(_){const m=tf(_);return m instanceof it&&xd(m)?m.getFilters():[m]}(t.where));let a=[];t.orderBy&&(a=function(_){return _.map(m=>function(S){return new sr(An(S.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(_){let m;return m=typeof _=="object"?_.value:_,br(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(_){const m=!!_.before,A=_.values||[];return new ir(A,m)}(t.startAt));let h=null;return t.endAt&&(h=function(_){const m=!_.before,A=_.values||[];return new ir(A,m)}(t.endAt)),qv(e,s,a,r,l,"F",c,h)}function wE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function tf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=An(t.unaryFilter.field);return fe.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=An(t.unaryFilter.field);return fe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=An(t.unaryFilter.field);return fe.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=An(t.unaryFilter.field);return fe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return B()}}(n):n.fieldFilter!==void 0?function(t){return fe.create(An(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(i=>tf(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B()}}(t.compositeFilter.op))}(n):B()}function CE(n){return hE[n]}function AE(n){return dE[n]}function RE(n){return fE[n]}function Cn(n){return{fieldPath:n.canonicalString()}}function An(n){return Me.fromServerFormat(n.fieldPath)}function nf(n){return n instanceof fe?function(t){if(t.op==="=="){if(yu(t.value))return{unaryFilter:{field:Cn(t.field),op:"IS_NAN"}};if(mu(t.value))return{unaryFilter:{field:Cn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(yu(t.value))return{unaryFilter:{field:Cn(t.field),op:"IS_NOT_NAN"}};if(mu(t.value))return{unaryFilter:{field:Cn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Cn(t.field),op:AE(t.op),value:t.value}}}(n):n instanceof it?function(t){const i=t.getFilters().map(s=>nf(s));return i.length===1?i[0]:{compositeFilter:{op:RE(t.op),filters:i}}}(n):B()}function sf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t,i,s,r=U.min(),a=U.min(),l=Te.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Dt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e){this.ct=e}}function PE(n){const e=TE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Jo(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.un=new kE}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Ft.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Ft.min())}updateCollectionGroup(e,t,i){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class kE{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new Ie(ae.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new Ie(ae.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Wn(0)}static kn(){return new Wn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(){this.changes=new Xn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?P.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(i!==null&&Di(i.mutation,s,Nt.empty(),Ue.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,G()).next(()=>i))}getLocalViewOfDocuments(e,t,i=G()){const s=Zt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,i).next(r=>{let a=Ri();return r.forEach((l,c)=>{a=a.insert(l,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const i=Zt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,G()))}populateOverlays(e,t,i){const s=[];return i.forEach(r=>{t.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(e,s).next(r=>{r.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,i,s){let r=Bt();const a=Ni(),l=function(){return Ni()}();return t.forEach((c,h)=>{const f=i.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Mr)?r=r.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Di(f.mutation,h,f.mutation.getFieldMask(),Ue.now())):a.set(h.key,Nt.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var _;return l.set(h,new DE(f,(_=a.get(h))!==null&&_!==void 0?_:null))}),l))}recalculateAndSaveOverlays(e,t){const i=Ni();let s=new ve((a,l)=>a-l),r=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=i.get(c)||Nt.empty();f=l.applyToLocalView(h,f),i.set(c,f);const _=(s.get(l.batchId)||G()).add(c);s=s.insert(l.batchId,_)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,_=jd();f.forEach(m=>{if(!r.has(m)){const A=Gd(t.get(m),i.get(m));A!==null&&_.set(m,A),r=r.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,_))}return P.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,s){return function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wv(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,s):this.getDocumentsMatchingCollectionQuery(e,t,i,s)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next(r=>{const a=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):P.resolve(Zt());let l=-1,c=r;return a.next(h=>P.forEach(h,(f,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),r.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,c,h,G())).next(f=>({batchId:l,changes:Gv(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(i=>{let s=Ri();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,i,s){const r=t.collectionGroup;let a=Ri();return this.indexManager.getCollectionParents(e,r).next(l=>P.forEach(l,c=>{const h=function(_,m){return new Nr(m,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(t,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,i,s).next(f=>{f.forEach((_,m)=>{a=a.insert(_,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(a=>(r=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,r,s))).next(a=>{r.forEach((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,be.newInvalidDocument(f)))});let l=Ri();return a.forEach((c,h)=>{const f=r.get(c);f!==void 0&&Di(f.mutation,h,Nt.empty(),Ue.now()),Or(t,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Nn(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:PE(s.bundledQuery),readTime:Nn(s.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(){this.overlays=new ve(x.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const i=Zt();return P.forEach(t,s=>this.getOverlay(e,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((s,r)=>{this.ht(e,t,r)}),P.resolve()}removeOverlaysForBatchId(e,t,i){const s=this.Ir.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.Ir.delete(i)),P.resolve()}getOverlaysForCollection(e,t,i){const s=Zt(),r=t.length+1,a=new x(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new ve((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>i){let f=r.get(h.largestBatchId);f===null&&(f=Zt(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Zt(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return P.resolve(l)}ht(e,t,i){const s=this.overlays.get(i.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(i.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new oE(t,i));let r=this.Ir.get(t);r===void 0&&(r=G(),this.Ir.set(t,r)),this.Ir.set(t,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.Tr=new Ie(ge.Er),this.dr=new Ie(ge.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new ge(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new ge(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new x(new ae([])),i=new ge(t,e),s=new ge(t,e+1),r=[];return this.dr.forEachInRange([i,s],a=>{this.Vr(a),r.push(a.key)}),r}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new x(new ae([])),i=new ge(t,e),s=new ge(t,e+1);let r=G();return this.dr.forEachInRange([i,s],a=>{r=r.add(a.key)}),r}containsKey(e){const t=new ge(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class ge{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return x.comparator(e.key,t.key)||Y(e.wr,t.wr)}static Ar(e,t){return Y(e.wr,t.wr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ie(ge.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new rE(r,t,i,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new ge(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,s=this.vr(i),r=s<0?0:s;return P.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new ge(t,0),s=new ge(t,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([i,s],a=>{const l=this.Dr(a.wr);r.push(l)}),P.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new Ie(Y);return t.forEach(s=>{const r=new ge(s,0),a=new ge(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([r,a],l=>{i=i.add(l.wr)})}),P.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,s=i.length+1;let r=i;x.isDocumentKey(r)||(r=r.child(""));const a=new ge(new x(r),0);let l=new Ie(Y);return this.br.forEachWhile(c=>{const h=c.key.path;return!!i.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.wr)),!0)},a),P.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(i=>{const s=this.Dr(i);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ce(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return P.forEach(t.mutations,s=>{const r=new ge(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new ge(t,0),s=this.br.firstAfterOrEqual(i);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(e){this.Mr=e,this.docs=function(){return new ve(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,s=this.docs.get(i),r=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:a}),this.size+=a-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return P.resolve(i?i.document.mutableCopy():be.newInvalidDocument(t))}getEntries(e,t){let i=Bt();return t.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():be.newInvalidDocument(s))}),P.resolve(i)}getDocumentsMatchingQuery(e,t,i,s){let r=Bt();const a=t.path,l=new x(a.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||Tv(Iv(f),i)<=0||(s.has(f.key)||Or(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return P.resolve(r)}getAllFromCollectionGroup(e,t,i,s){B()}Or(e,t){return P.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new UE(this)}getSize(e){return P.resolve(this.size)}}class UE extends NE{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(i)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e){this.persistence=e,this.Nr=new Xn(t=>ja(t),Ha),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Qa,this.targetCount=0,this.kr=Wn.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Wn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,i){let s=0;const r=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.Nr.delete(a),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),P.waitFor(r).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return P.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),P.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(a=>{r.push(s.markPotentiallyOrphaned(e,a))}),P.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return P.resolve(i)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Ua(0),this.Kr=!1,this.Kr=!0,this.$r=new xE,this.referenceDelegate=e(this),this.Ur=new BE(this),this.indexManager=new bE,this.remoteDocumentCache=function(s){return new FE(s)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new SE(t),this.Gr=new LE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ME,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new VE(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){L("MemoryPersistence","Starting transaction:",e);const s=new WE(this.Qr.next());return this.referenceDelegate.zr(),i(s).next(r=>this.referenceDelegate.jr(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Hr(e,t){return P.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class WE extends Cv{constructor(e){super(),this.currentSequenceNumber=e}}class Ya{constructor(e){this.persistence=e,this.Jr=new Qa,this.Yr=null}static Zr(e){return new Ya(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),P.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(r=>this.Xr.add(r.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,i=>{const s=x.fromPath(i);return this.ei(e,s).next(r=>{r||t.removeEntry(s,U.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=s}static Wi(e,t){let i=G(),s=G();for(const r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Xa(e,t.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return M_()?8:Av(De())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,s){const r={result:null};return this.Yi(e,t).next(a=>{r.result=a}).next(()=>{if(!r.result)return this.Zi(e,t,s,i).next(a=>{r.result=a})}).next(()=>{if(r.result)return;const a=new jE;return this.Xi(e,t,a).next(l=>{if(r.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>r.result)}es(e,t,i,s){return i.documentReadCount<this.ji?(yi()<=H.DEBUG&&L("QueryEngine","SDK will not create cache indexes for query:",wn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(yi()<=H.DEBUG&&L("QueryEngine","Query:",wn(t),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.Hi*s?(yi()<=H.DEBUG&&L("QueryEngine","The SDK decides to create cache indexes for query:",wn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tt(t))):P.resolve())}Yi(e,t){if(Tu(t))return P.resolve(null);let i=tt(t);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Jo(t,null,"F"),i=tt(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(r=>{const a=G(...r);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,i).next(c=>{const h=this.ts(t,l);return this.ns(t,h,a,c.readTime)?this.Yi(e,Jo(t,null,"F")):this.rs(e,h,t,c)}))})))}Zi(e,t,i,s){return Tu(t)||s.isEqual(U.min())?P.resolve(null):this.Ji.getDocuments(e,i).next(r=>{const a=this.ts(t,r);return this.ns(t,a,i,s)?P.resolve(null):(yi()<=H.DEBUG&&L("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),wn(t)),this.rs(e,a,t,Ev(s,-1)).next(l=>l))})}ts(e,t){let i=new Ie(qd(e));return t.forEach((s,r)=>{Or(e,r)&&(i=i.add(r))}),i}ns(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Xi(e,t,i){return yi()<=H.DEBUG&&L("QueryEngine","Using full collection scan to execute query:",wn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Ft.min(),i)}rs(e,t,i,s){return this.Ji.getDocumentsMatchingQuery(e,i,s).next(r=>(t.forEach(a=>{r=r.insert(a.key,a)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,t,i,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ve(Y),this._s=new Xn(r=>ja(r),Ha),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new OE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function zE(n,e,t,i){return new $E(n,e,t,i)}async function rf(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(r=>{const a=[],l=[];let c=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of r){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(i,c).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:l}))})})}function of(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function GE(n,e){const t=z(n),i=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((f,_)=>{const m=s.get(_);if(!m)return;l.push(t.Ur.removeMatchingKeys(r,f.removedDocuments,_).next(()=>t.Ur.addMatchingKeys(r,f.addedDocuments,_)));let A=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(_)!==null?A=A.withResumeToken(Te.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,i)),s=s.insert(_,A),function(O,N,Q){return O.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:Q.addedDocuments.size+Q.modifiedDocuments.size+Q.removedDocuments.size>0}(m,A,f)&&l.push(t.Ur.updateTargetData(r,A))});let c=Bt(),h=G();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(KE(r,a,e.documentUpdates).next(f=>{c=f.Ps,h=f.Is})),!i.isEqual(U.min())){const f=t.Ur.getLastRemoteSnapshotVersion(r).next(_=>t.Ur.setTargetsMetadata(r,r.currentSequenceNumber,i));l.push(f)}return P.waitFor(l).next(()=>a.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,h)).next(()=>c)}).then(r=>(t.os=s,r))}function KE(n,e,t){let i=G(),s=G();return t.forEach(r=>i=i.add(r)),e.getEntries(n,i).next(r=>{let a=Bt();return t.forEach((l,c)=>{const h=r.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(U.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):L("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ps:a,Is:s}})}function QE(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return t.Ur.getTargetData(i,e).next(r=>r?(s=r,P.resolve(s)):t.Ur.allocateTargetId(i).next(a=>(s=new Dt(e,a,"TargetPurposeListen",i.currentSequenceNumber),t.Ur.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=t.os.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(i.targetId,i),t._s.set(e,i.targetId)),i})}async function ia(n,e,t){const i=z(n),s=i.os.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,a=>i.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!is(a))throw a;L("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}i.os=i.os.remove(e),i._s.delete(s.target)}function Ou(n,e,t){const i=z(n);let s=U.min(),r=G();return i.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,f){const _=z(c),m=_._s.get(f);return m!==void 0?P.resolve(_.os.get(m)):_.Ur.getTargetData(h,f)}(i,a,tt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(a,l.targetId).next(c=>{r=c})}).next(()=>i.ss.getDocumentsMatchingQuery(a,e,t?s:U.min(),t?r:G())).next(l=>(YE(i,Hv(e),l),{documents:l,Ts:r})))}function YE(n,e,t){let i=n.us.get(e)||U.min();t.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.us.set(e,i)}class Lu{constructor(){this.activeTargetIds=Yv()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class XE{constructor(){this.so=new Lu,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Lu,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){L("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){L("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xs=null;function Ao(){return xs===null?xs=function(){return 268435456+Math.round(2147483648*Math.random())}():xs++,"0x"+xs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection";class tI extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${s}/databases/${r}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${r}`}get Fo(){return!1}Mo(t,i,s,r,a){const l=Ao(),c=this.xo(t,i.toUriEncodedString());L("RestConnection",`Sending RPC '${t}' ${l}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,r,a),this.No(t,c,h,s).then(f=>(L("RestConnection",`Received RPC '${t}' ${l}: `,f),f),f=>{throw Fn("RestConnection",`RPC '${t}' ${l} failed with error: `,f,"url: ",c,"request:",s),f})}Lo(t,i,s,r,a,l){return this.Mo(t,i,s,r,a)}Oo(t,i,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Yn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((r,a)=>t[a]=r),s&&s.headers.forEach((r,a)=>t[a]=r)}xo(t,i){const s=ZE[t];return`${this.Do}/v1/${i}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,s){const r=Ao();return new Promise((a,l)=>{const c=new Rd;c.setWithCredentials(!0),c.listenOnce(Sd.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case js.NO_ERROR:const f=c.getResponseJson();L(Se,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(f)),a(f);break;case js.TIMEOUT:L(Se,`RPC '${e}' ${r} timed out`),l(new M(D.DEADLINE_EXCEEDED,"Request time out"));break;case js.HTTP_ERROR:const _=c.getStatus();if(L(Se,`RPC '${e}' ${r} failed with status:`,_,"response text:",c.getResponseText()),_>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const A=m==null?void 0:m.error;if(A&&A.status&&A.message){const S=function(N){const Q=N.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(Q)>=0?Q:D.UNKNOWN}(A.status);l(new M(S,A.message))}else l(new M(D.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new M(D.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{L(Se,`RPC '${e}' ${r} completed.`)}});const h=JSON.stringify(s);L(Se,`RPC '${e}' ${r} sending request:`,s),c.send(t,"POST",h,i,15)})}Bo(e,t,i){const s=Ao(),r=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=kd(),l=bd(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,i),c.encodeInitMessageHeaders=!0;const f=r.join("");L(Se,`Creating RPC '${e}' stream ${s}: ${f}`,c);const _=a.createWebChannel(f,c);let m=!1,A=!1;const S=new eI({Io:N=>{A?L(Se,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(m||(L(Se,`Opening RPC '${e}' stream ${s} transport.`),_.open(),m=!0),L(Se,`RPC '${e}' stream ${s} sending:`,N),_.send(N))},To:()=>_.close()}),O=(N,Q,J)=>{N.listen(Q,Z=>{try{J(Z)}catch(re){setTimeout(()=>{throw re},0)}})};return O(_,Ai.EventType.OPEN,()=>{A||(L(Se,`RPC '${e}' stream ${s} transport opened.`),S.yo())}),O(_,Ai.EventType.CLOSE,()=>{A||(A=!0,L(Se,`RPC '${e}' stream ${s} transport closed`),S.So())}),O(_,Ai.EventType.ERROR,N=>{A||(A=!0,Fn(Se,`RPC '${e}' stream ${s} transport errored:`,N),S.So(new M(D.UNAVAILABLE,"The operation could not be completed")))}),O(_,Ai.EventType.MESSAGE,N=>{var Q;if(!A){const J=N.data[0];ce(!!J);const Z=J,re=Z.error||((Q=Z[0])===null||Q===void 0?void 0:Q.error);if(re){L(Se,`RPC '${e}' stream ${s} received error:`,re);const je=re.status;let ue=function(v){const E=de[v];if(E!==void 0)return Qd(E)}(je),I=re.message;ue===void 0&&(ue=D.INTERNAL,I="Unknown error status: "+je+" with message "+re.message),A=!0,S.So(new M(ue,I)),_.close()}else L(Se,`RPC '${e}' stream ${s} received:`,J),S.bo(J)}}),O(l,Pd.STAT_EVENT,N=>{N.stat===$o.PROXY?L(Se,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===$o.NOPROXY&&L(Se,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function Ro(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){return new pE(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e,t,i=1e3,s=1.5,r=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=s,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-i);s>0&&L("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e,t,i,s,r,a,l,c){this.ui=e,this.Ho=i,this.Jo=s,this.connection=r,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new lf(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(mt(t.toString()),mt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.Yo===t&&this.P_(i,s)},i=>{e(()=>{const s=new M(D.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(s)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{i(()=>this.I_(s))}),this.stream.onMessage(s=>{i(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return L("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(L("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class iI extends nI{constructor(e,t,i,s,r,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,a),this.serializer=r}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=vE(this.serializer,e),i=function(r){if(!("targetChange"in r))return U.min();const a=r.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Nn(a.readTime):U.min()}(e);return this.listener.d_(t,i)}A_(e){const t={};t.database=Du(this.serializer),t.addTarget=function(r,a){let l;const c=a.target;if(l=Xo(c)?{documents:EE(r,c)}:{query:IE(r,c)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=gE(r,a.resumeToken);const h=ta(r,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(U.min())>0){l.readTime=_E(r,a.snapshotVersion.toTimestamp());const h=ta(r,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const i=wE(this.serializer,e);i&&(t.labels=i),this.a_(t)}R_(e){const t={};t.database=Du(this.serializer),t.removeTarget=e,this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI extends class{}{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new M(D.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,a])=>this.connection.Mo(e,na(t,i),s,r,a)).catch(r=>{throw r.name==="FirebaseError"?(r.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new M(D.UNKNOWN,r.toString())})}Lo(e,t,i,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,na(t,i),s,a,l,r)).catch(a=>{throw a.name==="FirebaseError"?(a.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(D.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class rI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(mt(t),this.D_=!1):L("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o(a=>{i.enqueueAndForget(async()=>{os(this)&&(L("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=z(c);h.L_.add(4),await rs(h),h.q_.set("Unknown"),h.L_.delete(4),await Vr(h)}(this))})}),this.q_=new rI(i,s)}}async function Vr(n){if(os(n))for(const e of n.B_)await e(!0)}async function rs(n){for(const e of n.B_)await e(!1)}function cf(n,e){const t=z(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),tl(t)?el(t):Jn(t).r_()&&Za(t,e))}function Ja(n,e){const t=z(n),i=Jn(t);t.N_.delete(e),i.r_()&&uf(t,e),t.N_.size===0&&(i.r_()?i.o_():os(t)&&t.q_.set("Unknown"))}function Za(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Jn(n).A_(e)}function uf(n,e){n.Q_.xe(e),Jn(n).R_(e)}function el(n){n.Q_=new uE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Jn(n).start(),n.q_.v_()}function tl(n){return os(n)&&!Jn(n).n_()&&n.N_.size>0}function os(n){return z(n).L_.size===0}function hf(n){n.Q_=void 0}async function aI(n){n.q_.set("Online")}async function lI(n){n.N_.forEach((e,t)=>{Za(n,e)})}async function cI(n,e){hf(n),tl(n)?(n.q_.M_(e),el(n)):n.q_.set("Unknown")}async function uI(n,e,t){if(n.q_.set("Online"),e instanceof Xd&&e.state===2&&e.cause)try{await async function(s,r){const a=r.cause;for(const l of r.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(i){L("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await xu(n,i)}else if(e instanceof $s?n.Q_.Ke(e):e instanceof Yd?n.Q_.He(e):n.Q_.We(e),!t.isEqual(U.min()))try{const i=await of(n.localStore);t.compareTo(i)>=0&&await function(r,a){const l=r.Q_.rt(a);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=r.N_.get(h);f&&r.N_.set(h,f.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,h)=>{const f=r.N_.get(c);if(!f)return;r.N_.set(c,f.withResumeToken(Te.EMPTY_BYTE_STRING,f.snapshotVersion)),uf(r,c);const _=new Dt(f.target,c,h,f.sequenceNumber);Za(r,_)}),r.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(i){L("RemoteStore","Failed to raise snapshot:",i),await xu(n,i)}}async function xu(n,e,t){if(!is(e))throw e;n.L_.add(1),await rs(n),n.q_.set("Offline"),t||(t=()=>of(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{L("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Vr(n)})}async function Vu(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),L("RemoteStore","RemoteStore received new credentials");const i=os(t);t.L_.add(3),await rs(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Vr(t)}async function hI(n,e){const t=z(n);e?(t.L_.delete(2),await Vr(t)):e||(t.L_.add(2),await rs(t),t.q_.set("Unknown"))}function Jn(n){return n.K_||(n.K_=function(t,i,s){const r=z(t);return r.w_(),new iI(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:aI.bind(null,n),Ro:lI.bind(null,n),mo:cI.bind(null,n),d_:uI.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),tl(n)?el(n):n.q_.set("Unknown")):(await n.K_.stop(),hf(n))})),n.K_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new nn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,r){const a=Date.now()+i,l=new nl(e,t,a,s,r);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function df(n,e){if(mt("AsyncQueue",`${e}: ${n}`),is(n))return new M(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.comparator=e?(t,i)=>e(t,i)||x.comparator(t.key,i.key):(t,i)=>x.comparator(t.key,i.key),this.keyedMap=Ri(),this.sortedSet=new ve(this.comparator)}static emptySet(e){return new Dn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Dn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new Dn;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(){this.W_=new ve(x.comparator)}track(e){const t=e.doc.key,i=this.W_.get(t);i?e.type!==0&&i.type===3?this.W_=this.W_.insert(t,e):e.type===3&&i.type!==1?this.W_=this.W_.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.W_=this.W_.remove(t):e.type===1&&i.type===2?this.W_=this.W_.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):B():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,i)=>{e.push(i)}),e}}class jn{constructor(e,t,i,s,r,a,l,c,h){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,i,s,r){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new jn(e,t,Dn.emptySet(t),a,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Dr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class fI{constructor(){this.queries=Uu(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const s=z(t),r=s.queries;s.queries=Uu(),r.forEach((a,l)=>{for(const c of l.j_)c.onError(i)})})(this,new M(D.ABORTED,"Firestore shutting down"))}}function Uu(){return new Xn(n=>Bd(n),Dr)}async function pI(n,e){const t=z(n);let i=3;const s=e.query;let r=t.queries.get(s);r?!r.H_()&&e.J_()&&(i=2):(r=new dI,i=e.J_()?0:1);try{switch(i){case 0:r.z_=await t.onListen(s,!0);break;case 1:r.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=df(a,`Initialization of query '${wn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,r),r.j_.push(e),e.Z_(t.onlineState),r.z_&&e.X_(r.z_)&&il(t)}async function _I(n,e){const t=z(n),i=e.query;let s=3;const r=t.queries.get(i);if(r){const a=r.j_.indexOf(e);a>=0&&(r.j_.splice(a,1),r.j_.length===0?s=e.J_()?0:1:!r.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function gI(n,e){const t=z(n);let i=!1;for(const s of e){const r=s.query,a=t.queries.get(r);if(a){for(const l of a.j_)l.X_(s)&&(i=!0);a.z_=s}}i&&il(t)}function mI(n,e,t){const i=z(n),s=i.queries.get(e);if(s)for(const r of s.j_)r.onError(t);i.queries.delete(e)}function il(n){n.Y_.forEach(e=>{e.next()})}var sa,Bu;(Bu=sa||(sa={})).ea="default",Bu.Cache="cache";class yI{constructor(e,t,i){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=i||{}}X_(e){if(!this.options.includeMetadataChanges){const i=[];for(const s of e.docChanges)s.type!==3&&i.push(s);e=new jn(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const i=t!=="Offline";return(!this.options._a||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=jn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==sa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this.key=e}}class pf{constructor(e){this.key=e}}class vI{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=G(),this.mutatedKeys=G(),this.Aa=qd(e),this.Ra=new Dn(this.Aa)}get Va(){return this.Ta}ma(e,t){const i=t?t.fa:new Fu,s=t?t.Ra:this.Ra;let r=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,_)=>{const m=s.get(f),A=Or(this.query,_)?_:null,S=!!m&&this.mutatedKeys.has(m.key),O=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;m&&A?m.data.isEqual(A.data)?S!==O&&(i.track({type:3,doc:A}),N=!0):this.ga(m,A)||(i.track({type:2,doc:A}),N=!0,(c&&this.Aa(A,c)>0||h&&this.Aa(A,h)<0)&&(l=!0)):!m&&A?(i.track({type:0,doc:A}),N=!0):m&&!A&&(i.track({type:1,doc:m}),N=!0,(c||h)&&(l=!0)),N&&(A?(a=a.add(A),r=O?r.add(f):r.delete(f)):(a=a.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),r=r.delete(f.key),i.track({type:1,doc:f})}return{Ra:a,fa:i,ns:l,mutatedKeys:r}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,s){const r=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,_)=>function(A,S){const O=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B()}};return O(A)-O(S)}(f.type,_.type)||this.Aa(f.doc,_.doc)),this.pa(i),s=s!=null&&s;const l=t&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,a.length!==0||h?{snapshot:new jn(this.query,e.Ra,r,a,e.mutatedKeys,c===0,h,!1,!!i&&i.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Fu,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=G(),this.Ra.forEach(i=>{this.Sa(i.key)&&(this.da=this.da.add(i.key))});const t=[];return e.forEach(i=>{this.da.has(i)||t.push(new pf(i))}),this.da.forEach(i=>{e.has(i)||t.push(new ff(i))}),t}ba(e){this.Ta=e.Ts,this.da=G();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return jn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class EI{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class II{constructor(e){this.key=e,this.va=!1}}class TI{constructor(e,t,i,s,r,a){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Xn(l=>Bd(l),Dr),this.Ma=new Map,this.xa=new Set,this.Oa=new ve(x.comparator),this.Na=new Map,this.La=new Qa,this.Ba={},this.ka=new Map,this.qa=Wn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function wI(n,e,t=!0){const i=vf(n);let s;const r=i.Fa.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Da()):s=await _f(i,e,t,!0),s}async function CI(n,e){const t=vf(n);await _f(t,e,!0,!1)}async function _f(n,e,t,i){const s=await QE(n.localStore,tt(e)),r=s.targetId,a=n.sharedClientState.addLocalQueryTarget(r,t);let l;return i&&(l=await AI(n,e,r,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&cf(n.remoteStore,s),l}async function AI(n,e,t,i,s){n.Ka=(_,m,A)=>async function(O,N,Q,J){let Z=N.view.ma(Q);Z.ns&&(Z=await Ou(O.localStore,N.query,!1).then(({documents:I})=>N.view.ma(I,Z)));const re=J&&J.targetChanges.get(N.targetId),je=J&&J.targetMismatches.get(N.targetId)!=null,ue=N.view.applyChanges(Z,O.isPrimaryClient,re,je);return Wu(O,N.targetId,ue.wa),ue.snapshot}(n,_,m,A);const r=await Ou(n.localStore,e,!0),a=new vI(e,r.Ts),l=a.ma(r.documents),c=ss.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,c);Wu(n,t,h.wa);const f=new EI(e,t,a);return n.Fa.set(e,f),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function RI(n,e,t){const i=z(n),s=i.Fa.get(e),r=i.Ma.get(s.targetId);if(r.length>1)return i.Ma.set(s.targetId,r.filter(a=>!Dr(a,e))),void i.Fa.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await ia(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),t&&Ja(i.remoteStore,s.targetId),ra(i,s.targetId)}).catch(Fa)):(ra(i,s.targetId),await ia(i.localStore,s.targetId,!0))}async function SI(n,e){const t=z(n),i=t.Fa.get(e),s=t.Ma.get(i.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Ja(t.remoteStore,i.targetId))}async function gf(n,e){const t=z(n);try{const i=await GE(t.localStore,e);e.targetChanges.forEach((s,r)=>{const a=t.Na.get(r);a&&(ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?ce(a.va):s.removedDocuments.size>0&&(ce(a.va),a.va=!1))}),await yf(t,i,e)}catch(i){await Fa(i)}}function qu(n,e,t){const i=z(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const s=[];i.Fa.forEach((r,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const c=z(a);c.onlineState=l;let h=!1;c.queries.forEach((f,_)=>{for(const m of _.j_)m.Z_(l)&&(h=!0)}),h&&il(c)}(i.eventManager,e),s.length&&i.Ca.d_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function PI(n,e,t){const i=z(n);i.sharedClientState.updateQueryState(e,"rejected",t);const s=i.Na.get(e),r=s&&s.key;if(r){let a=new ve(x.comparator);a=a.insert(r,be.newNoDocument(r,U.min()));const l=G().add(r),c=new xr(U.min(),new Map,new ve(Y),a,l);await gf(i,c),i.Oa=i.Oa.remove(r),i.Na.delete(e),sl(i)}else await ia(i.localStore,e,!1).then(()=>ra(i,e,t)).catch(Fa)}function ra(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Ma.get(e))n.Fa.delete(i),t&&n.Ca.$a(i,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(i=>{n.La.containsKey(i)||mf(n,i)})}function mf(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Ja(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),sl(n))}function Wu(n,e,t){for(const i of t)i instanceof ff?(n.La.addReference(i.key,e),bI(n,i)):i instanceof pf?(L("SyncEngine","Document no longer in limbo: "+i.key),n.La.removeReference(i.key,e),n.La.containsKey(i.key)||mf(n,i.key)):B()}function bI(n,e){const t=e.key,i=t.path.canonicalString();n.Oa.get(t)||n.xa.has(i)||(L("SyncEngine","New document in limbo: "+t),n.xa.add(i),sl(n))}function sl(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new x(ae.fromString(e)),i=n.qa.next();n.Na.set(i,new II(t)),n.Oa=n.Oa.insert(t,i),cf(n.remoteStore,new Dt(tt($a(t.path)),i,"TargetPurposeLimboResolution",Ua.oe))}}async function yf(n,e,t){const i=z(n),s=[],r=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((l,c)=>{a.push(i.Ka(c,e,t).then(h=>{var f;if((h||t)&&i.isPrimaryClient){const _=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;i.sharedClientState.updateQueryState(c.targetId,_?"current":"not-current")}if(h){s.push(h);const _=Xa.Wi(c.targetId,h);r.push(_)}}))}),await Promise.all(a),i.Ca.d_(s),await async function(c,h){const f=z(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>P.forEach(h,m=>P.forEach(m.$i,A=>f.persistence.referenceDelegate.addReference(_,m.targetId,A)).next(()=>P.forEach(m.Ui,A=>f.persistence.referenceDelegate.removeReference(_,m.targetId,A)))))}catch(_){if(!is(_))throw _;L("LocalStore","Failed to update sequence numbers: "+_)}for(const _ of h){const m=_.targetId;if(!_.fromCache){const A=f.os.get(m),S=A.snapshotVersion,O=A.withLastLimboFreeSnapshotVersion(S);f.os=f.os.insert(m,O)}}}(i.localStore,r))}async function kI(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){L("SyncEngine","User change. New user:",e.toKey());const i=await rf(t.localStore,e);t.currentUser=e,function(r,a){r.ka.forEach(l=>{l.forEach(c=>{c.reject(new M(D.CANCELLED,a))})}),r.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await yf(t,i.hs)}}function NI(n,e){const t=z(n),i=t.Na.get(e);if(i&&i.va)return G().add(i.key);{let s=G();const r=t.Ma.get(e);if(!r)return s;for(const a of r){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function vf(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=gf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=NI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=PI.bind(null,e),e.Ca.d_=gI.bind(null,e.eventManager),e.Ca.$a=mI.bind(null,e.eventManager),e}class ar{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=af(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return zE(this.persistence,new HE,e.initialUser,this.serializer)}Ga(e){return new qE(Ya.Zr,this.serializer)}Wa(e){return new XE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ar.provider={build:()=>new ar};class oa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>qu(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=kI.bind(null,this.syncEngine),await hI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fI}()}createDatastore(e){const t=af(e.databaseInfo.databaseId),i=function(r){return new tI(r)}(e.databaseInfo);return function(r,a,l,c){return new sI(r,a,l,c)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,s,r,a,l){return new oI(i,s,r,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>qu(this.syncEngine,t,0),function(){return Mu.D()?new Mu:new JE}())}createSyncEngine(e,t){return function(s,r,a,l,c,h,f){const _=new TI(s,r,a,l,c,h);return f&&(_.Qa=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const r=z(s);L("RemoteStore","RemoteStore shutting down."),r.L_.add(5),await rs(r),r.k_.shutdown(),r.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}oa.provider={build:()=>new oa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):mt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e,t,i,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=s,this.user=Pe.UNAUTHENTICATED,this.clientId=Dd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async a=>{L("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(L("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new nn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=df(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function So(n,e){n.asyncQueue.verifyOperationInProgress(),L("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await rf(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function ju(n,e){n.asyncQueue.verifyOperationInProgress();const t=await LI(n);L("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>Vu(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>Vu(e.remoteStore,s)),n._onlineComponents=e}async function LI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){L("FirestoreClient","Using user provided OfflineComponentProvider");try{await So(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===D.FAILED_PRECONDITION||s.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Fn("Error using user provided cache. Falling back to memory cache: "+t),await So(n,new ar)}}else L("FirestoreClient","Using default OfflineComponentProvider"),await So(n,new ar);return n._offlineComponents}async function MI(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(L("FirestoreClient","Using user provided OnlineComponentProvider"),await ju(n,n._uninitializedComponentsProvider._online)):(L("FirestoreClient","Using default OnlineComponentProvider"),await ju(n,new oa))),n._onlineComponents}async function xI(n){const e=await MI(n),t=e.eventManager;return t.onListen=wI.bind(null,e.syncEngine),t.onUnlisten=RI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=CI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=SI.bind(null,e.syncEngine),t}function VI(n,e,t={}){const i=new nn;return n.asyncQueue.enqueueAndForget(async()=>function(r,a,l,c,h){const f=new DI({next:m=>{f.Za(),a.enqueueAndForget(()=>_I(r,_));const A=m.docs.has(l);!A&&m.fromCache?h.reject(new M(D.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&m.fromCache&&c&&c.source==="server"?h.reject(new M(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),_=new yI($a(l.path),f,{includeMetadataChanges:!0,_a:!0});return pI(r,_)}(await xI(n),n.asyncQueue,e,t,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(n,e,t){if(!t)throw new M(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function UI(n,e,t,i){if(e===!0&&i===!0)throw new M(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function $u(n){if(!x.isDocumentKey(n))throw new M(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function BI(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B()}function aa(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=BI(n);throw new M(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new M(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new M(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}UI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ef((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class rl{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new zu({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new zu(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new hv;switch(i.type){case"firstParty":return new _v(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new M(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=Hu.get(t);i&&(L("ComponentProvider","Removing Datastore"),Hu.delete(t),i.terminate())}(this),Promise.resolve()}}function qI(n,e,t,i={}){var s;const r=(n=aa(n,rl))._getSettings(),a=`${e}:${t}`;if(r.host!=="firestore.googleapis.com"&&r.host!==a&&Fn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:a,ssl:!1})),i.mockUserToken){let l,c;if(typeof i.mockUserToken=="string")l=i.mockUserToken,c=Pe.MOCK_USER;else{l=Fh(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=i.mockUserToken.sub||i.mockUserToken.user_id;if(!h)throw new M(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Pe(h)}n._authCredentials=new dv(new Nd(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new ol(this.firestore,e,this._query)}}class ft{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $i(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ft(this.firestore,e,this._key)}}class $i extends ol{constructor(e,t,i){super(e,t,$a(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ft(this.firestore,null,new x(e))}withConverter(e){return new $i(this.firestore,e,this._path)}}function IA(n,e,...t){if(n=xe(n),arguments.length===1&&(e=Dd.newId()),FI("doc","path",e),n instanceof rl){const i=ae.fromString(e,...t);return $u(i),new ft(n,null,new x(i))}{if(!(n instanceof ft||n instanceof $i))throw new M(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(ae.fromString(e,...t));return $u(i),new ft(n.firestore,n instanceof $i?n.converter:null,new x(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new lf(this,"async_queue_retry"),this.Vu=()=>{const i=Ro();i&&L("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=Ro();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ro();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new nn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!is(e))throw e;L("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(i);throw mt("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=nl.createAndSchedule(this,e,t,i,r=>this.yu(r));return this.Tu.push(s),s}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class If extends rl{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new Gu,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gu(e),this._firestoreClient=void 0,await e}}}function TA(n,e){const t=typeof n=="object"?n:Aa(),i=typeof n=="string"?n:"(default)",s=Ar(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=Mh("firestore");r&&qI(s,...r)}return s}function WI(n){if(n._terminated)throw new M(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||jI(n),n._firestoreClient}function jI(n){var e,t,i;const s=n._freezeSettings(),r=function(l,c,h,f){return new Pv(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Ef(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new OI(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lr(Te.fromBase64String(e))}catch(t){throw new M(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new lr(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}}const zI=new RegExp("[~\\*/\\[\\]]");function GI(n,e,t){if(e.search(zI)>=0)throw Ku(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Tf(...e.split("."))._internalPath}catch{throw Ku(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Ku(n,e,t,i,s){let r=`Function ${e}() called with invalid data`;r+=". ";let a="";return new M(D.INVALID_ARGUMENT,r+n+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new KI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Cf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class KI extends wf{data(){return super.data()}}function Cf(n,e){return typeof e=="string"?GI(n,e):e instanceof Tf?e._internalPath:e._delegate._internalPath}class QI{convertValue(e,t="none"){switch(un(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(cn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return kr(e,(s,r)=>{i[s]=this.convertValue(r,t)}),i}convertVectorValue(e){var t,i,s;const r=(s=(i=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(a=>he(a.doubleValue));return new $I(r)}convertGeoPoint(e){return new HI(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=qa(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Wi(e));default:return null}}convertTimestamp(e){const t=Ut(e);return new Ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=ae.fromString(e);ce(sf(i));const s=new ji(i.get(1),i.get(3)),r=new x(i.popFirst(5));return s.isEqual(t)||mt(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Af extends wf{constructor(e,t,i,s,r,a){super(e,t,i,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new XI(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(Cf("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}}class XI extends Af{data(e={}){return super.data(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wA(n){n=aa(n,ft);const e=aa(n.firestore,If);return VI(WI(e),n._key).then(t=>ZI(e,n,t))}class JI extends QI{constructor(e){super(),this.firestore=e}convertBytes(e){return new lr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ft(this.firestore,null,t)}}function ZI(n,e,t){const i=t.docs.get(e._key),s=new JI(n);return new Af(n,s,e._key,i,new YI(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Yn=s})(_n),rn(new Vt("firestore",(i,{instanceIdentifier:s,options:r})=>{const a=i.getProvider("app").getImmediate(),l=new If(new fv(i.getProvider("auth-internal")),new mv(i.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ji(h.options.projectId,f)}(a,s),a);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),Ze(du,"4.7.3",e),Ze(du,"4.7.3","esm2017")})();var eT="firebase",tT="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ze(eT,tT,"app");var Qu={};const Yu="@firebase/database",Xu="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rf="";function nT(n){Rf=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ye(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Fi(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Et(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new iT(e)}}catch{}return new sT},en=Sf("localStorage"),rT=Sf("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=new Cr("@firebase/database"),oT=function(){let n=1;return function(){return n++}}(),Pf=function(n){const e=G_(n),t=new j_;t.update(e);const i=t.digest();return Ia.encodeByteArray(i)},as=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=as.apply(null,i):typeof i=="object"?e+=ye(i):e+=i,e+=" "}return e};let Oi=null,Ju=!0;const aT=function(n,e){b(!0,"Can't turn on custom loggers persistently."),On.logLevel=H.VERBOSE,Oi=On.log.bind(On)},ke=function(...n){if(Ju===!0&&(Ju=!1,Oi===null&&rT.get("logging_enabled")===!0&&aT()),Oi){const e=as.apply(null,n);Oi(e)}},ls=function(n){return function(...e){ke(n,...e)}},la=function(...n){const e="FIREBASE INTERNAL ERROR: "+as(...n);On.error(e)},yt=function(...n){const e=`FIREBASE FATAL ERROR: ${as(...n)}`;throw On.error(e),new Error(e)},We=function(...n){const e="FIREBASE WARNING: "+as(...n);On.warn(e)},lT=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&We("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},bf=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cT=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Hn="[MIN_NAME]",hn="[MAX_NAME]",Zn=function(n,e){if(n===e)return 0;if(n===Hn||e===hn)return-1;if(e===Hn||n===hn)return 1;{const t=Zu(n),i=Zu(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},uT=function(n,e){return n===e?0:n<e?-1:1},vi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+ye(e))},al=function(n){if(typeof n!="object"||n===null)return ye(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=ye(e[i]),t+=":",t+=al(n[e[i]]);return t+="}",t},kf=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Be(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Nf=function(n){b(!bf(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,a,l,c;n===0?(r=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,a=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,a=Math.round(n/Math.pow(2,1-i-t))));const h=[];for(c=t;c;c-=1)h.push(a%2?1:0),a=Math.floor(a/2);for(c=e;c;c-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(s?1:0),h.reverse();const f=h.join("");let _="";for(c=0;c<64;c+=8){let m=parseInt(f.substr(c,8),2).toString(16);m.length===1&&(m="0"+m),_=_+m}return _.toLowerCase()},hT=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},dT=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fT(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const pT=new RegExp("^-?(0*)\\d{1,10}$"),_T=-2147483648,gT=2147483647,Zu=function(n){if(pT.test(n)){const e=Number(n);if(e>=_T&&e<=gT)return e}return null},cs=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw We("Exception was thrown by user callback.",t),e},Math.floor(0))}},mT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Li=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yT{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){We(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(ke("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',We(e)}}class zs{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}zs.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="5",Df="v",Of="s",Lf="r",Mf="f",xf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Vf="ls",Ff="p",ca="ac",Uf="websocket",Bf="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t,i,s,r=!1,a="",l=!1,c=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=a,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=en.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&en.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ET(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Wf(n,e,t){b(typeof e=="string","typeof type must == string"),b(typeof t=="object","typeof params must == object");let i;if(e===Uf)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Bf)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ET(n)&&(t.ns=n.namespace);const s=[];return Be(t,(r,a)=>{s.push(r+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(){this.counters_={}}incrementCounter(e,t=1){Et(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return C_(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po={},bo={};function cl(n){const e=n.toString();return Po[e]||(Po[e]=new IT),Po[e]}function TT(n,e){const t=n.toString();return bo[t]||(bo[t]=e()),bo[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&cs(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="start",CT="close",AT="pLPCommand",RT="pRTLPCB",jf="id",Hf="pw",$f="ser",ST="cb",PT="seg",bT="ts",kT="d",NT="dframe",zf=1870,Gf=30,DT=zf-Gf,OT=25e3,LT=3e4;class Rn{constructor(e,t,i,s,r,a,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=a,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ls(e),this.stats_=cl(t),this.urlFn=c=>(this.appCheckToken&&(c[ca]=this.appCheckToken),Wf(t,Bf,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new wT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(LT)),cT(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ul((...r)=>{const[a,l,c,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===eh)this.id=l,this.password=c;else if(a===CT)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...r)=>{const[a,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(a,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[eh]="t",i[$f]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[ST]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Df]=ll,this.transportSessionId&&(i[Of]=this.transportSessionId),this.lastSessionId&&(i[Vf]=this.lastSessionId),this.applicationId&&(i[Ff]=this.applicationId),this.appCheckToken&&(i[ca]=this.appCheckToken),typeof location<"u"&&location.hostname&&xf.test(location.hostname)&&(i[Lf]=Mf);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Rn.forceAllow_=!0}static forceDisallow(){Rn.forceDisallow_=!0}static isAvailable(){return Rn.forceAllow_?!0:!Rn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!hT()&&!dT()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ye(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Dh(t),s=kf(i,DT);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[NT]="t",i[jf]=e,i[Hf]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ye(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ul{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=oT(),window[AT+this.uniqueCallbackIdentifier]=e,window[RT+this.uniqueCallbackIdentifier]=t,this.myIFrame=ul.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(l){ke("frame writing exception"),l.stack&&ke(l.stack),ke(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ke("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[jf]=this.myID,e[Hf]=this.myPW,e[$f]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Gf+i.length<=zf;){const a=this.pendingSegs.shift();i=i+"&"+PT+s+"="+a.seg+"&"+bT+s+"="+a.ts+"&"+kT+s+"="+a.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(OT)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{ke("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=16384,xT=45e3;let cr=null;typeof MozWebSocket<"u"?cr=MozWebSocket:typeof WebSocket<"u"&&(cr=WebSocket);class ze{constructor(e,t,i,s,r,a,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ls(this.connId),this.stats_=cl(t),this.connURL=ze.connectionURL_(t,a,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const a={};return a[Df]=ll,typeof location<"u"&&location.hostname&&xf.test(location.hostname)&&(a[Lf]=Mf),t&&(a[Of]=t),i&&(a[Vf]=i),s&&(a[ca]=s),r&&(a[Ff]=r),Wf(e,Uf,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,en.set("previous_websocket_failure",!0);try{let i;L_(),this.mySock=new cr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ze.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&cr!==null&&!ze.forceDisallow_}static previouslyFailed(){return en.isInMemoryStorage||en.get("previous_websocket_failure")===!0}markConnectionHealthy(){en.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Fi(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(b(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=ye(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=kf(t,MT);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(xT))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ze.responsesRequiredToBeHealthy=2;ze.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Rn,ze]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=ze&&ze.isAvailable();let i=t&&!ze.previouslyFailed();if(e.webSocketOnly&&(t||We("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ze];else{const s=this.transports_=[];for(const r of zi.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);zi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}zi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT=6e4,FT=5e3,UT=10*1024,BT=100*1024,ko="t",th="d",qT="s",nh="r",WT="e",ih="o",sh="a",rh="n",oh="p",jT="h";class HT{constructor(e,t,i,s,r,a,l,c,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=a,this.onReady_=l,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ls("c:"+this.id+":"),this.transportManager_=new zi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Li(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>BT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>UT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ko in e){const t=e[ko];t===sh?this.upgradeIfSecondaryHealthy_():t===nh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ih&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=vi("t",e),i=vi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:oh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:sh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:rh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=vi("t",e),i=vi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=vi(ko,e);if(th in e){const i=e[th];if(t===jT){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===rh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===qT?this.onConnectionShutdown_(i):t===nh?this.onReset_(i):t===WT?la("Server Error: "+i):t===ih?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):la("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),ll!==i&&We("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Li(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(VT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Li(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(FT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:oh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(en.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e){this.allowedEvents_=e,this.listeners_={},b(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){b(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends Qf{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!wa()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ur}getInitialEvent(e){return b(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah=32,lh=768;class te{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function X(){return new te("")}function W(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function qt(n){return n.pieces_.length-n.pieceNum_}function ne(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new te(n.pieces_,e)}function Yf(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function $T(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Xf(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Jf(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new te(e,0)}function pe(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof te)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new te(t,0)}function j(n){return n.pieceNum_>=n.pieces_.length}function Ve(n,e){const t=W(n),i=W(e);if(t===null)return e;if(t===i)return Ve(ne(n),ne(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function hl(n,e){if(qt(n)!==qt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Ke(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(qt(n)>qt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class zT{constructor(e,t){this.errorPrefix_=t,this.parts_=Xf(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=wr(this.parts_[i]);Zf(this)}}function GT(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=wr(e),Zf(n)}function KT(n){const e=n.parts_.pop();n.byteLength_-=wr(e),n.parts_.length>0&&(n.byteLength_-=1)}function Zf(n){if(n.byteLength_>lh)throw new Error(n.errorPrefix_+"has a key path longer than "+lh+" bytes ("+n.byteLength_+").");if(n.parts_.length>ah)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ah+") or object contains a cycle "+Xt(n))}function Xt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl extends Qf{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new dl}getInitialEvent(e){return b(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei=1e3,QT=60*5*1e3,ch=30*1e3,YT=1.3,XT=3e4,JT="server_kill",uh=3;class pt extends Kf{constructor(e,t,i,s,r,a,l,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=a,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=pt.nextPersistentConnectionId_++,this.log_=ls("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ei,this.maxReconnectDelay_=QT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");dl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ur.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(ye(r)),b(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Ta,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const l=a.d;a.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+r),this.listens.has(a)||this.listens.set(a,new Map),b(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),b(!this.listens.get(a).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(a).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},a="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(a,r,l=>{const c=l.d,h=l.s;pt.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Et(e,"w")){const i=xn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();We(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||W_(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ch)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=q_(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,a=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),b(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},a="n";s&&(r.q=i,r.t=s),this.sendRequest(a,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const a={p:t,d:i};r!==void 0&&(a.h=r),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ye(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):la("Unrecognized action received from server: "+ye(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){b(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ei,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ei,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>XT&&(this.reconnectDelay_=Ei),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*YT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+pt.nextConnectionId_++,r=this.lastSessionId;let a=!1,l=null;const c=function(){l?l.close():(a=!0,i())},h=function(_){b(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(_)};this.realtime_={close:c,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);a?ke("getToken() completed but was canceled"):(ke("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=m&&m.token,l=new HT(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,A=>{We(A+" ("+this.repoInfo_.toString()+")"),this.interrupt(JT)},r))}catch(_){this.log_("Failed to get token: "+_),a||(this.repoInfo_.nodeAdmin&&We(_),c())}}}interrupt(e){ke("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ke("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Mo(this.interruptReasons_)&&(this.reconnectDelay_=Ei,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>al(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new te(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){ke("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=uh&&(this.reconnectDelay_=ch,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){ke("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=uh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Rf.replace(/\./g,"-")]=1,wa()?e["framework.cordova"]=1:Uh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ur.getInstance().currentlyOnline();return Mo(this.interruptReasons_)&&e}}pt.nextPersistentConnectionId_=0;pt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new q(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new q(Hn,e),s=new q(Hn,t);return this.compare(i,s)!==0}minPost(){return q.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs;class ep extends Fr{static get __EMPTY_NODE(){return Vs}static set __EMPTY_NODE(e){Vs=e}compare(e,t){return Zn(e.name,t.name)}isDefinedOn(e){throw Gn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return q.MIN}maxPost(){return new q(hn,Vs)}makePost(e,t){return b(typeof e=="string","KeyIndex indexValue must always be a string."),new q(e,Vs)}toString(){return".key"}}const Ln=new ep;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?i(e.key,t):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class me{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??me.RED,this.left=s??Fe.EMPTY_NODE,this.right=r??Fe.EMPTY_NODE}copy(e,t,i,s,r){return new me(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Fe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return Fe.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}me.RED=!0;me.BLACK=!1;class ZT{copy(e,t,i,s,r){return this}insert(e,t,i){return new me(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Fe{constructor(e,t=Fe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Fe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,me.BLACK,null,null))}remove(e){return new Fe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,me.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fs(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Fs(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Fs(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Fs(this.root_,null,this.comparator_,!0,e)}}Fe.EMPTY_NODE=new ZT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(n,e){return Zn(n.name,e.name)}function fl(n,e){return Zn(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ua;function tw(n){ua=n}const tp=function(n){return typeof n=="number"?"number:"+Nf(n):"string:"+n},np=function(n){if(n.isLeafNode()){const e=n.val();b(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Et(e,".sv"),"Priority must be a string or number.")}else b(n===ua||n.isEmpty(),"priority of unexpected type.");b(n===ua||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hh;class _e{constructor(e,t=_e.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,b(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),np(this.priorityNode_)}static set __childrenNodeConstructor(e){hh=e}static get __childrenNodeConstructor(){return hh}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new _e(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:_e.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return j(e)?this:W(e)===".priority"?this.priorityNode_:_e.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:_e.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=W(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(b(i!==".priority"||qt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,_e.__childrenNodeConstructor.EMPTY_NODE.updateChild(ne(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+tp(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Nf(this.value_):e+=this.value_,this.lazyHash_=Pf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===_e.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof _e.__childrenNodeConstructor?-1:(b(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=_e.VALUE_TYPE_ORDER.indexOf(t),r=_e.VALUE_TYPE_ORDER.indexOf(i);return b(s>=0,"Unknown leaf type: "+t),b(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}_e.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ip,sp;function nw(n){ip=n}function iw(n){sp=n}class sw extends Fr{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Zn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return q.MIN}maxPost(){return new q(hn,new _e("[PRIORITY-POST]",sp))}makePost(e,t){const i=ip(e);return new q(t,new _e("[PRIORITY-POST]",i))}toString(){return".priority"}}const le=new sw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rw=Math.log(2);class ow{constructor(e){const t=r=>parseInt(Math.log(r)/rw,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const hr=function(n,e,t,i){n.sort(e);const s=function(c,h){const f=h-c;let _,m;if(f===0)return null;if(f===1)return _=n[c],m=t?t(_):_,new me(m,_.node,me.BLACK,null,null);{const A=parseInt(f/2,10)+c,S=s(c,A),O=s(A+1,h);return _=n[A],m=t?t(_):_,new me(m,_.node,me.BLACK,S,O)}},r=function(c){let h=null,f=null,_=n.length;const m=function(S,O){const N=_-S,Q=_;_-=S;const J=s(N+1,Q),Z=n[N],re=t?t(Z):Z;A(new me(re,Z.node,O,null,J))},A=function(S){h?(h.left=S,h=S):(f=S,h=S)};for(let S=0;S<c.count;++S){const O=c.nextBitIsOne(),N=Math.pow(2,c.count-(S+1));O?m(N,me.BLACK):(m(N,me.BLACK),m(N,me.RED))}return f},a=new ow(n.length),l=r(a);return new Fe(i||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let No;const Tn={};class ht{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return b(Tn&&le,"ChildrenNode.ts has not been loaded"),No=No||new ht({".priority":Tn},{".priority":le}),No}get(e){const t=xn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Fe?t:null}hasIndex(e){return Et(this.indexSet_,e.toString())}addIndex(e,t){b(e!==Ln,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(q.Wrap);let a=r.getNext();for(;a;)s=s||e.isDefinedOn(a.node),i.push(a),a=r.getNext();let l;s?l=hr(i,e.getCompare()):l=Tn;const c=e.toString(),h=Object.assign({},this.indexSet_);h[c]=e;const f=Object.assign({},this.indexes_);return f[c]=l,new ht(f,h)}addToIndexes(e,t){const i=Qs(this.indexes_,(s,r)=>{const a=xn(this.indexSet_,r);if(b(a,"Missing index implementation for "+r),s===Tn)if(a.isDefinedOn(e.node)){const l=[],c=t.getIterator(q.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&l.push(h),h=c.getNext();return l.push(e),hr(l,a.getCompare())}else return Tn;else{const l=t.get(e.name);let c=s;return l&&(c=c.remove(new q(e.name,l))),c.insert(e,e.node)}});return new ht(i,this.indexSet_)}removeFromIndexes(e,t){const i=Qs(this.indexes_,s=>{if(s===Tn)return s;{const r=t.get(e.name);return r?s.remove(new q(e.name,r)):s}});return new ht(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii;class F{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&np(this.priorityNode_),this.children_.isEmpty()&&b(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ii||(Ii=new F(new Fe(fl),null,ht.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ii}updatePriority(e){return this.children_.isEmpty()?this:new F(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Ii:t}}getChild(e){const t=W(e);return t===null?this:this.getImmediateChild(t).getChild(ne(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(b(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new q(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?Ii:this.priorityNode_;return new F(s,a,r)}}updateChild(e,t){const i=W(e);if(i===null)return t;{b(W(e)!==".priority"||qt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(ne(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(le,(a,l)=>{t[a]=l.val(e),i++,r&&F.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):r=!1}),!e&&r&&s<2*i){const a=[];for(const l in t)a[l]=t[l];return a}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+tp(this.getPriority().val())+":"),this.forEachChild(le,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Pf(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new q(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new q(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new q(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,q.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,q.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===us?-1:0}withIndex(e){if(e===Ln||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new F(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ln||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(le),s=t.getIterator(le);let r=i.getNext(),a=s.getNext();for(;r&&a;){if(r.name!==a.name||!r.node.equals(a.node))return!1;r=i.getNext(),a=s.getNext()}return r===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===Ln?null:this.indexMap_.get(e.toString())}}F.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class aw extends F{constructor(){super(new Fe(fl),F.EMPTY_NODE,ht.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return F.EMPTY_NODE}isEmpty(){return!1}}const us=new aw;Object.defineProperties(q,{MIN:{value:new q(Hn,F.EMPTY_NODE)},MAX:{value:new q(hn,us)}});ep.__EMPTY_NODE=F.EMPTY_NODE;_e.__childrenNodeConstructor=F;tw(us);iw(us);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw=!0;function Ne(n,e=null){if(n===null)return F.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),b(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new _e(t,Ne(e))}if(!(n instanceof Array)&&lw){const t=[];let i=!1;if(Be(n,(a,l)=>{if(a.substring(0,1)!=="."){const c=Ne(l);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new q(a,c)))}}),t.length===0)return F.EMPTY_NODE;const r=hr(t,ew,a=>a.name,fl);if(i){const a=hr(t,le.getCompare());return new F(r,Ne(e),new ht({".priority":a},{".priority":le}))}else return new F(r,Ne(e),ht.Default)}else{let t=F.EMPTY_NODE;return Be(n,(i,s)=>{if(Et(n,i)&&i.substring(0,1)!=="."){const r=Ne(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ne(e))}}nw(Ne);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw extends Fr{constructor(e){super(),this.indexPath_=e,b(!j(e)&&W(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Zn(e.name,t.name):r}makePost(e,t){const i=Ne(e),s=F.EMPTY_NODE.updateChild(this.indexPath_,i);return new q(t,s)}maxPost(){const e=F.EMPTY_NODE.updateChild(this.indexPath_,us);return new q(hn,e)}toString(){return Xf(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw extends Fr{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Zn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return q.MIN}maxPost(){return q.MAX}makePost(e,t){const i=Ne(e);return new q(t,i)}toString(){return".value"}}const hw=new uw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(n){return{type:"value",snapshotNode:n}}function $n(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Gi(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Ki(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function dw(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.index_=e}updateChild(e,t,i,s,r,a){b(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(a!=null&&(i.isEmpty()?e.hasChild(t)?a.trackChildChange(Gi(t,l)):b(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?a.trackChildChange($n(t,i)):a.trackChildChange(Ki(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(le,(s,r)=>{t.hasChild(s)||i.trackChildChange(Gi(s,r))}),t.isLeafNode()||t.forEachChild(le,(s,r)=>{if(e.hasChild(s)){const a=e.getImmediateChild(s);a.equals(r)||i.trackChildChange(Ki(s,r,a))}else i.trackChildChange($n(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?F.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e){this.indexedFilter_=new pl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Qi.getStartPost_(e),this.endPost_=Qi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,a){return this.matches(new q(t,i))||(i=F.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,a)}updateFullNode(e,t,i){t.isLeafNode()&&(t=F.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(F.EMPTY_NODE);const r=this;return t.forEachChild(le,(a,l)=>{r.matches(new q(a,l))||(s=s.updateImmediateChild(a,F.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Qi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,a){return this.rangedFilter_.matches(new q(t,i))||(i=F.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,a):this.fullLimitUpdateChild_(e,t,i,r,a)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=F.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=F.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;r.hasNext()&&a<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),a++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(F.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let a=0;for(;r.hasNext();){const l=r.getNext();a<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?a++:s=s.updateImmediateChild(l.name,F.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let a;if(this.reverse_){const _=this.index_.getCompare();a=(m,A)=>_(A,m)}else a=this.index_.getCompare();const l=e;b(l.numChildren()===this.limit_,"");const c=new q(t,i),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(c);if(l.hasChild(t)){const _=l.getImmediateChild(t);let m=s.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const A=m==null?1:a(m,c);if(f&&!i.isEmpty()&&A>=0)return r!=null&&r.trackChildChange(Ki(t,i,_)),l.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Gi(t,_));const O=l.updateImmediateChild(t,F.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange($n(m.name,m.node)),O.updateImmediateChild(m.name,m.node)):O}}else return i.isEmpty()?e:f&&a(h,c)>=0?(r!=null&&(r.trackChildChange(Gi(h.name,h.node)),r.trackChildChange($n(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(h.name,F.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=le}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return b(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return b(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Hn}hasEnd(){return this.endSet_}getIndexEndValue(){return b(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return b(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:hn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return b(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===le}copy(){const e=new _l;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function pw(n){return n.loadsAllData()?new pl(n.getIndex()):n.hasLimit()?new fw(n):new Qi(n)}function dh(n){const e={};if(n.isDefault())return e;let t;if(n.index_===le?t="$priority":n.index_===hw?t="$value":n.index_===Ln?t="$key":(b(n.index_ instanceof cw,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=ye(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=ye(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+ye(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=ye(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+ye(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function fh(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==le&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr extends Kf{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ls("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(b(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const a=dr.getListenId_(e,i),l={};this.listens_[a]=l;const c=dh(e._queryParams);this.restRequest_(r+".json",c,(h,f)=>{let _=f;if(h===404&&(_=null,h=null),h===null&&this.onDataUpdate_(r,_,!1,i),xn(this.listens_,a)===l){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",s(m,null)}})}unlisten(e,t){const i=dr.getListenId_(e,t);delete this.listens_[i]}get(e){const t=dh(e._queryParams),i=e._path.toString(),s=new Ta;return this.restRequest_(i+".json",t,(r,a)=>{let l=a;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kn(t);this.log_("Sending REST request for "+a);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+a+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=Fi(l.responseText)}catch{We("Failed to parse JSON response for "+a+": "+l.responseText)}i(null,c)}else l.status!==401&&l.status!==404&&We("Got unsuccessful REST response for "+a+" Status: "+l.status),i(l.status);i=null}},l.open("GET",a,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(){this.rootNode_=F.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(){return{value:null,children:new Map}}function op(n,e,t){if(j(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=W(e);n.children.has(i)||n.children.set(i,fr());const s=n.children.get(i);e=ne(e),op(s,e,t)}}function ha(n,e,t){n.value!==null?t(e,n.value):gw(n,(i,s)=>{const r=new te(e.toString()+"/"+i);ha(s,r,t)})}function gw(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Be(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=10*1e3,yw=30*1e3,vw=5*60*1e3;class Ew{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new mw(e);const i=ph+(yw-ph)*Math.random();Li(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Be(e,(s,r)=>{r>0&&Et(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Li(this.reportStats_.bind(this),Math.floor(Math.random()*2*vw))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Qe||(Qe={}));function ap(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function gl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ml(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Qe.ACK_USER_WRITE,this.source=ap()}operationForChild(e){if(j(this.path)){if(this.affectedTree.value!=null)return b(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new te(e));return new pr(X(),t,this.revert)}}else return b(W(this.path)===e,"operationForChild called for unrelated child."),new pr(ne(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t){this.source=e,this.path=t,this.type=Qe.LISTEN_COMPLETE}operationForChild(e){return j(this.path)?new Yi(this.source,X()):new Yi(this.source,ne(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Qe.OVERWRITE}operationForChild(e){return j(this.path)?new dn(this.source,X(),this.snap.getImmediateChild(e)):new dn(this.source,ne(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Qe.MERGE}operationForChild(e){if(j(this.path)){const t=this.children.subtree(new te(e));return t.isEmpty()?null:t.value?new dn(this.source,X(),t.value):new Xi(this.source,X(),t)}else return b(W(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Xi(this.source,ne(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(j(e))return this.isFullyInitialized()&&!this.filtered_;const t=W(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Tw(n,e,t,i){const s=[],r=[];return e.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&r.push(dw(a.childName,a.snapshotNode))}),Ti(n,s,"child_removed",e,i,t),Ti(n,s,"child_added",e,i,t),Ti(n,s,"child_moved",r,i,t),Ti(n,s,"child_changed",e,i,t),Ti(n,s,"value",e,i,t),s}function Ti(n,e,t,i,s,r){const a=i.filter(l=>l.type===t);a.sort((l,c)=>Cw(n,l,c)),a.forEach(l=>{const c=ww(n,l,r);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(c,n.query_))})})}function ww(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Cw(n,e,t){if(e.childName==null||t.childName==null)throw Gn("Should only compare child_ events.");const i=new q(e.childName,e.snapshotNode),s=new q(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n,e){return{eventCache:n,serverCache:e}}function Mi(n,e,t,i){return Ur(new fn(e,t,i),n.serverCache)}function lp(n,e,t,i){return Ur(n.eventCache,new fn(e,t,i))}function da(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function pn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do;const Aw=()=>(Do||(Do=new Fe(uT)),Do);class se{constructor(e,t=Aw()){this.value=e,this.children=t}static fromObject(e){let t=new se(null);return Be(e,(i,s)=>{t=t.set(new te(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:X(),value:this.value};if(j(e))return null;{const i=W(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(ne(e),t);return r!=null?{path:pe(new te(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(j(e))return this;{const t=W(e),i=this.children.get(t);return i!==null?i.subtree(ne(e)):new se(null)}}set(e,t){if(j(e))return new se(t,this.children);{const i=W(e),r=(this.children.get(i)||new se(null)).set(ne(e),t),a=this.children.insert(i,r);return new se(this.value,a)}}remove(e){if(j(e))return this.children.isEmpty()?new se(null):new se(null,this.children);{const t=W(e),i=this.children.get(t);if(i){const s=i.remove(ne(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new se(null):new se(this.value,r)}else return this}}get(e){if(j(e))return this.value;{const t=W(e),i=this.children.get(t);return i?i.get(ne(e)):null}}setTree(e,t){if(j(e))return t;{const i=W(e),r=(this.children.get(i)||new se(null)).setTree(ne(e),t);let a;return r.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,r),new se(this.value,a)}}fold(e){return this.fold_(X(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(pe(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,X(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(j(e))return null;{const r=W(e),a=this.children.get(r);return a?a.findOnPath_(ne(e),pe(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,X(),t)}foreachOnPath_(e,t,i){if(j(e))return this;{this.value&&i(t,this.value);const s=W(e),r=this.children.get(s);return r?r.foreachOnPath_(ne(e),pe(t,s),i):new se(null)}}foreach(e){this.foreach_(X(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(pe(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.writeTree_=e}static empty(){return new Xe(new se(null))}}function xi(n,e,t){if(j(e))return new Xe(new se(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const a=Ve(s,e);return r=r.updateChild(a,t),new Xe(n.writeTree_.set(s,r))}else{const s=new se(t),r=n.writeTree_.setTree(e,s);return new Xe(r)}}}function _h(n,e,t){let i=n;return Be(t,(s,r)=>{i=xi(i,pe(e,s),r)}),i}function gh(n,e){if(j(e))return Xe.empty();{const t=n.writeTree_.setTree(e,new se(null));return new Xe(t)}}function fa(n,e){return gn(n,e)!=null}function gn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ve(t.path,e)):null}function mh(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(le,(i,s)=>{e.push(new q(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new q(i,s.value))}),e}function xt(n,e){if(j(e))return n;{const t=gn(n,e);return t!=null?new Xe(new se(t)):new Xe(n.writeTree_.subtree(e))}}function pa(n){return n.writeTree_.isEmpty()}function zn(n,e){return cp(X(),n.writeTree_,e)}function cp(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(b(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=cp(pe(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(pe(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(n,e){return fp(e,n)}function Rw(n,e,t,i,s){b(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=xi(n.visibleWrites,e,t)),n.lastWriteId=i}function Sw(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Pw(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);b(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const l=n.allWrites[a];l.visible&&(a>=t&&bw(l,i.path)?s=!1:Ke(i.path,l.path)&&(r=!0)),a--}if(s){if(r)return kw(n),!0;if(i.snap)n.visibleWrites=gh(n.visibleWrites,i.path);else{const l=i.children;Be(l,c=>{n.visibleWrites=gh(n.visibleWrites,pe(i.path,c))})}return!0}else return!1}function bw(n,e){if(n.snap)return Ke(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ke(pe(n.path,t),e))return!0;return!1}function kw(n){n.visibleWrites=up(n.allWrites,Nw,X()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Nw(n){return n.visible}function up(n,e,t){let i=Xe.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const a=r.path;let l;if(r.snap)Ke(t,a)?(l=Ve(t,a),i=xi(i,l,r.snap)):Ke(a,t)&&(l=Ve(a,t),i=xi(i,X(),r.snap.getChild(l)));else if(r.children){if(Ke(t,a))l=Ve(t,a),i=_h(i,l,r.children);else if(Ke(a,t))if(l=Ve(a,t),j(l))i=_h(i,X(),r.children);else{const c=xn(r.children,W(l));if(c){const h=c.getChild(ne(l));i=xi(i,X(),h)}}}else throw Gn("WriteRecord should have .snap or .children")}}return i}function hp(n,e,t,i,s){if(!i&&!s){const r=gn(n.visibleWrites,e);if(r!=null)return r;{const a=xt(n.visibleWrites,e);if(pa(a))return t;if(t==null&&!fa(a,X()))return null;{const l=t||F.EMPTY_NODE;return zn(a,l)}}}else{const r=xt(n.visibleWrites,e);if(!s&&pa(r))return t;if(!s&&t==null&&!fa(r,X()))return null;{const a=function(h){return(h.visible||s)&&(!i||!~i.indexOf(h.writeId))&&(Ke(h.path,e)||Ke(e,h.path))},l=up(n.allWrites,a,e),c=t||F.EMPTY_NODE;return zn(l,c)}}}function Dw(n,e,t){let i=F.EMPTY_NODE;const s=gn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(le,(r,a)=>{i=i.updateImmediateChild(r,a)}),i;if(t){const r=xt(n.visibleWrites,e);return t.forEachChild(le,(a,l)=>{const c=zn(xt(r,new te(a)),l);i=i.updateImmediateChild(a,c)}),mh(r).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const r=xt(n.visibleWrites,e);return mh(r).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function Ow(n,e,t,i,s){b(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=pe(e,t);if(fa(n.visibleWrites,r))return null;{const a=xt(n.visibleWrites,r);return pa(a)?s.getChild(t):zn(a,s.getChild(t))}}function Lw(n,e,t,i){const s=pe(e,t),r=gn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const a=xt(n.visibleWrites,s);return zn(a,i.getNode().getImmediateChild(t))}else return null}function Mw(n,e){return gn(n.visibleWrites,e)}function xw(n,e,t,i,s,r,a){let l;const c=xt(n.visibleWrites,e),h=gn(c,X());if(h!=null)l=h;else if(t!=null)l=zn(c,t);else return[];if(l=l.withIndex(a),!l.isEmpty()&&!l.isLeafNode()){const f=[],_=a.getCompare(),m=r?l.getReverseIteratorFrom(i,a):l.getIteratorFrom(i,a);let A=m.getNext();for(;A&&f.length<s;)_(A,i)!==0&&f.push(A),A=m.getNext();return f}else return[]}function Vw(){return{visibleWrites:Xe.empty(),allWrites:[],lastWriteId:-1}}function _r(n,e,t,i){return hp(n.writeTree,n.treePath,e,t,i)}function vl(n,e){return Dw(n.writeTree,n.treePath,e)}function yh(n,e,t,i){return Ow(n.writeTree,n.treePath,e,t,i)}function gr(n,e){return Mw(n.writeTree,pe(n.treePath,e))}function Fw(n,e,t,i,s,r){return xw(n.writeTree,n.treePath,e,t,i,s,r)}function El(n,e,t){return Lw(n.writeTree,n.treePath,e,t)}function dp(n,e){return fp(pe(n.treePath,e),n.writeTree)}function fp(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;b(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),b(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Ki(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Gi(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,$n(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ki(i,e.snapshotNode,s.oldSnap));else throw Gn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const pp=new Bw;class Il{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new fn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return El(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:pn(this.viewCache_),r=Fw(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qw(n){return{filter:n}}function Ww(n,e){b(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),b(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function jw(n,e,t,i,s){const r=new Uw;let a,l;if(t.type===Qe.OVERWRITE){const h=t;h.source.fromUser?a=_a(n,e,h.path,h.snap,i,s,r):(b(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!j(h.path),a=mr(n,e,h.path,h.snap,i,s,l,r))}else if(t.type===Qe.MERGE){const h=t;h.source.fromUser?a=$w(n,e,h.path,h.children,i,s,r):(b(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),a=ga(n,e,h.path,h.children,i,s,l,r))}else if(t.type===Qe.ACK_USER_WRITE){const h=t;h.revert?a=Kw(n,e,h.path,i,s,r):a=zw(n,e,h.path,h.affectedTree,i,s,r)}else if(t.type===Qe.LISTEN_COMPLETE)a=Gw(n,e,t.path,i,r);else throw Gn("Unknown operation type: "+t.type);const c=r.getChanges();return Hw(e,a,c),{viewCache:a,changes:c}}function Hw(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=da(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(rp(da(e)))}}function _p(n,e,t,i,s,r){const a=e.eventCache;if(gr(i,t)!=null)return e;{let l,c;if(j(t))if(b(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=pn(e),f=h instanceof F?h:F.EMPTY_NODE,_=vl(i,f);l=n.filter.updateFullNode(e.eventCache.getNode(),_,r)}else{const h=_r(i,pn(e));l=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=W(t);if(h===".priority"){b(qt(t)===1,"Can't have a priority with additional path components");const f=a.getNode();c=e.serverCache.getNode();const _=yh(i,t,f,c);_!=null?l=n.filter.updatePriority(f,_):l=a.getNode()}else{const f=ne(t);let _;if(a.isCompleteForChild(h)){c=e.serverCache.getNode();const m=yh(i,t,a.getNode(),c);m!=null?_=a.getNode().getImmediateChild(h).updateChild(f,m):_=a.getNode().getImmediateChild(h)}else _=El(i,h,e.serverCache);_!=null?l=n.filter.updateChild(a.getNode(),h,_,f,s,r):l=a.getNode()}}return Mi(e,l,a.isFullyInitialized()||j(t),n.filter.filtersNodes())}}function mr(n,e,t,i,s,r,a,l){const c=e.serverCache;let h;const f=a?n.filter:n.filter.getIndexedFilter();if(j(t))h=f.updateFullNode(c.getNode(),i,null);else if(f.filtersNodes()&&!c.isFiltered()){const A=c.getNode().updateChild(t,i);h=f.updateFullNode(c.getNode(),A,null)}else{const A=W(t);if(!c.isCompleteForPath(t)&&qt(t)>1)return e;const S=ne(t),N=c.getNode().getImmediateChild(A).updateChild(S,i);A===".priority"?h=f.updatePriority(c.getNode(),N):h=f.updateChild(c.getNode(),A,N,S,pp,null)}const _=lp(e,h,c.isFullyInitialized()||j(t),f.filtersNodes()),m=new Il(s,_,r);return _p(n,_,t,s,m,l)}function _a(n,e,t,i,s,r,a){const l=e.eventCache;let c,h;const f=new Il(s,e,r);if(j(t))h=n.filter.updateFullNode(e.eventCache.getNode(),i,a),c=Mi(e,h,!0,n.filter.filtersNodes());else{const _=W(t);if(_===".priority")h=n.filter.updatePriority(e.eventCache.getNode(),i),c=Mi(e,h,l.isFullyInitialized(),l.isFiltered());else{const m=ne(t),A=l.getNode().getImmediateChild(_);let S;if(j(m))S=i;else{const O=f.getCompleteChild(_);O!=null?Yf(m)===".priority"&&O.getChild(Jf(m)).isEmpty()?S=O:S=O.updateChild(m,i):S=F.EMPTY_NODE}if(A.equals(S))c=e;else{const O=n.filter.updateChild(l.getNode(),_,S,m,f,a);c=Mi(e,O,l.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function vh(n,e){return n.eventCache.isCompleteForChild(e)}function $w(n,e,t,i,s,r,a){let l=e;return i.foreach((c,h)=>{const f=pe(t,c);vh(e,W(f))&&(l=_a(n,l,f,h,s,r,a))}),i.foreach((c,h)=>{const f=pe(t,c);vh(e,W(f))||(l=_a(n,l,f,h,s,r,a))}),l}function Eh(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function ga(n,e,t,i,s,r,a,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;j(t)?h=i:h=new se(null).setTree(t,i);const f=e.serverCache.getNode();return h.children.inorderTraversal((_,m)=>{if(f.hasChild(_)){const A=e.serverCache.getNode().getImmediateChild(_),S=Eh(n,A,m);c=mr(n,c,new te(_),S,s,r,a,l)}}),h.children.inorderTraversal((_,m)=>{const A=!e.serverCache.isCompleteForChild(_)&&m.value===null;if(!f.hasChild(_)&&!A){const S=e.serverCache.getNode().getImmediateChild(_),O=Eh(n,S,m);c=mr(n,c,new te(_),O,s,r,a,l)}}),c}function zw(n,e,t,i,s,r,a){if(gr(s,t)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(j(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return mr(n,e,t,c.getNode().getChild(t),s,r,l,a);if(j(t)){let h=new se(null);return c.getNode().forEachChild(Ln,(f,_)=>{h=h.set(new te(f),_)}),ga(n,e,t,h,s,r,l,a)}else return e}else{let h=new se(null);return i.foreach((f,_)=>{const m=pe(t,f);c.isCompleteForPath(m)&&(h=h.set(f,c.getNode().getChild(m)))}),ga(n,e,t,h,s,r,l,a)}}function Gw(n,e,t,i,s){const r=e.serverCache,a=lp(e,r.getNode(),r.isFullyInitialized()||j(t),r.isFiltered());return _p(n,a,t,i,pp,s)}function Kw(n,e,t,i,s,r){let a;if(gr(i,t)!=null)return e;{const l=new Il(i,e,s),c=e.eventCache.getNode();let h;if(j(t)||W(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=_r(i,pn(e));else{const _=e.serverCache.getNode();b(_ instanceof F,"serverChildren would be complete if leaf node"),f=vl(i,_)}f=f,h=n.filter.updateFullNode(c,f,r)}else{const f=W(t);let _=El(i,f,e.serverCache);_==null&&e.serverCache.isCompleteForChild(f)&&(_=c.getImmediateChild(f)),_!=null?h=n.filter.updateChild(c,f,_,ne(t),l,r):e.eventCache.getNode().hasChild(f)?h=n.filter.updateChild(c,f,F.EMPTY_NODE,ne(t),l,r):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=_r(i,pn(e)),a.isLeafNode()&&(h=n.filter.updateFullNode(h,a,r)))}return a=e.serverCache.isFullyInitialized()||gr(i,X())!=null,Mi(e,h,a,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new pl(i.getIndex()),r=pw(i);this.processor_=qw(r);const a=t.serverCache,l=t.eventCache,c=s.updateFullNode(F.EMPTY_NODE,a.getNode(),null),h=r.updateFullNode(F.EMPTY_NODE,l.getNode(),null),f=new fn(c,a.isFullyInitialized(),s.filtersNodes()),_=new fn(h,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ur(_,f),this.eventGenerator_=new Iw(this.query_)}get query(){return this.query_}}function Yw(n){return n.viewCache_.serverCache.getNode()}function Xw(n,e){const t=pn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!j(e)&&!t.getImmediateChild(W(e)).isEmpty())?t.getChild(e):null}function Ih(n){return n.eventRegistrations_.length===0}function Jw(n,e){n.eventRegistrations_.push(e)}function Th(n,e,t){const i=[];if(t){b(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const a=r.createCancelEvent(t,s);a&&i.push(a)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const a=n.eventRegistrations_[r];if(!a.matches(e))s.push(a);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function wh(n,e,t,i){e.type===Qe.MERGE&&e.source.queryId!==null&&(b(pn(n.viewCache_),"We should always have a full cache before handling merges"),b(da(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=jw(n.processor_,s,e,t,i);return Ww(n.processor_,r.viewCache),b(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,gp(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Zw(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(le,(r,a)=>{i.push($n(r,a))}),t.isFullyInitialized()&&i.push(rp(t.getNode())),gp(n,i,t.getNode(),e)}function gp(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Tw(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr;class eC{constructor(){this.views=new Map}}function tC(n){b(!yr,"__referenceConstructor has already been defined"),yr=n}function nC(){return b(yr,"Reference.ts has not been loaded"),yr}function iC(n){return n.views.size===0}function Tl(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return b(r!=null,"SyncTree gave us an op for an invalid query."),wh(r,e,t,i)}else{let r=[];for(const a of n.views.values())r=r.concat(wh(a,e,t,i));return r}}function sC(n,e,t,i,s){const r=e._queryIdentifier,a=n.views.get(r);if(!a){let l=_r(t,s?i:null),c=!1;l?c=!0:i instanceof F?(l=vl(t,i),c=!1):(l=F.EMPTY_NODE,c=!1);const h=Ur(new fn(l,c,!1),new fn(i,s,!1));return new Qw(e,h)}return a}function rC(n,e,t,i,s,r){const a=sC(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,a),Jw(a,t),Zw(a,t)}function oC(n,e,t,i){const s=e._queryIdentifier,r=[];let a=[];const l=Wt(n);if(s==="default")for(const[c,h]of n.views.entries())a=a.concat(Th(h,t,i)),Ih(h)&&(n.views.delete(c),h.query._queryParams.loadsAllData()||r.push(h.query));else{const c=n.views.get(s);c&&(a=a.concat(Th(c,t,i)),Ih(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return l&&!Wt(n)&&r.push(new(nC())(e._repo,e._path)),{removed:r,events:a}}function mp(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Mn(n,e){let t=null;for(const i of n.views.values())t=t||Xw(i,e);return t}function yp(n,e){if(e._queryParams.loadsAllData())return Br(n);{const i=e._queryIdentifier;return n.views.get(i)}}function vp(n,e){return yp(n,e)!=null}function Wt(n){return Br(n)!=null}function Br(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vr;function aC(n){b(!vr,"__referenceConstructor has already been defined"),vr=n}function lC(){return b(vr,"Reference.ts has not been loaded"),vr}let cC=1;class Ch{constructor(e){this.listenProvider_=e,this.syncPointTree_=new se(null),this.pendingWriteTree_=Vw(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function uC(n,e,t,i,s){return Rw(n.pendingWriteTree_,e,t,i,s),s?hs(n,new dn(ap(),e,t)):[]}function Sn(n,e,t=!1){const i=Sw(n.pendingWriteTree_,e);if(Pw(n.pendingWriteTree_,e)){let r=new se(null);return i.snap!=null?r=r.set(X(),!0):Be(i.children,a=>{r=r.set(new te(a),!0)}),hs(n,new pr(i.path,r,t))}else return[]}function qr(n,e,t){return hs(n,new dn(gl(),e,t))}function hC(n,e,t){const i=se.fromObject(t);return hs(n,new Xi(gl(),e,i))}function dC(n,e){return hs(n,new Yi(gl(),e))}function fC(n,e,t){const i=wl(n,t);if(i){const s=Cl(i),r=s.path,a=s.queryId,l=Ve(r,e),c=new Yi(ml(a),l);return Al(n,r,c)}else return[]}function ma(n,e,t,i,s=!1){const r=e._path,a=n.syncPointTree_.get(r);let l=[];if(a&&(e._queryIdentifier==="default"||vp(a,e))){const c=oC(a,e,t,i);iC(a)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const h=c.removed;if(l=c.events,!s){const f=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,_=n.syncPointTree_.findOnPath(r,(m,A)=>Wt(A));if(f&&!_){const m=n.syncPointTree_.subtree(r);if(!m.isEmpty()){const A=gC(m);for(let S=0;S<A.length;++S){const O=A[S],N=O.query,Q=wp(n,O);n.listenProvider_.startListening(Vi(N),Er(n,N),Q.hashFn,Q.onComplete)}}}!_&&h.length>0&&!i&&(f?n.listenProvider_.stopListening(Vi(e),null):h.forEach(m=>{const A=n.queryToTagMap.get(Wr(m));n.listenProvider_.stopListening(Vi(m),A)}))}mC(n,h)}return l}function pC(n,e,t,i){const s=wl(n,i);if(s!=null){const r=Cl(s),a=r.path,l=r.queryId,c=Ve(a,e),h=new dn(ml(l),c,t);return Al(n,a,h)}else return[]}function _C(n,e,t,i){const s=wl(n,i);if(s){const r=Cl(s),a=r.path,l=r.queryId,c=Ve(a,e),h=se.fromObject(t),f=new Xi(ml(l),c,h);return Al(n,a,f)}else return[]}function Ah(n,e,t,i=!1){const s=e._path;let r=null,a=!1;n.syncPointTree_.foreachOnPath(s,(m,A)=>{const S=Ve(m,s);r=r||Mn(A,S),a=a||Wt(A)});let l=n.syncPointTree_.get(s);l?(a=a||Wt(l),r=r||Mn(l,X())):(l=new eC,n.syncPointTree_=n.syncPointTree_.set(s,l));let c;r!=null?c=!0:(c=!1,r=F.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((A,S)=>{const O=Mn(S,X());O&&(r=r.updateImmediateChild(A,O))}));const h=vp(l,e);if(!h&&!e._queryParams.loadsAllData()){const m=Wr(e);b(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const A=yC();n.queryToTagMap.set(m,A),n.tagToQueryMap.set(A,m)}const f=yl(n.pendingWriteTree_,s);let _=rC(l,e,t,f,r,c);if(!h&&!a&&!i){const m=yp(l,e);_=_.concat(vC(n,e,m))}return _}function Ep(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(a,l)=>{const c=Ve(a,e),h=Mn(l,c);if(h)return h});return hp(s,e,r,t,!0)}function hs(n,e){return Ip(e,n.syncPointTree_,null,yl(n.pendingWriteTree_,X()))}function Ip(n,e,t,i){if(j(n.path))return Tp(n,e,t,i);{const s=e.get(X());t==null&&s!=null&&(t=Mn(s,X()));let r=[];const a=W(n.path),l=n.operationForChild(a),c=e.children.get(a);if(c&&l){const h=t?t.getImmediateChild(a):null,f=dp(i,a);r=r.concat(Ip(l,c,h,f))}return s&&(r=r.concat(Tl(s,n,i,t))),r}}function Tp(n,e,t,i){const s=e.get(X());t==null&&s!=null&&(t=Mn(s,X()));let r=[];return e.children.inorderTraversal((a,l)=>{const c=t?t.getImmediateChild(a):null,h=dp(i,a),f=n.operationForChild(a);f&&(r=r.concat(Tp(f,l,c,h)))}),s&&(r=r.concat(Tl(s,n,i,t))),r}function wp(n,e){const t=e.query,i=Er(n,t);return{hashFn:()=>(Yw(e)||F.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?fC(n,t._path,i):dC(n,t._path);{const r=fT(s,t);return ma(n,t,null,r)}}}}function Er(n,e){const t=Wr(e);return n.queryToTagMap.get(t)}function Wr(n){return n._path.toString()+"$"+n._queryIdentifier}function wl(n,e){return n.tagToQueryMap.get(e)}function Cl(n){const e=n.indexOf("$");return b(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new te(n.substr(0,e))}}function Al(n,e,t){const i=n.syncPointTree_.get(e);b(i,"Missing sync point for query tag that we're tracking");const s=yl(n.pendingWriteTree_,e);return Tl(i,t,s,null)}function gC(n){return n.fold((e,t,i)=>{if(t&&Wt(t))return[Br(t)];{let s=[];return t&&(s=mp(t)),Be(i,(r,a)=>{s=s.concat(a)}),s}})}function Vi(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(lC())(n._repo,n._path):n}function mC(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Wr(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function yC(){return cC++}function vC(n,e,t){const i=e._path,s=Er(n,e),r=wp(n,t),a=n.listenProvider_.startListening(Vi(e),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)b(!Wt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((h,f,_)=>{if(!j(h)&&f&&Wt(f))return[Br(f).query];{let m=[];return f&&(m=m.concat(mp(f).map(A=>A.query))),Be(_,(A,S)=>{m=m.concat(S)}),m}});for(let h=0;h<c.length;++h){const f=c[h];n.listenProvider_.stopListening(Vi(f),Er(n,f))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Rl(t)}node(){return this.node_}}class Sl{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=pe(this.path_,e);return new Sl(this.syncTree_,t)}node(){return Ep(this.syncTree_,this.path_)}}const EC=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Rh=function(n,e,t){if(!n||typeof n!="object")return n;if(b(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return IC(n[".sv"],e,t);if(typeof n[".sv"]=="object")return TC(n[".sv"],e);b(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},IC=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:b(!1,"Unexpected server value: "+n)}},TC=function(n,e,t){n.hasOwnProperty("increment")||b(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&b(!1,"Unexpected increment value: "+i);const s=e.node();if(b(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},wC=function(n,e,t,i){return Pl(e,new Sl(t,n),i)},CC=function(n,e,t){return Pl(n,new Rl(e),t)};function Pl(n,e,t){const i=n.getPriority().val(),s=Rh(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const a=n,l=Rh(a.getValue(),e,t);return l!==a.getValue()||s!==a.getPriority().val()?new _e(l,Ne(s)):n}else{const a=n;return r=a,s!==a.getPriority().val()&&(r=r.updatePriority(new _e(s))),a.forEachChild(le,(l,c)=>{const h=Pl(c,e.getImmediateChild(l),t);h!==c&&(r=r.updateImmediateChild(l,h))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function kl(n,e){let t=e instanceof te?e:new te(e),i=n,s=W(t);for(;s!==null;){const r=xn(i.node.children,s)||{children:{},childCount:0};i=new bl(s,i,r),t=ne(t),s=W(t)}return i}function ei(n){return n.node.value}function Cp(n,e){n.node.value=e,ya(n)}function Ap(n){return n.node.childCount>0}function AC(n){return ei(n)===void 0&&!Ap(n)}function jr(n,e){Be(n.node.children,(t,i)=>{e(new bl(t,n,i))})}function Rp(n,e,t,i){t&&e(n),jr(n,s=>{Rp(s,e,!0)})}function RC(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ds(n){return new te(n.parent===null?n.name:ds(n.parent)+"/"+n.name)}function ya(n){n.parent!==null&&SC(n.parent,n.name,n)}function SC(n,e,t){const i=AC(t),s=Et(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,ya(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,ya(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PC=/[\[\].#$\/\u0000-\u001F\u007F]/,bC=/[\[\].#$\u0000-\u001F\u007F]/,Oo=10*1024*1024,Sp=function(n){return typeof n=="string"&&n.length!==0&&!PC.test(n)},Pp=function(n){return typeof n=="string"&&n.length!==0&&!bC.test(n)},kC=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Pp(n)},bp=function(n,e,t){const i=t instanceof te?new zT(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Xt(i));if(typeof e=="function")throw new Error(n+"contains a function "+Xt(i)+" with contents = "+e.toString());if(bf(e))throw new Error(n+"contains "+e.toString()+" "+Xt(i));if(typeof e=="string"&&e.length>Oo/3&&wr(e)>Oo)throw new Error(n+"contains a string greater than "+Oo+" utf8 bytes "+Xt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Be(e,(a,l)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(r=!0,!Sp(a)))throw new Error(n+" contains an invalid key ("+a+") "+Xt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);GT(i,a),bp(n,l,i),KT(i)}),s&&r)throw new Error(n+' contains ".value" child '+Xt(i)+" in addition to actual children.")}},kp=function(n,e,t,i){if(!Pp(t))throw new Error(qh(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},NC=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),kp(n,e,t)},DC=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Sp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!kC(t))throw new Error(qh(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Np(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!hl(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Dp(n,e,t){Np(n,t),Op(n,i=>hl(i,e))}function mn(n,e,t){Np(n,t),Op(n,i=>Ke(i,e)||Ke(e,i))}function Op(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(LC(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function LC(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Oi&&ke("event: "+t.toString()),cs(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MC="repo_interrupt",xC=25;class VC{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new OC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=fr(),this.transactionQueueTree_=new bl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function FC(n,e,t){if(n.stats_=cl(n.repoInfo_),n.forceRestClient_||mT())n.server_=new dr(n.repoInfo_,(i,s,r,a)=>{Sh(n,i,s,r,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ph(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ye(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new pt(n.repoInfo_,e,(i,s,r,a)=>{Sh(n,i,s,r,a)},i=>{Ph(n,i)},i=>{BC(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=TT(n.repoInfo_,()=>new Ew(n.stats_,n.server_)),n.infoData_=new _w,n.infoSyncTree_=new Ch({startListening:(i,s,r,a)=>{let l=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(l=qr(n.infoSyncTree_,i._path,c),setTimeout(()=>{a("ok")},0)),l},stopListening:()=>{}}),Nl(n,"connected",!1),n.serverSyncTree_=new Ch({startListening:(i,s,r,a)=>(n.server_.listen(i,r,s,(l,c)=>{const h=a(l,c);mn(n.eventQueue_,i._path,h)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function UC(n){const t=n.infoData_.getNode(new te(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Lp(n){return EC({timestamp:UC(n)})}function Sh(n,e,t,i,s){n.dataUpdateCount++;const r=new te(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let a=[];if(s)if(i){const c=Qs(t,h=>Ne(h));a=_C(n.serverSyncTree_,r,c,s)}else{const c=Ne(t);a=pC(n.serverSyncTree_,r,c,s)}else if(i){const c=Qs(t,h=>Ne(h));a=hC(n.serverSyncTree_,r,c)}else{const c=Ne(t);a=qr(n.serverSyncTree_,r,c)}let l=r;a.length>0&&(l=Ol(n,r)),mn(n.eventQueue_,l,a)}function Ph(n,e){Nl(n,"connected",e),e===!1&&WC(n)}function BC(n,e){Be(e,(t,i)=>{Nl(n,t,i)})}function Nl(n,e,t){const i=new te("/.info/"+e),s=Ne(t);n.infoData_.updateSnapshot(i,s);const r=qr(n.infoSyncTree_,i,s);mn(n.eventQueue_,i,r)}function qC(n){return n.nextWriteId_++}function WC(n){xp(n,"onDisconnectEvents");const e=Lp(n),t=fr();ha(n.onDisconnect_,X(),(s,r)=>{const a=wC(s,r,n.serverSyncTree_,e);op(t,s,a)});let i=[];ha(t,X(),(s,r)=>{i=i.concat(qr(n.serverSyncTree_,s,r));const a=GC(n,s);Ol(n,a)}),n.onDisconnect_=fr(),mn(n.eventQueue_,X(),i)}function jC(n,e,t){let i;W(e._path)===".info"?i=Ah(n.infoSyncTree_,e,t):i=Ah(n.serverSyncTree_,e,t),Dp(n.eventQueue_,e._path,i)}function Mp(n,e,t){let i;W(e._path)===".info"?i=ma(n.infoSyncTree_,e,t):i=ma(n.serverSyncTree_,e,t),Dp(n.eventQueue_,e._path,i)}function HC(n){n.persistentConnection_&&n.persistentConnection_.interrupt(MC)}function xp(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),ke(t,...e)}function Vp(n,e,t){return Ep(n.serverSyncTree_,e,t)||F.EMPTY_NODE}function Dl(n,e=n.transactionQueueTree_){if(e||Hr(n,e),ei(e)){const t=Up(n,e);b(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&$C(n,ds(e),t)}else Ap(e)&&jr(e,t=>{Dl(n,t)})}function $C(n,e,t){const i=t.map(h=>h.currentWriteId),s=Vp(n,e,i);let r=s;const a=s.hash();for(let h=0;h<t.length;h++){const f=t[h];b(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const _=Ve(e,f.path);r=r.updateChild(_,f.currentOutputSnapshotRaw)}const l=r.val(!0),c=e;n.server_.put(c.toString(),l,h=>{xp(n,"transaction put response",{path:c.toString(),status:h});let f=[];if(h==="ok"){const _=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(Sn(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&_.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();Hr(n,kl(n.transactionQueueTree_,e)),Dl(n,n.transactionQueueTree_),mn(n.eventQueue_,e,f);for(let m=0;m<_.length;m++)cs(_[m])}else{if(h==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{We("transaction at "+c.toString()+" failed: "+h);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=h}Ol(n,e)}},a)}function Ol(n,e){const t=Fp(n,e),i=ds(t),s=Up(n,t);return zC(n,s,i),i}function zC(n,e,t){if(e.length===0)return;const i=[];let s=[];const a=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],h=Ve(t,c.path);let f=!1,_;if(b(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)f=!0,_=c.abortReason,s=s.concat(Sn(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=xC)f=!0,_="maxretry",s=s.concat(Sn(n.serverSyncTree_,c.currentWriteId,!0));else{const m=Vp(n,c.path,a);c.currentInputSnapshot=m;const A=e[l].update(m.val());if(A!==void 0){bp("transaction failed: Data returned ",A,c.path);let S=Ne(A);typeof A=="object"&&A!=null&&Et(A,".priority")||(S=S.updatePriority(m.getPriority()));const N=c.currentWriteId,Q=Lp(n),J=CC(S,m,Q);c.currentOutputSnapshotRaw=S,c.currentOutputSnapshotResolved=J,c.currentWriteId=qC(n),a.splice(a.indexOf(N),1),s=s.concat(uC(n.serverSyncTree_,c.path,J,c.currentWriteId,c.applyLocally)),s=s.concat(Sn(n.serverSyncTree_,N,!0))}else f=!0,_="nodata",s=s.concat(Sn(n.serverSyncTree_,c.currentWriteId,!0))}mn(n.eventQueue_,t,s),s=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(_==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(_),!1,null))))}Hr(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)cs(i[l]);Dl(n,n.transactionQueueTree_)}function Fp(n,e){let t,i=n.transactionQueueTree_;for(t=W(e);t!==null&&ei(i)===void 0;)i=kl(i,t),e=ne(e),t=W(e);return i}function Up(n,e){const t=[];return Bp(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Bp(n,e,t){const i=ei(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);jr(e,s=>{Bp(n,s,t)})}function Hr(n,e){const t=ei(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Cp(e,t.length>0?t:void 0)}jr(e,i=>{Hr(n,i)})}function GC(n,e){const t=ds(Fp(n,e)),i=kl(n.transactionQueueTree_,e);return RC(i,s=>{Lo(n,s)}),Lo(n,i),Rp(i,s=>{Lo(n,s)}),t}function Lo(n,e){const t=ei(e);if(t){const i=[];let s=[],r=-1;for(let a=0;a<t.length;a++)t[a].status===3||(t[a].status===1?(b(r===a-1,"All SENT items should be at beginning of queue."),r=a,t[a].status=3,t[a].abortReason="set"):(b(t[a].status===0,"Unexpected transaction status in abort"),t[a].unwatcher(),s=s.concat(Sn(n.serverSyncTree_,t[a].currentWriteId,!0)),t[a].onComplete&&i.push(t[a].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Cp(e,void 0):t.length=r+1,mn(n.eventQueue_,ds(e),s);for(let a=0;a<i.length;a++)cs(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KC(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function QC(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):We(`Invalid query segment '${t}' in query '${n}'`)}return e}const bh=function(n,e){const t=YC(n),i=t.namespace;t.domain==="firebase.com"&&yt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&yt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||lT();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new qf(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new te(t.pathString)}},YC=function(n){let e="",t="",i="",s="",r="",a=!0,l="https",c=443;if(typeof n=="string"){let h=n.indexOf("//");h>=0&&(l=n.substring(0,h-1),n=n.substring(h+2));let f=n.indexOf("/");f===-1&&(f=n.length);let _=n.indexOf("?");_===-1&&(_=n.length),e=n.substring(0,Math.min(f,_)),f<_&&(s=KC(n.substring(f,_)));const m=QC(n.substring(Math.min(n.length,_)));h=e.indexOf(":"),h>=0?(a=l==="https"||l==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const A=e.slice(0,h);if(A.toLowerCase()==="localhost")t="localhost";else if(A.split(".").length<=2)t=A;else{const S=e.indexOf(".");i=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=i}"ns"in m&&(r=m.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:a,scheme:l,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ye(this.snapshot.exportVal())}}class JC{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZC{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return b(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return j(this._path)?null:Yf(this._path)}get ref(){return new $t(this._repo,this._path)}get _queryIdentifier(){const e=fh(this._queryParams),t=al(e);return t==="{}"?"default":t}get _queryObject(){return fh(this._queryParams)}isEqual(e){if(e=xe(e),!(e instanceof Ll))return!1;const t=this._repo===e._repo,i=hl(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+$T(this._path)}}class $t extends Ll{constructor(e,t){super(e,t,new _l,!1)}get parent(){const e=Jf(this._path);return e===null?null:new $t(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ir{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new te(e),i=va(this.ref,e);return new Ir(this._node.getChild(t),i,le)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ir(s,va(this.ref,i),le)))}hasChild(e){const t=new te(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function CA(n,e){return n=xe(n),n._checkNotDeleted("ref"),va(n._root,e)}function va(n,e){return n=xe(n),W(n._path)===null?NC("child","path",e):kp("child","path",e),new $t(n._repo,pe(n._path,e))}class Ml{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new XC("value",this,new Ir(e.snapshotNode,new $t(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new JC(this,e,t):null}matches(e){return e instanceof Ml?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function eA(n,e,t,i,s){const r=new ZC(t,void 0),a=new Ml(r);return jC(n._repo,n,a),()=>Mp(n._repo,n,a)}function AA(n,e,t,i){return eA(n,"value",e)}function RA(n,e,t){Mp(n._repo,n,null)}tC($t);aC($t);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tA="FIREBASE_DATABASE_EMULATOR_HOST",Ea={};let nA=!1;function iA(n,e,t,i){n.repoInfo_=new qf(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function sA(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||yt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ke("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=bh(r,s),l=a.repoInfo,c;typeof process<"u"&&Qu&&(c=Qu[tA]),c?(r=`http://${c}?ns=${l.namespace}`,a=bh(r,s),l=a.repoInfo):a.repoInfo.secure;const h=new vT(n.name,n.options,e);DC("Invalid Firebase Database URL",a),j(a.path)||yt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=oA(l,n,h,new yT(n.name,t));return new aA(f,n)}function rA(n,e){const t=Ea[e];(!t||t[n.key]!==n)&&yt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),HC(n),delete t[n.key]}function oA(n,e,t,i){let s=Ea[e.name];s||(s={},Ea[e.name]=s);let r=s[n.toURLString()];return r&&yt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new VC(n,nA,t,i),s[n.toURLString()]=r,r}class aA{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(FC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new $t(this._repo,X())),this._rootInternal}_delete(){return this._rootInternal!==null&&(rA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&yt("Cannot call "+e+" on a deleted database.")}}function SA(n=Aa(),e){const t=Ar(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Mh("database");i&&lA(t,...i)}return t}function lA(n,e,t,i={}){n=xe(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&yt("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&yt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new zs(zs.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Fh(i.mockUserToken,n.app.options.projectId);r=new zs(a)}iA(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cA(n){nT(_n),rn(new Vt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return sA(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Ze(Yu,Xu,n),Ze(Yu,Xu,"esm2017")}pt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};pt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};cA();export{Pt as G,TA as a,SA as b,wA as c,IA as d,uA as e,hA as f,gA as g,pA as h,zg as i,AA as j,RA as k,fA as o,CA as r,_A as s,dA as u};
