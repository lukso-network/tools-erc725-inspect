(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[377],{163:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/inspector",function(){return r(2713)}])},926:function(e,s,r){"use strict";var t,n=r(5893),a=r(7294),c=r(3538),l=r(1438);!function(e){e.UP="UP",e.Asset="Asset"}(t||(t={}));s.Z=function(e){var s=e.onClick,r=(0,a.useContext)(c.J).network,i=function(e){var n="";switch(e){case t.UP:switch(r.name){case"MAINNET":n=l.X.MAINNET_UP;break;case"TESTNET":n=l.X.TESTNET_UP}break;case t.Asset:switch(r.name){case"MAINNET":n=l.X.MAINNET_LSP7;break;case"TESTNET":n=l.X.TESTNET_LS7}}s(n)};return(0,n.jsxs)("div",{children:[(0,n.jsx)("button",{className:"button is-light is-small my-4",onClick:function(){return i(t.UP)},children:"Try with a Universal Profile Sample Address"}),(0,n.jsx)("button",{className:"button is-light is-small my-4 ml-2",onClick:function(){return i(t.Asset)},children:"Try with a Digital Asset Sample Address"})]})}},1438:function(e,s,r){"use strict";r.d(s,{X:function(){return t},u:function(){return n}});var t,n=[{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"}];!function(e){e.MAINNET_UP="0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa",e.TESTNET_UP="0x027b6f7be4399727d4e0132c2cE027Cd3e015364",e.MAINNET_LSP7="0x",e.TESTNET_LS7="0xD02629cdA51b46408348CE94D1D28200524FFC33"}(t||(t={}))},9366:function(e,s,r){"use strict";r.d(s,{Z:function(){return o}});var t=r(7568),n=r(7582),a=r(7294),c=r(7918),l=r.n(c),i=r(3538);function o(){var e=(0,a.useState)(),s=e[0],r=e[1],c=(0,a.useContext)(i.J).network;return(0,a.useEffect)((function(){var e=function(){var e=(0,t.Z)((function(){return(0,n.__generator)(this,(function(e){return[2,new(l())(c.rpc)]}))}));return function(){return e.apply(this,arguments)}}();e().then((function(e){r(e)}))}),[c]),s}},2713:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return L}});var t,n=r(7568),a=r(7582),c=r(5893),l=r(1163),i=r(9008),o=r.n(i),u=r(7294),d=r(8269),h=r(7274),f=r(3538),p=function(e){var s=e.address,r=e.showInspectButton,t=void 0===r||r,n=(0,u.useContext)(f.J).network.name.toLocaleLowerCase();return(0,c.jsxs)("div",{className:"buttons is-centered are-small pt-2",children:[(0,c.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://wallet.universalprofile.cloud/".concat(s,"?network=").concat(n),children:"View on UP as Profile \ud83e\uddd1\u200d\ud83c\udfa4"}),(0,c.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://wallet.universalprofile.cloud/asset/".concat(s,"?network=").concat(n),children:"View on UP as Asset \ud83d\udc57"}),(0,c.jsx)("a",{className:"button is-success is-normal",target:"_blank",rel:"noreferrer",href:"https://explorer.execution.".concat(n,".lukso.network/address/").concat(s),children:"View on Blockscout \u26d3"}),t&&(0,c.jsx)("a",{className:"button is-success is-normal",href:"".concat(window.location.href.split("?")[0],"?address=").concat(s),children:"ERC725 Inspect \ud83d\udd0d"})]})},m=r(8629),v=r(733),x=r(9366),j=function(e){var s=e.address,r=e.erc725JSONSchema,t=e.value,l=(0,u.useState)([]),i=l[0],o=l[1],d=(0,u.useState)({key:"",name:"",value:[]}),h=d[0],f=d[1],j=(0,x.Z)();(0,u.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){var e,n,c,l,i;return(0,a.__generator)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,4]),s&&void 0!==j?(e=[r],n=new m.pY(e,s,j.currentProvider),c=n.decodeData([{keyName:r.name,value:t}]),o(c),"Array"!==r.keyType?[3,2]:[4,n.getData(r.name)]):[3,2];case 1:l=a.sent(),f(l),a.label=2;case 2:return[3,4];case 3:return i=a.sent(),console.log(i.message),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}();e()}),[s,j]);try{return"string"===typeof i[0].value?"Address"===r.valueContent?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("code",{children:t}),(0,c.jsx)("div",{className:"mt-4"}),(0,c.jsx)(p,{address:i[0].value})]}):(0,c.jsx)("code",{children:t}):void 0!==h&&Array.isArray(h.value)&&"Array"===r.keyType?0===h.value.length?(0,c.jsx)("span",{className:"help",children:"No array entries found."}):(0,c.jsx)("ul",{children:h.value.map((function(e,s){return(0,c.jsx)("li",{children:(0,c.jsx)("code",{children:e})},s)}))}):"JSONURL"===r.valueContent?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("pre",{children:JSON.stringify(i[0].value,null,4)}),(0,c.jsxs)("li",{children:[(0,c.jsxs)("span",{children:["URL:",(0,c.jsx)("code",{className:"ml-2",children:i[0].value.url})]}),-1!==i[0].value.url.indexOf("ipfs://")&&(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("a",{className:"has-text-link button is-small is-light is-info",target:"_blank",rel:"noreferrer",href:"".concat(v.Dj,"/").concat(i[0].value.url.replace("ipfs://","")),children:"Retrieve IPFS File \u2197\ufe0f"})})]})]}):(0,c.jsx)("div",{children:(0,c.jsx)("pre",{children:JSON.stringify(i[0],null,4)})})}catch(g){return console.warn("Could not decode the key: ",g),(0,c.jsx)("span",{children:"Can't decode this key"})}},g=JSON.parse('[{"name":"LSP1UniversalReceiverDelegate","key":"0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47","keyType":"Singleton","valueType":"address","valueContent":"Address"},{"name":"SupportedStandards:LSP3Profile","key":"0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347","keyType":"Mapping","valueType":"bytes4","valueContent":"0x5ef83ad9"},{"name":"LSP3Profile","key":"0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5","keyType":"Singleton","valueType":"bytes","valueContent":"JSONURL"},{"name":"LSP5ReceivedAssets[]","key":"0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"AddressPermissions[]","key":"0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"LSP10Vaults[]","key":"0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06","keyType":"Array","valueType":"address","valueContent":"Address"},{"name":"LSP12IssuedAssets[]","key":"0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd","keyType":"Array","valueType":"address","valueContent":"Address"}]');!function(e){e.LSP1UniversalReceiverDelegate="LSP1UniversalReceiverDelegate",e["SupportedStandards:LSP3Profile"]="SupportedStandards:LSP3Profile",e.LSP3Profile="LSP3Profile",e["LSP5ReceivedAssets[]"]="LSP5ReceivedAssets[]",e["AddressPermissions[]"]="AddressPermissions[]",e["LSP10Vaults[]"]="LSP10Vaults[]",e["LSP12IssuedAssets[]"]="LSP12IssuedAssets[]"}(t||(t={}));var b,y={LSP1UniversalReceiverDelegate:"https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver","SupportedStandards:LSP3Profile":"https://docs.lukso.tech/standards/standard-detection",LSP3Profile:"https://docs.lukso.tech/standards/universal-profile/lsp3-profile-metadata","LSP5ReceivedAssets[]":"https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets","AddressPermissions[]":"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/","LSP10Vaults[]":"https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults","LSP12IssuedAssets[]":"https://docs.lukso.tech/standards/universal-profile/lsp12-issued-assets"},S=function(e){var s=e.address,r=e.isErc725Y,l=(0,u.useState)([]),i=l[0],o=l[1],d=(0,x.Z)();return(0,u.useEffect)((function(){var e=function(){var e=(0,n.Z)((function(){var e,t,n,c;return(0,a.__generator)(this,(function(a){switch(a.label){case 0:if(!d)return[2];if(!r)return[2];e=[],a.label=1;case 1:return a.trys.push([1,4,,5]),r?(t=g.map((function(e){return e.key})),[4,(0,h.iK)(s,t,d)]):[3,3];case 2:(n=a.sent()).map((function(s,r){e.push({key:t[r],value:n[r],schema:g[r]})})),a.label=3;case 3:return[3,5];case 4:return c=a.sent(),console.error(c),[3,5];case 5:return o(e),[2]}}))}));return function(){return e.apply(this,arguments)}}();e()}),[s,d,r]),d?s?(0,c.jsx)("div",{className:"columns is-multiline",children:i.map((function(e){return(0,c.jsx)("div",{className:"column is-full mt-4 dataKeyBox",children:(0,c.jsxs)("div",{className:"content",children:[(0,c.jsxs)("div",{className:"title is-4",children:[e.schema.name in t?(0,c.jsxs)("a",{href:y[e.schema.name],target:"_blank",rel:"noopener noreferrer",className:"home-link",children:[e.schema.name," \u2197\ufe0f"]}):e.schema.name,(0,c.jsx)("span",{className:"tag is-small mb-2 mx-2 is-info",children:e.schema.keyType})]}),(0,c.jsxs)("ul",{children:[(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Key:"})," ",(0,c.jsx)("code",{children:e.schema.key})]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Raw value: "}),(0,c.jsx)("span",{className:"tag is-small mx-2 is-link is-light",children:e.schema.valueType}),(0,c.jsx)("code",{children:e.value})]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Value Content: "}),(0,c.jsx)("span",{className:"tag is-small is-link is-light",children:e.schema.valueContent.toLowerCase()})]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Decoded value: "}),(0,c.jsx)("div",{className:"my-3 mr-3",children:(0,c.jsx)(j,{address:s,erc725JSONSchema:e.schema,value:e.value})})]}),"MappingWithGrouping"===e.schema.keyType&&(0,c.jsxs)("li",{children:["Mapped address:"," ",(0,c.jsxs)("code",{children:["0x",e.schema.name.split(":").pop()]})," ",(0,c.jsx)(p,{address:"0x".concat(e.schema.name.split(":").pop())})]})]})]})},e.key)}))}):(0,c.jsx)("p",{children:"\u2b06\ufe0f enter the address of your UP"}):(0,c.jsx)("p",{children:"error: could not load provider"})},k=r(926),N=r(1304),P=r(1438),E=r(4030);!function(e){e.KeyManager="Key Manager",e.SmartContract="Smart Contract",e.EOA="EOA"}(b||(b={}));var w=function(e){var s=e.UPAddress,r=(0,u.useState)(""),t=r[0],l=r[1],i=(0,u.useState)(),o=i[0],h=i[1],f=(0,x.Z)(),m=function(){var e=(0,n.Z)((function(e){var s,r,t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:if(!f)return console.error("Web3 is not initialized"),[2];s=new f.eth.Contract(P.u,e),r=!1,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,s.methods.supportsInterface(E.Bj.LSP6KeyManager).call()];case 2:return r=n.sent(),[3,4];case 3:return t=n.sent(),console.warn(t.message),[3,4];case 4:return h(r?b.KeyManager:b.SmartContract),[2]}}))}));return function(s){return e.apply(this,arguments)}}(),v=function(){var e=(0,n.Z)((function(e){var s;return(0,a.__generator)(this,(function(r){switch(r.label){case 0:if(!f)return console.error("Web3 is not initialized"),[2];r.label=1;case 1:return r.trys.push([1,4,,5]),[4,f.eth.getCode(e)];case 2:return"0x"===r.sent()?(h(b.EOA),[2]):[4,m(e)];case 3:return r.sent(),[3,5];case 4:return s=r.sent(),console.log(s),[3,5];case 5:return[2]}}))}));return function(s){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){if(f&&s&&(0,d.isAddress)(s)){var e=new f.eth.Contract(N.Mt,s),r=function(){var s=(0,n.Z)((function(){var s;return(0,a.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,e.methods.owner().call().then((function(e){l(e),v(e)}))];case 1:return r.sent(),[3,3];case 2:return s=r.sent(),console.log(s),[3,3];case 3:return[2]}}))}));return function(){return s.apply(this,arguments)}}();r()}}),[s,f]),(0,c.jsx)("div",{className:"columns is-multiline mt-3",children:(0,c.jsx)("div",{className:"column is-full dataKeyBox",children:(0,c.jsxs)("div",{className:"content",children:[(0,c.jsx)("div",{className:"title is-4 home-link",children:(0,c.jsx)("a",{href:"https://docs.lukso.tech/standards/lsp-background/erc725/#ownership",target:"_blank",rel:"noopener noreferrer",children:"Owner \u2197\ufe0f"})}),(0,c.jsxs)("ul",{children:[(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Owner address:"}),(0,c.jsx)("span",{className:"tag is-small mb-2 mx-2 is-link is-light",children:"address"}),(0,c.jsx)("code",{children:t})]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Owner type:"})," ",(0,c.jsx)("code",{children:o})]})]}),(0,c.jsx)(p,{address:t})]})})})},L=function(){var e=(0,l.useRouter)(),s=(0,x.Z)(),r=(0,u.useState)(!1),t=r[0],i=r[1],f=(0,u.useState)(""),m=f[0],v=f[1],j=(0,u.useState)(!1),g=j[0],b=j[1],y=(0,u.useState)(!1),N=y[0],E=y[1],L=(0,u.useState)(!1),A=L[0],_=L[1],C=(0,u.useState)(!1),T=C[0],I=C[1],R=(0,u.useState)(!1),D=R[0],U=R[1],M=(0,u.useState)(!1),O=M[0],B=M[1],Z=(0,u.useState)(!1),K=Z[0],J=Z[1],V=(0,u.useState)(!1),X=V[0],F=V[1],Y=(0,u.useState)(!1),q=Y[0],W=Y[1],z=(0,u.useState)(""),G=z[0],H=z[1],Q=(0,u.useState)(!0),$=Q[0],ee=Q[1];(0,u.useEffect)((function(){e.query.address&&v(e.query.address)}),[e.query.address]),(0,u.useEffect)((function(){var r=function(){var r=(0,n.Z)((function(){var r;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return s?(b(!1),E(!1),H(""),0===m.length?(ee(!0),H("Empty input field"),[2]):(ee(!1),(0,d.isAddress)(m)?(e.push("/inspector?address=".concat(m)),i(!0),[4,(0,h.DE)(m,s)]):(H("Address is not valid"),[2]))):[2];case 1:return r=t.sent(),b(r.isErc725X),E(r.isErc725Y),_(r.isErc1271),I(r.isLsp0Erc725Account),U(r.isLsp1UniversalReceiver),B(r.isLsp6KeyManager),J(r.isLsp7DigitalAsset),F(r.isLsp8IdentifiableDigitalAsset),W(r.isLsp9Vault),i(!1),[2]}}))}));return function(){return r.apply(this,arguments)}}();r()}),[m,s,G]);var se=function(){return g||N||D||O||T||$||t?$||t?null:(0,c.jsxs)("div",{className:"help is-success inspect-result mt-4",children:[(0,c.jsx)("h3",{className:"title is-3",children:"Supported Standards"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!g&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725x---generic-executor",target:"_blank",rel:"noreferrer",children:"ERC725X \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!N&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store",target:"_blank",rel:"noreferrer",children:"ERC725Y \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!A&&"is-outlined"),href:"https://eips.ethereum.org/EIPS/eip-1271",target:"_blank",rel:"noreferrer",children:"ERC1271 \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!T&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store",target:"_blank",rel:"noreferrer",children:"LSP0ERC725Account \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!D&&"is-outlined"),href:"https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver",target:"_blank",rel:"noreferrer",children:"LSP1UniversalReceiver \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!O&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager",target:"_blank",rel:"noreferrer",children:"LSP6KeyManager \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!K&&"is-outlined"),href:"https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset",target:"_blank",rel:"noreferrer",children:"LSP7DigitalAsset \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!X&&"is-outlined"),href:"https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset",target:"_blank",rel:"noreferrer",children:"LSP8IdentifiableDigitalAsset \u2197\ufe0f"}),(0,c.jsx)("a",{className:"button is-info mr-2 mt-2 ".concat(!q&&"is-outlined"),href:"https://docs.lukso.tech/standards/universal-profile/lsp9-vault",target:"_blank",rel:"noreferrer",children:"LSP9Vault \u2197\ufe0f"})]}):(0,c.jsxs)("div",{className:"help is-danger inspect-result",children:[(0,c.jsx)("p",{children:"This address is not a valid ERC725 or LSP contract."}),(0,c.jsx)("p",{children:"Please check if the address is correct."})]})};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o(),{children:(0,c.jsx)("title",{children:"Inspect - ERC725 Tools"})}),(0,c.jsxs)("div",{className:"container",children:[(0,c.jsx)("h2",{className:"title is-2",children:"Inspector"}),(0,c.jsx)("article",{className:"message is-info",children:(0,c.jsxs)("div",{className:"message-body",children:["Retrieve and decode all",(0,c.jsx)("a",{href:"https://github.com/ERC725Alliance/ERC725",target:"_blank",rel:"noreferrer",className:"mx-1",children:"ERC725Y"}),"data keys of a smart contract using the",(0,c.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md",target:"_blank",rel:"noreferrer",className:"mx-1",children:"LSP2 ERC725YJSONSchema"}),"specification."]})}),(0,c.jsx)("article",{className:"message",children:(0,c.jsxs)("div",{className:"message-body",children:["It\u2018s using the",(0,c.jsx)("a",{href:"https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions",target:"_blank",rel:"noreferrer",className:"mx-1",children:"getData"}),"function of the",(0,c.jsx)("a",{href:"https://www.npmjs.com/package/@erc725/erc725.js",target:"_blank",rel:"noreferrer",className:"mx-1",children:"erc725.js"}),"library."]})}),(0,c.jsx)("div",{className:"columns",children:(0,c.jsx)("div",{className:"column is-half",children:(0,c.jsxs)("div",{className:"field",children:[(0,c.jsx)("h3",{className:"title is-3",children:"Contract Address"}),(0,c.jsxs)("div",{className:"control mb-0",children:[(0,c.jsx)("input",{className:"input",type:"text",placeholder:P.X.TESTNET_UP,value:m,onChange:function(e){v(e.target.value)}}),(0,c.jsx)(k.Z,{onClick:function(e){return v(e)}})]}),(0,c.jsx)("div",{className:"columns",children:(0,c.jsx)("div",{className:"column is-one-half",children:G&&!$?(0,c.jsx)("div",{className:"help is-danger",children:G}):(0,c.jsx)(se,{})})})]})})}),(0,c.jsx)("div",{className:"container",children:!G&&!t&&(g||N||D||O||T)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("h3",{className:"title is-3",children:"Instance and Ownership"}),(0,c.jsx)("div",{className:"columns is-multiline mt-3",children:(0,c.jsx)("div",{className:"column is-full dataKeyBox",children:(0,c.jsxs)("div",{className:"content",children:[(0,c.jsx)("div",{className:"title is-4",children:(0,c.jsx)("a",{href:"https://docs.lukso.tech/standards/lsp-background/erc725",target:"_blank",rel:"noopener noreferrer",className:"home-link",children:"Contract \u2197\ufe0f"})}),(0,c.jsxs)("ul",{children:[(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Contract address:"}),(0,c.jsx)("span",{className:"tag is-small mb-2 mx-2 is-link is-light",children:"address"}),(0,c.jsx)("code",{children:m})]}),(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:"Contract type:"})," ",(0,c.jsx)("code",{children:"ERC725-compatible"})]})]}),(0,c.jsx)(p,{address:m,showInspectButton:!1})]})})})]}),g&&(0,c.jsx)(w,{UPAddress:m}),(0,c.jsx)("h3",{className:"title is-3",children:"Data Keys"}),(0,c.jsx)(S,{address:m,isErc725Y:N})]})})]})]})}},7274:function(e,s,r){"use strict";r.d(s,{DE:function(){return u},Yu:function(){return o},iK:function(){return i}});var t=r(7568),n=r(7582),a=r(1304),c=r(4030),l=r(1438),i=function(){var e=(0,t.Z)((function(e,s,r){var t,c,l;return(0,n.__generator)(this,(function(n){switch(n.label){case 0:t=new r.eth.Contract(a.Mt,e),c=[],n.label=1;case 1:return n.trys.push([1,3,,4]),[4,t.methods.getDataBatch(s).call()];case 2:return c=n.sent(),[3,4];case 3:return l=n.sent(),console.log(l.message),[3,4];case 4:return[2,c]}}))}));return function(s,r,t){return e.apply(this,arguments)}}(),o=function(){var e=(0,t.Z)((function(e,s,r){var t,c,l;return(0,n.__generator)(this,(function(n){switch(n.label){case 0:t=new r.eth.Contract(a.Mt,e),c=null,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,t.methods.getData(s).call()];case 2:return c=n.sent(),[3,4];case 3:return l=n.sent(),console.log(l.message),[3,4];case 4:return[2,c]}}))}));return function(s,r,t){return e.apply(this,arguments)}}(),u=function(){var e=(0,t.Z)((function(e,s){var r,t,a,i,o,u,d,h,f,p,m,v,x,j,g,b,y,S,k;return(0,n.__generator)(this,(function(n){switch(n.label){case 0:r=new s.eth.Contract(l.u,e),t=!1,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,r.methods.supportsInterface(c.Bj.ERC725X).call()];case 2:return t=n.sent(),[3,4];case 3:return a=n.sent(),console.log(a.message),[3,4];case 4:i=!1,n.label=5;case 5:return n.trys.push([5,7,,8]),[4,r.methods.supportsInterface(c.Bj.ERC725Y).call()];case 6:return i=n.sent(),[3,8];case 7:return o=n.sent(),console.warn(o.message),[3,8];case 8:u=!1,n.label=9;case 9:return n.trys.push([9,11,,12]),[4,r.methods.supportsInterface(c.Bj.ERC1271).call()];case 10:return u=n.sent(),[3,12];case 11:return d=n.sent(),console.warn(d.message),[3,12];case 12:h=!1,n.label=13;case 13:return n.trys.push([13,15,,16]),[4,r.methods.supportsInterface(c.Bj.LSP0ERC725Account).call()];case 14:return h=n.sent(),[3,16];case 15:return f=n.sent(),console.warn(f.message),[3,16];case 16:p=!1,n.label=17;case 17:return n.trys.push([17,19,,20]),[4,r.methods.supportsInterface(c.Bj.LSP1UniversalReceiver).call()];case 18:return p=n.sent(),[3,20];case 19:return m=n.sent(),console.warn(m.message),[3,20];case 20:v=!1,n.label=21;case 21:return n.trys.push([21,23,,24]),[4,r.methods.supportsInterface(c.Bj.LSP6KeyManager).call()];case 22:return v=n.sent(),[3,24];case 23:return x=n.sent(),console.warn(x.message),[3,24];case 24:j=!1,n.label=25;case 25:return n.trys.push([25,27,,28]),[4,r.methods.supportsInterface(c.Bj.LSP7DigitalAsset).call()];case 26:return j=n.sent(),[3,28];case 27:return g=n.sent(),console.warn(g.message),[3,28];case 28:b=!1,n.label=29;case 29:return n.trys.push([29,31,,32]),[4,r.methods.supportsInterface(c.Bj.LSP8IdentifiableDigitalAsset).call()];case 30:return b=n.sent(),[3,32];case 31:return y=n.sent(),console.warn(y.message),[3,32];case 32:S=!1,n.label=33;case 33:return n.trys.push([33,35,,36]),[4,r.methods.supportsInterface(c.Bj.LSP9Vault).call()];case 34:return S=n.sent(),[3,36];case 35:return k=n.sent(),console.warn(k.message),[3,36];case 36:return[2,{isErc725X:t,isErc725Y:i,isErc1271:u,isLsp0Erc725Account:h,isLsp1UniversalReceiver:p,isLsp6KeyManager:v,isLsp7DigitalAsset:j,isLsp8IdentifiableDigitalAsset:b,isLsp9Vault:S}]}}))}));return function(s,r){return e.apply(this,arguments)}}()},6601:function(){},9214:function(){},5568:function(){},2361:function(){},4616:function(){}},function(e){e.O(0,[543,0,629,778,774,888,179],(function(){return s=163,e(e.s=s);var s}));var s=e.O();_N_E=s}]);