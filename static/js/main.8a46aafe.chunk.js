(this["webpackJsonperc725-inspect"]=this["webpackJsonperc725-inspect"]||[]).push([[0],{215:function(e,t,n){},222:function(e,t){},229:function(e,t,n){},252:function(e,t){},254:function(e,t){},330:function(e,t){},332:function(e,t){},365:function(e,t){},370:function(e,t){},372:function(e,t){},379:function(e,t){},392:function(e,t){},415:function(e,t){},424:function(e,t){},426:function(e,t){},496:function(e,t,n){"use strict";n.r(t);var a=n(14),c=n.n(a),s=n(206),r=n.n(s),i=(n(215),n(12)),u=n.n(i),l=n(24),b=n(25),o=n(16),d=(n(229),n(207)),f=n.n(d);function p(){var e=Object(a.useState)(),t=Object(b.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){var e=function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new f.a("https://rpc.l14.lukso.network"),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e().then((function(e){c(e)}))}),[]),n}var y=function(){var e=Object(l.a)(u.a.mark((function e(t,n,a){var c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=new a.eth.Contract([{type:"function",stateMutability:"view",outputs:[{type:"bytes[]",name:"",internalType:"bytes[]"}],name:"getDataMultiple",inputs:[{type:"bytes32[]",name:"_keys",internalType:"bytes32[]"}]}],t),s=[],e.prev=2,e.next=5,c.methods.getDataMultiple(n).call();case 5:s=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log(e.t0.message);case 11:return e.abrupt("return",s);case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n,a){return e.apply(this,arguments)}}(),j=function(){var e=Object(l.a)(u.a.mark((function e(t,n){var a,c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new n.eth.Contract([{type:"function",stateMutability:"view",outputs:[{type:"bool",name:"",internalType:"bool"}],name:"supportsInterface",inputs:[{type:"bytes4",name:"interfaceId",internalType:"bytes4"}]}],t),c=!1,e.prev=2,e.next=5,a.methods.supportsInterface("0x44c028fe").call();case 5:c=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log(e.t0.message);case 11:return s=!1,e.prev=12,e.next=15,a.methods.supportsInterface("0x2bd57b73").call();case 15:s=e.sent,e.next=21;break;case 18:e.prev=18,e.t1=e.catch(12),console.log(e.t1.message);case 21:return e.abrupt("return",{isErc725X:c,isErc725Y:s});case 22:case"end":return e.stop()}}),e,null,[[2,8],[12,18]])})));return function(t,n){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(u.a.mark((function e(t,n){var a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new n.eth.Contract([{type:"function",stateMutability:"view",outputs:[{type:"bytes32[]",name:"",internalType:"bytes32[]"}],name:"allDataKeys",inputs:[]}],t),c=[],e.prev=2,e.next=5,a.methods.allDataKeys().call();case 5:c=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log(e.t0.message);case 11:return e.abrupt("return",c);case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n){return e.apply(this,arguments)}}(),x=n(8),h=function(e){var t=e.address,n=e.isErc725Y,c=Object(a.useState)([]),s=Object(b.a)(c,2),r=s[0],i=s[1],o=p();return Object(a.useEffect)((function(){var e=function(){var e=Object(l.a)(u.a.mark((function e(){var a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o&&n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,v(t,o);case 5:return a=e.sent,e.next=8,y(t,a,o);case 8:c=e.sent,i(a.map((function(e,t){return{key:e,value:c[t]}}))),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),i([]);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}();e()}),[t,o,n]),n?Object(x.jsx)("div",{children:r.map((function(e){var t=function(e){switch(e){case"0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c":return{name:"SupportedStandards:LSP4DigitalCertificate",key:"0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",keyType:"Mapping",valueContent:"0xabf0613c",valueType:"bytes"};case"0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e":return{name:"LSP4Metadata",key:"0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",keyType:"Singleton",valueContent:"JSONURL",valueType:"bytes"};case"0xeafec4d89fa9619884b6b89135626455000000000000000000000000abe425d6":return{name:"SupportedStandards:LSP3UniversalProfile",key:"0xeafec4d89fa9619884b6b89135626455000000000000000000000000abe425d6",keyType:"Mapping",valueContent:"0xabe425d6",valueType:"bytes"};case"0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0":return{name:"LSP3IssuedAssets[]",key:"0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0",keyType:"Array",valueContent:"Address",valueType:"address"};case"0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6":return{name:"SupportedStandards:ERC725Account",key:"0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6",keyType:"Singleton",valueContent:"0xafdeb5d6",valueType:"bytes"};case"0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47":return{name:"LSP1UniversalReceiverDelegate",key:"0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",keyType:"Singleton",valueContent:"Address",valueType:"address"};case"0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5":return{name:"LSP3Profile",key:"0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",keyType:"Singleton",valueContent:"JSONURL",valueType:"bytes"}}if(-1!==e.indexOf("0xeafec4d89fa9619884b6b89135626455000000000000000000000000"))return{name:"SupportedStandards:?????????",key:e,keyType:"Mapping",valueContent:e.substr(58),valueType:"bytes"};if(-1!==e.indexOf("0x4b80742d0000000082ac0000")){var t=e.substr(26);return{name:"AddressPermissions:Permissions:".concat(t),key:e,keyType:"AddressMappingWithGrouping",valueContent:"BitArray",valueType:"bytes4"}}return{name:"UNKNOWN",key:e,keyType:"UNKNOWN",valueContent:"UNKNOWN",valueType:"UNKNOWN"}}(e.key);return Object(x.jsxs)("div",{className:"py-5",children:[Object(x.jsx)("h4",{className:"title is-4",children:t.name}),Object(x.jsxs)("ul",{children:[Object(x.jsx)("li",{children:Object(x.jsx)("span",{className:"tag is-link is-light",children:t.keyType})}),Object(x.jsx)("li",{children:Object(x.jsx)("code",{children:t.key})}),Object(x.jsx)("li",{children:t.valueType}),Object(x.jsxs)("li",{children:["Raw value: ",Object(x.jsx)("code",{children:e.value})]}),Object(x.jsx)("li",{children:"Decoded value: TODO"})]})]},e.key)}))}):Object(x.jsx)("div",{children:"This address does not support ERC725Y"})},O=function(){var e=Object(a.useState)("0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99"),t=Object(b.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(!1),r=Object(b.a)(s,2),i=r[0],d=r[1],f=Object(a.useState)(!1),y=Object(b.a)(f,2),v=y[0],O=y[1],m=Object(a.useState)(!1),k=Object(b.a)(m,2),g=k[0],T=k[1],N=Object(a.useState)(""),S=Object(b.a)(N,2),C=S[0],w=S[1],E=p();return Object(a.useEffect)((function(){var e=function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(E){e.next=2;break}return e.abrupt("return");case 2:if(O(!1),T(!1),Object(o.isAddress)(n)){e.next=7;break}return w("Address is not valid"),e.abrupt("return");case 7:return d(!0),e.next=10,j(n,E);case 10:t=e.sent,O(t.isErc725X),T(t.isErc725Y),d(!1);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n,E]),Object(x.jsxs)("section",{className:"section",children:[Object(x.jsx)("div",{className:"container is-fluid",children:Object(x.jsxs)("div",{className:"field",children:[Object(x.jsx)("label",{className:"label",children:"Contract Address"}),Object(x.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(x.jsx)("input",{className:"input ".concat(""===C?"is-success":"is-danger"),type:"text",placeholder:"ERC725 Contract Address",value:n,onChange:function(e){c(e.target.value)}}),Object(x.jsx)("span",{className:"icon is-small is-left",children:Object(x.jsx)("i",{className:"fas fa-user"})}),Object(x.jsx)("span",{className:"icon is-small is-right",children:Object(x.jsx)("i",{className:"fas fa-check"})})]}),C&&Object(x.jsx)("p",{className:"help is-danger",children:C})]})}),Object(x.jsx)("div",{className:"container is-fluid",children:i?"Loading...":Object(x.jsxs)("div",{children:[Object(x.jsxs)("ul",{children:[Object(x.jsxs)("li",{children:["ERC725X: ",v?"\u2705":"\u274c"]}),Object(x.jsxs)("li",{children:["ERC725Y: ",g?"\u2705":"\u274c"]})]}),Object(x.jsx)(h,{address:n,isErc725Y:g})]})})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,500)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(O,{})}),document.getElementById("root")),m()}},[[496,1,2]]]);
//# sourceMappingURL=main.8a46aafe.chunk.js.map