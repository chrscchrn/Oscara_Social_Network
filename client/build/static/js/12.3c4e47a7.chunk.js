(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{143:function(e,t,a){"use strict";var n=a(142),l=a.n(n);t.a={getUserByEmail:function(e){return l.a.get("/api/user/"+e)},getUserByHandle:function(e){return l.a.get("/api/user/handle/"+e)},addUser:function(e){return l.a.post("/api/user/add",e)},getPosts:function(){return l.a.get("/api/posts")},makePost:function(e){return l.a.post("/api/posts",e)},getUsersPosts:function(e){return l.a.get("/api/posts/"+e)},removePost:function(e){return l.a.delete("/api/posts/"+e)},likePost:function(e,t){return l.a.get("/api/posts/"+e+"/"+t)},replyToPost:function(e){return l.a.post("/api/posts/reply",e)},getReplies:function(e){return l.a.get("/api/posts/reply/"+e)}}},251:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return E});var n=a(37),l=a(141),u=a(0),c=a.n(u),r=a(35),i=a(16),s=a(142),o=a.n(s),d=a(143),p=c.a.lazy(function(){return a.e(13).then(a.bind(null,221))}),f=c.a.lazy(function(){return Promise.all([a.e(0),a.e(7),a.e(15)]).then(a.bind(null,222))}),m=c.a.lazy(function(){return a.e(8).then(a.bind(null,223))}),b=c.a.lazy(function(){return Promise.all([a.e(0),a.e(3),a.e(9)]).then(a.bind(null,224))});function g(){window.location.reload()}function E(){var e=Object(u.useState)({new_user:!0}),t=Object(l.a)(e,2),a=t[0],s=t[1],E=Object(u.useState)([]),h=Object(l.a)(E,2),w=h[0],P=h[1],j=Object(u.useState)([]),O=Object(l.a)(j,2),y=O[0],k=O[1],S=Object(i.b)(),_=S.user,U=S.isAuthenticated,v=S.isLoading;return Object(u.useEffect)(function(){U&&d.a.getUserByEmail(_.email).then(function(e){null!==e.data.email&&s(Object(n.a)({},a,{new_user:!1,handle:e.data.handle}))}).catch(function(e){console.log(e),s(Object(n.a)({},a,{new_user:!0,uploadedPic:!1}))})},[U]),Object(u.useEffect)(function(){!U||v||a.new_user||o.a.get("/api/image/"+_.email).then(function(e){null===e.data.data?s(Object(n.a)({},a,{uploadedPic:!1})):(s(Object(n.a)({},a,{uploadedPic:!0})),P(e.data.data),k(e.data.fileName))}).catch(function(e){console.log(e)})},[a.new_user]),v||U?!v&&U&&!0===a.new_user&&!1===a.uploadedPic?c.a.createElement(u.Suspense,{fallback:c.a.createElement(r.a,null)},c.a.createElement(f,null)):!v&&U&&!1===a.new_user&&!1===a.uploadedPic?c.a.createElement(u.Suspense,{fallback:c.a.createElement(r.a,null)},c.a.createElement(m,{email:_.email,finishSetup:g})):!v&&U&&!1===a.new_user&&!0===a.uploadedPic?c.a.createElement(u.Suspense,{fallback:c.a.createElement(r.a,null)},c.a.createElement(b,{images:w,imageName:y,handle:a.handle})):c.a.createElement(r.a,null):c.a.createElement(u.Suspense,{fallback:c.a.createElement(r.a,null)},c.a.createElement(p,null))}}}]);
//# sourceMappingURL=12.3c4e47a7.chunk.js.map