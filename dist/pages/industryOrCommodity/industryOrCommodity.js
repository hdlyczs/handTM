const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		tmName:'',
    value: '',
    tipNum: 0,
    cuoDisplay: 'none',
    currentTab: 0,
    swiperHeight: 2000,
    proportion: 0,
    currentItem: '',
    currentCommodity: '-1',
    open: [{
        key: false
      },
      {
        key: false
      },
    ],
    lists: [{
        industry: 'IT',
        name: '通信.电子.互联网等',
        list: [{
            name: '游戏行业'
          },
          {
            name: '社交论坛'
          },
          {
            name: '网上商城'
          },
          {
            name: '软件开发运营'
          },
        ],
      },
      {
        industry: '服饰',
        name: '服装.珠宝.化妆品等',
        list: [{
            name: '游戏行业'
          },
          {
            name: '社交论坛'
          },
          {
            name: '网上商城'
          },
          {
            name: '软件开发运营'
          },
        ],
      },
    ],
    commodity_list: [],
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  // call:function(e){
  // 	var phone = e.currentTarget.dataset.phone;
  // 	wx.makePhoneCall({
  // 		phoneNumber: phone,
  // 	})
  // },
  search: function(e) {
    var that = this;
    var value = e.detail.value;
    if (value != "" && value != null) {
      this.setData({
        cuoDisplay: 'block',
      })
    }
    if (value == '' || value == null) {
      this.setData({
        cuoDisplay: 'none',
      })
    }
		if (value!=''){
			wx.request({
				url: app.globalData.port + 'trademark/classify/goods',
				method: 'POST',
				header: { 'Content-Type': 'application/json' },
				data: {
					"data": {
						name: value
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (r) {
					// console.log(r)
					var list = r.data.data.rows;
					list.forEach(function (item, index, array) {
						array[index] = {
							pcode: item.pcode,
							pname: item.pname,
							name: item.name
						}
					});
					that.setData({
						tipNum: list.length,
						commodity_list: list
					})
					that.changeHeight_1()
				}
			})
		}
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (that.data.currentTab) {
      that.changeHeight_1()
    } else {
      that.changeHeight_0()
    }
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (that.data.currentTab) {
      that.changeHeight_1()
    } else {
      that.changeHeight_0()
    }
  },
  showitem: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var zhi = "open[" + index + "].key";
    that.setData({
      [zhi]: !that.data.open[index].key,
    })
    that.changeHeight_0();
  },
  xuanzhong: function(options) {
    var that = this;
    var id = options.currentTarget.dataset.id;
    that.setData({
      currentItem: id
    })
  },
  xuanzhong_2: function(options) {
    var that = this;
    var idx = options.currentTarget.dataset.idx;
    that.setData({
      currentCommodity: idx
    })
  },
  toSearch:function(e){
		var that = this;
		var industryOid = e.currentTarget.dataset.ioid;
		var searchName = e.currentTarget.dataset.searchname;
    wx.navigateTo({
			url: '../searchResult/main?tmName=' + that.data.tmName + '&industryOid=' + industryOid + '&searchName=' + searchName,//  还要先跳到加载页
    })
  },
  toSearch2: function (e) {
		var that = this;
		var goodCode = e.currentTarget.dataset.goodcode;
		var searchName2 = e.currentTarget.dataset.searchname2;
    wx.navigateTo({
			url: '../searchResult/main?tmName=' + that.data.tmName + '&goodCode=' + goodCode + '&searchName=' + searchName2,//  还要先跳到加载页
    })
  },
  //点击行业时根据行业页改变swiper的高度
  changeHeight_0: function() {
    var that = this;
    var query = wx.createSelectorQuery();
    query.selectAll('.page_bd').boundingClientRect();
    query.exec((res) => {
      var height = 0;
      for (var i = 0; i < res[0].length; i++) {
        height += res[0][i].height
        height += 9
      }
      that.setData({
        swiperHeight: (height + 18) * that.data.proportion,
      })
    })
  },
  //点击商品时根据商品页改变swiper的高度
  changeHeight_1: function() {
    var that = this;
    var query = wx.createSelectorQuery();
    query.selectAll('.commodity').boundingClientRect();
    query.exec((res) => {
      var height = 0;
      height += res[0][0].height
      that.setData({
        swiperHeight: (height + 18) * that.data.proportion,
      })
    })
  },
  //清除input的文本
  clearText: function() {
    var that = this;
    that.setData({
      value: '',
      cuoDisplay: 'none',
			tipNum:0,
			commodity_list: []
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		var tmName = options.tmName;
		if(tmName == ''||tmName == null||tmName == undefined){
			tmName = '掌标'
		}
		var that = this;
		that.setData({
			tmName:tmName
		})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    var that = this;
		var open = [];
    wx.getSystemInfo({
      success: function(res) {
        var width = res.screenWidth;
        that.setData({
          proportion: 750 / width
        })
      },
    })
		wx.request({
      url: app.globalData.port +'industry/list',
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			data: {
				"data": {
					
				},
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
			},
			success: function (res) {
				// console.log(res)
				var rows = res.data.data.rows;
				for(var i=0;i<rows.length;i++){
					var obj={key:false};
					open.push(obj);
				}
				that.setData({
					lists: rows,
					open:open
				})
				that.changeHeight_0()
			}
		})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})