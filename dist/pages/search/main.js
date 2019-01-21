var time = require("../utils/index.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTime:'213',
    value:'',
		searchType:2,
		searchOid: '',
    tip:'选择行业或者商品'
  },

  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  getVaule:function(e){
    var that = this ;
    var value = e.detail.value;
    that.setData({
      value: value
    })
  },
  search:function(){
    var that = this;
    var value = that.data.value;
		if (value == '' || value == null){
      value = '掌标'
    }
		if (that.data.searchOid == '') {
			that.data.searchOid = '0901'
			that.data.tip = '计算机软件、APP等'
		}
		if (that.data.searchType == 1) {
			wx.navigateTo({
				url: '../searchResult/main?tmName=' + value + '&industryOid=' + that.data.searchOid + '&searchName=' + that.data.tip, 
			})
		}
		if(that.data.searchType==2){
			wx.navigateTo({
				url: '../searchResult/main?tmName=' + value + '&goodCode=' + that.data.searchOid + '&searchName=' + that.data.tip, 
			})
		}
    
		
  },
  toClassify:function(e){
		var that = this;
		var value = e.detail.value;
		if (value == '' || value == null) {
			value = '掌标'
		}
    wx.navigateTo({
      url: '../industryOrCommodity/industryOrCommodity?tmName='+value,
    })
  },
  toHistory:function(){
    wx.navigateTo({
      url: '../searchHistory/main',
    })
  },
  
  getTime: function () {
    var that = this;
    var date = new Date();
    var nowTime = time.formatTime(date);
    // console.log(nowTime)
    that.setData({
      nowTime: nowTime
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getTime();
		wx.request({
			url: app.globalData.port + 'history/list',
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			data: {
				"data": {
					"pageNum": 1,
					"pageSize": 1
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			success: function (res) {
				var rows = res.data.data.rows;
				// console.log(rows)
				if (rows[0]!=null&&rows[0]!=''){
					that.setData({
						searchType: rows[0].searchType,
						searchOid: rows[0].searchOid,
						tip: rows[0].searchName
					})
				}
			}
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