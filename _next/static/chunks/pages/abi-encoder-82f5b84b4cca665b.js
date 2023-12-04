(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[481],{4240:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/abi-encoder",function(){return a(1264)}])},9366:function(e,s,a){"use strict";a.d(s,{Z:function(){return o}});var n=a(7568),t=a(7582),r=a(7294),i=a(7918),c=a.n(i),l=a(3538);function o(){var e=(0,r.useState)(),s=e[0],a=e[1],i=(0,r.useContext)(l.J).network;return(0,r.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){return(0,t.__generator)(this,(function(e){return[2,new(c())(i.rpc)]}))}));return function(){return e.apply(this,arguments)}}();e().then((function(e){a(e)}))}),[i]),s}},1264:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return H}});var n,t=a(5893),r=a(9008),i=a.n(r),c=a(7294);!function(e){e.SET_DATA="SET_DATA",e.SET_DATA_BATCH="SET_DATA_BATCH",e.EXECUTE="EXECUTE",e.TRANSFER_OWNERSHIP="TRANSFER_OWNERSHIP"}(n||(n={}));var l,o={SET_DATA:"7f23690c",SET_DATA_BATCH:"97902421",EXECUTE:"44c028fe",TRANSFER_OWNERSHIP:"f2fde38b"},d=function(e){var s=e.header,a=e.message;return(0,t.jsxs)("article",{className:"message is-danger my-4",children:[(0,t.jsx)("div",{className:"message-header",children:(0,t.jsx)("p",{children:s})}),(0,t.jsx)("div",{className:"message-body",children:a})]})},u=a(738),m=a.n(u),h=function(e,s){try{var a=s.eth.abi.decodeParameters(["address"],e);return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:"notification is-danger m-2",children:["This payload will transfer ownership to ",a[0],".",(0,t.jsx)("br",{})," Be cautious!"]})}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:m().inputContainer,children:[(0,t.jsx)("label",{className:m().inputDescription,children:"New Owner"}),(0,t.jsx)("input",{type:"text",className:"input m-2",placeholder:"0x...",value:a[0],readOnly:!0})]})})]})}catch(n){return(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)(d,{header:"ABI Decoder Error!",message:n.message})})}},x=function(e,s){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];try{var n=a?s.eth.abi.decodeParameters(["bytes32[]","bytes[]"],e):s.eth.abi.decodeParameters(["bytes32","bytes"],e),r=a?n[0]:[n[0]],i=a?n[1]:[n[1]];return(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-2",children:"Keys"}),(0,t.jsx)("div",{className:"mb-2",children:"Values"}),r.map((function(e,s){return(0,t.jsxs)(c.Fragment,{children:[(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)("input",{type:"text",className:"input m-2",value:e,readOnly:!0})}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)("input",{type:"text",className:"input m-2",value:i[s],readOnly:!0})})]},s)}))]})}catch(l){return(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)(d,{header:"ABI Decoder Error!",message:l.message})})}},p=function(e,s){try{var a=s.eth.abi.decodeParameters(["uint256","address","uint256","bytes"],e);return(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"mb-2",children:[(0,t.jsx)("label",{className:m().inputDescription,children:"Operation"}),(0,t.jsx)("input",{type:"text",className:"input m-2",value:a[0],readOnly:!0})]}),(0,t.jsxs)("div",{className:"mb-2 ".concat(m().inputContainer),children:[(0,t.jsx)("label",{className:m().inputDescription,children:"Recipient"}),(0,t.jsx)("input",{type:"text",className:"input m-2",value:a[1],readOnly:!0})]}),(0,t.jsxs)("div",{className:"mb-2 ".concat(m().inputContainer),children:[(0,t.jsx)("label",{className:m().inputDescription,children:"Amount"}),(0,t.jsx)("input",{type:"text",className:"input m-2",value:a[2],readOnly:!0})]}),(0,t.jsxs)("div",{className:"mb-2 ".concat(m().inputContainer),children:[(0,t.jsx)("label",{className:m().inputDescription,children:"Data"}),(0,t.jsx)("input",{type:"text",className:"input m-2",placeholder:"0x...",value:a[3],readOnly:!0})]})]})}catch(n){return(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)(d,{header:"ABI Decoder Error!",message:n.message})})}},E=function(e){var s=e.web3,a=function(e){var s=e.selector,a=e.payload,t=e.web3;switch(s){case o.SET_DATA:return g(n.SET_DATA),x(a,t);case o.SET_DATA_BATCH:return g(n.SET_DATA_BATCH),x(a,t,!0);case o.EXECUTE:return g(n.EXECUTE),p(a,t);case o.TRANSFER_OWNERSHIP:return g(n.TRANSFER_OWNERSHIP),h(a,t)}return null},r=(0,c.useState)({isError:!1,message:""}),i=r[0],l=r[1],u=(0,c.useState)(""),m=u[0],E=u[1],j=(0,c.useState)(""),N=j[0],f=j[1],v=(0,c.useState)(null),b=v[0],g=v[1];return(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)("textarea",{className:"textarea",placeholder:"Paste your ABI here...",onChange:function(e){return function(e){if("0x"===e.slice(0,2)){var s=e.slice(2,10),a=e.slice(10);E(s),f(a),Object.values(o).includes(s)?l({isError:!1,message:""}):l({isError:!0,message:"Unrecognised ERC725 selector"})}else l({isError:!0,message:"Invalid payload. Missing `0x` prefix for hexadecimal"})}(e.target.value)}})}),(0,t.jsx)("div",{children:i.isError?(0,t.jsx)(d,{header:"Input Error",message:i.message}):""}),(0,t.jsxs)("div",{className:"mb-2",children:[(0,t.jsxs)("span",{className:"tag is-medium mb-2 mr-2 ".concat(b===n.SET_DATA?"is-primary":""),children:["setData",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#setdata",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("span",{className:"tag is-medium mb-2 mr-2 ".concat(b===n.SET_DATA_BATCH?"is-primary":""),children:["setDataBatch",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#setdatabatch",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("span",{className:"tag is-medium mb-2 mr-2 ".concat(b===n.EXECUTE?"is-primary":""),children:["execute",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#execute",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("span",{className:"tag is-medium mb-2 mr-2 ".concat(b===n.TRANSFER_OWNERSHIP?"is-primary":""),children:["transferOwnership",(0,t.jsx)("a",{href:"https://eips.ethereum.org/EIPS/eip-173",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]})]}),(0,t.jsx)("div",{className:"mb-2",children:!i.isError&&N.length>0?(0,t.jsx)(a,{selector:m,payload:N,web3:s}):""})]})})},j=a(8078),N=a.n(j),f=function(e){var s=e.encodedPayload,a=(0,c.useState)(!1),n=a[0],r=a[1];(0,c.useEffect)((function(){r(!1)}),[s]);var i=n?"Copied!":"Copy to Clipboard";return(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("div",{className:"notification",children:i}),(0,t.jsx)("button",{className:"button is-light",onClick:function(){navigator.clipboard.writeText(s),r(!0)},type:"button",children:(0,t.jsx)("p",{className:"is-family-code ".concat(N().codeBox),children:s})})]})},v=a(1304),b=a(1127),g=a.n(b),_=function(e){var s=e.web3,a=(0,c.useState)(""),n=a[0],r=a[1],i=(0,c.useState)("0"),l=i[0],o=i[1],u=(0,c.useState)(""),m=u[0],h=u[1],x=(0,c.useState)(""),p=x[0],E=x[1],j=(0,c.useState)(""),N=j[0],b=j[1],_=(0,c.useState)({isError:!1,message:""}),C=_[0],A=_[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:g().inputContainer,children:[(0,t.jsx)("label",{className:g().inputDescription,children:"Operation"}),(0,t.jsx)("br",{}),(0,t.jsx)("div",{className:"select mb-2",children:(0,t.jsxs)("select",{value:l,onChange:function(e){return o(e.target.value)},children:[(0,t.jsx)("option",{value:"0",children:"CALL"}),(0,t.jsx)("option",{value:"1",children:"CREATE"}),(0,t.jsx)("option",{value:"2",children:"CREATE2"}),(0,t.jsx)("option",{value:"3",children:"STATICCALL"}),(0,t.jsx)("option",{value:"4",children:"DELEGATECALL"})]})})]})}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:g().inputContainer,children:[(0,t.jsx)("label",{className:g().inputDescription,children:"Recipient"}),(0,t.jsx)("input",{type:"text",className:"input mb-2 is-fullwidth",value:m,onChange:function(e){var s=e.target.value;h(s)}})]})}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:g().inputContainer,children:[(0,t.jsx)("label",{className:g().inputDescription,children:"Amount"}),(0,t.jsx)("input",{type:"text",className:"input mb-2 is-fullwidth",value:p,onChange:function(e){var s=e.target.value;E(s)}})]})}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)("div",{className:g().inputContainer,children:[(0,t.jsx)("label",{className:g().inputDescription,children:"Data"}),(0,t.jsx)("input",{type:"text",className:"input mb-2 is-fullwidth",value:N,onChange:function(e){var s=e.target.value;b(s)}})]})})]}),(0,t.jsxs)("div",{style:{height:300,width:"100%",marginBottom:10,marginTop:10},children:[(0,t.jsx)("button",{className:"button is-primary",onClick:function(){var e=new s.eth.Contract(v.Mt);try{var a=s.utils.toWei(p);r(e.methods.execute(l,m,a,N).encodeABI()),A({message:"",isError:!1})}catch(n){r(""),A({message:n.message,isError:!0})}},children:"Encode ABI"}),n?(0,t.jsx)(f,{encodedPayload:n}):null,C.isError?(0,t.jsx)(d,{header:"ABI Encoding Error",message:C.message}):null]})]})},C=a(797),A=a(7615),y=a.n(A),T=function(e){var s=e.web3,a=e.isBatch,n=(0,c.useState)(""),r=n[0],i=n[1],l=(0,c.useState)([{key:"",value:""}]),o=l[0],u=l[1],m=(0,c.useState)({isError:!1,message:""}),h=m[0],x=m[1],p=function(e){var s=(0,C.Z)(o);s.splice(e,1),u(s)},E=function(e,s){var a=(0,C.Z)(o),n=s.target.id;n in a[0]&&(a[e][n]=s.target.value,u(a))};return(0,t.jsxs)(t.Fragment,{children:[function(e){return e.map((function(e,s){return(0,t.jsxs)("div",{className:"is-flex is-align-items-center is-vcentered ".concat(y().keyValueBox),children:[a?(0,t.jsx)("div",{className:"column is-1",children:(0,t.jsx)("button",{className:"delete is-large ".concat(y().closeButton),onClick:p.bind(undefined,s),children:"Remove"})}):"",(0,t.jsxs)("div",{className:"column",children:[(0,t.jsxs)("div",{className:y().inputContainer,children:[(0,t.jsx)("label",{className:y().inputDescription,children:"Key"}),(0,t.jsx)("input",{type:"text",id:"key",className:"input mb-2 is-fullwidth",value:e.key,onChange:function(e){return E(s,e)}})]}),(0,t.jsxs)("div",{className:y().inputContainer,children:[(0,t.jsx)("label",{className:y().inputDescription,children:"Value"}),(0,t.jsx)("input",{type:"text",id:"value",className:"input mb-2 is-fullwidth",value:e.value,onChange:function(e){return E(s,e)}})]})]})]},s)}))}(o),a?(0,t.jsx)("div",{children:(0,t.jsx)("div",{className:"my-4 mr-4",children:(0,t.jsx)("button",{className:"button is-info ".concat(y().buttonWidth),onClick:function(){u((0,C.Z)(o).concat([{key:"",value:""}]))},children:"Add Key"})})}):"",(0,t.jsx)("div",{children:(0,t.jsxs)("div",{className:"my-4 mr-4",children:[(0,t.jsx)("button",{className:"button is-primary ".concat(y().buttonWidth),onClick:function(){var e=new s.eth.Contract(v.Mt),n=o.map((function(e){return e.key})),t=o.map((function(e){return e.value}));try{i(a?e.methods.setDataBatch(n,t).encodeABI():e.methods.setData(n[0],t[0]).encodeABI()),x({isError:!1,message:""})}catch(r){x({isError:!0,message:r.message})}},children:"Encode ABI"}),r&&!h.isError?(0,t.jsx)(f,{encodedPayload:r}):null,h.isError?(0,t.jsx)(d,{header:"ABI Encoding Error",message:h.message}):null]})})]})},D=a(2707),S=a.n(D),w=function(e){var s,a=e.web3,n=(0,c.useState)(""),r=n[0],i=n[1],l=(0,c.useState)(""),o=l[0],u=l[1],m=(0,c.useState)({isError:!1,message:""}),h=m[0],x=m[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:S().inputContainer,children:[(0,t.jsx)("label",{className:S().inputDescription,children:"New Owner"}),(0,t.jsx)("input",{type:"text",className:"input mb-2 is-fullwidth",value:r,onChange:function(e){return function(e){i(e),s||(s=new a.eth.Contract(v.Mt));try{u(s.methods.transferOwnership(e).encodeABI()),x({isError:!1,message:""})}catch(n){x({isError:!0,message:n.message}),u("")}}(e.target.value)}})]}),(0,t.jsxs)("div",{style:{height:300,width:"100%",marginBottom:10,marginTop:10},children:[o?(0,t.jsx)(f,{encodedPayload:o}):null,h.isError?(0,t.jsx)(d,{header:"ABI Encoding Error",message:h.message}):null]})]})},k=a(2070),O=a.n(k),R=n.SET_DATA,B=function(e){var s=e.web3,a=(0,c.useState)(R),r=a[0],i=a[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"columns",children:(0,t.jsxs)("div",{className:"column",children:[(0,t.jsx)("p",{className:"mb-2",children:"Transaction Type"}),(0,t.jsxs)("div",{className:"control",children:[(0,t.jsxs)("label",{className:"radio ".concat(O().radioLabel),children:[(0,t.jsx)("input",{type:"radio",className:O().radioInput,value:n.SET_DATA,checked:r===n.SET_DATA,onChange:function(){return i(n.SET_DATA)}}),"setData",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#setdata",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("label",{className:"radio ".concat(O().radioLabel),children:[(0,t.jsx)("input",{type:"radio",className:O().radioInput,value:n.SET_DATA_BATCH,checked:r===n.SET_DATA_BATCH,onChange:function(){return i(n.SET_DATA_BATCH)}}),"setDataBatch",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#setdatabatch",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("label",{className:"radio ".concat(O().radioLabel),children:[(0,t.jsx)("input",{type:"radio",className:O().radioInput,value:n.EXECUTE,checked:r===n.EXECUTE,onChange:function(){return i(n.EXECUTE)}}),"execute",(0,t.jsx)("a",{href:"https://docs.lukso.tech/contracts/contracts/ERC725/#execute",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]}),(0,t.jsxs)("label",{className:"radio ".concat(O().radioLabel),children:[(0,t.jsx)("input",{type:"radio",className:O().radioInput,value:n.TRANSFER_OWNERSHIP,checked:r===n.TRANSFER_OWNERSHIP,onChange:function(){return i(n.TRANSFER_OWNERSHIP)}}),"transferOwnership",(0,t.jsx)("a",{href:"https://eips.ethereum.org/EIPS/eip-173",target:"_blank",rel:"noreferrer",className:"ml-2 has-text-info-dark",children:"\u2197"})]})]})]})}),(0,t.jsx)("div",{className:"columns",children:(0,t.jsxs)("div",{className:"column",children:[r===n.SET_DATA?(0,t.jsx)(T,{web3:s,isBatch:!1}):null,r===n.SET_DATA_BATCH?(0,t.jsx)(T,{web3:s,isBatch:!0}):null,r===n.EXECUTE?(0,t.jsx)(_,{web3:s}):null,r===n.TRANSFER_OWNERSHIP?(0,t.jsx)(w,{web3:s}):null]})})]})},I=a(9366);!function(e){e.ENCODE="ENCODE",e.DECODE="DECODE"}(l||(l={}));var P=l.ENCODE,H=function(){var e=(0,I.Z)(),s=(0,c.useState)(P),a=s[0],n=s[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i(),{children:(0,t.jsx)("title",{children:"ABI Coder - ERC725 Tools"})}),(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("h2",{className:"title is-2",children:"ABI Encoder"}),(0,t.jsx)("article",{className:"message is-info",children:(0,t.jsxs)("div",{className:"message-body",children:["Encode and decode transaction data of",(0,t.jsx)("a",{className:"mx-1",href:"https://docs.lukso.tech/standards/smart-contracts/lsp0-erc725-account",target:"_blank",rel:"noreferrer",children:"LSP0 ERC725Account"}),"smart contracts based on its",(0,t.jsx)("a",{className:"ml-1",target:"_blank",rel:"noreferrer",href:"https://docs.lukso.tech/contracts/contracts/LSP0ERC725Account/#parameters-2",children:"execution parameters"}),"."]})}),(0,t.jsx)("article",{className:"message",children:(0,t.jsxs)("div",{className:"message-body",children:["It\u2018s using the",(0,t.jsx)("a",{href:"https://docs.web3js.org/api/web3-eth-abi/function/decodeParameters/",target:"_blank",rel:"noreferrer",className:"mx-1",children:"decodeParameters"}),"function of the",(0,t.jsx)("a",{href:"https://www.npmjs.com/package/web3",target:"_blank",rel:"noreferrer",className:"mx-1",children:"web3"}),"library."]})}),(0,t.jsx)("div",{className:"columns",children:(0,t.jsx)("div",{className:"column",children:(0,t.jsxs)("div",{className:"mb-2",children:[(0,t.jsx)("p",{className:"mb-2",children:"Mode"}),(0,t.jsxs)("div",{className:"control",children:[(0,t.jsxs)("label",{className:"radio radioLabel",children:[(0,t.jsx)("input",{type:"radio",className:"radioInput",value:l.ENCODE,checked:a===l.ENCODE,onChange:function(){return n(l.ENCODE)}}),"Encode"]}),(0,t.jsxs)("label",{className:"radio radioLabel",children:[(0,t.jsx)("input",{type:"radio",className:"radioInput",value:l.DECODE,checked:a===l.DECODE,onChange:function(){return n(l.DECODE)}}),"Decode"]})]})]})})})]}),(0,t.jsxs)("div",{className:"container",children:[a===l.ENCODE&&e?(0,t.jsx)(B,{web3:e}):null,a===l.DECODE&&e?(0,t.jsx)(E,{web3:e}):null]})]})}},738:function(e){e.exports={inputContainer:"Decode_inputContainer__M3cpg",inputDescription:"Decode_inputDescription__EEAgd"}},2070:function(e){e.exports={radioInput:"Encode_radioInput__31hP7",radioLabel:"Encode_radioLabel__XSlfd"}},1127:function(e){e.exports={inputContainer:"EncodeExecute_inputContainer__ah0tr",inputDescription:"EncodeExecute_inputDescription__Ru1Ex"}},7615:function(e){e.exports={inputContainer:"EncodeSetData_inputContainer__xql_v",inputDescription:"EncodeSetData_inputDescription__B5kIz",buttonWidth:"EncodeSetData_buttonWidth__dasNO",keyValueBox:"EncodeSetData_keyValueBox__wD11K",closeButton:"EncodeSetData_closeButton__OxS00"}},2707:function(e){e.exports={inputContainer:"EncodeTransferOwnership_inputContainer__GYtp_",inputDescription:"EncodeTransferOwnership_inputDescription__e3KbE"}},8078:function(e){e.exports={codeBox:"EncodedPayload_codeBox__qzpbE"}},797:function(e,s,a){"use strict";function n(e,s){(null==s||s>e.length)&&(s=e.length);for(var a=0,n=new Array(s);a<s;a++)n[a]=e[a];return n}function t(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,s){if(e){if("string"===typeof e)return n(e,s);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,s):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(s,{Z:function(){return t}})}},function(e){e.O(0,[543,778,774,888,179],(function(){return s=4240,e(e.s=s);var s}));var s=e.O();_N_E=s}]);