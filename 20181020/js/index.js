(function(){

	var resourceURL=  "https://paris.robowebtech.tw/api/market-place?page={{index}}";
	var resourcePostURL= "https://paris.robowebtech.tw/api/market-place/order?serial={{orderID}}";
	// var resourceURL=  "source/data{{index}}.json";
	
	var	 app= new Vue({
			el:'#app1',
			data:{
				info:{},
				current_page:"",
				menuArray:[],
				orderByamount:"",
				orderByapr:"",
				orderByperiod:"",
				isShowDetail:false,
				select_obj:{}
			},
			mounted:function() {
				var self=this;self.initFun();
			},
			computed: {
				c_orderByamount : function(){
					return this.computedOrderCss(this.orderByamount);
				},
				c_orderByapr : function(){
					return this.computedOrderCss(this.orderByapr);
				},
				c_orderByperiod : function(){
					return this.computedOrderCss(this.orderByperiod);
				},
				c_pageNext : function(){
					var tmpindex=this.current_page;
					this.current_page =  tmpindex+1 <= this.menuArray.length ? tmpindex+1 : tmpindex ;
				},
				c_pagePrevious : function(){
					var tmpindex=this.current_page;
					this.current_page =  tmpindex-1 >= 1 ? tmpindex-1 : tmpindex ;
				}
			},
			created(){},
			updated(){},
			methods:{
				initFun(){
					var self=this;

					self.getDataList(resourceURL.replace("{{index}}","1")).then(function(obj) {
						self.info=obj.data;
						self.current_page=1;
						var tmparray=[];
						for (var i=1 ;i<= obj.data.last_page; i++){
							tmparray.push(i);
						}
						self.menuArray=tmparray;
					});
					
				}
				,getDataList (resourceURL) {
					return new Promise (function(resolve,reject){
						jQuery.ajax({
							url:resourceURL,
							type:"GET",
							dataType:"json",
							success:function(data) {
								resolve({status:2,data:data});
							},
							error:function(xhr,ajaxOptions,thrownError) {
								reject({status:4,data:{}});
								console.log("error");
							}

						});

					});
				}
				,postOrder(resourcePostURL,orderID){
					return new Promise (function(resolve,reject){

						jQuery.ajax({
							url:resourcePostURL.replace("{{orderID}}",orderID),
							type:"POST",
							dataType:"json",
							success:function(data) {
								
								if(data=="success"){
									resolve({status:2,data:{status:"success"}});
								}else{
									resolve({status:2,data:{status:"api error"}});
								}
								
							},
							error:function(xhr,ajaxOptions,thrownError) {
								reject({status:4,data:{}});
								console.log("error");
							}

						});

					});
				},
				computedOrderCss:function(attrvalue){
					return  attrvalue == false ? 'glyphicon-menu-down' :'glyphicon-menu-up';
				},
				checkorder:function(orderObj) {
					var self=this;
							
					self.postOrder(resourcePostURL,orderObj.serial).then(function(obj){

						if(obj.data.status=="success"){
							alert("處理訂單成功");
						}else{
							alert("處理訂單失敗，請稍後再試");
						}

						self.isShowDetail=false;

						self.getDataList(resourceURL.replace("{{index}}",self.current_page)).then(function(obj) {
							self.info=obj.data;
							
							var tmparray=[];
							for (var i=1 ;i<= obj.data.last_page; i++){
								tmparray.push(i);
							}
							self.menuArray=tmparray;
						});
					});
			  	},
        		showDetail:function(id){
            		var self=this;
							
					if(self.info.data[id].status=="on_sale"){
						self.isShowDetail=true;

						self.select_obj={
							serial:self.info.data[id]["serial"],
							tpurpose:self.info.data[id]["loan_detail"]["purpose"],
							amount:self.info.data[id]["amount"],
							status_label:self.info.data[id]["status_label"],
							expire_at:self.info.data[id]["expire_at"],
							description:self.info.data[id]["loan_detail"]["description"]
						}
					}
				},
				oncancelDetail:function() {
					this.isShowDetail=false;
				},
				pageclick:function(pageindex){
					var self=this;
					var current_pageNo=self.current_page,maxNo=self.menuArray.length;
					var pageNextNo="";
					
					if(pageindex=="Previous"){
						pageNextNo =  current_pageNo-1 >= 1 ? current_pageNo-1 : -1 ;

					}else if(pageindex=="Next"){
						pageNextNo =  current_pageNo+1 <= maxNo ? current_pageNo+1 : -1 ;
					}else{

						 pageNextNo=pageindex;
					}

					if(pageNextNo!= -1){
						self.current_page=pageNextNo;
						current_pageNo=pageNextNo;

						self.getDataList(resourceURL.replace("{{index}}",self.current_page)).then(function(obj) {
							self.info=obj.data;
							
							var tmparray=[];
							for (var i=1 ;i<= obj.data.last_page; i++){
								tmparray.push(i);
							}
							self.menuArray=tmparray;
						});
					}

				},
				orderby:function(col){
					//glyphicon-menu-down
					//Increment Decrement

					var self=this;
					if(col=="amount"){
						
						self.info.data.sort(function(ea,eb){
							return eb.amount-ea.amount;
						});

						if(self.orderByamount==true){
							self.orderByamount=false;
							
						}else{
							self.info.data.reverse();
							self.orderByamount=true;
							
						}

					}else if ( col =="apr"){
						
						self.info.data.sort(function(ea,eb){
							return eb.loan_detail.apr-ea.loan_detail.apr;
						});

						if(self.orderByapr==true){
							self.orderByapr=false;
							
						}else{
							self.info.data.reverse();
							self.orderByapr=true;
							
						}
					}else{
						
						self.info.data.sort(function(ea,eb){
							return eb.loan_detail.period-ea.loan_detail.period;
						});

						if(self.orderByperiod==true){
							self.orderByperiod=false;
							
						}else{
							self.info.data.reverse();
							self.orderByperiod=true;
							
						}
					}
				}


			}

		});

})();