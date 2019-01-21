var template = require('../template/template.js');
const app = getApp()
Page({
	data:{
		title:'账号绑定',
		userInfo: null,
		telephone:'',
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
	},
	
	back: function () {
		wx.navigateBack({
			delta: 1
		})
	},

	toBind:function(){
		wx.navigateTo({
			url: "../enterPhone/enterPhone",
		})
	},
	
	hideAddDetail:function(e){
		var display = 'none';
		template.hideAddDetail(display);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// var display = 'none';
		// template.hideAddDetail.call(this,display);

		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
		
	},
	getUserInfo: function (e) {
		// console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		var that = this;
		//获取用户绑定的信息
		wx.request({
      url: app.globalData.port+'user/userInfo',
			method: "POST",
			data: {
				"data": {
					"userOid": app.globalData.userOid
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			header: {
				"Content-Type": "application/json"
			},
			success: function (res) {
				// console.log(res)
				//将用户手机号拿到  赋值
				if (res.data.data.userInfo.telephone != null && res.data.data.userInfo.telephone != '') {
					that.setData({
						telephone: res.data.data.userInfo.telephone
					})
				}
			}
		})
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

