(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(1586)}])},3538:function(e,t,n){"use strict";n.d(t,{J:function(){return c}});var r=n(5893),a=n(7294),o=n(733),c=(0,a.createContext)({network:{name:"",rpc:""},setNetwork:function(){return null}});t.Z=function(e){var t=e.children,n=(0,a.useState)({name:"TESTNET",rpc:o.PE,imgUrl:"/lukso.png"}),s=n[0],i=n[1];return(0,r.jsx)(c.Provider,{value:{network:s,setNetwork:i},children:t})}},733:function(e,t,n){"use strict";n.d(t,{Dj:function(){return o},ND:function(){return a},PE:function(){return r}});var r="https://rpc.testnet.lukso.gateway.fm",a="https://rpc.lukso.gateway.fm",o="https://api.universalprofile.cloud/ipfs"},1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(2648).Z,o=n(7273).Z,c=a(n(7294)),s=n(6273),i=n(2725),l=n(3462),u=n(1018),f=n(7190),d=n(1210),p=n(8684),h={};function v(e,t,n,r){if(e&&s.isLocalURL(t)){Promise.resolve(e.prefetch(t,n,r)).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;h[t+"%"+n+(a?"%"+a:"")]=!0}}var m=c.default.forwardRef((function(e,t){var n,a=e.href,m=e.as,b=e.children,x=e.prefetch,j=e.passHref,y=e.replace,g=e.shallow,N=e.scroll,k=e.locale,_=e.onClick,C=e.onMouseEnter,w=e.onTouchStart,E=e.legacyBehavior,O=void 0===E?!0!==Boolean(!1):E,M=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=b,!O||"string"!==typeof n&&"number"!==typeof n||(n=c.default.createElement("a",null,n));var P=!1!==x,T=c.default.useContext(l.RouterContext),L=c.default.useContext(u.AppRouterContext);L&&(T=L);var R,S=c.default.useMemo((function(){var e=r(s.resolveHref(T,a,!0),2),t=e[0],n=e[1];return{href:t,as:m?s.resolveHref(T,m):n||t}}),[T,a,m]),I=S.href,U=S.as,D=c.default.useRef(I),B=c.default.useRef(U);O&&(R=c.default.Children.only(n));var H=O?R&&"object"===typeof R&&R.ref:t,Z=r(f.useIntersection({rootMargin:"200px"}),3),A=Z[0],K=Z[1],G=Z[2],q=c.default.useCallback((function(e){B.current===U&&D.current===I||(G(),B.current=U,D.current=I),A(e),H&&("function"===typeof H?H(e):"object"===typeof H&&(H.current=e))}),[U,H,I,G,A]);c.default.useEffect((function(){var e=K&&P&&s.isLocalURL(I),t="undefined"!==typeof k?k:T&&T.locale,n=h[I+"%"+U+(t?"%"+t:"")];e&&!n&&v(T,I,U,{locale:t})}),[U,I,K,k,P,T]);var z={ref:q,onClick:function(e){O||"function"!==typeof _||_(e),O&&R.props&&"function"===typeof R.props.onClick&&R.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,i,l,u,f){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(n)){e.preventDefault();var d=function(){"beforePopState"in t?t[a?"replace":"push"](n,r,{shallow:o,locale:l,scroll:i}):t[a?"replace":"push"](n,{forceOptimisticNavigation:!f})};u?c.default.startTransition(d):d()}}(e,T,I,U,y,g,N,k,Boolean(L),P)},onMouseEnter:function(e){O||"function"!==typeof C||C(e),O&&R.props&&"function"===typeof R.props.onMouseEnter&&R.props.onMouseEnter(e),!P&&L||s.isLocalURL(I)&&v(T,I,U,{priority:!0})},onTouchStart:function(e){O||"function"!==typeof w||w(e),O&&R.props&&"function"===typeof R.props.onTouchStart&&R.props.onTouchStart(e),!P&&L||s.isLocalURL(I)&&v(T,I,U,{priority:!0})}};if(!O||j||"a"===R.type&&!("href"in R.props)){var J="undefined"!==typeof k?k:T&&T.locale,X=T&&T.isLocaleDomain&&d.getDomainLocale(U,J,T.locales,T.domainLocales);z.href=X||p.addBasePath(i.addLocale(U,J,T&&T.defaultLocale))}return O?c.default.cloneElement(R,z):c.default.createElement("a",Object.assign({},M,z),n)}));t.default=m,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,l=e.disabled||!c,u=r(a.useState(!1),2),f=u[0],d=u[1],p=r(a.useState(null),2),h=p[0],v=p[1];a.useEffect((function(){if(c){if(l||f)return;if(h&&h.tagName){var e=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=i.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(r&&(t=s.get(r)))return t;var a=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:o,elements:a},i.push(n),s.set(n,t),t}(n),a=r.id,o=r.observer,c=r.elements;return c.set(e,t),o.observe(e),function(){if(c.delete(e),o.unobserve(e),0===c.size){o.disconnect(),s.delete(a);var t=i.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));t>-1&&i.splice(t,1)}}}(h,(function(e){return e&&d(e)}),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!f){var r=o.requestIdleCallback((function(){return d(!0)}));return function(){return o.cancelIdleCallback(r)}}}),[h,l,n,t,f]);var m=a.useCallback((function(){d(!1)}),[]);return[v,f,m]};var a=n(7294),o=n(9311),c="function"===typeof IntersectionObserver,s=new Map,i=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TemplateContext=t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var r=(0,n(2648).Z)(n(7294)),a=r.default.createContext(null);t.AppRouterContext=a;var o=r.default.createContext(null);t.LayoutRouterContext=o;var c=r.default.createContext(null);t.GlobalLayoutRouterContext=c;var s=r.default.createContext(null);t.TemplateContext=s},1586:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(1799),a=n(5893),o=(n(4831),n(7294)),c=n(1664),s=n.n(c),i=n(1163),l=n(3538),u=n(733),f=[{name:"MAINNET",rpc:u.ND,imgUrl:"/lukso.png"},{name:"TESTNET",rpc:u.PE,imgUrl:"/lukso.png"}],d=function(){var e=(0,i.useRouter)(),t=(0,o.useContext)(l.J),n=t.network,r=t.setNetwork,c=(0,o.useState)(!1),s=c[0],u=c[1];return(0,a.jsxs)("div",{className:"navbar-item has-dropdown ".concat(s?"is-active":""),onClick:function(){u(!s)},onBlur:function(e){e.currentTarget.contains(e.relatedTarget)||u(!1)},children:[(0,a.jsxs)("a",{className:"navbar-link is-flex",style:{alignItems:"center"},children:[n.imgUrl&&(0,a.jsx)("img",{src:n.imgUrl,alt:n.name,className:"mr-2",style:{height:"1em"}}),(0,a.jsx)("span",{style:{flexGrow:1},children:n.name}),(0,a.jsx)("span",{className:"icon is-small is-hidden-touch",children:(0,a.jsx)("i",{className:"fas fa-chevron-down ".concat(s?"is-active":"")})})]}),(0,a.jsx)("div",{className:"navbar-dropdown ".concat(s?"is-block":"is-hidden-touch"),children:f.map((function(t){return t.rpc===n.rpc?null:(0,a.jsxs)("a",{className:"navbar-item",onClick:function(n){n.stopPropagation(),function(t){if(r(t),u(!1),"/inspector"===e.pathname&&e.query.address){var n="/inspector?address=".concat(e.query.address,"&network=").concat(t.name.toLowerCase());e.push(n,void 0,{shallow:!0})}}(t)},children:[(0,a.jsx)("img",{className:"mr-2",src:t.imgUrl,alt:t.name,style:{height:"1em"}}),(0,a.jsx)("span",{children:t.name})]},t.rpc)}))})]})},p=n(4305),h=n.n(p),v=function(){var e=(0,o.useState)(!1),t=e[0],n=e[1],r=(0,i.useRouter)();return(0,a.jsxs)("nav",{className:"navbar is-light sticky",children:[(0,a.jsxs)("div",{className:"navbar-brand ".concat(h().navbarHeight),children:[(0,a.jsx)(s(),{href:"/",children:(0,a.jsx)("a",{className:"navbar-item is-hidden-desktop",children:"\ud83d\udee0 ERC725 Tools"})}),(0,a.jsxs)("a",{role:"button",className:"navbar-burger burger ".concat(t?"is-active":""),"aria-label":"menu","aria-expanded":"false",onClick:function(){n(!t)},children:[(0,a.jsx)("span",{"aria-hidden":"true"}),(0,a.jsx)("span",{"aria-hidden":"true"}),(0,a.jsx)("span",{"aria-hidden":"true"})]})]}),(0,a.jsxs)("div",{className:"navbar-menu ".concat(t?"is-active":""),children:[(0,a.jsxs)("div",{className:"navbar-start ml-3",children:[(0,a.jsx)(s(),{href:"/",children:(0,a.jsx)("a",{className:"navbar-item is-hidden-touch ".concat(h().navbarHeight),children:"\ud83d\udee0 ERC725 Tools"})}),(0,a.jsx)(s(),{href:"/inspector",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/inspector"===r.pathname&&"has-text-link"),children:"\ud83d\udd0e Inspector"})}),(0,a.jsx)(s(),{href:"/data-fetcher",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/data-fetcher"===r.pathname&&"has-text-link"),children:"\ud83d\udcbd Data Fetcher"})}),(0,a.jsx)(s(),{href:"/key-manager",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/key-manager"===r.pathname&&"has-text-link"),children:"\ud83d\udd10 Key Manager"})}),(0,a.jsx)(s(),{href:"/abi-encoder",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/abi-encoder"===r.pathname&&"has-text-link"),children:"\ud83d\udcdc ABI Encoder"})}),(0,a.jsx)(s(),{href:"/lsp2-encoder",children:(0,a.jsx)("a",{className:"navbar-item ".concat("/lsp2-encoder"===r.pathname&&"has-text-link"),children:"\ud83d\udcd6 LSP2 Encoder"})})]}),(0,a.jsxs)("div",{className:"navbar-end",children:[(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsx)(d,{})}),(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsxs)("div",{className:"buttons",children:[(0,a.jsx)("a",{href:"https://docs.lukso.tech/",className:"button",target:"_blank",rel:"noreferrer",children:"DOCS \u2197"}),(0,a.jsx)("a",{className:"button",href:"https://github.com/lukso-network/tools-erc725-inspect",target:"_blank",rel:"noreferrer",children:"GITHUB \u2197"})]})}),(0,a.jsx)("div",{className:"navbar-item",children:(0,a.jsx)("div",{className:"field is-grouped",children:(0,a.jsx)("p",{className:"control"})})})]})]})]})};var m=function(e){var t=e.Component,n=e.pageProps;return(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(v,{}),(0,a.jsx)("section",{className:"section",children:(0,a.jsx)(t,(0,r.Z)({},n))})]})}},4305:function(e){e.exports={navbarHeight:"NvaBar_navbarHeight__hCTuz"}},4831:function(){},1664:function(e,t,n){e.exports=n(8418)},1163:function(e,t,n){e.exports=n(387)},1799:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){r(e,t,n[t])}))}return e}n.d(t,{Z:function(){return a}})}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6840),t(387)}));var n=e.O();_N_E=n}]);