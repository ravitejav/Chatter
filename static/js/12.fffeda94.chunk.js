(this.webpackJsonpchatter=this.webpackJsonpchatter||[]).push([[12],{51:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(65),i=n.n(r),a=function(e){return e?i()(new Date(e)).fromNow():null}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(38),i=n(36),a=n(33),c=n(34),s=n(31),u=n(37),o=function(){function e(){Object(a.a)(this,e),this.firebaseDataBase=void 0,this.firebaseAuth=void 0,this.firebaseDataBase=u.a.database(),this.firebaseAuth=u.a.auth()}return Object(c.a)(e,[{key:"refForGroup",value:function(){return this.firebaseDataBase.ref("/group")}},{key:"getCurrentUser",value:function(){return this.firebaseAuth.currentUser}},{key:"createGroup",value:function(e){return this.refForGroup().update(Object(r.a)({},e.id,Object(i.a)({},e)))}},{key:"getGroups",value:function(e){this.refForGroup().on("value",e)}},{key:"exitGroup",value:function(e){var t,n=Object(s.c)((null===(t=this.getCurrentUser())||void 0===t?void 0:t.email)||"");return this.refForGroup().child(e.id).update(Object(i.a)(Object(i.a)({},e),{},{userIdList:e.userIdList.filter((function(e){return e!==n}))}))}}]),e}()},66:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var r=n(32),i=n(46),a=n(42),c=n(0),s=n(53),u=n(35),o=n(51),l=(n(66),n(3));t.default=function(e){var t=e.activeUser,n=e.activeGroup,d=e.handleRestGroup,v=Object(c.useState)(!1),f=Object(r.a)(v,2),h=f[0],j=f[1];return Object(l.jsx)("section",{className:"userHeader center",children:Object(l.jsxs)("div",{className:"headerBar",children:[t&&Object(l.jsx)("img",{src:(null===t||void 0===t?void 0:t.profileUrl)||"",alt:"profile pic"}),Object(l.jsxs)("div",{className:"profile center",children:[Object(l.jsxs)("div",{className:"details",children:[Object(l.jsx)("span",{className:"name",children:(null===t||void 0===t?void 0:t.name)||(null===n||void 0===n?void 0:n.name)}),Object(l.jsxs)("span",{className:"status",children:[Object(l.jsx)("span",{className:"activeUser"}),!0===(null===t||void 0===t?void 0:t.active)?"active":Object(o.a)((null===t||void 0===t?void 0:t.active)||0)]})]}),Object(l.jsxs)("div",{className:"options",children:[Object(l.jsx)("div",{className:"tripleDot center button",onClick:function(){return j((function(e){return!e}))},children:Object(l.jsx)(a.a,{icon:i.e})}),h&&Object(l.jsx)("div",{className:"dropdown",children:Object(l.jsx)("span",{className:"button center",onClick:function(){(new s.a).exitGroup(n).then((function(e){(new u.a).removeFromGroup((null===n||void 0===n?void 0:n.id)||"").then((function(){d()})).catch()})).catch((function(e){}))},children:"Exit Group"})})]})]})]})})}}}]);
//# sourceMappingURL=12.fffeda94.chunk.js.map