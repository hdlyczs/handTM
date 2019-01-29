const app = getApp()
Page({
	data:{
		title:'账号绑定',
		time:'获取验证码',
		currentTime: 60,
		disabled: false,
		phone:'',
		code:'',
		vaildCode:'',
	},

	back:function(){
		wx.navigateBack({
			delta:1
		})
	},
	phoneInput:function(e){
		this.setData({
			phone:e.detail.value
		})
	},
	codeInput:function(e){
		this.setData({
			code: e.detail.value
		})
	},
	getCode(options) {
		let that = this;
		let interval = null;
		let currentTime = that.data.currentTime
		interval = setInterval(function () {
			currentTime--;
			that.setData({
				time: currentTime,
			})
			if (currentTime <= 0) {
				clearInterval(interval)
				that.setData({
					time: '重新发送',
					currentTime: 60,
					disabled: false
				})
			}
		}, 1000)
	},
	testPhone: function(tel){
		var phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		return phone.test(tel)
	},
	send(e) {
		let _this = this;
		if (_this.testPhone(_this.data.phone)){
			//发送短信
			if (!_this.data.disabled){
				wx.request({
					url: app.globalData.port + 'user/get/verification',
					method: "POST",
					data: {
						"data": {
							"telephone": _this.data.phone
						},
						"token": app.globalData.token,
						"userOid": app.globalData.userOid
					},
					header: {
						"Content-Type": "application/json"
					},
					success: function (res) {
						// console.log(res)
						if (!_this.data.disabled) {
							_this.getCode();
							_this.setData({
								disabled: true
							})
						}
					}
				})
			}
		}else{
			if (_this.data.disabled){
				//不做
			}else{
				wx.showToast({
					title: '请输入正确的手机号',  //标题
					icon: 'none',
					duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
					mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
				})
			}
		}
		
	},
	submit:function(e){
		var that = this;
		console.log(app.globalData.userOid)
		//绑定
		wx.request({
      url: app.globalData.port +'user/validate/verification',
			method: "POST",
			data: {
				"data": {
					userOid: app.globalData.userOid,
					telephone: that.data.phone,
					code: that.data.code
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			header: {
				"Content-Type": "application/json"
			},
			success: function (res) {
				// console.log(res)
				if(res.data.restCode == 200){
					wx.showToast({
						title: '绑定成功，即将返回首页',  //标题
						icon: 'none',
						duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
						mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
					})
					setTimeout(function(e){
						wx.navigateTo({
							url: '../index/index',
						})
					},2000)
				} else if (res.data.msg == '验证码已经失效'){
					wx.showToast({
						title: '验证码错误或已经失效',  //标题
						icon: 'none',
						duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
						mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})
