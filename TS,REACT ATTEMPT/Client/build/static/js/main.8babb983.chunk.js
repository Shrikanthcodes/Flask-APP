(this["webpackJsonppokemon-app-client"]=this["webpackJsonppokemon-app-client"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(6),o=n.n(c),s=n(2),i=n(0),a=function(e){var t=e.onLogin,n=Object(r.useState)(""),c=Object(s.a)(n,2),o=c[0],a=c[1],u=Object(r.useState)(""),l=Object(s.a)(u,2),j=l[0],b=l[1];return Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(o,j)},children:[Object(i.jsx)("h2",{children:"Login"}),Object(i.jsx)("label",{htmlFor:"username",children:"Username:"}),Object(i.jsx)("input",{type:"text",id:"username",value:o,onChange:function(e){return a(e.target.value)}}),Object(i.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(i.jsx)("input",{type:"password",id:"password",value:j,onChange:function(e){return b(e.target.value)}}),Object(i.jsx)("button",{type:"submit",children:"Login"})]})},u=function(e){var t=e.onRegister,n=Object(r.useState)(""),c=Object(s.a)(n,2),o=c[0],a=c[1],u=Object(r.useState)(""),l=Object(s.a)(u,2),j=l[0],b=l[1],d=Object(r.useState)(""),h=Object(s.a)(d,2),O=h[0],p=h[1];return Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t(o,j,O)},children:[Object(i.jsx)("h2",{children:"Register"}),Object(i.jsx)("label",{htmlFor:"username",children:"Username:"}),Object(i.jsx)("input",{type:"text",id:"username",value:o,onChange:function(e){return a(e.target.value)}}),Object(i.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(i.jsx)("input",{type:"email",id:"email",value:j,onChange:function(e){return b(e.target.value)}}),Object(i.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(i.jsx)("input",{type:"password",id:"password",value:O,onChange:function(e){return p(e.target.value)}}),Object(i.jsx)("button",{type:"submit",children:"Register"})]})},l=function(e){var t=e.pokemonList;return Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:Object(i.jsx)("tr",{children:Object(i.jsx)("th",{children:"Name"})})}),Object(i.jsx)("tbody",{children:t.map((function(e){return Object(i.jsx)("tr",{children:Object(i.jsx)("td",{children:e.name})},e.name)}))})]})},j=function(e){var t=e.colors,n=e.selectedColor,r=e.onColorChange;return Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"color-select",children:"Filter by color:"}),Object(i.jsxs)("select",{id:"color-select",value:n,onChange:function(e){return r(e.target.value)},children:[Object(i.jsx)("option",{value:"",children:"All"}),t.map((function(e){return Object(i.jsx)("option",{value:e,children:e},e)}))]})]})},b=Object(r.createContext)(void 0),d=function(e){var t=e.children,n=Object(r.useState)(!1),c=Object(s.a)(n,2),o=c[0],a=c[1];return Object(i.jsx)(b.Provider,{value:{isAuthenticated:o,login:function(e,t){a(!0)},logout:function(){a(!1)}},children:t})},h=n(3),O=n(5),p=Object(r.createContext)(void 0),x=function(e){var t=e.children,n=Object(r.useState)([]),c=Object(s.a)(n,2),o=c[0],a=c[1],u=Object(r.useState)([]),l=Object(s.a)(u,2),j=l[0],b=l[1],d=Object(r.useState)(""),x=Object(s.a)(d,2),f=x[0],m=x[1];Object(r.useEffect)((function(){var e=function(){var e=Object(O.a)(Object(h.a)().mark((function e(){var t,n,r,c;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://pokeapi.co/api/v2/pokemon?limit=151");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,r=function(){var e=Object(O.a)(Object(h.a)().mark((function e(t){var n,r;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",{name:r.name,url:t,color:r.types[0].type.name});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=10,Promise.all(n.results.map((function(e){return r(e.url)})));case 10:c=e.sent,a(c),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error("Failed to fetch Pokemon data:",e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(r.useEffect)((function(){b(f?o.filter((function(e){return e.color===f})):o)}),[f,o]);return Object(i.jsx)(p.Provider,{value:{pokemonList:o,filteredPokemonList:j,selectedColor:f,setColorFilter:function(e){m(e)}},children:t})},f=function(){var e=function(){var e=Object(r.useContext)(b);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e}(),t=e.isAuthenticated,n=e.login,c=e.logout,o=function(){var e=Object(r.useContext)(p);if(!e)throw new Error("usePokemon must be used within a PokemonProvider");return e}(),s=o.filteredPokemonList,d=o.selectedColor,h=o.setColorFilter;return t?Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{onClick:c,children:"Logout"}),Object(i.jsx)(j,{colors:["Red","Blue","Green"],selectedColor:d,onColorChange:h}),Object(i.jsx)(l,{pokemonList:s})]}):Object(i.jsxs)("div",{children:[Object(i.jsx)(a,{onLogin:n}),Object(i.jsx)(u,{onRegister:function(e,t,n){}})]})},m=function(){return Object(i.jsx)(d,{children:Object(i.jsx)(x,{children:Object(i.jsxs)("div",{className:"app",children:[Object(i.jsx)("h1",{children:"Pokemon App"}),Object(i.jsx)(f,{})]})})})};n(12);o.a.render(Object(i.jsx)(m,{}),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.8babb983.chunk.js.map