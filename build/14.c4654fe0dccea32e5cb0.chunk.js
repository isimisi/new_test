(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{facc58c7bdadf4ec36b5:function(e,t,a){"use strict";a.r(t);var r=a("8af190b70a6bc55c6f1b"),n=a.n(r),o=a("6938d226fd372a75cbf9"),i=a("f46b9b8b5f74b830f26b"),l=a.n(i),d=(a("8a2d1b95e05b6a321e74"),a("29df10ef1bee6d38fd67")),c=a.n(d),p=a("e96e82762cfd5fe3a589"),s=a.n(p),u=a("326ca9b764bcf922997d"),f=a.n(u),g=a("26e95055143f95aa9ed4"),b=a.n(g),h=a("a925394539eb759fa32d"),m=a.n(h),y=a("b4198646ff0c3202dded"),v=a.n(y),w=a("3593031c643d72591e28"),x=a.n(w),k=a("03027ef652f840147476"),S=a.n(k),j=a("b0c37be7de20d933b466");function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var A,D=function(e){var t,a,r,n;return{root:I({flexGrow:1,height:"90vh",zIndex:1,overflow:"hidden",position:"relative",borderRadius:e.rounded.medium,boxShadow:e.shade.light,marginBottom:e.spacing(3)},e.breakpoints.up("sm"),{display:"flex"}),addBtn:{position:"fixed",bottom:30,right:50,width:200,height:60,zIndex:100},fixHeight:{},appBar:(t={height:"auto",background:"dark"===e.palette.type?e.palette.grey[800]:e.palette.background.paper},I(t,e.breakpoints.up("sm"),{background:"none"}),I(t,"justifyContent","center"),I(t,"& $avatar",{boxShadow:e.glow.light,width:80,height:80,marginRight:30}),I(t,"& h2",{flex:1,color:e.palette.text.primary,"& span":{color:e.palette.text.secondary}}),t),online:{background:"#CDDC39"},bussy:{background:"#EF5350"},idle:{background:"#FFC107"},offline:{background:"#9E9E9E"},status:{"& span":{borderRadius:"50%",display:"inline-block",marginRight:2,width:10,height:10,border:"1px solid ".concat(e.palette.common.white)}},appBarShift:I({marginLeft:0,width:"100%",transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},e.breakpoints.down("md"),{zIndex:1300}),total:{textAlign:"center",fontSize:11,color:e.palette.text.disabled,textTransform:"uppercase"},drawerPaper:(a={},I(a,e.breakpoints.up("sm"),{width:300}),I(a,"position","relative"),I(a,"paddingBottom",65),I(a,"height","90vh"),I(a,"background","dark"===e.palette.type?Object(j.darken)(e.palette.primary.light,.6):Object(j.lighten)(e.palette.primary.light,.5)),I(a,"border","none"),a),clippedRight:{},toolbar:{display:"flex",alignItems:"center",justifyContent:"center",padding:"".concat(e.spacing(2),"px ").concat(e.spacing(1),"px"),position:"relative"},content:(r={flexGrow:1,backgroundColor:"dark"===e.palette.type?e.palette.grey[800]:e.palette.background.paper,backdropFilter:"saturate(180%) blur(20px)",transition:"left 0.4s ease-out, opacity 0.4s ease-out"},I(r,e.breakpoints.up("lg"),{backgroundColor:"dark"===e.palette.type?Object(j.fade)(e.palette.grey[800],.75):Object(j.fade)(e.palette.background.paper,.9)}),I(r,e.breakpoints.down("xs"),{left:"100%",top:0,opacity:0,position:"absolute",zIndex:1200,width:"100%",overflow:"auto",height:"100%"}),r),detailPopup:I({},e.breakpoints.down("xs"),{left:0,opacity:1,zIndex:2001}),title:{display:"flex",flex:1,"& svg":{marginRight:5}},flex:{display:"flex",alignItems:"center"},searchWrapper:{flex:1,fontFamily:e.typography.fontFamily,position:"relative",borderRadius:e.rounded.big,display:"flex",background:e.palette.common.white,border:"1px solid ".concat(e.palette.divider),marginRight:e.spacing(.5),height:e.spacing(5)},search:{width:"auto",height:"100%",top:0,left:20,position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},input:{font:"inherit",padding:"".concat(e.spacing(.5),"px ").concat(e.spacing(2),"px ").concat(e.spacing(.5),"px ").concat(e.spacing(6),"px"),border:0,display:"block",verticalAlign:"middle",whiteSpace:"normal",background:"none",margin:0,color:"inherit",width:"100%","&:focus":{outline:0}},bottomFilter:(n={position:"absolute",width:"100%",background:"none",border:"none"},I(n,e.breakpoints.up("sm"),{width:300}),I(n,"zIndex",2e3),I(n,"bottom",0),I(n,"left",0),n),avatar:{},userName:{textAlign:"left"},cover:{padding:"20px 8px",position:"relative",width:"100%",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start","& $avatar":I({boxShadow:e.glow.light,width:80,height:80,marginRight:30},e.breakpoints.down("sm"),{width:50,height:50,marginRight:20})},opt:{position:"absolute",top:10,right:10},favorite:{color:f.a[500]},redIcon:{background:S.a[50],"& svg":{color:S.a[500]}},brownIcon:{background:x.a[50],"& svg":{color:x.a[500]}},tealIcon:{background:v.a[50],"& svg":{color:v.a[500]}},blueIcon:{background:b.a[50],"& svg":{color:b.a[500]}},amberIcon:{background:f.a[50],"& svg":{color:f.a[500]}},purpleIcon:{background:m.a[50],"& svg":{color:m.a[500]}},field:{width:"100%",marginBottom:e.spacing(1),"& svg":{color:e.palette.grey[400],fontSize:18}},uploadAvatar:{width:"100%",height:"100%",background:"dark"===e.palette.type?e.palette.grey[700]:e.palette.grey[100]},selected:{background:"dark"===e.palette.type?Object(j.darken)(e.palette.primary.light,.5):Object(j.darken)(e.palette.primary.light,.05),borderLeft:"4px solid ".concat(e.palette.secondary.main),paddingLeft:20,"& h3":{color:e.palette.primary.dark}},hiddenDropzone:{display:"none"},avatarWrap:{width:100,height:100,margin:"10px auto 30px",position:"relative"},avatarTop:{display:"block",textAlign:"center",padding:e.spacing(3),"& $avatar":{width:100,height:100,margin:"0 auto"}},buttonUpload:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},navIconHide:I({marginRight:e.spacing(1),paddingTop:0},e.breakpoints.up("sm"),{display:"none"}),dndflow:{flexDirection:"column",display:"flex",height:"100%"},dndflow_aside:{borderRight:"1px solid #eee",padding:"15px 10px",fontSize:"12px",background:"#fcfcfc"},dndflow_aside__description:{marginBottom:"10px"},dndnode:{height:"20px",padding:"4px",border:"1px solid #1a192b",borderRadius:"2px",marginBottom:"10px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"grab"},dndflow__reactflow_wrapper:{flexGrow:"1",height:"100%"},"@media screen and (min-width: 768px)":{__expression__:"screen and (min-width: 768px)",dndflow:{flexDirection:"row"},dndflow_aside:{width:"20%",maxWidth:"250px"}}}},O=a("28e75ddca4f48a668c52"),E=a.n(O),C=a("33841c6638c3847279b5"),F=a.n(C),R=a("bacbcaba6cd9adc4b9ab"),_=a.n(R),T=a("e777244f8e08c53fe98b"),B=a.n(T),N=a("432aae369667202efa42"),z=a.n(N),$=a("baa88efd5d685b20131b"),L=a.n($),P=a("ee64036e804fdbc28f92"),W=a.n(P),G=a("9095151026da8c51dd60"),U=a.n(G),H=(a("30decf5592c8559531ca"),[{id:"Leverand\xf8r",title:"Leverand\xf8r",type:"test",label:"TEST",cardStyle:{margin:"auto",marginBottom:5},description:"Dette er en leverand\xf8r node",tags:[{title:"Error",color:"white",bgcolor:"#F44336"},{title:"Warning",color:"white",bgcolor:"#FF9800"}]},{id:"datterSelskab",title:"Datter Selskab",label:"TEST",type:"test",cardStyle:{margin:"auto",marginBottom:5},description:"Dette er en leverand\xf8r node",tags:[{title:"Info",color:"white",bgcolor:"#0288D1"},{title:"Success",color:"white",bgcolor:"#388E3C"}]}]);function J(e,t,a,r){A||(A="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&n)for(var d in n)void 0===t[d]&&(t[d]=n[d]);else t||(t=n||{});return{$$typeof:A,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],r=!0,n=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(e){n=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return V(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var X,Y=J(U.a,{}),q=J(F.a,{label:"All",value:"all",icon:J(_.a,{})}),K=J(F.a,{label:"Favorites",value:"favorites",icon:J(W.a,{})}),Q=Object(o.withStyles)(D)((function(e){var t=e.classes,a=M(Object(r.useState)("all"),2),n=a[0],o=a[1];return J(r.Fragment,{},void 0,J(L.a,{variant:"permanent",anchor:"left",open:!0,classes:{paper:t.drawerPaper}},void 0,J("div",{},void 0,J("div",{className:t.toolbar},void 0,J("div",{className:t.flex},void 0,J("div",{className:t.searchWrapper},void 0,J("div",{className:t.search},void 0,Y),J("input",{className:t.input,onChange:function(e){return console.log(e)},placeholder:"Search"})))),J("div",{className:t.total},void 0,H.length,"\xa0 Nodes"),H.map((function(e){return J(B.a,{button:!0,onDragStart:function(t){return function(e,t){e.dataTransfer.setData("application/reactflow",t),e.dataTransfer.effectAllowed="move"}(t,e.type)},draggable:!0,onClick:function(){return console.log("give me info of the node")}},e.id,J(z.a,{primary:e.title,secondary:e.description}))})))),J(E.a,{value:n,onChange:function(e,t){o(t)},className:t.bottomFilter},void 0,q,K))}));function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],r=!0,n=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(e){n=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ee(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function te(e,t,a,r){X||(X="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var n=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=r;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];t.children=i}if(t&&n)for(var d in n)void 0===t[d]&&(t[d]=n[d]);else t||(t=n||{});return{$$typeof:X,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}var ae=[{id:"1",type:"input",data:{label:n.a.createElement(n.a.Fragment,null,te("strong",{},void 0,"Virksomhed A"))},position:{x:250,y:0}},{id:"2",data:{label:n.a.createElement(n.a.Fragment,null,te("strong",{},void 0,"Datter"))},position:{x:100,y:100}},{id:"3",data:{label:n.a.createElement(n.a.Fragment,null,te("strong",{},void 0,"Datter med leverand\xf8r"))},position:{x:400,y:100},style:{background:"#D6D5E6",color:"#333",border:"1px solid #222138",width:180}},{id:"4",position:{x:250,y:200},data:{label:"Leverand\xf8r"}},{id:"5",data:{label:"Data lagring"},position:{x:250,y:325}},{id:"6",type:"output",data:{label:n.a.createElement(n.a.Fragment,null,te("strong",{},void 0,"AWS"))},position:{x:100,y:480}},{id:"7",type:"output",data:{label:"Google Cloud"},position:{x:400,y:450}},{id:"e1-2",source:"1",target:"2",label:"Ingen Data"},{id:"e1-3",source:"1",target:"3"},{id:"e3-4",source:"3",target:"4",animated:!0,label:"Data"},{id:"e4-5",source:"4",target:"5",arrowHeadType:"arrowclosed",label:"Data"},{id:"e5-6",source:"5",target:"6",type:"smoothstep",label:"krypteret"},{id:"e5-7",source:"5",target:"7",type:"step",style:{stroke:"#f6ab6c"},label:"Ukrypteret",animated:!0,labelStyle:{fill:"#f6ab6c",fontWeight:700}}],re=function(e){e.preventDefault(),e.dataTransfer.dropEffect="move"},ne=0,oe=te(Q,{}),ie=te(i.Controls,{}),le=te(i.Background,{color:"#aaa",gap:16});t.default=Object(o.withStyles)(D)((function(e){var t=e.classes,a=Object(r.useRef)(null),o=Z(Object(r.useState)(ae),2),d=o[0],p=o[1],u=Z(Object(r.useState)(),2),f=u[0],g=u[1];return te("div",{},void 0,te(i.ReactFlowProvider,{},void 0,te("div",{className:t.root},void 0,oe,n.a.createElement("div",{className:t.content,ref:a},te(l.a,{elements:d,onElementsRemove:function(e){return p((function(t){return Object(i.removeElements)(e,t)}))},onConnect:function(e){return p((function(t){return Object(i.addEdge)(e,t)}))},onLoad:function(e){g(e),e.fitView()},onDrop:function(e){e.preventDefault();var t=a.current.getBoundingClientRect(),r=e.dataTransfer.getData("application/reactflow"),n=f.project({x:e.clientX-t.left,y:e.clientY-t.top}),o={id:"dndnode_".concat(ne++),type:r,position:n,data:{label:"".concat(r," node")}};p((function(e){return e.concat(o)}))},onDragOver:re},void 0,ie,le)))),te("div",{},void 0,te(c.a,{title:"Analyser"},void 0,te(s.a,{variant:"extended",color:"primary",className:t.addBtn},void 0,"Analyse"))))}))}}]);