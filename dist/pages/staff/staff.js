var app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isIphoneX: app.globalData.isIphoneX,
		value:'',
		contentHeight: app.globalData.screenHeight * app.globalData.proportion , 
		items:[
			{
			  imgUrl:'https://qiutm-images.oss-cn-beijing.aliyuncs.com/8C2FA63AE3AF34D6C3DC83FFC0EE75A3.png',
				name:'老王',
				position:'资深商标代理人',
				goodAt:'擅长领域：商标转让、商标注册，商标分析等知识产权领域',
				phone:'18305011509',
			},
		],
	},
	back: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	call:function(e){
		var phone = e.currentTarget.dataset.phone;
		wx.makePhoneCall({
			phoneNumber: phone,
		})
	},
	input:function(e){
		var that = this;
		var value = e.detail.value;
		wx.request({
      url: app.globalData.port +'agent/list',
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			data: {
				"data": {
					name:value,
					"pageNum": 1,
					"pageSize": 30
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			success: function (res) {
				var rows = res.data.data.rows;
				that.setData({
					items: rows,
					value: value
				})
			}
		})
	},
	search: function (e) {
		var that = this;
		wx.request({
      url: app.globalData.port +'agent/list',
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			data: {
				"data": {
					name: that.data.value,
					"pageNum": 1,
					"pageSize": 30
				},
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
			},
			success: function (res) {
				var rows = res.data.data.rows;
				that.setData({
					items: rows
				})
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
		var that = this;
		if (app.globalData.isIphoneX){
			that.setData({
				contentHeight : app.globalData.screenHeight * app.globalData.proportion - 280
			})
		}else{
			that.setData({
				contentHeight: app.globalData.screenHeight * app.globalData.proportion - 260
			})
		}
		wx.request({
      url: app.globalData.port +'agent/list',
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			data: {
				"data": {
					"pageNum": 1,
					"pageSize": 30
				},
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
			},
			success: function (res) {
				var rows = res.data.data.rows;
				that.setData({
					items: rows
				})
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