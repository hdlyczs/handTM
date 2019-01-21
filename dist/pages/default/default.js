Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		aheight:'70%',
		height:'30%',
		item: {
			src: '../images/没信号了.png',
			mode: 'widthFix',
			style: 'width:370rpx;'
		}
	},

	

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.changeHeight(0);  /*设置上下两部分比例 输入为上部分 值从0~1*/
	},
	changeHeight: function (e) {
		var that= this;
		this.setData({
			height: e*100+'%',
			aheight: ((1 - e)*100)+'%'
		});
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