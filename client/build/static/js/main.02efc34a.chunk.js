(this.webpackJsonpchrome_extension=this.webpackJsonpchrome_extension||[]).push([[0],{112:function(e,t,n){},124:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(18),s=n.n(r),i=(n(92),n(26)),o=n(7),u=n(94),l=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),s=Object(i.a)(r,2),l=s[0],j=s[1],f=Object(c.useState)(""),b=Object(i.a)(f,2),d=b[0],h=b[1];return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),console.log(n,l,d),u({method:"post",url:"http://localhost:5000/user",data:{name:n,email:d,password:l}}).then((function(e){console.log(e)})).catch((function(e){return console.error(e)}))}(e)},children:[Object(o.jsx)("input",{type:"text",name:"input",onChange:function(e){a(e.target.value)}}),Object(o.jsx)("input",{type:"text",name:"name",onChange:function(e){h(e.target.value)}}),Object(o.jsx)("input",{type:"password",name:"password",onChange:function(e){j(e.target.value)}}),Object(o.jsx)("button",{type:"submit",children:"Submit"})]})})},j=n(84),f=n(10),b=(n.p,n(112),n.p+"static/media/cog-solid.974a4d95.svg"),d=n(127),h=n(128),p=(n(113),function(e){var t=e.preferences,n=Object(c.useState)(!1),a=Object(i.a)(n,2),r=a[0],s=a[1];return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("button",{style:{height:"30px",width:"30px"},className:"absolute p-1 flex ml-98 z-50",onClick:function(){s(!0)},children:Object(o.jsx)("img",{alt:"Preference",src:b})}),Object(o.jsx)(d.a,{className:"z-50",title:"Preferences",visible:r,onOk:function(){s(!1)},onCancel:function(){s(!1)},children:Object(o.jsx)("div",{className:"grid grid-cols-2",children:t.map((function(e){return Object(o.jsxs)("div",{className:"flex justify-between mr-24 pb-2",children:[Object(o.jsxs)("label",{children:[e.name.charAt(0).toUpperCase(),e.name.slice(1)]}),Object(o.jsx)(h.a,{className:"w-1",onChange:function(){return function(e){var n=t.findIndex((function(t){return t.name==e.name}));t[n].prefer=!t[n].prefer,console.log(t[n])}(e)}})]})}))})})]})});var m=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=(t[1],Object(c.useState)((new Date).getMinutes())),r=Object(i.a)(a,2),s=r[0],u=r[1],b=Object(c.useState)(s),d=Object(i.a)(b,2),h=(d[0],d[1]),m=Object(c.useState)([{name:"background",prefer:!0},{name:"dark",prefer:!0},{name:"nature",prefer:!0},{name:"tropical",prefer:!0},{name:"skyscrapper",prefer:!0},{name:"night",prefer:!0},{name:"mountains",prefer:!0},{name:"Sky",prefer:!1},{name:"ocean",prefer:!0},{name:"dark",prefer:!0}]),O=Object(i.a)(m,2),g=O[0];O[1],setInterval((function(){u((new Date).getMinutes()),h(s<10?"0"+s:s)}),1e4),Object(c.useEffect)((function(){x()}),[g]);var x=function(){fetch("https://source.unsplash.com/featured/".concat(window.innerWidth,"x").concat(window.innerHeight,"/?").concat(g.join())).then((function(e){window.document.querySelector("#imgg").style.background="url(".concat(e.url,")")})).catch((function(e){return console.log(e)}))};return Object(o.jsx)(j.a,{children:Object(o.jsxs)(f.c,{children:[Object(o.jsx)(f.a,{exact:!0,path:"/",children:Object(o.jsxs)("div",{className:"App",style:{background:"#f0f0f0"},children:[Object(o.jsx)(p,{modalVisible:n,preferences:g}),Object(o.jsx)("header",{id:"imgg",style:{width:"100vw",height:"100vh",position:"absolute",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(o.jsxs)("span",{className:"",style:{fontSize:"10rem",color:"white",fontWeight:"700"},children:[(new Date).getHours(),":",s]})})]})}),Object(o.jsx)(f.a,{path:"/login",exact:!0,children:Object(o.jsx)(l,{})})]})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,129)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(m,{})}),document.getElementById("root")),O()},92:function(e,t,n){}},[[124,1,2]]]);