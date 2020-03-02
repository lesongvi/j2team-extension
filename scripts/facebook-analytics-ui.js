"use strict";!function(t){t.runtime.sendMessage({cmd:"track_page_view",path:"/facebook-analytics.html"}),new Vue({el:"#juno_okyo",data:{rows:[],total_rows:0,loading:!1,error:!1,defaultDB:{},myChart:null},methods:{getData:function(){var a=this;this.loading=!0,t.storage.local.get({facebook_analytics:this.defaultDB},function(t){a.updateData(t.facebook_analytics)})},updateData:function(t){var a=this;this.rows=[],Object.keys(t).map(function(e){var o=t[e];o.value>0&&o.updated>0&&a.rows.push(o)}),this.total_rows=this.rows.length,this.loading=!1},createChart:function(){var t=this;if(0!==this.total_rows){var a=document.getElementById("myChart");if(null!==a){var e=[],o=[],n=[],s=[];this.rows.map(function(a){e.push(a.title),o.push(a.value),n.push(t.randomRgba(!0)),s.push(t.randomRgba(!1))});var r=a.getContext("2d");this.myChart=new Chart(r,{type:"bar",data:{labels:e,datasets:[{label:"Facebook Analytics",data:o,backgroundColor:n,borderColor:s,borderWidth:0}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}}},randomRgba:function(t){var a=Math.round,e=Math.random,o=255,n=t?e().toFixed(1):1;return"rgba("+a(e()*o)+","+a(e()*o)+","+a(e()*o)+","+n+")"},formatTime:function(t){return 0===t?"Unknow":dateFns.distanceInWordsToNow(t)},resetData:function(){var a=this;confirm("Are you sure?")&&(this.loading=!0,t.storage.local.set({facebook_analytics:this.defaultDB},function(){a.rows=[],a.total_rows=0,a.loading=!1}))}},mounted:function(){var a=this;this.loading=!0,t.runtime.sendMessage({cmd:"get_default_db"},function(e){a.defaultDB=e.defaultDB,t.runtime.sendMessage({cmd:"j2team_verify"})}),t.storage.onChanged.addListener(function(t,e){t.facebook_analytics&&t.facebook_analytics.newValue&&(a.loading=!0,a.updateData(t.facebook_analytics.newValue))}),t.runtime.onMessage.addListener(function(t,e,o){var n=t.cmd.toLowerCase();switch(n){case"j2team_verify_response":t.success?(a.getData(),a.erorr=!1,a.loading=!1):a.erorr=!0}})},updated:function(){null!==this.myChart&&this.myChart.destroy(),this.createChart()}})}(chrome);