(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(1586)}])},3538:function(e,t,n){"use strict";n.d(t,{J:function(){return s}});var r=n(5893),a=n(7294),o=n(733),c=n(665),s=(0,a.createContext)({network:{name:c.Y.MAINNET,rpc:""},setNetwork:function(){return null}});t.Z=function(e){var t=e.children,n=(0,a.useState)({name:c.Y.MAINNET,rpc:o.$G[c.Y.MAINNET],imgUrl:"/lukso.png"}),i=n[0],l=n[1];return(0,r.jsx)(s.Provider,{value:{network:i,setNetwork:l},children:t})}},733:function(e,t,n){"use strict";n.d(t,{$G:function(){return i},Dj:function(){return u},Te:function(){return d},eE:function(){return p},jX:function(){return l},kc:function(){return f}});var r,a,o,c=n(4924),s=n(665),i=(r={},(0,c.Z)(r,s.Y.MAINNET,"https://rpc.lukso.gateway.fm"),(0,c.Z)(r,s.Y.TESTNET,"https://rpc.testnet.lukso.gateway.fm"),(0,c.Z)(r,s.Y.LOCALHOST,"http://localhost:8545"),r),l=(a={},(0,c.Z)(a,s.Y.MAINNET,"https://explorer.execution.mainnet.lukso.network"),(0,c.Z)(a,s.Y.TESTNET,"https://explorer.execution.testnet.lukso.network"),(0,c.Z)(a,s.Y.LOCALHOST,"http://localhost:3000"),a),u="https://api.universalprofile.cloud/ipfs",f=(o={},(0,c.Z)(o,s.Y.MAINNET,["0xD6ebB3C5C1836f5377d134c303f4EBb053562f6f","0x2e90C2ff7E9bbD9381c8e4eA030666f9c6090727","0x9F44982B472431bEdeFC1DC92149Ca2ea09820aa","0x348EA31074263385a87e2B83f5aB58a7678205F7","0x22e4F54586676158B7D5251e457383E499903617","0x5827b91d84050d3A8e159C27E16B0d7426F66aEB","0x4a252E46A640FB2C45f0E74BAC9448F68fe66d63","0xeB7A7B91B5B7188c098Cb64DD01F59C9D876566d","0xBE8EA52CA32c51024E8B11C2719d9Edb94B21D16","0x242387F645a327af3f1E34F3A9A9032BeEe69fb0"]),(0,c.Z)(o,s.Y.TESTNET,["0xb13B12848dbE8dDf87027Fa2c26aBeF0118a5EB7","0x08019bf6606367d4D5f74082634d3eA0692adf93"]),(0,c.Z)(o,s.Y.LOCALHOST,[]),o),d={"0xA5467dfe7019bF2C7C5F7A707711B9d4cAD118c8":"0.12.1","0x7870C5B8BC9572A8001C3f96f7ff59961B23500D":"0.14.0"},p="0x42562196ee7AaC3E8501db777B25ffc976ed8463"},1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(2648).Z,o=n(7273).Z,c=a(n(7294)),s=n(6273),i=n(2725),l=n(3462),u=n(1018),f=n(7190),d=n(1210),p=n(8684),h={};function v(e,t,n,r){if(e&&s.isLocalURL(t)){Promise.resolve(e.prefetch(t,n,r)).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;h[t+"%"+n+(a?"%"+a:"")]=!0}}var m=c.default.forwardRef((function(e,t){var n,a=e.href,m=e.as,x=e.children,b=e.prefetch,j=e.passHref,N=e.replace,g=e.shallow,y=e.scroll,C=e.locale,E=e.onClick,T=e.onMouseEnter,k=e.onTouchStart,_=e.legacyBehavior,O=void 0===_?!0!==Boolean(!1):_,A=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=x,!O||"string"!==typeof n&&"number"!==typeof n||(n=c.default.createElement("a",null,n));var w=!1!==b,L=c.default.useContext(l.RouterContext),B=c.default.useContext(u.AppRouterContext);B&&(L=B);var M,S=c.default.useMemo((function(){var e=r(s.resolveHref(L,a,!0),2),t=e[0],n=e[1];return{href:t,as:m?s.resolveHref(L,m):n||t}}),[L,a,m]),P=S.href,I=S.as,R=c.default.useRef(P),D=c.default.useRef(I);O&&(M=c.default.Children.only(n));var Z=O?M&&"object"===typeof M&&M.ref:t,Y=r(f.useIntersection({rootMargin:"200px"}),3),H=Y[0],F=Y[1],U=Y[2],G=c.default.useCallback((function(e){D.current===I&&R.current===P||(U(),D.current=I,R.current=P),H(e),Z&&("function"===typeof Z?Z(e):"object"===typeof Z&&(Z.current=e))}),[I,Z,P,U,H]);c.default.useEffect((function(){var e=F&&w&&s.isLocalURL(P),t="undefined"!==typeof C?C:L&&L.locale,n=h[P+"%"+I+(t?"%"+t:"")];e&&!n&&v(L,P,I,{locale:t})}),[I,P,F,C,w,L]);var K={ref:G,onClick:function(e){O||"function"!==typeof E||E(e),O&&M.props&&"function"===typeof M.props.onClick&&M.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,i,l,u,f){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(n)){e.preventDefault();var d=function(){"beforePopState"in t?t[a?"replace":"push"](n,r,{shallow:o,locale:l,scroll:i}):t[a?"replace":"push"](n,{forceOptimisticNavigation:!f})};u?c.default.startTransition(d):d()}}(e,L,P,I,N,g,y,C,Boolean(B),w)},onMouseEnter:function(e){O||"function"!==typeof T||T(e),O&&M.props&&"function"===typeof M.props.onMouseEnter&&M.props.onMouseEnter(e),!w&&B||s.isLocalURL(P)&&v(L,P,I,{priority:!0})},onTouchStart:function(e){O||"function"!==typeof k||k(e),O&&M.props&&"function"===typeof M.props.onTouchStart&&M.props.onTouchStart(e),!w&&B||s.isLocalURL(P)&&v(L,P,I,{priority:!0})}};if(!O||j||"a"===M.type&&!("href"in M.props)){var $="undefined"!==typeof C?C:L&&L.locale,q=L&&L.isLocaleDomain&&d.getDomainLocale(I,$,L.locales,L.domainLocales);K.href=q||p.addBasePath(i.addLocale(I,$,L&&L.defaultLocale))}return O?c.default.cloneElement(M,K):c.default.createElement("a",Object.assign({},A,K),n)}));t.default=m,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,l=e.disabled||!c,u=r(a.useState(!1),2),f=u[0],d=u[1],p=r(a.useState(null),2),h=p[0],v=p[1];a.useEffect((function(){if(c){if(l||f)return;if(h&&h.tagName){var e=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=i.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(r&&(t=s.get(r)))return t;var a=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:o,elements:a},i.push(n),s.set(n,t),t}(n),a=r.id,o=r.observer,c=r.elements;return c.set(e,t),o.observe(e),function(){if(c.delete(e),o.unobserve(e),0===c.size){o.disconnect(),s.delete(a);var t=i.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));t>-1&&i.splice(t,1)}}}(h,(function(e){return e&&d(e)}),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!f){var r=o.requestIdleCallback((function(){return d(!0)}));return function(){return o.cancelIdleCallback(r)}}}),[h,l,n,t,f]);var m=a.useCallback((function(){d(!1)}),[]);return[v,f,m]};var a=n(7294),o=n(9311),c="function"===typeof IntersectionObserver,s=new Map,i=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TemplateContext=t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var r=(0,n(2648).Z)(n(7294)),a=r.default.createContext(null);t.AppRouterContext=a;var o=r.default.createContext(null);t.LayoutRouterContext=o;var c=r.default.createContext(null);t.GlobalLayoutRouterContext=c;var s=r.default.createContext(null);t.TemplateContext=s},1586:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var r=n(6042),a=n(5893),o=(n(4831),n(4714),n(7294)),c=n(1664),s=n.n(c),i=n(1163),l=n(3538),u=n(733),f=n(665),d=[{name:f.Y.MAINNET,rpc:u.$G[f.Y.MAINNET],imgUrl:"/lukso.png"},{name:f.Y.TESTNET,rpc:u.$G[f.Y.TESTNET],imgUrl:"/lukso.png"},{name:f.Y.LOCALHOST,rpc:u.$G[f.Y.LOCALHOST],imgUrl:"/lukso.png"}],p=function(){var e=(0,i.useRouter)(),t=(0,o.useContext)(l.J),n=t.network,r=t.setNetwork,c=(0,o.useState)(!1),s=c[0],u=c[1];return(0,a.jsxs)("div",{className:"navbar-item has-dropdown ".concat(s?"is-active":""),onClick:function(){u(!s)},onBlur:function(e){e.currentTarget.contains(e.relatedTarget)||u(!1)},children:[(0,a.jsxs)("a",{className:"navbar-link is-flex",style:{alignItems:"center"},children:[n.imgUrl&&(0,a.jsx)("img",{src:n.imgUrl,alt:n.name,className:"mr-2",style:{height:"1em"}}),(0,a.jsx)("span",{style:{flexGrow:1},children:n.name}),(0,a.jsx)("span",{className:"icon is-small is-hidden-touch",children:(0,a.jsx)("i",{className:"fas fa-chevron-down ".concat(s?"is-active":"")})})]}),(0,a.jsx)("div",{className:"navbar-dropdown ".concat(s?"is-block":"is-hidden-touch"),children:d.map((function(t){return t.rpc===n.rpc?null:(0,a.jsxs)("a",{className:"navbar-item",onClick:function(n){n.stopPropagation(),function(t){if(r(t),u(!1),"/inspector"===e.pathname&&e.query.address){var n="/inspector?address=".concat(e.query.address,"&network=").concat(t.name.toLowerCase());e.push(n,void 0,{shallow:!0})}}(t)},children:[(0,a.jsx)("img",{className:"mr-2",src:t.imgUrl,alt:t.name,style:{height:"1em"}}),(0,a.jsx)("span",{children:t.name})]},t.rpc)}))})]})},h=n(4305),v=n.n(h),m=function(){var e=(0,o.useState)(!1),t=e[0],n=e[1],r=(0,i.useRouter)();return(0,a.jsxs)("nav",{className:"navbar is-light sticky",children:[(0,a.jsxs)("div",{className:"navbar-brand ".concat(v().navbarHeight),children:[(0,a.jsx)(s(),{href:"/",children:(0,a.jsx)("a",{className:"navbar-item is-hidden-desktop",children:"\ud83d\udee0 ERC725 Tools"})}),(0,a.jsxs)("a",{role:"button",className:"navbar-burger burger ".concat(t?"is-active":""),"aria-label":"menu","aria-expanded":"false",onClick:function(){n(!t)},children:[(0,a.jsx)("span",{"aria-hidden":"true"}),(0,a.jsx)("span",{"aria-hidden":"true"}),(0,a.jsx)("span",{"aria-hidden":"true"})]})]}),(0,a.jsxs)("div",{className:"navbar-menu ".concat(t?"is-active":""),children:[(0,a.jsxs)("div",{className:"navbar-start ml-3",children:[(0,a.jsx)(s(),{href:"/",children:(0,a.jsx)("a",{className:"navbar-item is-hidden-touch ".concat(v().navbarHeight),children:"\ud83d\udee0 ERC725 Tools"})}),(0,a.jsx)(s(),{href:"/inspector",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/inspector"===r.pathname&&"has-text-link"),children:"\ud83d\udd0e Inspector"})}),(0,a.jsx)(s(),{href:"/data-fetcher",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/data-fetcher"===r.pathname&&"has-text-link"),children:"\ud83d\udcbd Data Fetcher"})}),(0,a.jsx)(s(),{href:"/key-manager",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/key-manager"===r.pathname&&"has-text-link"),children:"\ud83d\udd10 Key Manager"})}),(0,a.jsx)(s(),{href:"/abi-encoder",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/abi-encoder"===r.pathname&&"has-text-link"),children:"\ud83d\udcdc ABI Encoder"})}),(0,a.jsx)(s(),{href:"/lsp2-encoder",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/lsp2-encoder"===r.pathname&&"has-text-link"),children:"\ud83d\udcd6 LSP2 Encoder"})})]}),(0,a.jsxs)("div",{className:"navbar-end",children:[(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsx)(p,{})}),(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsxs)("div",{className:"buttons",children:[(0,a.jsx)("a",{href:"https://docs.lukso.tech/",className:"button",target:"_blank",rel:"noreferrer",children:"DOCS \u2197"}),(0,a.jsx)("a",{className:"button",href:"https://github.com/lukso-network/tools-erc725-inspect",target:"_blank",rel:"noreferrer",children:"GITHUB \u2197"})]})}),(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsx)("div",{className:"field is-grouped",children:(0,a.jsx)("p",{className:"control"})})})]})]})]})};var x=function(e){var t=e.Component,n=e.pageProps;return(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(m,{}),(0,a.jsx)("section",{className:"section",children:(0,a.jsx)(t,(0,r.Z)({},n))})]})}},665:function(e,t,n){"use strict";var r;n.d(t,{Y:function(){return r}}),function(e){e.MAINNET="MAINNET",e.TESTNET="TESTNET",e.LOCALHOST="LOCALHOST"}(r||(r={}))},4305:function(e){e.exports={navbarHeight:"NvaBar_navbarHeight__hCTuz"}},4714:function(){},4831:function(){},1664:function(e,t,n){e.exports=n(8418)},1163:function(e,t,n){e.exports=n(387)},4924:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},6042:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(4924);function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){(0,r.Z)(e,t,n[t])}))}return e}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6840),t(387)}));var n=e.O();_N_E=n}]);