(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[470],{95665:function(){},24039:function(){},95470:function(e,t,r){"use strict";r.r(t),r.d(t,{fileFromPath:function(){return N},fileFromPathSync:function(){return W},isFile:function(){return x}});var i=r(95665),n=r(24039),a=r(1864),s=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)},o=(e,t,r)=>(s(e,t,"read from private field"),r?r.call(e):t.get(e)),c=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},l=(e,t,r,i)=>(s(e,t,"write to private field"),i?i.call(e,r):t.set(e,r),r),f=e=>"object"===typeof e&&null!=e&&!Array.isArray(e),u=e=>"function"===typeof e,h=65536;async function*y(e){if(e.byteLength<=h)return void(yield e);let t=0;for(;t<e.byteLength;){const r=Math.min(e.byteLength-t,h),i=e.buffer.slice(t,t+r);t+=i.byteLength,yield new Uint8Array(i)}}async function*d(e){for await(const t of e)yield*y(t)}var b,m,w,p=e=>{if(f(t=e)&&u(t[Symbol.asyncIterator]))return d(e);var t;if(u(e.getReader))return d(async function*(e){const t=e.getReader();for(;;){const{done:e,value:r}=await t.read();if(e)break;yield r}}(e));throw new TypeError("Unsupported data source: Expected either ReadableStream or async iterable.")};async function*g(e){let t=0;for(;t!==e.size;){const r=e.slice(t,Math.min(e.size,t+h)),i=await r.arrayBuffer();t+=i.byteLength,yield new Uint8Array(i)}}async function*M(e,t=!1){for(const r of e)ArrayBuffer.isView(r)?t?yield*y(r):yield r:u(r.stream)?yield*p(r.stream()):yield*g(r)}var v=class e{constructor(t=[],r={}){if(c(this,b,[]),c(this,m,""),c(this,w,0),r??={},"object"!==typeof t||null===t)throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");if(!u(t[Symbol.iterator]))throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");if("object"!==typeof r&&!u(r))throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");const i=new TextEncoder;for(const a of t){let t;t=ArrayBuffer.isView(a)?new Uint8Array(a.buffer.slice(a.byteOffset,a.byteOffset+a.byteLength)):a instanceof ArrayBuffer?new Uint8Array(a.slice(0)):a instanceof e?a:i.encode(String(a)),l(this,w,o(this,w)+(ArrayBuffer.isView(t)?t.byteLength:t.size)),o(this,b).push(t)}const n=void 0===r.type?"":String(r.type);l(this,m,/^[\x20-\x7E]*$/.test(n)?n:"")}static[Symbol.hasInstance](e){return Boolean(e&&"object"===typeof e&&u(e.constructor)&&(u(e.stream)||u(e.arrayBuffer))&&/^(Blob|File)$/.test(e[Symbol.toStringTag]))}get type(){return o(this,m)}get size(){return o(this,w)}slice(t,r,i){return new e(function*(e,t,r=0,i){i??=t;let n=r<0?Math.max(t+r,0):Math.min(r,t),a=i<0?Math.max(t+i,0):Math.min(i,t);const s=Math.max(a-n,0);let o=0;for(const c of e){if(o>=s)break;const e=ArrayBuffer.isView(c)?c.byteLength:c.size;if(n&&e<=n)n-=e,a-=e;else{let t;ArrayBuffer.isView(c)?(t=c.subarray(n,Math.min(e,a)),o+=t.byteLength):(t=c.slice(n,Math.min(e,a)),o+=t.size),a-=e,n=0,yield t}}}(o(this,b),this.size,t,r),{type:i})}async text(){const e=new TextDecoder;let t="";for await(const r of M(o(this,b)))t+=e.decode(r,{stream:!0});return t+=e.decode(),t}async arrayBuffer(){const e=new Uint8Array(this.size);let t=0;for await(const r of M(o(this,b)))e.set(r,t),t+=r.length;return e.buffer}stream(){const e=M(o(this,b),!0);return new ReadableStream({async pull(t){const{value:r,done:i}=await e.next();if(i)return queueMicrotask((()=>t.close()));t.enqueue(r)},async cancel(){await e.return()}})}get[Symbol.toStringTag](){return"Blob"}};b=new WeakMap,m=new WeakMap,w=new WeakMap;var S,T,k=v;Object.defineProperties(k.prototype,{type:{enumerable:!0},size:{enumerable:!0},slice:{enumerable:!0},stream:{enumerable:!0},text:{enumerable:!0},arrayBuffer:{enumerable:!0}});var z=class extends k{constructor(e,t,r={}){if(super(e,r),c(this,S,void 0),c(this,T,0),arguments.length<2)throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);l(this,S,String(t));const i=void 0===r.lastModified?Date.now():Number(r.lastModified);Number.isNaN(i)||l(this,T,i)}static[Symbol.hasInstance](e){return e instanceof k&&"File"===e[Symbol.toStringTag]&&"string"===typeof e.name}get name(){return o(this,S)}get webkitRelativePath(){return""}get lastModified(){return o(this,T)}get[Symbol.toStringTag](){return"File"}};S=new WeakMap,T=new WeakMap;var B,E,x=e=>e instanceof z,A=class e{constructor(e){c(this,B,void 0),c(this,E,void 0),l(this,B,e.path),l(this,E,e.start||0),this.name=(0,a.basename)(o(this,B)),this.size=e.size,this.lastModified=e.lastModified}slice(t,r){return new e({path:o(this,B),lastModified:this.lastModified,start:o(this,E)+t,size:r-t})}async*stream(){const{mtimeMs:e}=await(0,n.stat)(o(this,B));if(e>this.lastModified)throw new DOMException("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.","NotReadableError");this.size&&(yield*(0,i.createReadStream)(o(this,B),{start:o(this,E),end:o(this,E)+this.size-1}))}get[Symbol.toStringTag](){return"File"}};B=new WeakMap,E=new WeakMap;var F=A;function L(e,{mtimeMs:t,size:r},i,n={}){let a;f(i)?[n,a]=[i,void 0]:a=i;const s=new F({path:e,size:r,lastModified:t});return a||(a=s.name),new z([s],a,{...n,lastModified:s.lastModified})}function W(e,t,r={}){return L(e,(0,i.statSync)(e),t,r)}async function N(e,t,r){return L(e,await(0,n.stat)(e),t,r)}}}]);