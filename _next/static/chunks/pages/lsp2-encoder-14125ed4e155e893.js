(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[370],{5496:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lsp2-encoder",function(){return t(2282)}])},2282:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return f}});var n=t(5893),s=t(1799);function c(e,a){return a=null!=a?a:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):function(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})),e}var l=[{name:"Address",key:"0xef949621d9619a7bdc7308bca3bf3f6508504e4bac5dab9b94b151c88dbea455",keyType:"Singleton",valueType:"address",valueContent:"Address"},{name:"Bytes",key:"0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3",keyType:"Singleton",valueType:"bytes",valueContent:"Bytes"},{name:"Bytes4",key:"0xad2be5ad3b3a0777e770098357029aca1aafa971654c82b8d63ad42f7dbf5e35",keyType:"Singleton",valueType:"bytes4",valueContent:"Bytes4"},{name:"Bytes8",key:"0xf394bbdb5601449db0079ff3eccaf10bb37ef8f1d6065ab3041381f660dc9cc9",keyType:"Singleton",valueType:"bytes8",valueContent:"Bytes8"},{name:"Bytes16",key:"0x0dfca698457804f3a8d600b6db180503d1e42c00de241b3badbb6459f4b6ff61",keyType:"Singleton",valueType:"bytes16",valueContent:"Bytes16"},{name:"Bytes32",key:"0xbc669d6df476bbfe199f8d1f1c3f11f8081dab034f622b388c60d06a56f41adb",keyType:"Singleton",valueType:"bytes32",valueContent:"Bytes32"},{name:"String",key:"0x7ff6a077f248416948843f592327444c45801847787632efa8e679f72a85215f",keyType:"Singleton",valueType:"string",valueContent:"String"},{name:"Keccak256",key:"0xab69e314cadc2da770b8173f283465c3dde5bfc80dde865e99dd9461f227c7da",keyType:"Singleton",valueType:"bytes32",valueContent:"Keccak256"},{name:"Number",key:"0x73212e33f3f42f0be7164bf7746373e9c145c78b4a273ca6c041d683d71edf74",keyType:"Singleton",valueType:"uint256",valueContent:"Number"},{name:"BytesN",key:"0xe68f93a38ebdceefd19d1b5686494aa1fd2a1336213a7823fd51debae4792467",keyType:"Singleton",valueType:"bytesN",valueContent:"BytesN"},{name:"Bytes",key:"0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3",keyType:"Singleton",valueType:"bytes",valueContent:"Bytes"},{name:"BitArray",key:"0x5c3aa19c48f25941f0a5d9ba88b03fe4672f0d09a87c30e6ec69b84572115636",keyType:"Singleton",valueType:"bytes",valueContent:"BitArray"},{name:"URL",key:"0x96388ed71ebb5d970d8c40d08f33931fc80bd2768fd60f12b78e085d12441b0e",keyType:"Singleton",valueType:"string",valueContent:"URL"},{name:"JSONURL",key:"0x2782700556cb782590d66cc4e1a7158dd2ac8459c70d8bcc62ef1009246381f1",keyType:"Singleton",valueType:"bytes",valueContent:"JSONURL"},{name:"Boolean",key:"0x92fb0a85a901c549fb8c896e08de450056c2408e7befb245949991a05340769d",keyType:"Singleton",valueType:"boolean",valueContent:"Boolean"}],i=["String","Address","Number","Bytes","Bytes4","Bytes8","Bytes16","Bytes32","Keccak256","BitArray","URL","JSONURL"],d=t(7294),r=t(8629),o={Address:"is not a valid address",Number:"is not a valid number",Bytes:"is not hex",Bytes4:"is not a bytes4 hex",Bytes8:"is not a bytes8 hex",Bytes16:"is not a bytes16 hex",Bytes32:"is not a bytes32 hex",Keccak256:"is",BitArray:"is not hex"},u=function(){var e=(0,d.useState)("String"),a=e[0],t=e[1],u=(0,d.useState)(""),f=u[0],y=u[1],b=(0,d.useState)(""),v=b[0],m=b[1],h=(0,d.useState)({verification:{method:"",data:"",source:""},url:""}),x=h[0],p=h[1],N=(0,d.useState)(!1),k=N[0],g=N[1],j=(0,d.useState)(!1),S=j[0],T=j[1],B=(0,d.useState)(""),C=B[0],O=B[1],w=new r.pY(l),P=function(){T(!1),g(!1)};(0,d.useEffect)((function(){x.verification.data&&x.url&&E(x)}),[x]),(0,d.useEffect)((function(){if(k){var e="".concat(v," ").concat(o[a]);O(e)}}),[v,k]);var E=function(e){P();try{m(e);var t=w.encodeData([{keyName:a,value:e}]);"0x"===t.values[0]?y(""):y(t.values[0])}catch(n){g(!0),y("")}},L=function(e){P();try{y(e);var t=w.decodeData([{keyName:a,value:e}]);"JSONURL"!=a?m(t[0].value):p({url:t[0].value.url,verification:t[0].value.verification})}catch(n){m(""),p({url:"",verification:{method:"keccak256(utf8)",data:"",source:""}}),T(!0)}};return(0,n.jsxs)("div",{children:[(0,n.jsx)("article",{className:"message is-info mx-3",children:(0,n.jsxs)("div",{className:"message-body",children:["This tool will encode/decode values following the",(0,n.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md",className:"ml-1",children:"LSP2 ERC725YJSONSchema"}),"."]})}),(0,n.jsxs)("div",{className:"field px-3",children:[(0,n.jsx)("div",{className:"label",children:"Select valueContent"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("div",{className:"select mb-2",children:(0,n.jsx)("select",{onChange:function(e){var a=e.target.value;t(a),m(""),y(""),p({url:"",verification:{method:"keccak256(utf8)",data:"",source:""}}),P()},value:a,children:i.map((function(e){return(0,n.jsx)("option",{children:e},e)}))})})})]}),a&&(0,n.jsxs)("div",{className:"is-two-thirds-desktop is-half-widescreen ",children:[(0,n.jsx)("div",{className:"column",children:(0,n.jsxs)("div",{className:" is-fullwidth",children:["JSONURL"===a?(0,n.jsxs)("div",{className:"field",children:[(0,n.jsx)("div",{className:"label",children:"Encoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsxs)("div",{className:"columns",children:[(0,n.jsx)("div",{className:"column is-half",children:(0,n.jsx)("textarea",{className:"p-1 textarea",placeholder:"hash",value:x.verification.data,rows:6,onChange:function(e){p(c((0,s.Z)({},x),{verification:c((0,s.Z)({},x.verification),{method:e.target.value})}))}})}),(0,n.jsx)("div",{className:"column is half",children:(0,n.jsx)("textarea",{className:"p-1 textarea",placeholder:"url",value:x.url,rows:6,onChange:function(e){p(c((0,s.Z)({},x),{url:e.target.value}))}})})]})})]}):(0,n.jsxs)("div",{className:"field",children:[(0,n.jsx)("div",{className:"label",children:"Encoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("textarea",{placeholder:"value",value:v,className:"p-1 textarea is-fullwidth",onChange:function(e){return E(e.target.value)},rows:6})})]}),k&&(0,n.jsx)("div",{className:"my-2 has-text-danger",children:C})]})}),(0,n.jsxs)("div",{className:"column",children:[(0,n.jsxs)("div",{className:"field",children:[(0,n.jsx)("div",{className:"label",children:"Decoded value"}),(0,n.jsx)("div",{className:"control",children:(0,n.jsx)("textarea",{className:"p-1 textarea",rows:6,onChange:function(e){return L(e.target.value)},value:f})})]}),S&&(0,n.jsx)("div",{className:"my-2 has-text-danger",children:"Could not decode"})]})]})]})},f=function(){return(0,n.jsx)(u,{})}},6601:function(){},9214:function(){},5568:function(){},2361:function(){},4616:function(){}},function(e){e.O(0,[629,774,888,179],(function(){return a=5496,e(e.s=a);var a}));var a=e.O();_N_E=a}]);