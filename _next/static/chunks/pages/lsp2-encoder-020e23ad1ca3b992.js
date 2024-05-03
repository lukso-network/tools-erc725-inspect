(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[370],{5496:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lsp2-encoder",function(){return t(2282)}])},2282:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return f}});var n=t(5893),s=t(6042);function c(e,a){return a=null!=a?a:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):function(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})),e}var l=[{name:"Address",key:"0xef949621d9619a7bdc7308bca3bf3f6508504e4bac5dab9b94b151c88dbea455",keyType:"Singleton",valueType:"address",valueContent:"Address"},{name:"Bytes",key:"0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3",keyType:"Singleton",valueType:"bytes",valueContent:"Bytes"},{name:"Bytes4",key:"0xad2be5ad3b3a0777e770098357029aca1aafa971654c82b8d63ad42f7dbf5e35",keyType:"Singleton",valueType:"bytes4",valueContent:"Bytes4"},{name:"Bytes8",key:"0xf394bbdb5601449db0079ff3eccaf10bb37ef8f1d6065ab3041381f660dc9cc9",keyType:"Singleton",valueType:"bytes8",valueContent:"Bytes8"},{name:"Bytes16",key:"0x0dfca698457804f3a8d600b6db180503d1e42c00de241b3badbb6459f4b6ff61",keyType:"Singleton",valueType:"bytes16",valueContent:"Bytes16"},{name:"Bytes32",key:"0xbc669d6df476bbfe199f8d1f1c3f11f8081dab034f622b388c60d06a56f41adb",keyType:"Singleton",valueType:"bytes32",valueContent:"Bytes32"},{name:"String",key:"0x7ff6a077f248416948843f592327444c45801847787632efa8e679f72a85215f",keyType:"Singleton",valueType:"string",valueContent:"String"},{name:"Keccak256",key:"0xab69e314cadc2da770b8173f283465c3dde5bfc80dde865e99dd9461f227c7da",keyType:"Singleton",valueType:"bytes32",valueContent:"Keccak256"},{name:"Number",key:"0x73212e33f3f42f0be7164bf7746373e9c145c78b4a273ca6c041d683d71edf74",keyType:"Singleton",valueType:"uint256",valueContent:"Number"},{name:"BytesN",key:"0xe68f93a38ebdceefd19d1b5686494aa1fd2a1336213a7823fd51debae4792467",keyType:"Singleton",valueType:"bytesN",valueContent:"BytesN"},{name:"Bytes",key:"0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3",keyType:"Singleton",valueType:"bytes",valueContent:"Bytes"},{name:"BitArray",key:"0x5c3aa19c48f25941f0a5d9ba88b03fe4672f0d09a87c30e6ec69b84572115636",keyType:"Singleton",valueType:"bytes",valueContent:"BitArray"},{name:"URL",key:"0x96388ed71ebb5d970d8c40d08f33931fc80bd2768fd60f12b78e085d12441b0e",keyType:"Singleton",valueType:"string",valueContent:"URL"},{name:"VerifiableURI",key:"0xf151b34e13f85596eba0554fc00d3919b0052a6522221c372ebc9ed85e4ca3e9",keyType:"Singleton",valueType:"bytes",valueContent:"VerifiableURI"},{name:"Boolean",key:"0x92fb0a85a901c549fb8c896e08de450056c2408e7befb245949991a05340769d",keyType:"Singleton",valueType:"boolean",valueContent:"Boolean"}],r=["String","Address","Number","Bytes","Bytes4","Bytes8","Bytes16","Bytes32","Keccak256","BitArray","URL","VerifiableURI"],i=t(7294),d=t(3655),o={Address:"is not a valid address",Number:"is not a valid number",Bytes:"is not hex",Bytes4:"is not a bytes4 hex",Bytes8:"is not a bytes8 hex",Bytes16:"is not a bytes16 hex",Bytes32:"is not a bytes32 hex",Keccak256:"is",BitArray:"is not hex"},u=function(){var e=(0,i.useState)("String"),a=e[0],t=e[1],u=(0,i.useState)(""),f=u[0],b=u[1],y=(0,i.useState)(""),v=y[0],h=y[1],m=(0,i.useState)({verification:{method:"",data:"",source:""},url:""}),x=m[0],p=m[1],k=(0,i.useState)(!1),j=k[0],g=k[1],N=(0,i.useState)(!1),S=N[0],C=N[1],T=(0,i.useState)(""),B=T[0],w=T[1],E=(0,i.useMemo)((function(){return new d.pY(l)}),[]),O=function(){C(!1),g(!1)},_=(0,i.useCallback)((function(e){O();try{h(e);var t=E.encodeData([{keyName:a,value:e}]);"0x"===t.values[0]?b(""):b(t.values[0])}catch(n){g(!0),b("")}}),[E,a]);(0,i.useEffect)((function(){x.verification.data&&x.url&&_(x)}),[x,_]),(0,i.useEffect)((function(){if(j){var e="".concat(v," ").concat(o[a]);w(e)}}),[v,j,a]);var R=function(e){O();try{b(e);var t=E.decodeData([{keyName:a,value:e}]);"VerifiableURI"!=a?h(t[0].value):p({url:t[0].value.url,verification:t[0].value.verification})}catch(n){h(""),p({url:"",verification:{method:"keccak256(utf8)",data:"",source:""}}),C(!0)}};return(0,n.jsxs)("div",{className:"container",children:[(0,n.jsx)("h2",{className:"title is-2",children:"LSP2 Encoder"}),(0,n.jsx)("article",{className:"message is-info",children:(0,n.jsxs)("div",{className:"message-body",children:["Encode or decode the values of",(0,n.jsx)("a",{href:"https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y",className:"mx-1",target:"_blank",rel:"noreferrer",children:"ERC725Y"}),"data keys following the",(0,n.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md",className:"mx-1",target:"_blank",rel:"noreferrer",children:"LSP2 ERC725YJSONSchema"}),"standardization."]})}),(0,n.jsx)("article",{className:"message",children:(0,n.jsxs)("div",{className:"message-body",children:["It\u2018s using the",(0,n.jsx)("a",{href:"https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodedata",target:"_blank",rel:"noreferrer",className:"mx-1",children:"encodeData"}),"and",(0,n.jsx)("a",{href:"https://docs.lukso.tech/tools/erc725js/classes/ERC725#decodedata",target:"_blank",rel:"noreferrer",className:"mx-1",children:"decodeData"}),"functions of the",(0,n.jsx)("a",{href:"https://www.npmjs.com/package/@erc725/erc725.js",target:"_blank",rel:"noreferrer",className:"mx-1",children:"erc725.js"}),"library."]})}),(0,n.jsxs)("div",{className:"field",children:[(0,n.jsx)("div",{className:"label",children:"Select valueContent"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("div",{className:"select mb-2",children:(0,n.jsx)("select",{onChange:function(e){var a=e.target.value;t(a),h(""),b(""),p({url:"",verification:{method:"keccak256(utf8)",data:"",source:""}}),O()},value:a,children:r.map((function(e){return(0,n.jsx)("option",{children:e},e)}))})})})]}),a&&(0,n.jsxs)("div",{className:"is-two-thirds-desktop is-half-widescreen ",children:[(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:" is-fullwidth",children:["VerifiableURI"===a?(0,n.jsxs)("div",{className:"field mt-2",children:[(0,n.jsx)("div",{className:"label",children:"Encoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsxs)("div",{className:"columns",children:[(0,n.jsx)("div",{className:"column is-half",children:(0,n.jsx)("textarea",{className:"textarea is-fullwidth",placeholder:"hash",value:x.verification.data,rows:6,onChange:function(e){p(c((0,s.Z)({},x),{verification:c((0,s.Z)({},x.verification),{data:e.target.value})}))}})}),(0,n.jsx)("div",{className:"column is-half",children:(0,n.jsx)("textarea",{className:"textarea is-fullwidth",placeholder:"url",value:x.url,rows:6,onChange:function(e){p(c((0,s.Z)({},x),{url:e.target.value}))}})})]})})]}):(0,n.jsxs)("div",{className:"field mt-2",children:[(0,n.jsx)("div",{className:"label",children:"Encoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("textarea",{placeholder:"value",value:v,className:"textarea is-fullwidth",onChange:function(e){return _(e.target.value)},rows:6})})]}),j&&(0,n.jsx)("div",{className:"my-2 has-text-danger",children:B})]})}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"field mt-2",children:[(0,n.jsx)("div",{className:"label",children:"Decoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("textarea",{className:"textarea",rows:6,onChange:function(e){return R(e.target.value)},value:f})})]}),S&&(0,n.jsx)("div",{className:"my-2 has-text-danger",children:"Could not decode"})]})]})]})},f=function(){return(0,n.jsx)(u,{})}},6601:function(){},9214:function(){},5568:function(){},2361:function(){},4616:function(){}},function(e){e.O(0,[655,774,888,179],(function(){return a=5496,e(e.s=a);var a}));var a=e.O();_N_E=a}]);