let e=document.createElement("style");e.innerHTML="",document.head.appendChild(e);import{d as a,j as t,k as s,u as o,a as r,o as l,c as n,b as c,t as p,h as i,l as u,f as g,F as m,i as b,s as d}from"./index.ffce101e.js";import{s as f}from"./Title.0eec9812.js";import{s as h}from"./data-handler.f05a5cb7.js";import{s as w}from"./Show.7e5a8edc.js";function x(){const e=t(),a=s(()=>Number(e.params.page||0)),r=s(()=>Math.ceil(h.length/12)),{t:l}=o();return{shows:h,pageNumber:a,pageCount:r,t:l}}var N=a({props:["page"],setup:x});const k={class:"container px-6 mx-auto"},y={class:"flex flex-wrap justify-between py-4"},v={class:"leading-8 font-bold text-3xl"},C={class:"height-full"},j={class:"flex flex-wrap"},_={class:"height-full text-center pt-4"};var T;N.render=function(e,a,t,s,o,d){const f=r("Title"),h=r("Icon"),w=r("Show");return l(),n(m,null,[c(f,{page:s.t("show_list")},null,8,["page"]),c("div",k,[c("div",y,[c("h1",v,p(s.t("show_list")),1),c("div",C,[i(p(s.t("pagination-text",{current:s.pageNumber+1,total:s.pageCount}))+" ",1),(l(),n(u(s.pageNumber<=0?"span":"router-link"),{to:"/shows/"+(s.pageNumber-1||""),class:["ml-2 p-2",[s.pageNumber<=0?"text-gray-500 dark:text-gray-700":"icon-btn"]]},{default:g(()=>[c(h,{icon:"carbon:arrow-left",class:"inline-block"})]),_:1},8,["to","class"])),(l(),n(u(s.pageCount-1<=s.pageNumber?"span":"router-link"),{to:"/shows/"+(s.pageNumber+1),class:["ml-2 p-2",[s.pageCount-1<=s.pageNumber?"text-gray-500 dark:text-gray-700":"icon-btn"]]},{default:g(()=>[c(h,{icon:"carbon:arrow-right",class:"inline-block"})]),_:1},8,["to","class"]))])]),c("div",j,[(l(!0),n(m,null,b(s.shows.slice(12*s.pageNumber,12*(s.pageNumber+1)),e=>(l(),n("div",{class:"p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4",key:e.slug},[c(w,{show:e},null,8,["show"])]))),128))]),c("div",_,[i(p(s.t("pagination-text",{current:s.pageNumber+1,total:s.pageCount}))+" ",1),(l(),n(u(s.pageNumber<=0?"span":"router-link"),{to:"/shows/"+(s.pageNumber-1||""),class:["ml-2 p-2",[s.pageNumber<=0?"text-gray-500 dark:text-gray-700":"icon-btn"]]},{default:g(()=>[c(h,{icon:"carbon:arrow-left",class:"inline-block"})]),_:1},8,["to","class"])),(l(),n(u(s.pageCount-1<=s.pageNumber?"span":"router-link"),{to:"/shows/"+(s.pageNumber+1),class:["ml-2 p-2",[s.pageCount-1<=s.pageNumber?"text-gray-500 dark:text-gray-700":"icon-btn"]]},{default:g(()=>[c(h,{icon:"carbon:arrow-right",class:"inline-block"})]),_:1},8,["to","class"]))])])],64)},N.components=(T=N.components,Object.assign({},{Title:f,Icon:d,Show:w},T));export default N;export{x as setup};