(function(){"use strict";var e={1750:function(e,t,i){var l=i(9242),d=(i(2358),i(7086),i(6570),i(9740)),n=(i(8009),i(6710),i(6809),i(172),i(94)),a=i(4478),r=i(6605),o=i(5879),s=i(3396),h=i(7139);const u=e=>((0,s.dD)("data-v-764beefc"),e=e(),(0,s.Cn)(),e),_={key:0},c={key:0},f={key:1},p={class:"high-risk"},g=(0,s.Uk)(" 高风险等级地区 "),m={class:"num"},v={class:"middle-risk"},y=(0,s.Uk)(" 中风险等级地区 "),b={class:"num"},x={key:1},k=u((()=>(0,s._)("p",null,"API 获取出错，刷新重试",-1)));function w(e,t,i,l,d,u){const w=o.EZ,j=r.mi,O=a.y,W=n.vk;return d.err?((0,s.wg)(),(0,s.iD)("div",x,[k,(0,s._)("p",null,(0,h.zw)(d.err_msg),1)])):((0,s.wg)(),(0,s.iD)("div",_,[d.ok?((0,s.wg)(),(0,s.iD)("p",c,"以下信息截止自"+(0,h.zw)(d.raw.data.end_update_time),1)):((0,s.wg)(),(0,s.iD)("p",f,"加载中……")),(0,s.Wm)(w,{modelValue:d.filter_text,"onUpdate:modelValue":t[0]||(t[0]=e=>d.filter_text=e),placeholder:"请输入区域名称",disabled:!d.ok},null,8,["modelValue","disabled"]),(0,s._)("h3",p,[g,(0,s._)("span",m,"("+(0,h.zw)(d.high.count)+")",1),(0,s.Wm)(j,{class:"expand-all",type:"primary",onClick:u.high_expand,disabled:!d.ok},{default:(0,s.w5)((()=>[(0,s.Uk)((0,h.zw)(d.high.expand_all_button),1)])),_:1},8,["onClick","disabled"])]),d.ok?((0,s.wg)(),(0,s.j4)(O,{key:2,data:d.high.tree,"node-key":"id","default-expand-all":d.high.expand_all,"default-expanded-keys":d.high.default_id_list,"auto-expand-parent":!1,ref:"high_tree","filter-node-method":u.filter_high_node},null,8,["data","default-expand-all","default-expanded-keys","filter-node-method"])):((0,s.wg)(),(0,s.j4)(W,{key:3,rows:6,animated:""})),(0,s._)("h3",v,[y,(0,s._)("span",b,"("+(0,h.zw)(d.middle.count)+")",1),(0,s.Wm)(j,{class:"expand-all",type:"primary",onClick:u.middle_expand,disabled:!d.ok},{default:(0,s.w5)((()=>[(0,s.Uk)((0,h.zw)(d.middle.expand_all_button),1)])),_:1},8,["onClick","disabled"])]),d.ok?((0,s.wg)(),(0,s.j4)(O,{key:4,data:d.middle.tree,"node-key":"id","default-expand-all":d.middle.expand_all,"default-expanded-keys":d.middle.default_id_list,"auto-expand-parent":!1,ref:"middle_tree","filter-node-method":u.filter_middle_node},null,8,["data","default-expand-all","default-expanded-keys","filter-node-method"])):((0,s.wg)(),(0,s.j4)(W,{key:5,rows:6,animated:""}))]))}var j=i(6265),O=i.n(j),W={name:"RegionShow",props:{data_url:String},data(){return{raw:null,ok:!1,err:!1,err_msg:"",high:{tree:null,count:"-",province_id_list:[],city_id_list:[],county_id_list:[],default_id_list:[],expand_all:!1,expand_all_button:"展开"},middle:{tree:null,count:"-",province_id_list:[],city_id_list:[],county_id_list:[],default_id_list:[],expand_all:!1,expand_all_button:"展开"},filter_text:""}},mounted(){let e=this;O().get(this.data_url).then((function(t){let i=t.data;e.raw=i;let l=$(i.data.highlist);e.high.tree=l["tree"],e.high.province_id_list=l["province_id_list"],e.high.city_id_list=l["city_id_list"],e.high.county_id_list=l["county_id_list"],e.high.default_id_list=l["default_id_list"],e.high.count=i.data.hcount;let d=$(i.data.middlelist);e.middle.tree=d["tree"],e.middle.province_id_list=d["province_id_list"],e.middle.city_id_list=d["city_id_list"],e.middle.county_id_list=d["county_id_list"],e.middle.default_id_list=d["default_id_list"],e.middle.count=i.data.mcount,e.ok=!0})).catch((function(t){console.log(t),e.err_msg=t,e.err=!0}))},methods:{high_expand(){if(this.high.expand_all=!this.high.expand_all,this.high.expand_all){let e=this.high.default_id_list.concat(this.high.city_id_list);for(let t=0;t<e.length;t++)this.$refs.high_tree.store.getNode(e[t]).expanded=!0}else for(let e=0;e<this.high.city_id_list.length;e++)this.$refs.high_tree.store.getNode(this.high.city_id_list[e]).expanded=!1;this.high.expand_all_button=this.high.expand_all?"收起":"展开"},middle_expand(){if(this.middle.expand_all=!this.middle.expand_all,this.middle.expand_all){let e=this.middle.default_id_list.concat(this.middle.city_id_list);for(let t=0;t<e.length;t++)this.$refs.middle_tree.store.getNode(e[t]).expanded=!0}else for(let e=0;e<this.middle.city_id_list.length;e++)this.$refs.middle_tree.store.getNode(this.middle.city_id_list[e]).expanded=!1;this.middle.expand_all_button=this.middle.expand_all?"收起":"展开"},filter_high_node(e,t){if(!e)return void 0===t.children&&this.high.count++,!0;if(t.label.includes(e))return void 0===t.children&&this.high.count++,!0;let i=t.pid;while(-1!==i){let l=this.$refs.high_tree.store.getNode(i).data;if(l.label.includes(e))return void 0===t.children&&this.high.count++,!0;i=l.pid}return!1},filter_middle_node(e,t){if(!e)return void 0===t.children&&this.middle.count++,!0;if(t.label.includes(e))return void 0===t.children&&this.middle.count++,!0;let i=t.pid;while(-1!==i){let l=this.$refs.middle_tree.store.getNode(i).data;if(l.label.includes(e))return void 0===t.children&&this.middle.count++,!0;i=l.pid}return!1}},watch:{filter_text(e){this.high.count=0,this.$refs.high_tree.filter(e),this.middle.count=0,this.$refs.middle_tree.filter(e)}}};function $(e){let t=[],i=0,l=[],d=[],n=[];for(let a=0;a<e.length;a++){let r=e[a],o=r["province"],s=r.city,h=r["county"],u=r["communitys"],_=null,c=null,f=null,p=null;for(let e=0;e<t.length;e++){let i=t[e];if(i.label===o){_=i;break}}null===_&&(_={id:i++,pid:-1,label:o,children:[],expanded:!0},t.push(_),l.push(_.id));for(let e=0;e<_.children.length;e++){let t=_.children[e];if(t.label===s){c=t;break}}null===c&&(c={id:i++,pid:_.id,label:s,children:[],expanded:!0},_.children.push(c),d.push(c.id));for(let e=0;e<c.children.length;e++){let t=c.children[e];if(t.label===h){f=t;break}}null===f&&(f={id:i++,pid:c.id,label:h,children:[],expanded:!0},c.children.push(f),n.push(f.id));for(let e=0;e<f.children.length;e++){let t=f.children[e];if(t.label===u){p=t;break}}if(null===p){p=[];for(let e=0;e<u.length;e++)f.children.push({id:i++,pid:f.id,label:u[e]})}}return{tree:t,province_id_list:l,city_id_list:d,county_id_list:n,default_id_list:l.concat(n)}}var z=i(89);const C=(0,z.Z)(W,[["render",w],["__scopeId","data-v-764beefc"]]);var D=C;const N={class:"content"},P=(0,s._)("h1",null,"全国疫情中高风险地区查询",-1);function U(e,t,i,l,n,a){const r=(0,s.up)("Head"),o=d.nZ,u=D,_=d.b2,c=d.G4;return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(r,null,{default:(0,s.w5)((()=>[(0,s._)("title",null,(0,h.zw)(n.title),1)])),_:1}),(0,s._)("div",N,[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Wm)(o,{class:"header"},{default:(0,s.w5)((()=>[P])),_:1}),(0,s.Wm)(_,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,{data_url:n.api_url},null,8,["data_url"])])),_:1})])),_:1})])],64)}var A=i(2350);let I="https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json";var R={name:"App",components:{RegionShow:D,Head:A.Fb},data(){return{title:"全国疫情中高风险地区查询",dev_api_url:"http://localhost/latest.json",prod_api_url:"https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json",api_url:I}}};const Z=(0,z.Z)(R,[["render",U]]);var H=Z;const S=(0,l.ri)(H),V=(0,A.G6)();S.use(V),S.mount("#app")}},t={};function i(l){var d=t[l];if(void 0!==d)return d.exports;var n=t[l]={exports:{}};return e[l](n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,l,d,n){if(!l){var a=1/0;for(h=0;h<e.length;h++){l=e[h][0],d=e[h][1],n=e[h][2];for(var r=!0,o=0;o<l.length;o++)(!1&n||a>=n)&&Object.keys(i.O).every((function(e){return i.O[e](l[o])}))?l.splice(o--,1):(r=!1,n<a&&(a=n));if(r){e.splice(h--,1);var s=d();void 0!==s&&(t=s)}}return t}n=n||0;for(var h=e.length;h>0&&e[h-1][2]>n;h--)e[h]=e[h-1];e[h]=[l,d,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var l in t)i.o(t,l)&&!i.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,l){var d,n,a=l[0],r=l[1],o=l[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(d in r)i.o(r,d)&&(i.m[d]=r[d]);if(o)var h=o(i)}for(t&&t(l);s<a.length;s++)n=a[s],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(h)},l=self["webpackChunkcovid_risk_region"]=self["webpackChunkcovid_risk_region"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=i.O(void 0,[998],(function(){return i(1750)}));l=i.O(l)})();
//# sourceMappingURL=app.27fad550.js.map