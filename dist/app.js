require("common/manifest.js");
require("common/vendor.js");
global.webpackJsonp([2],{"+YnI":function(n,t){},M93x:function(n,t,e){"use strict";var o=e("Mw+1");var a=function(n){e("OuQk")},c=e("ybqe")(o.a,null,a,null,null);t.a=c.exports},"Mw+1":function(n,t,e){"use strict";t.a={created:function(){var n=wx.getStorageSync("logs")||[];n.unshift(Date.now()),wx.setStorageSync("logs",n),console.log("app created and cache logs by setStorageSync")}}},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("5nAL"),a=e.n(o),c=e("M93x"),u=e("+YnI"),r=(e.n(u),e("yTFs"));e.n(r);a.a.config.productionTip=!1,c.a.mpType="app",new a.a(c.a).$mount()},OuQk:function(n,t){},yTFs:function(n,t){}},["NHnr"]);
App({
	onLaunch: function () {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				var code = res.code;
				//获取手机信息
				wx.getSystemInfo({
					success: res => {
						// console.log(res)
						var that = this;
						var model = res.model;
						var brand = res.brand;
						var system = res.system;
						var screenHeight = res.screenHeight;
						var screenWidth = res.screenWidth;
						if (model.indexOf("iPhone X") > -1) {
							that.globalData.isIphoneX = true;
						}
						that.globalData.screenHeight = screenHeight;
						that.globalData.screenWidth = screenWidth;
						that.globalData.proportion = 750 / screenWidth;

						// 获取用户信息
						wx.getSetting({
							success: res => {
								// console.log(res)
								if (res.authSetting['scope.userInfo']) {
									// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
									wx.getUserInfo({
										success: res => {
											// console.log(res)

											// 可以将 res 发送给后台解码出 unionId
											this.globalData.userInfo = res.userInfo
											var userAvatarUrl = res.userInfo.avatarUrl;
											var userCity = res.userInfo.city;
											var userCountry = res.userInfo.country;
											var userGender = res.userInfo.gender;
											var userLanguage = res.userInfo.language;
											var userNickName = res.userInfo.nickName;
											var userProvince = res.userInfo.province;


											wx.request({
                        url: that.globalData.port+'user/login',
												method: 'POST',
												header: { 'Content-Type': 'application/json' },
												data: {
													"data": {
														"brand": brand,
														"code": code,
														"model": model,
														"system": system,
														"userAvatarUrl": userAvatarUrl,
														"userCity": userCity,
														"userCountry": userCountry,
														"userGender": userGender,
														"userLanguage": userLanguage,
														"userNickName": userNickName,
														"userProvince": userProvince
													},
													"token": "string",
													"userOid": "string"
												},
												success: function (r) {
													// console.log(r)
													that.globalData.userOid = r.data.data.userOid
													that.globalData.token = r.data.data.token
													// console.log(that.globalData.token, that.globalData.userOid)
													wx.request({
														url: that.globalData.port + 'subject/list',
														method: 'POST',
														header: {
															"Content-Type": "application/json"
														},
														data: {
															"data": {

															},
															"token": that.globalData.token,
															"userOid": that.globalData.userOid
														},
														success: function (result) {
															// console.log(result)
															var list = result.data.data.rows;
															list.forEach(function (item, index, array) {
																array[index] = {
																	oid: item.oid,
																	isSelected: item.isSelected
																}
															});
															for(var i= 0;i<list.length;i++){
																if(list[i].isSelected==1){
																	that.globalData.selectedSubjectOid = list[i].oid;
																	break;
																}
															}
														}
													})
												}
											})

											// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
											// 所以此处加入 callback 以防止这种情况
											if (this.userInfoReadyCallback) {
												this.userInfoReadyCallback(res)
											}
										}
									})
								}
								if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userInfo'] == null || res.authSetting['scope.userInfo']==undefined){
									wx.request({
										url: that.globalData.port + 'user/login',
										method: 'POST',
										header: { 'Content-Type': 'application/json' },
										data: {
											"data": {
												"code": code
											},
											"token": "string",
											"userOid": "string"
										},
										success: function (r) {
											// console.log(r)
											that.globalData.userOid = r.data.data.userOid
											that.globalData.token = r.data.data.token
											// console.log(that.globalData.token, that.globalData.userOid)
											wx.request({
												url: that.globalData.port + 'subject/list',
												method: 'POST',
												header: {
													"Content-Type": "application/json"
												},
												data: {
													"data": {

													},
													"token": that.globalData.token,
													"userOid": that.globalData.userOid
												},
												success: function (result) {
													// console.log(result)
													var list = result.data.data.rows;
													list.forEach(function (item, index, array) {
														array[index] = {
															oid: item.oid,
															isSelected: item.isSelected
														}
													});
													for (var i = 0; i < list.length; i++) {
														if (list[i].isSelected == 1) {
															that.globalData.selectedSubjectOid = list[i].oid;
															break;
														}
													}
												}
											})
										}
									})
								}
							}
						})
						//获取用户信息 结束
					}
				})
				//获取手机信息 结束
			}
		})
	},
	globalData: {
    port:'https://www.handtm.com/',
		// port:'http://192.168.18.130:8888/',
		userOid:'',
		token:'',
		userInfo: null,
		isIphoneX: false,
		screenHeight: 667,
		screenWidth: 375,
		proportion: 2,
    searchType:2,
    searchName:'手机软件设计',
    currentId:0,
    currentIdx:0,
		selectedSubjectOid:'',
	},

})