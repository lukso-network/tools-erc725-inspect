(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[377],{163:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/inspector",function(){return t(1864)}])},926:function(e,s,t){"use strict";var n,r=t(5893),a=t(7294),c=t(3538),i=t(1438);!function(e){e.UP="UP",e.Asset="Asset"}(n||(n={}));s.Z=function(e){var s=e.onClick,t=(0,a.useContext)(c.J).network,l=function(e){var r="";switch(e){case n.UP:switch(t.name){case"MAINNET":r=i.XS.MAINNET_UP;break;case"TESTNET":r=i.XS.TESTNET_UP}break;case n.Asset:switch(t.name){case"MAINNET":r=i.XS.MAINNET_LSP7;break;case"TESTNET":r=i.XS.TESTNET_LS7}}s(r)};return(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{className:"button is-light is-small my-4",onClick:function(){return l(n.UP)},children:"Try with a Universal Profile Sample Address"}),(0,r.jsx)("button",{className:"button is-light is-small my-4 ml-2",onClick:function(){return l(n.Asset)},children:"Try with a Digital Asset Sample Address"})]})}},1438:function(e,s,t){"use strict";t.d(s,{XJ:function(){return c},XS:function(){return n},qU:function(){return a},uZ:function(){return r}});var n,r=[{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"}],a=[{inputs:[{internalType:"bytes32",name:"dataKey",type:"bytes32"}],name:"getData",outputs:[{internalType:"bytes",name:"dataValue",type:"bytes"}],stateMutability:"view",type:"function"}],c=[{inputs:[{internalType:"bytes32[]",name:"dataKeys",type:"bytes32[]"}],name:"getDataBatch",outputs:[{internalType:"bytes[]",name:"dataValues",type:"bytes[]"}],stateMutability:"view",type:"function"}];!function(e){e.MAINNET_UP="0x0F4180da178ed1C71398a57ca8Cb177F69591f1f",e.TESTNET_UP="0x027b6f7be4399727d4e0132c2cE027Cd3e015364",e.MAINNET_LSP7="0x8DA488C29FB873c9561cCF5FF44Dda6C1DedDC37",e.TESTNET_LS7="0x41b35F490EB6325001fC94E92C58b9d9CC61586D"}(n||(n={}))},9366:function(e,s,t){"use strict";t.d(s,{Z:function(){return o}});var n=t(7568),r=t(7582),a=t(7294),c=t(7918),i=t.n(c),l=t(3538);function o(){var e=(0,a.useState)(),s=e[0],t=e[1],c=(0,a.useContext)(l.J).network;return(0,a.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){return(0,r.__generator)(this,(function(e){return[2,new(i())(c.rpc)]}))}));return function(){return e.apply(this,arguments)}}();e().then((function(e){t(e)}))}),[c]),s}},1864:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return D}});var n=t(7568),r=t(7582),a=t(5893),c=t(1163),i=t(9008),l=t.n(i),o=t(7294),u=t(8269),d=t(7274),h=t(3538),f=function(e){var s=e.address,t=e.showInspectButton,n=void 0===t||t,r=(0,o.useContext)(h.J).network.name.toLocaleLowerCase();return(0,a.jsxs)("div",{className:"buttons is-centered are-small pt-2",children:[(0,a.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://wallet.universalprofile.cloud/".concat(s,"?network=").concat(r),children:"View on UP as Profile \ud83e\uddd1\u200d\ud83c\udfa4"}),(0,a.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://wallet.universalprofile.cloud/asset/".concat(s,"?network=").concat(r),children:"View on UP as Asset \ud83d\udc57"}),(0,a.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://explorer.execution.".concat(r,".lukso.network/address/").concat(s),children:"View on Blockscout \u26d3"}),n&&(0,a.jsx)("a",{className:"button is-success is-normal",href:"".concat(window.location.href.split("?")[0],"?address=").concat(s),children:"ERC725 Inspect \ud83d\udd0d"})]})},m=t(2070),p=t(733),x=t(9366);const v=o.createContext({});function g({baseColor:e,highlightColor:s,width:t,height:n,borderRadius:r,circle:a,direction:c,duration:i,enableAnimation:l=true}){const o={};return"rtl"===c&&(o["--animation-direction"]="reverse"),"number"===typeof i&&(o["--animation-duration"]=`${i}s`),l||(o["--pseudo-element-display"]="none"),"string"!==typeof t&&"number"!==typeof t||(o.width=t),"string"!==typeof n&&"number"!==typeof n||(o.height=n),"string"!==typeof r&&"number"!==typeof r||(o.borderRadius=r),a&&(o.borderRadius="50%"),"undefined"!==typeof e&&(o["--base-color"]=e),"undefined"!==typeof s&&(o["--highlight-color"]=s),o}function y({count:e=1,wrapper:s,className:t,containerClassName:n,containerTestId:r,circle:a=!1,style:c,...i}){var l,u,d;const h=o.useContext(v),f={...i};for(const[o,v]of Object.entries(i))"undefined"===typeof v&&delete f[o];const m={...h,...f,circle:a},p={...c,...g(m)};let x="react-loading-skeleton";t&&(x+=` ${t}`);const y=null!==(l=m.inline)&&void 0!==l&&l,b=[],j=Math.ceil(e);for(let v=0;v<j;v++){let s=p;if(j>e&&v===j-1){const t=null!==(u=s.width)&&void 0!==u?u:"100%",n=e%1,r="number"===typeof t?t*n:`calc(${t} * ${n})`;s={...s,width:r}}const t=o.createElement("span",{className:x,style:s,key:v},"\u200c");y?b.push(t):b.push(o.createElement(o.Fragment,{key:v},t,o.createElement("br",null)))}return o.createElement("span",{className:n,"data-testid":r,"aria-live":"polite","aria-busy":null===(d=m.enableAnimation)||void 0===d||d},s?b.map(((e,t)=>o.createElement(s,{key:t},e))):b)}var b,j=t(4030),S=function(e){var s=e.text,t=e.isLight,n=e.colorClass;return n+=t?" is-light":"",(0,a.jsx)("span",{className:"tag mr-2 ".concat(n),children:s})},N=function(e){var s=e.name,t=e.symbol;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"tags has-addons mr-2",style:{display:"inline"},children:[(0,a.jsx)("span",{className:"tag is-info",children:"name:"}),(0,a.jsx)("span",{className:"tag is-light",children:s})]}),(0,a.jsxs)("div",{className:"tags has-addons",style:{display:"inline"},children:[(0,a.jsx)("span",{className:"tag is-info",children:"symbol:"}),(0,a.jsx)("span",{className:"tag is-light",children:t})]})]})},k=function(e){var s=e.address,t=(0,x.Z)(),c=(0,o.useContext)(h.J).network,i=p.kc[c.name],l=(0,o.useState)(!0),u=l[0],f=l[1],m=(0,o.useState)(!0),v=m[0],g=m[1],b=(0,o.useState)(!1),k=b[0],P=b[1],E=(0,o.useState)(!1),C=E[0],w=E[1],L=(0,o.useState)(""),A=L[0],T=L[1],_=(0,o.useState)(""),I=_[0],R=_[1],D=function(){var e=(0,n.Z)((function(e){var n,a,c,i,l,o;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return t&&e?[4,t.eth.getCode(e)]:[2];case 1:return(n=r.sent())&&"0x"!==n?(g(!1),[4,(0,d.DE)(e,t)]):(g(!0),[2]);case 2:return a=r.sent(),c=a.isLsp7DigitalAsset,i=a.isLsp8IdentifiableDigitalAsset,P(c),w(i),[4,(0,d.Yu)(s,j.UP.LSP4.LSP4TokenName,t)];case 3:return(l=r.sent())&&T(t.utils.toUtf8(l)),[4,(0,d.Yu)(s,j.UP.LSP4.LSP4TokenSymbol,t)];case 4:return(o=r.sent())&&R(t.utils.toUtf8(o)),[2]}}))}));return function(s){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){s&&(f(!0),D(s).then((function(){return f(!1)})).catch((function(){return f(!1)})))}),[s,t]);var U=i.includes(s),M=s===p.e6,Z=v?"\ud83d\udd11 EOA":"\ud83d\udcc4 Contract",B="".concat(p.jX[c.name],"/address/").concat(s);return(0,a.jsxs)("div",{children:[(0,a.jsx)("code",{className:"mr-2",children:(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",href:B,children:s})}),(0,a.jsx)(S,{text:Z,isLight:!0}),u?(0,a.jsx)(y,{width:"120px"}):(0,a.jsxs)(a.Fragment,{children:[U&&(0,a.jsx)(S,{text:"\ud83c\udf31 - UP Recovery",colorClass:"is-success",isLight:!1}),M&&(0,a.jsx)(S,{text:"\ud83d\udce2 - LSP1 Delegate",colorClass:"is-link",isLight:!1}),k&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(S,{text:"\ud83e\ude99 - LSP7 Digital Asset",colorClass:"is-warning",isLight:!0}),(0,a.jsx)(N,{name:A,symbol:I})]}),C&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(S,{text:"\ud83c\udfa8 - LSP8 Identifiable Digital Asset",colorClass:"is-link",isLight:!0}),(0,a.jsx)(N,{name:A,symbol:I})]})]})]})},P=function(e){var s=e.address,t=e.erc725JSONSchema,c=e.value,i=(0,o.useState)([]),l=i[0],u=i[1],d=(0,o.useState)({key:"",name:"",value:[]}),h=d[0],v=d[1],g=(0,x.Z)();(0,o.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){var e,n,a,i,l;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),s&&void 0!==g?(e=[t],n=new m.pY(e,s,g.currentProvider),a=n.decodeData([{keyName:t.name,value:c}]),u(a),"Array"!==t.keyType?[3,2]:[4,n.getData(t.name)]):[3,2];case 1:i=r.sent(),v(i),r.label=2;case 2:return[3,4];case 3:return l=r.sent(),console.log(l.message),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}();e()}),[s,g]);try{return"string"===typeof l[0].value?"Address"===t.valueContent?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("code",{children:c}),(0,a.jsx)("div",{className:"mt-4"}),(0,a.jsx)(f,{address:l[0].value})]}):(0,a.jsx)("code",{children:c}):void 0!==h&&Array.isArray(h.value)&&"Array"===t.keyType?0===h.value.length?(0,a.jsx)("span",{className:"help",children:"No array entries found."}):(0,a.jsx)("ul",{children:h.value.map((function(e,s){return e&&(0,a.jsx)("li",{children:(0,a.jsx)(k,{address:e.toString()})},s)}))}):"VerifiableURI"===t.valueContent||"JSONURL"===t.valueContent?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("pre",{children:JSON.stringify(l[0].value,null,4)}),(0,a.jsxs)("span",{children:["URL:",(0,a.jsx)("code",{className:"ml-2",children:l[0].value.url})]}),-1!==l[0].value.url.indexOf("ipfs://")&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("a",{className:"has-text-link button is-small is-light is-info",target:"_blank",rel:"noreferrer",href:"".concat(p.Dj,"/").concat(l[0].value.url.replace("ipfs://","")),children:"Retrieve IPFS File \u2197\ufe0f"})})]}):(0,a.jsx)("div",{children:(0,a.jsx)("pre",{children:JSON.stringify(l[0],null,4)})})}catch(y){return console.warn("Could not decode the key: ",y),(0,a.jsx)("span",{children:"Can't decode this key"})}},E=JSON.parse('[{"name":"LSP1UniversalReceiverDelegate","key":"0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47","keyType":"Singleton","valueType":"address","valueContent":"Address"},{"name":"SupportedStandards:LSP3Profile","key":"0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347","keyType":"Mapping","valueType":"bytes4","valueContent":"0x5ef83ad9"},{"name":"LSP3Profile","key":"0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5","keyType":"Singleton","valueType":"bytes","valueContent":"VerifiableURI"},{"name":"LSP5ReceivedAssets[]","key":"0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"AddressPermissions[]","key":"0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"LSP10Vaults[]","key":"0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"LSP12IssuedAssets[]","key":"0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd","keyType":"Array","valueType":"address","valueContent":"Address"}]');!function(e){e.LSP1UniversalReceiverDelegate="LSP1UniversalReceiverDelegate",e["SupportedStandards:LSP3Profile"]="SupportedStandards:LSP3Profile",e.LSP3Profile="LSP3Profile",e["LSP5ReceivedAssets[]"]="LSP5ReceivedAssets[]",e["AddressPermissions[]"]="AddressPermissions[]",e["LSP10Vaults[]"]="LSP10Vaults[]",e["LSP12IssuedAssets[]"]="LSP12IssuedAssets[]"}(b||(b={}));var C,w={LSP1UniversalReceiverDelegate:"https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver","SupportedStandards:LSP3Profile":"https://docs.lukso.tech/standards/standard-detection",LSP3Profile:"https://docs.lukso.tech/standards/universal-profile/lsp3-profile-metadata","LSP5ReceivedAssets[]":"https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets","AddressPermissions[]":"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/","LSP10Vaults[]":"https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults","LSP12IssuedAssets[]":"https://docs.lukso.tech/standards/universal-profile/lsp12-issued-assets"},L=function(e){var s=e.address,t=e.isErc725Y,c=(0,o.useState)([]),i=c[0],l=c[1],u=(0,x.Z)();return(0,o.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){var e,n,a,c;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:if(!u)return[2];if(!t)return[2];e=[],r.label=1;case 1:return r.trys.push([1,4,,5]),t?(n=E.map((function(e){return e.key})),[4,(0,d.iK)(s,n,u)]):[3,3];case 2:(a=r.sent()).map((function(s,t){e.push({key:n[t],value:a[t],schema:E[t]})})),r.label=3;case 3:return[3,5];case 4:return c=r.sent(),console.error(c),[3,5];case 5:return l(e),[2]}}))}));return function(){return e.apply(this,arguments)}}();e()}),[s,u,t]),u?s?(0,a.jsx)("div",{className:"columns is-multiline",children:i.map((function(e){return(0,a.jsx)("div",{className:"column is-full mt-4 dataKeyBox",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsxs)("div",{className:"title is-4",children:[e.schema.name in b?(0,a.jsxs)("a",{href:w[e.schema.name],target:"_blank",rel:"noopener noreferrer",className:"home-link",children:[e.schema.name," \u2197\ufe0f"]}):e.schema.name,(0,a.jsx)("span",{className:"tag is-small mb-2 mx-2 is-info",children:e.schema.keyType})]}),(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Key:"})," ",(0,a.jsx)("code",{children:e.schema.key})]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Raw value: "}),(0,a.jsx)("span",{className:"tag is-small mx-2 is-link is-light",children:e.schema.valueType}),(0,a.jsx)("code",{children:e.value})]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Value Content: "}),(0,a.jsx)("span",{className:"tag is-small is-link is-light",children:e.schema.valueContent.toLowerCase()})]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Decoded value: "}),(0,a.jsx)("div",{className:"my-3 mr-3",children:(0,a.jsx)(P,{address:s,erc725JSONSchema:e.schema,value:e.value})})]}),"MappingWithGrouping"===e.schema.keyType&&(0,a.jsxs)("li",{children:["Mapped address:"," ",(0,a.jsxs)("code",{children:["0x",e.schema.name.split(":").pop()]})," ",(0,a.jsx)(f,{address:"0x".concat(e.schema.name.split(":").pop())})]})]})]})},e.key)}))}):(0,a.jsx)("p",{children:"\u2b06\ufe0f enter the address of your UP"}):(0,a.jsx)("p",{children:"error: could not load provider"})},A=t(926),T=t(1304),_=t(1438);!function(e){e.KeyManager="Key Manager",e.SmartContract="Smart Contract",e.EOA="EOA"}(C||(C={}));var I=function(e){var s=e.UPAddress,t=(0,o.useState)(""),c=t[0],i=t[1],l=(0,o.useState)(),d=l[0],h=l[1],m=(0,x.Z)(),p=function(){var e=(0,n.Z)((function(e){var s,t,n;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:if(!m)return console.error("Web3 is not initialized"),[2];s=new m.eth.Contract(_.uZ,e),t=!1,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,s.methods.supportsInterface(j.Bj.LSP6KeyManager).call()];case 2:return t=r.sent(),[3,4];case 3:return n=r.sent(),console.warn(n.message),[3,4];case 4:return h(t?C.KeyManager:C.SmartContract),[2]}}))}));return function(s){return e.apply(this,arguments)}}(),v=function(){var e=(0,n.Z)((function(e){var s;return(0,r.__generator)(this,(function(t){switch(t.label){case 0:if(!m)return console.error("Web3 is not initialized"),[2];t.label=1;case 1:return t.trys.push([1,4,,5]),[4,m.eth.getCode(e)];case 2:return"0x"===t.sent()?(h(C.EOA),[2]):[4,p(e)];case 3:return t.sent(),[3,5];case 4:return s=t.sent(),console.log(s),[3,5];case 5:return[2]}}))}));return function(s){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){if(m&&s&&(0,u.isAddress)(s)){var e=new m.eth.Contract(T.Mt,s),t=function(){var s=(0,n.Z)((function(){var s;return(0,r.__generator)(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,e.methods.owner().call().then((function(e){i(e),v(e)}))];case 1:return t.sent(),[3,3];case 2:return s=t.sent(),console.log(s),[3,3];case 3:return[2]}}))}));return function(){return s.apply(this,arguments)}}();t()}}),[s,m]),(0,a.jsx)("div",{className:"columns is-multiline mt-3",children:(0,a.jsx)("div",{className:"column is-full dataKeyBox",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)("div",{className:"title is-4 home-link",children:(0,a.jsx)("a",{href:"https://docs.lukso.tech/standards/lsp-background/erc725/#ownership",target:"_blank",rel:"noopener noreferrer",children:"Owner \u2197\ufe0f"})}),(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Owner address:"}),(0,a.jsx)("span",{className:"tag is-small mb-2 mx-2 is-link is-light",children:"address"}),(0,a.jsx)("code",{children:c})]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Owner type:"})," ",(0,a.jsx)("code",{children:d})]})]}),(0,a.jsx)(f,{address:c})]})})})},R=t(665),D=function(){var e=(0,c.useRouter)(),s=(0,x.Z)(),t=(0,o.useState)(!1),i=t[0],m=t[1],v=(0,o.useState)(""),g=v[0],y=v[1],b=(0,o.useContext)(h.J),j=b.network,S=b.setNetwork,N=(0,o.useState)(!1),k=N[0],P=N[1],E=(0,o.useState)(!1),C=E[0],w=E[1],T=(0,o.useState)(!1),D=T[0],U=T[1],M=(0,o.useState)(!1),Z=M[0],B=M[1],F=(0,o.useState)(!1),O=F[0],Y=F[1],K=(0,o.useState)(!1),V=K[0],J=K[1],X=(0,o.useState)(!1),q=X[0],$=X[1],G=(0,o.useState)(!1),W=G[0],z=G[1],H=(0,o.useState)(!1),Q=H[0],ee=H[1],se=(0,o.useState)(""),te=se[0],ne=se[1],re=(0,o.useState)(!0),ae=re[0],ce=re[1];(0,o.useEffect)((function(){e.query.address&&(y(e.query.address.toString()),function(){var s,t=null===(s=e.query.network)||void 0===s?void 0:s.toString().toUpperCase();if(t&&t!==j.name)switch(t){case R.Y.TESTNET:S({name:R.Y.TESTNET,rpc:p.$G[R.Y.TESTNET],imgUrl:"/lukso.png"});break;case R.Y.MAINNET:S({name:R.Y.MAINNET,rpc:p.$G[R.Y.MAINNET],imgUrl:"/lukso.png"})}}())}),[e.query,j.name,S]),(0,o.useEffect)((function(){var t=function(){var t=(0,n.Z)((function(){var t;return(0,r.__generator)(this,(function(n){switch(n.label){case 0:return s?(P(!1),w(!1),ne(""),0===g.length?(ce(!0),ne("Empty input field"),[2]):(ce(!1),(0,u.isAddress)(g)?(e.push("/inspector?address=".concat(g,"&network=").concat(j.name.toLowerCase())),m(!0),[4,(0,d.DE)(g,s)]):(ne("Address is not valid"),[2]))):[2];case 1:return t=n.sent(),P(t.isErc725X),w(t.isErc725Y),U(t.isErc1271),B(t.isLsp0Erc725Account),Y(t.isLsp1UniversalReceiver),J(t.isLsp6KeyManager),$(t.isLsp7DigitalAsset),z(t.isLsp8IdentifiableDigitalAsset),ee(t.isLsp9Vault),m(!1),[2]}}))}));return function(){return t.apply(this,arguments)}}();t()}),[g,s,te]);var ie=function(){return k||C||O||V||Z||ae||i?ae||i?null:(0,a.jsxs)("div",{className:"help is-success inspect-result mt-4",children:[(0,a.jsx)("h3",{className:"title is-3",children:"Supported Standards"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!k&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725x---generic-executor",target:"_blank",rel:"noreferrer",children:"ERC725X \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!C&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store",target:"_blank",rel:"noreferrer",children:"ERC725Y \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!D&&"is-outlined"),href:"https://eips.ethereum.org/EIPS/eip-1271",target:"_blank",rel:"noreferrer",children:"ERC1271 \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!Z&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store",target:"_blank",rel:"noreferrer",children:"LSP0ERC725Account \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!O&&"is-outlined"),href:"https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver",target:"_blank",rel:"noreferrer",children:"LSP1UniversalReceiver \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!V&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager",target:"_blank",rel:"noreferrer",children:"LSP6KeyManager \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!q&&"is-outlined"),href:"https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset",target:"_blank",rel:"noreferrer",children:"LSP7DigitalAsset \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!W&&"is-outlined"),href:"https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset",target:"_blank",rel:"noreferrer",children:"LSP8IdentifiableDigitalAsset \u2197\ufe0f"}),(0,a.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!Q&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp9-vault",target:"_blank",rel:"noreferrer",children:"LSP9Vault \u2197\ufe0f"})]}):(0,a.jsxs)("div",{className:"help is-danger inspect-result",children:[(0,a.jsx)("p",{children:"This address is not a valid ERC725 or LSP contract."}),(0,a.jsx)("p",{children:"Please check if the address is correct."})]})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l(),{children:(0,a.jsx)("title",{children:"Inspect - ERC725 Tools"})}),(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)("h2",{className:"title is-2",children:"Inspector"}),(0,a.jsx)("article",{className:"message is-info",children:(0,a.jsxs)("div",{className:"message-body",children:["Retrieve and decode all",(0,a.jsx)("a",{href:"https://github.com/ERC725Alliance/ERC725",target:"_blank",rel:"noreferrer",className:"mx-1",children:"ERC725Y"}),"data keys of a smart contract using the",(0,a.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md",target:"_blank",rel:"noreferrer",className:"mx-1",children:"LSP2 ERC725YJSONSchema"}),"specification."]})}),(0,a.jsx)("article",{className:"message",children:(0,a.jsxs)("div",{className:"message-body",children:["It\u2018s using the",(0,a.jsx)("a",{href:"https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions",target:"_blank",rel:"noreferrer",className:"mx-1",children:"getData"}),"function of the",(0,a.jsx)("a",{href:"https://www.npmjs.com/package/@erc725/erc725.js",target:"_blank",rel:"noreferrer",className:"mx-1",children:"erc725.js"}),"library."]})}),(0,a.jsx)("div",{className:"columns",children:(0,a.jsx)("div",{className:"column is-half",children:(0,a.jsxs)("div",{className:"field",children:[(0,a.jsx)("h3",{className:"title is-3",children:"Contract Address"}),(0,a.jsxs)("div",{className:"control mb-0",children:[(0,a.jsx)("input",{className:"input",type:"text",placeholder:_.XS.TESTNET_UP,value:g,onChange:function(e){y(e.target.value)}}),(0,a.jsx)(A.Z,{onClick:function(e){return y(e)}})]}),(0,a.jsx)("div",{className:"columns",children:(0,a.jsx)("div",{className:"column is-one-half",children:te&&!ae?(0,a.jsx)("div",{className:"help is-danger",children:te}):(0,a.jsx)(ie,{})})})]})})}),(0,a.jsx)("div",{className:"container",children:!te&&!i&&(k||C||O||V||Z)&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{className:"title is-3",children:"Instance and Ownership"}),(0,a.jsx)("div",{className:"columns is-multiline mt-3",children:(0,a.jsx)("div",{className:"column is-full dataKeyBox",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)("div",{className:"title is-4",children:(0,a.jsx)("a",{href:"https://docs.lukso.tech/standards/lsp-background/erc725",target:"_blank",rel:"noopener noreferrer",className:"home-link",children:"Contract \u2197\ufe0f"})}),(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Contract address:"}),(0,a.jsx)("span",{className:"tag is-small mb-2 mx-2 is-link is-light",children:"address"}),(0,a.jsx)("code",{children:g})]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Contract type:"})," ",(0,a.jsx)("code",{children:"ERC725-compatible"})]})]}),(0,a.jsx)(f,{address:g,showInspectButton:!1})]})})})]}),k&&(0,a.jsx)(I,{UPAddress:g}),(0,a.jsx)("h3",{className:"title is-3",children:"Data Keys"}),(0,a.jsx)(L,{address:g,isErc725Y:C})]})})]})]})}},7274:function(e,s,t){"use strict";t.d(s,{DE:function(){return o},Yu:function(){return l},iK:function(){return i}});var n=t(7568),r=t(7582),a=t(4030),c=t(1438),i=function(){var e=(0,n.Z)((function(e,s,t){var n,a,i;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:n=new t.eth.Contract(c.XJ,e),a=[],r.label=1;case 1:return r.trys.push([1,3,,4]),[4,n.methods.getDataBatch(s).call()];case 2:return a=r.sent(),[3,4];case 3:return i=r.sent(),console.log(i.message),[3,4];case 4:return[2,a]}}))}));return function(s,t,n){return e.apply(this,arguments)}}(),l=function(){var e=(0,n.Z)((function(e,s,t){var n,a,i;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:n=new t.eth.Contract(c.qU,e),a=null,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,n.methods.getData(s).call()];case 2:return a=r.sent(),[3,4];case 3:return i=r.sent(),console.log(i.message),[3,4];case 4:return[2,a]}}))}));return function(s,t,n){return e.apply(this,arguments)}}(),o=function(){var e=(0,n.Z)((function(e,s){var t,n,i,l,o,u,d,h,f,m,p,x,v,g,y,b,j,S,N;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:t=new s.eth.Contract(c.uZ,e),n=!1,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,t.methods.supportsInterface(a.Bj.ERC725X).call()];case 2:return n=r.sent(),[3,4];case 3:return i=r.sent(),console.log(i.message),[3,4];case 4:l=!1,r.label=5;case 5:return r.trys.push([5,7,,8]),[4,t.methods.supportsInterface(a.Bj.ERC725Y).call()];case 6:return l=r.sent(),[3,8];case 7:return o=r.sent(),console.warn(o.message),[3,8];case 8:u=!1,r.label=9;case 9:return r.trys.push([9,11,,12]),[4,t.methods.supportsInterface(a.Bj.ERC1271).call()];case 10:return u=r.sent(),[3,12];case 11:return d=r.sent(),console.warn(d.message),[3,12];case 12:h=!1,r.label=13;case 13:return r.trys.push([13,15,,16]),[4,t.methods.supportsInterface(a.Bj.LSP0ERC725Account).call()];case 14:return h=r.sent(),[3,16];case 15:return f=r.sent(),console.warn(f.message),[3,16];case 16:m=!1,r.label=17;case 17:return r.trys.push([17,19,,20]),[4,t.methods.supportsInterface(a.Bj.LSP1UniversalReceiver).call()];case 18:return m=r.sent(),[3,20];case 19:return p=r.sent(),console.warn(p.message),[3,20];case 20:x=!1,r.label=21;case 21:return r.trys.push([21,23,,24]),[4,t.methods.supportsInterface(a.Bj.LSP6KeyManager).call()];case 22:return x=r.sent(),[3,24];case 23:return v=r.sent(),console.warn(v.message),[3,24];case 24:g=!1,r.label=25;case 25:return r.trys.push([25,27,,28]),[4,t.methods.supportsInterface(a.Bj.LSP7DigitalAsset).call()];case 26:return g=r.sent(),[3,28];case 27:return y=r.sent(),console.warn(y.message),[3,28];case 28:b=!1,r.label=29;case 29:return r.trys.push([29,31,,32]),[4,t.methods.supportsInterface(a.Bj.LSP8IdentifiableDigitalAsset).call()];case 30:return b=r.sent(),[3,32];case 31:return j=r.sent(),console.warn(j.message),[3,32];case 32:S=!1,r.label=33;case 33:return r.trys.push([33,35,,36]),[4,t.methods.supportsInterface(a.Bj.LSP9Vault).call()];case 34:return S=r.sent(),[3,36];case 35:return N=r.sent(),console.warn(N.message),[3,36];case 36:return[2,{isErc725X:n,isErc725Y:l,isErc1271:u,isLsp0Erc725Account:h,isLsp1UniversalReceiver:m,isLsp6KeyManager:x,isLsp7DigitalAsset:g,isLsp8IdentifiableDigitalAsset:b,isLsp9Vault:S}]}}))}));return function(s,t){return e.apply(this,arguments)}}()},6601:function(){},9214:function(){},5568:function(){},2361:function(){},4616:function(){}},function(e){e.O(0,[543,0,70,778,774,888,179],(function(){return s=163,e(e.s=s);var s}));var s=e.O();_N_E=s}]);