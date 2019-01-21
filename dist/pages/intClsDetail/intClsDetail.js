Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		intClsNum:'35',
		intClsName:'广告销售',
		relationType:1,
		list:[
			{
				similarFlag:2,
				tmName:'商标名称',
				holder:'持有人名字',
				tmStatus:'已注册',
				tmRegNo:'17845642',
				tmId:6546,
			},
			{
				similarFlag: 3,
				tmName: '商标名称',
				holder: '持有人名字',
				tmStatus: '申请中',
				tmRegNo: '17845642',
				tmId: 6546,
			},
		],
			
	},
	back: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	
  toDetail:function(e){
		var that = this;
		var tmId = e.currentTarget.dataset.tmid;
		wx.navigateTo({
      url: '../trademark/tmSearchDetail?tmId='+tmId,//带参
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var intcls = options.intcls;
		var intclsName = options.intclsName;
		var relationType = options.relationType;
		var trademarkList = JSON.parse(options.trademarkList);
		// console.log(intcls, intclsName, relationType, JSON.parse(options.trademarkList))
		trademarkList.forEach(function (item, index, array) {
			array[index] = {
				similarFlag: item.similarStatus,
				tmName: item.tmName,
				holder: item.applicationCn,
				tmStatus: item.trademarkStatus,
				tmRegNo: item.regNo,
				tmId: item.oid,
			}
		});
		that.setData({
			intClsNum: intcls,
			intClsName: intclsName,
			relationType: relationType,
			list: trademarkList
		})
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