(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[630],{9245:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/key-manager",function(){return n(818)}])},9366:function(e,s,n){"use strict";n.d(s,{Z:function(){return o}});var r=n(7568),i=n(7582),a=n(7294),t=n(7918),c=n.n(t),l=n(3538);function o(){var e=(0,a.useState)(),s=e[0],n=e[1],t=(0,a.useContext)(l.J).network;return(0,a.useEffect)((function(){var e=function(){var e=(0,r.Z)((function(){return(0,i.__generator)(this,(function(e){return[2,new(c())(t.rpc)]}))}));return function(){return e.apply(this,arguments)}}();e().then((function(e){n(e)}))}),[t]),s}},818:function(e,s,n){"use strict";n.r(s),n.d(s,{default:function(){return x}});var r=n(5893),i=n(9008),a=n.n(i),t=n(7568),c=n(7582),l=n(7294),o=n(8276),d=n(9366),u=function(){var e=(0,d.Z)(),s=(0,l.useState)(""),n=s[0],i=s[1],a=(0,l.useState)(""),u=a[0],h=a[1],m=(0,l.useState)(""),f=m[0],x=m[1],p=(0,l.useState)(""),N=p[0],j=p[1],g=(0,l.useState)(!1),E=g[0],v=g[1],P=(0,l.useState)(!1),k=P[0],C=P[1],b=function(){var s=(0,t.Z)((function(){var s,r,i,a;return(0,c.__generator)(this,(function(t){switch(t.label){case 0:return e?[4,(s=new e.eth.Contract(o.Mt,e.utils.toChecksumAddress(n))).methods.supportsInterface("0x6f4df48b").call()]:[2];case 1:return r=t.sent(),[4,s.methods.supportsInterface("0xc403d48f").call()];case 2:return i=t.sent(),r||i?[4,s.methods.getNonce(u,f).call()]:[3,4];case 3:return a=t.sent(),j(a),v(!0),C(!1),[3,5];case 4:v(!1),C(!0),t.label=5;case 5:return[2]}}))}));return function(){return s.apply(this,arguments)}}();return(0,r.jsxs)("div",{className:"container mt-5",children:[(0,r.jsx)("h2",{className:"title is-2",children:"Nonce"}),(0,r.jsx)("article",{className:"message is-info",children:(0,r.jsxs)("div",{className:"message-body",children:["Retrieve the nonce of a"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account",target:"_blank",rel:"noreferrer",className:"ml-1",children:"LSP0 ERC725Account"}),"'s"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#introduction",target:"_blank",rel:"noreferrer",children:"controller address"})," ","for a specific"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager",target:"_blank",rel:"noreferrer",children:"LSP6 KeyManager"})," ","smart contract."]})}),(0,r.jsx)("article",{className:"message",children:(0,r.jsxs)("div",{className:"message-body",children:["It's calling the"," ",(0,r.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md#getnonce",target:"_blank",rel:"noreferrer",children:"getNonce"})," ","function of the"," ",(0,r.jsx)("a",{href:"https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md",target:"_blank",rel:"noreferrer",children:"LSP25 ExecuteRelayCall"})," ","standardization that every"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager",target:"_blank",rel:"noreferrer",children:"LSP6 KeyManager"})," ","inherits."]})}),(0,r.jsxs)("div",{className:"columns mt-2",children:[(0,r.jsx)("div",{className:"column",children:(0,r.jsx)("div",{className:"field",children:(0,r.jsxs)("p",{className:"control has-icons-left",children:[(0,r.jsx)("input",{className:"input",type:"text",placeholder:"Key Manager Address",onChange:function(e){i(e.target.value)}}),(0,r.jsx)("span",{className:"icon is-small is-left",children:"\ud83d\udd10"})]})})}),(0,r.jsx)("div",{className:"column",children:(0,r.jsx)("div",{className:"field",children:(0,r.jsxs)("p",{className:"control has-icons-left",children:[(0,r.jsx)("input",{className:"input",type:"text",placeholder:"Controller Address",onChange:function(e){return h(e.target.value)}}),(0,r.jsx)("span",{className:"icon is-small is-left",children:"\u27a1\ufe0f "})]})})}),(0,r.jsx)("div",{className:"column",children:(0,r.jsx)("div",{className:"field",children:(0,r.jsxs)("p",{className:"control has-icons-left",children:[(0,r.jsx)("input",{className:"input",type:"text",placeholder:"Channel ID",onChange:function(e){return x(e.target.value)}}),(0,r.jsx)("span",{className:"icon is-small is-left",children:"\ud83d\udeaa"})]})})}),(0,r.jsx)("div",{className:"column",children:(0,r.jsx)("button",{className:"button is-success",onClick:(0,t.Z)((function(){return(0,c.__generator)(this,(function(e){switch(e.label){case 0:return[4,b()];case 1:return e.sent(),[2]}}))})),children:"Get Nonce"})})]}),(0,r.jsxs)("div",{className:"notification is-danger is-light",style:{display:k?"block":"none"},children:["address ",(0,r.jsx)("code",{children:n})," is not a KeyManager"]}),(0,r.jsxs)("div",{className:"notification is-success is-light",style:{display:E?"block":"none"},children:["Nonce = ",(0,r.jsx)("code",{children:N})]})]})},h=n(2070),m=function(e){var s=e.permissions,n=e.color,i=e.decodedPermissions,a=e.handlePermissionClick;return(0,r.jsx)("div",{className:"buttons",children:s.map((function(e){return(0,r.jsx)("button",{className:"button ".concat(n," ").concat(!i[e]&&"is-outlined"),onClick:function(s){s.preventDefault(),a(e)},children:e},e)}))})},f=function(){var e="0x0000000000000000000000000000000000000000000000000000000000000001",s=(0,l.useState)(e),n=s[0],i=s[1],a=(0,l.useState)(h.ZP.decodePermissions(e)),t=a[0],c=a[1],o=function(e){console.log("updatedDecodedPermissions",e);var s=t;s[e]=!s[e],c(s),i(h.ZP.encodePermissions(s))};return(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("h2",{className:"title is-2",children:"Permissions"}),(0,r.jsx)("article",{className:"message is-info",children:(0,r.jsxs)("div",{className:"message-body",children:["Encode and decode"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#address-permissions",target:"_blank",rel:"noreferrer",children:"permissions"})," ","based on the"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager",target:"_blank",rel:"noreferrer",children:"LSP6 KeyManager"})," ","standard."]})}),(0,r.jsx)("article",{className:"message",children:(0,r.jsxs)("div",{className:"message-body",children:["It\u2018s using the"," ",(0,r.jsx)("a",{href:"https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions",target:"_blank",rel:"noreferrer",children:"encodePermissions"})," ","function of the"," ",(0,r.jsx)("a",{href:"https://www.npmjs.com/package/@erc725/erc725.js",target:"_blank",rel:"noreferrer",children:"erc725.js"})," ","library."]})}),(0,r.jsx)("div",{className:"columns",children:(0,r.jsx)("div",{className:"column",children:(0,r.jsx)("input",{className:"input is-medium",type:"text",placeholder:"0x0000000000000000000000000000000000000000000000000000000000000001",value:n,onChange:function(e){return function(e){try{i(e),c(h.ZP.decodePermissions(e))}catch(s){console.log(s.message)}}(e.target.value)}})})}),(0,r.jsxs)("div",{className:"columns",children:[(0,r.jsxs)("div",{className:"column is-half",children:[(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Contract Ownership"}),(0,r.jsx)(m,{permissions:["CHANGEOWNER","ADDCONTROLLER","EDITPERMISSIONS"],color:"is-orange-dark",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Extensions"}),(0,r.jsx)(m,{permissions:["ADDEXTENSIONS","CHANGEEXTENSIONS"],color:"is-orange",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Universal Receivers"}),(0,r.jsx)(m,{permissions:["ADDUNIVERSALRECEIVERDELEGATE","CHANGEUNIVERSALRECEIVERDELEGATE"],color:"is-warning",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Payload Execution"}),(0,r.jsx)(m,{permissions:["REENTRANCY"],color:"is-danger",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Contract Interactions"}),(0,r.jsx)(m,{permissions:["SUPER_TRANSFERVALUE","TRANSFERVALUE","SUPER_CALL","CALL","SUPER_STATICCALL","STATICCALL","SUPER_DELEGATECALL","DELEGATECALL","DEPLOY"],color:"is-primary",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Contract Storage"}),(0,r.jsx)(m,{permissions:["SUPER_SETDATA","SETDATA"],color:"is-success",decodedPermissions:t,handlePermissionClick:o}),(0,r.jsx)("h5",{className:"mb-2 title is-5",children:"Signing Verification"}),(0,r.jsx)(m,{permissions:["ENCRYPT","DECRYPT","SIGN"],color:"is-purple",decodedPermissions:t,handlePermissionClick:o})]}),(0,r.jsx)("div",{className:"column is-half",children:(0,r.jsx)("pre",{children:JSON.stringify(t,void 0,2)})})]})]})},x=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"Key Manager - ERC725 Tools"})}),(0,r.jsx)(f,{}),(0,r.jsx)(u,{})]})}},6601:function(){},9214:function(){},5568:function(){},2361:function(){},4616:function(){}},function(e){e.O(0,[543,70,399,774,888,179],(function(){return s=9245,e(e.s=s);var s}));var s=e.O();_N_E=s}]);