import{_ as n,c as o,a as t,b as l,w as i,F as p,r as u,d as _,e as b,o as s,f as a,t as r}from"./index-p56I8_ET.js";const h={data(){return{prodData:[{prodId:1,prodName:"蟲蟲沙",prodPrice:"300"},{prodId:2,prodName:"阿瓦蟲",prodPrice:"400"},{prodId:3,prodName:"貓與城之內豪華精裝版",prodPrice:"500"},{prodId:4,prodName:"貓與地下城",prodPrice:"600"},{prodId:5,prodName:"蟲蟲總動員",prodPrice:"700"}]}},components:{},mounted(){}},m={class:"product"},f={"aria-label":"breadcrumb"},v={class:"breadcrumb"},N={class:"breadcrumb-item","aria-current":"page"},x=t("li",{class:"breadcrumb-item active","aria-current":"page"},"商品管理",-1),P=_('<div class="titleGroup pb-5"><h1>商品管理</h1><div class="stateFilter"><span>全部(50)</span><span>已上架(35)</span><span>未上架(5)</span><span>促銷中(10)</span></div><div class="searchGroup"><select id="searchFilter" class="rounded border border-1 border-dark"><option value="memId">商品編號</option><option value="memName">商品名稱</option></select><input type="text" id="searchBar" placeholder="請輸入查詢資料" class="rounded border border-1 border-dark"></div></div><div class="addProductBtn"><button type="button" class="btn btn-info"><i class="fa-solid fa-plus"></i>新增商品 </button></div>',2),g={class:"prodTable"},k={class:"table table-hover"},I=t("thead",null,[t("tr",{class:"border-bottom text-center"},[t("th",{scope:"col"},"商品編號"),t("th",{scope:"col"},"商品圖片"),t("th",{scope:"col"},"商品名稱"),t("th",{scope:"col"},"商品價錢"),t("th",{scope:"col"},"商品狀態"),t("th",{scope:"col"},"編輯商品")])],-1),y={class:"border-bottom text-center align-middle"},B={class:"pb-3 pt-3"},V=t("td",null,[t("img",{src:"https://fakeimg.pl/60x60/200",class:"rounded"})],-1),w=t("td",null,"switch",-1),F=t("td",null,[t("button",{type:"button",class:"btn btn-info"},[t("i",{class:"fa-solid fa-pen-to-square"}),a("編輯 ")])],-1);function D($,C,G,S,d,T){const c=b("router-link");return s(),o("main",m,[t("nav",f,[t("ol",v,[t("li",N,[l(c,{to:"/home"},{default:i(()=>[a("首頁")]),_:1})]),x])]),P,t("div",g,[t("table",k,[I,t("tbody",null,[(s(!0),o(p,null,u(d.prodData,e=>(s(),o("tr",y,[t("th",B,r(e.prodId),1),V,t("td",null,r(e.prodName),1),t("td",null,r(e.prodPrice),1),w,F]))),256))])])])])}const E=n(h,[["render",D]]);export{E as default};
