import{g as h,m as x,h as m,r as g,o as n,c as l,a as e,t,i as s,F as f,n as b,q as v,w as r,b as k,d,e as w}from"./Fewrz4ZH.js";const y={class:"flex flex-col"},B={key:0,class:"overflow-x-auto sm:-mx-6 lg:-mx-8"},N={class:"inline-block min-w-full py-2 sm:px-6 lg:px-8"},C={class:"overflow-hidden"},L={class:"min-w-full text-left text-sm font-light border border-neutral-500 flex flex-col"},V={class:"grid grid-cols-2 md:grid-cols-3 bg-neutral-900 dark:bg-neutral-500 text-neutral-100 dark:text-neural-900 uppercase"},D={class:"px-6 py-4"},F={class:"px-6 py-4 hidden md:block text-center"},P={class:"px-6 py-4 text-right"},S={class:"whitespace-nowrap px-6 py-4 font-medium"},T={class:"whitespace-nowrap px-6 py-4 hidden md:block text-center"},Y={class:"whitespace-nowrap px-6 py-4 text-right"},q={key:1,class:"dark:text-white text-center text-2xl py-20"},$=h({__name:"ShowTable",props:["shows"],setup(c){const{t:a,d:i}=x(),_=m();return(E,I)=>{const p=g("i18n-t"),u=w;return n(),l("div",y,[c.shows.length?(n(),l("div",B,[e("div",N,[e("div",C,[e("div",L,[e("div",V,[e("div",D,t(s(a)("show")),1),e("div",F,t(s(a)("season")),1),e("div",P,t(s(a)("last_update")),1)]),(n(!0),l(f,null,b(c.shows,o=>(n(),v(u,{class:"grid grid-cols-2 md:grid-cols-3 border-b border-neutral-500 last-of-type:border-0 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-900 focus:bg-neutral-300 dark:focus:bg-neutral-900 focus:outline-0",to:s(_)("/show/"+o.slug),key:o.slug},{default:r(()=>[e("div",S,t(o.metadata.title),1),e("div",T,[k(p,{keypath:"full-season",scope:"global"},{season:r(()=>[d(t(s(a)(`seasons.${o.metadata.season}`)),1)]),seasonYear:r(()=>[d(t(o.metadata.seasonYear),1)]),_:2},1024)]),e("div",Y,t(s(i)(new Date(o.lastModified*1e3))),1)]),_:2},1032,["to"]))),128))])])])])):(n(),l("div",q,t(s(a)("search.not_found")),1))])}}});export{$ as _};