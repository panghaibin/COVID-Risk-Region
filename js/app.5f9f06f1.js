(function(){"use strict";var e={7660:function(e,t,i){var l=i(9242),r=(i(9060),i(9200),i(7086),i(6570),i(9740)),n=(i(3189),i(5065)),d=i(3396);const a={class:"footer-section"},o=(0,d.Uk)(" 数据来自"),s=(0,d.Uk)("国家卫健委"),h=(0,d.Uk)(" | "),u=(0,d.Uk)("GitHub"),_=(0,d.Uk)(" | "),c=(0,d.Uk)("Api GitHub");function f(e,t,i,l,r,f){const p=n.E2;return(0,d.wg)(),(0,d.iD)("div",a,[o,(0,d.Wm)(p,{class:"link",href:"http://bmfw.www.gov.cn/yqfxdjcx/risk.html",target:"_blank"},{default:(0,d.w5)((()=>[s])),_:1}),h,(0,d.Wm)(p,{class:"link",href:"https://github.com/panghaibin/COVID-Risk-Region",target:"_blank"},{default:(0,d.w5)((()=>[u])),_:1}),_,(0,d.Wm)(p,{class:"link",href:"https://github.com/panghaibin/RiskLevelAPI",target:"_blank"},{default:(0,d.w5)((()=>[c])),_:1})])}var p={name:"FooterShow"},g=i(89);const m=(0,g.Z)(p,[["render",f],["__scopeId","data-v-e056256a"]]);var y=m,k=(i(8009),i(6710),i(6809),i(1430),i(172),i(94)),b=i(4478),w=i(6605),v=i(1902),x=i(5879),C=i(7139);const O=e=>((0,d.dD)("data-v-77b751e4"),e=e(),(0,d.Cn)(),e),S={key:0},j={key:0},W={key:1},U={class:"tag-list"},I={class:"high-risk"},N=(0,d.Uk)(" 高风险等级地区 "),D={class:"num"},$={class:"middle-risk"},z=(0,d.Uk)(" 中风险等级地区 "),A={class:"num"},H={key:1},R=O((()=>(0,d._)("p",null,"API 获取出错，刷新重试",-1)));function F(e,t,i,l,r,n){const a=x.EZ,o=v.Ks,s=w.mi,h=b.y,u=k.vk;return r.err?((0,d.wg)(),(0,d.iD)("div",H,[R,(0,d._)("p",null,(0,C.zw)(r.err_msg),1)])):((0,d.wg)(),(0,d.iD)("div",S,[r.ok?((0,d.wg)(),(0,d.iD)("p",j,"以下信息截止自"+(0,C.zw)(r.raw.data.end_update_time),1)):((0,d.wg)(),(0,d.iD)("p",W,"加载中……")),(0,d.Wm)(a,{disabled:!r.ok,ref:"filter_input",modelValue:r.filter_text,"onUpdate:modelValue":t[0]||(t[0]=e=>r.filter_text=e),placeholder:"请输入区域名称",clearable:"",onClear:n.filter_history_trigger,onChange:n.tag_add},null,8,["disabled","modelValue","onClear","onChange"]),(0,d._)("div",U,[((0,d.wg)(!0),(0,d.iD)(d.HY,null,(0,d.Ko)(r.filter_history,((t,i)=>((0,d.wg)(),(0,d.j4)(o,{key:i,closable:!0,onClose:e=>n.tag_remove(i),onClick:i=>{r.filter_text=t,e.$refs.filter_input.focus()},class:"tag-item"},{default:(0,d.w5)((()=>[(0,d.Uk)((0,C.zw)(t),1)])),_:2},1032,["onClose","onClick"])))),128))]),(0,d._)("h3",I,[N,(0,d._)("span",D,"("+(0,C.zw)(r.high.count)+")",1),(0,d.Wm)(s,{class:"expand-all",type:"primary",onClick:n.high_expand,disabled:!r.ok},{default:(0,d.w5)((()=>[(0,d.Uk)((0,C.zw)(r.high.expand_all_button),1)])),_:1},8,["onClick","disabled"])]),r.ok?((0,d.wg)(),(0,d.j4)(h,{key:2,data:r.high.tree,props:r.tree_props,"node-key":"id","default-expand-all":r.high.expand_all,"default-expanded-keys":r.high.default_id_list,"auto-expand-parent":!1,ref:"high_tree","filter-node-method":n.high_filter,"empty-text":"无数据"},null,8,["data","props","default-expand-all","default-expanded-keys","filter-node-method"])):((0,d.wg)(),(0,d.j4)(u,{key:3,rows:6,animated:""})),(0,d._)("h3",$,[z,(0,d._)("span",A,"("+(0,C.zw)(r.middle.count)+")",1),(0,d.Wm)(s,{class:"expand-all",type:"primary",onClick:n.middle_expand,disabled:!r.ok},{default:(0,d.w5)((()=>[(0,d.Uk)((0,C.zw)(r.middle.expand_all_button),1)])),_:1},8,["onClick","disabled"])]),r.ok?((0,d.wg)(),(0,d.j4)(h,{key:4,data:r.middle.tree,props:r.tree_props,"node-key":"id","default-expand-all":r.middle.expand_all,"default-expanded-keys":r.middle.default_id_list,"auto-expand-parent":!1,ref:"middle_tree","filter-node-method":n.middle_filter,"empty-text":"无数据"},null,8,["data","props","default-expand-all","default-expanded-keys","filter-node-method"])):((0,d.wg)(),(0,d.j4)(u,{key:5,rows:6,animated:""}))]))}var P=i(6265),Z=i.n(P),G={name:"RegionShow",props:{data_url:String},data(){return{raw:null,ok:!1,err:!1,err_msg:"",high:{tree:null,count:"-",province_id_list:[],city_id_list:[],county_id_list:[],default_id_list:[],expand_all:!1,expand_all_button:"展开"},middle:{tree:null,count:"-",province_id_list:[],city_id_list:[],county_id_list:[],default_id_list:[],expand_all:!1,expand_all_button:"展开"},tree_props:{label:"label",children:"children",class:"tree-node"},filter_text:"",history_ready:!1,filter_history:["北京","上海","江苏"]}},mounted(){localStorage.getItem("filter_history")?this.filter_history=JSON.parse(localStorage.getItem("filter_history")):localStorage.setItem("filter_history",JSON.stringify(this.filter_history));let e=this;Z().get(this.data_url).then((function(t){let i=t.data;e.raw=i,e.list2tree(i.data.highlist,e.high),e.high.count=i.data.hcount,e.list2tree(i.data.middlelist,e.middle),e.middle.count=i.data.mcount,e.ok=!0})).catch((function(t){console.log(t),e.err_msg=t,e.err=!0}))},methods:{list2tree(e,t){let i=[],l=0,r=[],n=[],d=[];for(let a=0;a<e.length;a++){let t=e[a],o=t["province"],s=t.city,h=t["county"],u=t["communitys"],_=null,c=null,f=null,p=null;for(let e=0;e<i.length;e++){let t=i[e];if(t.label===o){_=t;break}}null===_&&(_={id:l++,pid:-1,label:o,children:[],expanded:!0},i.push(_),r.push(_.id));for(let e=0;e<_.children.length;e++){let t=_.children[e];if(t.label===s){c=t;break}}null===c&&(c={id:l++,pid:_.id,label:s,children:[],expanded:!0},_.children.push(c),n.push(c.id));for(let e=0;e<c.children.length;e++){let t=c.children[e];if(t.label===h){f=t;break}}null===f&&(f={id:l++,pid:c.id,label:h,children:[],expanded:!0},c.children.push(f),d.push(f.id));for(let e=0;e<f.children.length;e++){let t=f.children[e];if(t.label===u){p=t;break}}if(null===p){p=[];for(let e=0;e<u.length;e++)f.children.push({id:l++,pid:f.id,label:u[e]})}}t.tree=i,t.province_id_list=r,t.city_id_list=n,t.county_id_list=d,t.default_id_list=r.concat(d)},high_expand(){if(this.high.expand_all=!this.high.expand_all,this.high.expand_all){let e=this.high.default_id_list.concat(this.high.city_id_list);for(let t=0;t<e.length;t++)this.$refs.high_tree.store.getNode(e[t]).expanded=!0}else for(let e=0;e<this.high.city_id_list.length;e++)this.$refs.high_tree.store.getNode(this.high.city_id_list[e]).expanded=!1;this.high.expand_all_button=this.high.expand_all?"收起":"展开"},middle_expand(){if(this.middle.expand_all=!this.middle.expand_all,this.middle.expand_all){let e=this.middle.default_id_list.concat(this.middle.city_id_list);for(let t=0;t<e.length;t++)this.$refs.middle_tree.store.getNode(e[t]).expanded=!0}else for(let e=0;e<this.middle.city_id_list.length;e++)this.$refs.middle_tree.store.getNode(this.middle.city_id_list[e]).expanded=!1;this.middle.expand_all_button=this.middle.expand_all?"收起":"展开"},high_filter(e,t){if(!e)return void 0===t.children&&this.high.count++,!0;if(t.label.includes(e))return void 0===t.children&&this.high.count++,!0;let i=t.pid;while(-1!==i){let l=this.$refs.high_tree.store.getNode(i).data;if(l.label.includes(e))return void 0===t.children&&this.high.count++,!0;i=l.pid}return!1},middle_filter(e,t){if(!e)return void 0===t.children&&this.middle.count++,!0;if(t.label.includes(e))return void 0===t.children&&this.middle.count++,!0;let i=t.pid;while(-1!==i){let l=this.$refs.middle_tree.store.getNode(i).data;if(l.label.includes(e))return void 0===t.children&&this.middle.count++,!0;i=l.pid}return!1},filter_history_trigger(e=!0,t=""){e?this.history_ready=!0:this.history_ready&&(this.tag_add(t),this.history_ready=!1)},tag_add(e){e=e.trim(),""!==e&&(this.filter_history.unshift(e),this.filter_history=Array.from(new Set(this.filter_history)),localStorage.setItem("filter_history",JSON.stringify(this.filter_history)))},tag_remove(e){this.filter_history.splice(e,1),localStorage.setItem("filter_history",JSON.stringify(this.filter_history))}},watch:{filter_text(e,t){""===e&&this.filter_history_trigger(!1,t),this.high.count=0,this.$refs.high_tree.filter(e),this.middle.count=0,this.$refs.middle_tree.filter(e)}}};const J=(0,g.Z)(G,[["render",F],["__scopeId","data-v-77b751e4"]]);var V=J;const E={class:"content"},K=(0,d._)("h1",null,"全国疫情中高风险地区查询",-1);function L(e,t,i,l,n,a){const o=(0,d.up)("Head"),s=r.nZ,h=V,u=r.b2,_=y,c=r.F_,f=r.G4;return(0,d.wg)(),(0,d.iD)(d.HY,null,[(0,d.Wm)(o,null,{default:(0,d.w5)((()=>[(0,d._)("title",null,(0,C.zw)(n.title),1)])),_:1}),(0,d._)("div",E,[(0,d.Wm)(f,null,{default:(0,d.w5)((()=>[(0,d.Wm)(s,{class:"header"},{default:(0,d.w5)((()=>[K])),_:1}),(0,d.Wm)(u,null,{default:(0,d.w5)((()=>[(0,d.Wm)(h,{data_url:n.api_url},null,8,["data_url"])])),_:1}),(0,d.Wm)(c,{class:"footer"},{default:(0,d.w5)((()=>[(0,d.Wm)(_)])),_:1})])),_:1})])],64)}var T=i(2350);let Y="https://gh.hbtech.workers.dev/https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json";var q={name:"App",components:{RegionShow:V,FooterShow:y,Head:T.Fb},data(){return{title:"全国疫情中高风险地区查询",api_url:Y}}};const M=(0,g.Z)(q,[["render",L]]);var B=M;const Q=(0,l.ri)(B),X=(0,T.G6)();Q.use(X),Q.mount("#app")}},t={};function i(l){var r=t[l];if(void 0!==r)return r.exports;var n=t[l]={exports:{}};return e[l](n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,l,r,n){if(!l){var d=1/0;for(h=0;h<e.length;h++){l=e[h][0],r=e[h][1],n=e[h][2];for(var a=!0,o=0;o<l.length;o++)(!1&n||d>=n)&&Object.keys(i.O).every((function(e){return i.O[e](l[o])}))?l.splice(o--,1):(a=!1,n<d&&(d=n));if(a){e.splice(h--,1);var s=r();void 0!==s&&(t=s)}}return t}n=n||0;for(var h=e.length;h>0&&e[h-1][2]>n;h--)e[h]=e[h-1];e[h]=[l,r,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var l in t)i.o(t,l)&&!i.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,l){var r,n,d=l[0],a=l[1],o=l[2],s=0;if(d.some((function(t){return 0!==e[t]}))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);if(o)var h=o(i)}for(t&&t(l);s<d.length;s++)n=d[s],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(h)},l=self["webpackChunkcovid_risk_region"]=self["webpackChunkcovid_risk_region"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=i.O(void 0,[998],(function(){return i(7660)}));l=i.O(l)})();
//# sourceMappingURL=app.5f9f06f1.js.map