(this.webpackJsonpchatter=this.webpackJsonpchatter||[]).push([[6,11,12,14],{115:function(e,t,a){"use strict";a.r(t);var s=a(32),c=a(0),n=a(74),i=a(76),r=a(77),u=a(38),l=a(36),o=a(46),j=a(42),d=a(44),h=a(35),b=a(31),v=a(51),f=a(67),O=a(45),m=(a(98),a(54)),p=a(50),g=a(69),x=a(3),N=function(e){var t=e.setActiveUser,a=e.activeUser,n=Object(c.useState)(!1),i=Object(s.a)(n,2),r=i[0],N=i[1],y=Object(c.useState)({}),k=Object(s.a)(y,2),U=k[0],M=k[1],C=Object(c.useState)(""),w=Object(s.a)(C,2),G=w[0],T=w[1],R=Object(c.useState)(d.r),S=Object(s.a)(R,2),L=S[0],P=S[1],F=Object(c.useState)([]),D=Object(s.a)(F,2),B=D[0],E=D[1],A=Object(c.useState)({}),I=Object(s.a)(A,2),W=I[0],q=I[1],V=Object(c.useState)({}),H=Object(s.a)(V,2),J=H[0],K=H[1],z=Object(c.useState)([]),Q=Object(s.a)(z,2),X=Q[0],Y=Q[1],Z=Object(c.useRef)(a),$=function(){return P(d.r)},_=function(e){var t=e.val()||{},a=Object.keys(t).map((function(e){return e}));E(a)},ee=function(e){q(Object(m.c)(e.val()))};Object(c.useEffect)((function(){if(B.length>0&&Object.keys(W).length>0){var e=B.map((function(e){return W[e]})).filter((function(e){return e.name.toLowerCase().includes(G.toLowerCase())}));Y(e),W[a.id]&&t(W[a.id])}}),[B,W,G]);var te=function(e,t){if(t.exists()){var a=t.val()[Object.keys(t.val())[0]];K((function(t){return Object(l.a)(Object(l.a)({},t),{},Object(u.a)({},e,a.message))}))}},ae=function(e,t){if(e.exists()){var a,s,c=new p.a;if(Z.current.email&&Object(b.c)(Z.current.email)===t)null===(a=c.setLastReadTime(t))||void 0===a||a.then().catch();else null===(s=c.getLastReadTime(t))||void 0===s||s.then((function(a){M((function(s){return Object(l.a)(Object(l.a)({},s),{},Object(u.a)({},Object(b.c)(t),Object(g.a)(a.val()||0,e)))}))})).catch((function(e){P(Object(d.c)(d.l)),Object(b.a)(1,$)}))}};Object(c.useEffect)((function(){var e=new p.a;B.forEach((function(t){e.getLastMessage(t,te),e.getMessagesOnce(t,ae)}))}),[B]);return Object(c.useEffect)((function(){return function(){var e=new h.a;e.getMyFriends(_),e.getLiveUpdateOfUser(ee)}(),function(){var e,t=new p.a;Z.current.id&&(null===(e=t.setLastReadTime(Z.current.id))||void 0===e||e.then().catch());Z.current={id:"",email:"",name:"",active:!1,profileUrl:"",groups:{}}}}),[]),Object(x.jsxs)("section",{className:"userListWrapper",children:[Object(x.jsxs)("div",{className:"headingBar",children:[Object(x.jsxs)("div",{className:"heading",children:[Object(x.jsx)("h1",{children:"Chats"}),Object(x.jsx)("span",{children:"Personal Chats"})]}),Object(x.jsxs)("div",{className:"createNew",onClick:function(){return N(!0)},children:[Object(x.jsx)("span",{className:"plus",children:Object(x.jsx)(j.a,{icon:o.h})}),Object(x.jsx)("span",{className:"text",children:"Create New Chat"})]})]}),Object(x.jsx)("div",{className:"chatUtils",children:Object(x.jsxs)("div",{className:"searchBar center",children:[Object(x.jsx)("span",{className:"searchIcon center",children:Object(x.jsx)(j.a,{icon:o.j})}),Object(x.jsx)("input",{type:"search",placeholder:"Search Name...",onChange:function(e){return T(e.target.value)}})]})}),Object(x.jsx)("div",{className:"users",children:Object(x.jsx)("ul",{children:X.map((function(e,s){return Object(x.jsxs)("li",{onClick:function(){var a;!function(e){Z.current.id&&(new p.a).setLastReadTime(Z.current.email),t(e),Z.current=e}(e),a=e.id,M(Object(l.a)(Object(l.a)({},U),{},Object(u.a)({},a,0)))},className:e.email===a.email?"active":"",children:[Object(x.jsxs)("div",{className:"userInfo",children:[Object(x.jsx)("img",{src:e.profileUrl?e.profileUrl:"https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg"}),Object(x.jsxs)("span",{className:"userName center",children:[Object(x.jsx)("span",{className:"name",children:e.name}),Object(x.jsxs)("span",{className:"status",children:[Object(x.jsx)("span",{className:"notActiveUser"}),!0===e.active?"active":Object(v.a)(e.active)]})]})]}),Object(x.jsxs)("div",{className:"messageData",children:[Object(x.jsx)("p",{children:J[e.id]}),U[e.id]>0?Object(x.jsx)("span",{className:"messageCount center",children:U[e.id]}):null]})]},s)}))})}),r&&Object(x.jsx)(f.a,{hideSearchPopUp:function(){return N(!1)}}),Object(x.jsx)(O.a,{time:1,message:L.message,type:L.type,showToast:L.showToast})]})};a(99),t.default=function(){var e=Object(c.useState)({}),t=Object(s.a)(e,2),a=t[0],u=t[1];return Object(x.jsxs)("section",{className:"messageBlock",children:[Object(x.jsx)("div",{className:"usersList",children:Object(x.jsx)(N,{setActiveUser:u,activeUser:a})}),Object(x.jsxs)("div",{className:"chatContainer",children:[Object.keys(a).length>0&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"chatHeader",children:Object(x.jsx)(r.default,{activeUser:a})}),Object(x.jsx)("div",{className:"messages",children:Object(x.jsx)(i.default,{activeUser:a})}),Object(x.jsx)("div",{className:"messageInput",children:Object(x.jsx)(n.default,{activeUser:a})})]}),Object.keys(a).length<=0&&Object(x.jsx)("div",{className:"typewriter center",children:Object(x.jsx)("h1",{children:"Choose friend to chat..."})})]})]})}},50:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var s=a(38),c=a(36),n=a(33),i=a(34),r=a(39),u=a(43),l=a(31),o=a(37),j=function(){function e(){Object(n.a)(this,e),this.database=void 0,this.auth=void 0,this.database=o.a.database(),this.auth=o.a.auth()}return Object(i.a)(e,[{key:"getUserChatRef",value:function(){return this.database.ref().child("userchats")}},{key:"getGroupChatRef",value:function(){return this.database.ref().child("/groupchats")}},{key:"getMessagePathToFriend",value:function(e){var t,a=(null===(t=this.auth.currentUser)||void 0===t?void 0:t.email)||"";return this.getUserChatRef().child(Object(l.b)(a,e)).child("/messages/")}},{key:"getMessageMetaDataPath",value:function(e){var t,a=(null===(t=this.auth.currentUser)||void 0===t?void 0:t.email)||"";return this.getUserChatRef().child(Object(l.b)(a,e)).child("/metaData/")}},{key:"getGroupPath",value:function(e){return this.getGroupChatRef().child(e).child("/messages/")}},{key:"getMessageMetaDataPathForGroup",value:function(e){return this.getGroupChatRef().child(e).child("/metaData/")}},{key:"getMessagesOnce",value:function(e,t){return this.getMessagePathToFriend(e).on(u.c,(function(a){return t(a,e)}),(function(e){}))}},{key:"getMessagesForGroup",value:function(e,t){this.getGroupPath(e).on("value",(function(a){return t(a,e)}))}},{key:"sendMessage",value:function(e,t){var a,n=(null===(a=this.auth.currentUser)||void 0===a?void 0:a.email)||"";return this.getMessagePathToFriend(e).update(Object(s.a)({},t.timestamp,Object(c.a)(Object(c.a)({},t),{},{from:n})))}},{key:"sendMessageToGroup",value:function(e,t){var a,n=(null===(a=this.auth.currentUser)||void 0===a?void 0:a.email)||"";return this.getGroupPath(e).update(Object(s.a)({},t.timestamp,Object(c.a)(Object(c.a)({},t),{},{from:n})))}},{key:"getLastMessage",value:function(e,t){return this.getMessagePathToFriend(e).orderByValue().limitToLast(1).on("value",(function(a){return t(e,a)}))}},{key:"getLastMessageOfGroup",value:function(e,t){return this.getGroupPath(e).orderByValue().limitToLast(1).on("value",(function(a){return t(e,a)}))}},{key:"getLastReadTime",value:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.h,s=Object(l.c)((null===(t=this.auth.currentUser)||void 0===t?void 0:t.email)||"");return a===r.h?this.getMessageMetaDataPath(e).child("lastMessageReadTime").child(s).get():a===r.c?this.getMessageMetaDataPathForGroup(e).child("lastMessageReadTime").child(s).get():void 0}},{key:"setLastReadTime",value:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.h,s=Object(l.c)((null===(t=this.auth.currentUser)||void 0===t?void 0:t.email)||"");return a===r.h?this.getMessageMetaDataPath(e).child("lastMessageReadTime").child(s).set((new Date).getTime()):a===r.c?this.getMessageMetaDataPathForGroup(e).child("lastMessageReadTime").child(s).set((new Date).getTime()):void 0}}]),e}()},51:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var s=a(65),c=a.n(s),n=function(e){return e?c()(new Date(e)).fromNow():null}},53:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var s=a(38),c=a(36),n=a(33),i=a(34),r=a(31),u=a(37),l=function(){function e(){Object(n.a)(this,e),this.firebaseDataBase=void 0,this.firebaseAuth=void 0,this.firebaseDataBase=u.a.database(),this.firebaseAuth=u.a.auth()}return Object(i.a)(e,[{key:"refForGroup",value:function(){return this.firebaseDataBase.ref("/group")}},{key:"getCurrentUser",value:function(){return this.firebaseAuth.currentUser}},{key:"createGroup",value:function(e){return this.refForGroup().update(Object(s.a)({},e.id,Object(c.a)({},e)))}},{key:"getGroups",value:function(e){this.refForGroup().on("value",e)}},{key:"exitGroup",value:function(e){var t,a=Object(r.c)((null===(t=this.getCurrentUser())||void 0===t?void 0:t.email)||"");return this.refForGroup().child(e.id).update(Object(c.a)(Object(c.a)({},e),{},{userIdList:e.userIdList.filter((function(e){return e!==a}))}))}}]),e}()},54:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return i}));var s=a(31),c=function(e,t,a){return Object.keys(t[Object(s.c)(a)].friends||{}).forEach((function(e){return t[e]=null})),t[Object(s.c)(a)]=null,Object.keys(t).map((function(a){return t[a]&&(t[a].email.includes(e)||t[a].name.includes(e))?t[a]:null})).filter((function(e){return null!=e}))},n=function(e){return Object.keys(e).map((function(t){return e[t]})).filter((function(e){return e}))},i=function(e){var t={};return Object.keys(e).forEach((function(a){t[a]={id:a,name:e[a].name,active:e[a].active,email:e[a].email,profileUrl:e[a].profileUrl,groups:e[a].groups}})),t}},63:function(e,t,a){},64:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){"use strict";var s=a(32),c=a(46),n=a(42),i=a(0),r=a(44),u=a(35),l=a(31),o=a(54),j=a(45),d=(a(68),a(3));t.a=function(e){var t=Object(i.useState)([]),a=Object(s.a)(t,2),h=a[0],b=a[1],v=Object(i.useState)(!1),f=Object(s.a)(v,2),O=f[0],m=f[1],p=Object(i.useState)(""),g=Object(s.a)(p,2),x=g[0],N=g[1],y=Object(i.useState)(r.r),k=Object(s.a)(y,2),U=k[0],M=k[1],C=function(){return M(r.r)};return Object(d.jsxs)("div",{className:"userSearchPopUP",children:[Object(d.jsxs)("div",{className:"searchWrapper",children:[Object(d.jsxs)("div",{className:"searchBar",children:[Object(d.jsx)("input",{type:"search",placeholder:"Search for Friends....",onChange:function(e){return N(e.target.value)}}),Object(d.jsxs)("div",{className:"center",onClick:function(){if(x.length>3){var e=new u.a,t=e.getCurrentUser();e.getAllUsers().then((function(e){b(Object(o.a)(x,e,(null===t||void 0===t?void 0:t.email)||""))})).catch((function(e){return b([])})),m(!0)}else M(Object(r.v)(r.j)),Object(l.a)(1,C)},children:[Object(d.jsx)(n.a,{icon:c.j}),"Search"]})]}),Object(d.jsxs)("div",{className:"searchResults",children:[h.length>0&&O&&h.map((function(e,t){return Object(d.jsx)("ul",{className:"resultsList",children:Object(d.jsx)("li",{className:"result",children:Object(d.jsxs)("div",{className:"requestBox",children:[Object(d.jsx)("img",{src:e.profileUrl,alt:"profile pic"}),Object(d.jsxs)("div",{className:"details",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:e.name}),Object(d.jsxs)("span",{children:["\xa0",e.email]})]}),Object(d.jsx)("div",{className:"buttons",children:Object(d.jsxs)("div",{className:"center addFriend",onClick:function(){return function(e){var t,a=new u.a,s=(null===(t=a.getCurrentUser())||void 0===t?void 0:t.email)||"";a.sendRequest(Object(l.c)(s),Object(l.c)(e.email)).then((function(t){M(Object(r.h)(Object(r.f)(e.name))),Object(l.a)(1,C)})).catch((function(t){M(Object(r.c)(Object(r.d)(e.name))),Object(l.a)(1,C)}))}(e)},children:[Object(d.jsx)(n.a,{icon:c.l}),"Add"]})})]})]})})},t)})),O&&h.length<=0&&Object(d.jsxs)("div",{className:"noResults",children:["No Results related to\xa0",Object(d.jsx)("strong",{children:x})]}),!O&&Object(d.jsx)("div",{className:"notSearched",children:"Search for new friends"})]}),Object(d.jsx)("div",{className:"closeButton",children:Object(d.jsxs)("div",{className:"center",onClick:e.hideSearchPopUp,children:[Object(d.jsx)(n.a,{icon:c.a}),"Close"]})})]}),Object(d.jsx)(j.a,{time:1,message:U.message,type:U.type,showToast:U.showToast})]})}},68:function(e,t,a){},69:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var s=function(e,t){var a=parseInt(e,10),s=t.val(),c=0;return Object.keys(s).forEach((function(e){s[e].timestamp>a&&c++})),c}},74:function(e,t,a){"use strict";a.r(t);var s=a(75),c=a(42),n=a(0),i=a(50),r=(a(63),a(3));t.default=function(e){var t=e.activeUser,a=e.activeGroup,u=Object(n.useRef)(null),l=function(){var e=null===u||void 0===u?void 0:u.current;!function(e){var s=new i.a,c={from:"",message:e,timestamp:(new Date).getTime()};""!==e&&void 0!==e&&null!==e&&(t&&s.sendMessage((null===t||void 0===t?void 0:t.email)||"",c).then().catch(),a&&s.sendMessageToGroup(a.id,c).then().catch())}(e&&e.value),e&&(e.value="")};return Object(r.jsx)("div",{className:"messageInputWrapper",children:Object(r.jsxs)("div",{className:"inputWrapper",children:[Object(r.jsx)("input",{type:"text",placeholder:"Type your message here....",ref:u,onKeyPress:function(e){"Enter"===e.key&&l()}}),Object(r.jsx)("span",{className:"sendicon",role:"button",onClick:l,children:Object(r.jsx)(c.a,{icon:s.a})})]})})}},76:function(e,t,a){"use strict";a.r(t);var s=a(36),c=a(32),n=a(0),i=a(50),r=(a(64),a(51)),u=a(35),l=a(3);t.default=function(e){var t=e.activeUser,a=e.activeGroup,o=Object(n.useState)([]),j=Object(c.a)(o,2),d=j[0],h=j[1],b=Object(n.useRef)({}),v=function(e){if(e.exists()){var t=e.val()||{};if(Object.keys(t).length>0){var a=Object.keys(t).map((function(e){return t[e]}));h(a.sort((function(e,t){return e.timestamp-t.timestamp})))}}};return Object(n.useEffect)((function(){h([]),function(){var e=new i.a;(null===t||void 0===t?void 0:t.email)?e.getMessagesOnce((null===t||void 0===t?void 0:t.email)||"",v):(null===a||void 0===a?void 0:a.id)&&e.getMessagesForGroup(a.id||"",v)}()}),[t,a]),Object(n.useEffect)((function(){var e;null===(e=document.querySelector("#activeMessage"))||void 0===e||e.scrollIntoView()}),[d]),Object(n.useEffect)((function(){var e=new u.a;b.current=Object(s.a)({},e.getCurrentUser())}),[]),Object(l.jsx)("div",{className:"messageWrapper",children:Object(l.jsx)("ul",{className:"messagesList",children:d.map((function(e,t){var a,s;return Object(l.jsxs)("li",{className:e.from!==(null===(a=b.current)||void 0===a?void 0:a.email)?"moveLeft":"moveRight",id:t===d.length-1?"activeMessage":"",children:[Object(l.jsx)("div",{className:e.from!==(null===(s=b.current)||void 0===s?void 0:s.email)?"sentByFriend":"sentByMe",children:e.message}),Object(l.jsx)("span",{className:"timeago",children:Object(r.a)(e.timestamp)})]},t)}))})})}},77:function(e,t,a){"use strict";a.r(t);var s=a(32),c=a(46),n=a(42),i=a(0),r=a(53),u=a(35),l=a(51),o=(a(66),a(3));t.default=function(e){var t=e.activeUser,a=e.activeGroup,j=e.handleRestGroup,d=Object(i.useState)(!1),h=Object(s.a)(d,2),b=h[0],v=h[1];return Object(o.jsx)("section",{className:"userHeader center",children:Object(o.jsxs)("div",{className:"headerBar",children:[t&&Object(o.jsx)("img",{src:(null===t||void 0===t?void 0:t.profileUrl)||"",alt:"profile pic"}),Object(o.jsxs)("div",{className:"profile center",children:[Object(o.jsxs)("div",{className:"details",children:[Object(o.jsx)("span",{className:"name",children:(null===t||void 0===t?void 0:t.name)||(null===a||void 0===a?void 0:a.name)}),Object(o.jsxs)("span",{className:"status",children:[Object(o.jsx)("span",{className:"activeUser"}),!0===(null===t||void 0===t?void 0:t.active)?"active":Object(l.a)((null===t||void 0===t?void 0:t.active)||0)]})]}),Object(o.jsxs)("div",{className:"options",children:[Object(o.jsx)("div",{className:"tripleDot center button",onClick:function(){return v((function(e){return!e}))},children:Object(o.jsx)(n.a,{icon:c.e})}),b&&Object(o.jsx)("div",{className:"dropdown",children:Object(o.jsx)("span",{className:"button center",onClick:function(){(new r.a).exitGroup(a).then((function(e){(new u.a).removeFromGroup((null===a||void 0===a?void 0:a.id)||"").then((function(){j()})).catch()})).catch((function(e){}))},children:"Exit Group"})})]})]})]})})}},98:function(e,t,a){},99:function(e,t,a){}}]);
//# sourceMappingURL=6.e67f1680.chunk.js.map