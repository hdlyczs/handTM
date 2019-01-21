// pages/trademark/trademark.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
		tmName:'',
		scrollHeight:'',
    topTabItems: [
      {
        img: '../../images/all.png',
        name: '全部',
				pageNum:2,
        num:'0'
      },
      {
        img: '../../images/apply.png',
        name: '申请中',
				pageNum: 2,
        num: '0'
      },
      {
        img: '../../images/right.png',
        name: '已注册',
				pageNum: 2,
        num: '0'
      },
      {
        img: '../../images/dangrous.png',
        name: '已无效',
				pageNum: 2,
        num: '0'
      },
			{
				img: '../../images/warn.png',
				name: '满三年',
				pageNum: 2,
				num: '0'
			},
    ],
    all: [],
    apply: [],
    register: [],
    threeYear: [],
    invalid: [],
    currentTopItem: "0",
    swiperHeight: "0"
  },

	//获取input 的值
	getValue:function(e){
		var that = this;
		var value = e.detail.value;
		that.setData({
			tmName:value
		})
	},

	search:function(e){
		var that = this;
		if (that.data.currentTopItem == 0 || that.data.currentTopItem == 1 || that.data.currentTopItem == 2 || that.data.currentTopItem==3){
			wx.request({
				url: app.globalData.port + 'trademark/subject/list',
				method: 'POST',
				header: { 'Content-Type': 'application/json' },
				data: {
					"data": {
						"pageNum": 1,
						"pageSize": 10,
						"status": that.data.currentTopItem ? that.data.currentTopItem : '',
						tmName: that.data.tmName,
						"subjectOid": app.globalData.selectedSubjectOid,
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (r) {
					// console.log(r)
					var list = r.data.data.rows;

					list.forEach(function (item, index, array) {
						array[index] = {
							tmName: item.tmName,
							intCls: item.classifyCode,
							regNo: item.regNo,
							tmId: item.oid
						}
					});
					that.data.topTabItems[that.data.currentTopItem].pageNum = 1

					if (that.data.currentTopItem == 0) {
						that.data.all = []
						for (var j = 0; j < list.length; j++) {
							that.data.all.push(list[j])
						}
						that.setData({
							all: that.data.all,
							topTabItems: that.data.topTabItems
						})
					}
					if (that.data.currentTopItem == 1) {
						that.data.apply = []
						for (var j = 0; j < list.length; j++) {
							that.data.apply.push(list[j])
						}
						that.setData({
							apply: that.data.apply,
							topTabItems: that.data.topTabItems
						})
					}
					if (that.data.currentTopItem == 2) {
						that.data.register = []
						for (var j = 0; j < list.length; j++) {
							that.data.register.push(list[j])
						}
						that.setData({
							register: that.data.register,
							topTabItems: that.data.topTabItems
						})
					}
					// if (that.data.currentTopItem == 3) {
					// 	that.data.threeYear = []
					// 	for (var j = 0; j < list.length; j++) {
					// 		that.data.threeYear.push(list[j])
					// 	}
					// 	that.setData({
					// 		threeYear: that.data.threeYear,
					// 		topTabItems: that.data.topTabItems
					// 	})
					// }
					if (that.data.currentTopItem == 3) {
						that.data.invalid = []
						for (var j = 0; j < list.length; j++) {
							that.data.invalid.push(list[j])
						}
						that.setData({
							invalid: that.data.invalid,
							topTabItems: that.data.topTabItems
						})
					}
				}
			})
		}
		if (that.data.currentTopItem == 4) {
			wx.request({
				url: app.globalData.port + 'trademark/subject/list',
				method: 'POST',
				header: { 'Content-Type': 'application/json' },
				data: {
					"data": {
						"pageNum": 1,
						"pageSize": 10,
						"threeFlag": 1,
						tmName: that.data.tmName,
						"subjectOid": app.globalData.selectedSubjectOid,
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (r) {
					// console.log(r)
					var list = r.data.data.rows;

					list.forEach(function (item, index, array) {
						array[index] = {
							tmName: item.tmName,
							intCls: item.classifyCode,
							regNo: item.regNo,
							tmId: item.oid
						}
					});
					that.data.topTabItems[that.data.currentTopItem].pageNum = 1

					that.data.threeYear = []
					for (var j = 0; j < list.length; j++) {
						that.data.threeYear.push(list[j])
					}
					that.setData({
						threeYear: that.data.threeYear,
						topTabItems: that.data.topTabItems
					})
					
				}
			})
		}
	},

  //切换顶部标签
  switchTab: function (e) {
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
    app.globalData.currentId = e.detail.current
		// console.log(e.currentTarget.dataset.idx)
		
  },
  //swiperChange
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTopItem: e.detail.current
    }); 
    app.globalData.currentId = e.detail.current
		// console.log(e.detail.current)
  },
  //页面跳转
  toTmDetail: function (e) {
		var tmId = e.currentTarget.dataset.tmid;
    wx.navigateTo({
      url: '../trademark/tmDetail?tmId='+tmId,
    })
  },  

	scrolltolower:function(){
		var that = this;
		wx.request({
			url: app.globalData.port + 'trademark/subject/list',
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: {
				"data": {
					"pageNum": that.data.topTabItems[that.data.currentTopItem].pageNum,
					"pageSize": 10,
					"status": that.data.currentTopItem ? that.data.currentTopItem : '',
					"subjectOid": app.globalData.selectedSubjectOid,
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			success: function (r) {
				// console.log(r)
				var list = r.data.data.rows;

				list.forEach(function (item, index, array) {
					array[index] = {
						tmName: item.tmName,
						intCls: item.classifyCode,
						regNo: item.regNo,
						tmId: item.oid
					}
				});
				that.data.topTabItems[that.data.currentTopItem].pageNum +=1 

				if (that.data.currentTopItem == 0) {
					if(list.length!=0){
						for (var j = 0; j < list.length;j++){
							that.data.all.push(list[j])
						}
					}
					that.setData({
						all: that.data.all,
						topTabItems: that.data.topTabItems
					})
				}
				if (that.data.currentTopItem == 1) {
					if (list.length != 0) {
						for (var j = 0; j < list.length; j++) {
							that.data.apply.push(list[j])
						}
					}
					that.setData({
						apply: that.data.apply,
						topTabItems: that.data.topTabItems
					})
				}
				if (that.data.currentTopItem == 2) {
					if (list.length != 0) {
						for (var j = 0; j < list.length; j++) {
							that.data.register.push(list[j])
						}
					}
					that.setData({
						register: that.data.register,
						topTabItems: that.data.topTabItems
					})
				}
				// if (that.data.currentTopItem == 3) {
				// 	if (list.length != 0) {
				// 		for (var j = 0; j < list.length; j++) {
				// 			that.data.threeYear.push(list[j])
				// 		}
				// 	}
				// 	that.setData({
				// 		threeYear: that.data.threeYear,
				// 		topTabItems: that.data.topTabItems
				// 	})
				// }
				if (that.data.currentTopItem == 3) {
					if (list.length != 0) {
						for (var j = 0; j < list.length; j++) {
							that.data.invalid.push(list[j])
						}
					}
					that.setData({
						invalid: that.data.invalid,
						topTabItems: that.data.topTabItems
					})
				}
			}
		})
	},
	scrolltolower2: function () {
		var that = this;
		wx.request({
			url: app.globalData.port + 'trademark/subject/list',
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: {
				"data": {
					"pageNum": that.data.topTabItems[that.data.currentTopItem].pageNum,
					"pageSize": 10,
					"threeFlag": 1,
					"subjectOid": app.globalData.selectedSubjectOid,
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			success: function (r) {
				// console.log(r)
				var list = r.data.data.rows;

				list.forEach(function (item, index, array) {
					array[index] = {
						tmName: item.tmName,
						intCls: item.classifyCode,
						regNo: item.regNo,
						tmId: item.oid
					}
				});
				that.data.topTabItems[that.data.currentTopItem].pageNum += 1

				if (list.length != 0) {
					for (var j = 0; j < list.length; j++) {
						that.data.threeYear.push(list[j])
					}
				}
				that.setData({
					threeYear: that.data.threeYear,
					topTabItems: that.data.topTabItems
				})
				
			}
		})
	},	
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面切换自适应高度
    var that=this;
    
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
    var that = this
    that.setData({
      currentTopItem: app.globalData.currentId
    })
		wx.getSystemInfo({
			success: function (res) {
				// console.log(res)
				that.setData({
					clientHeight: res.screenHeight - 220,
					scrollHeight: (res.screenHeight - 220) * app.globalData.proportion
				});
			}
		});
		if (app.globalData.selectedSubjectOid != '' && app.globalData.selectedSubjectOid != null) {
			for (var i = 0; i < 4; i++) {
				(function (i) {
					wx.request({
						url: app.globalData.port + 'trademark/subject/list',
						method: 'POST',
						header: { 'Content-Type': 'application/json' },
						data: {
							"data": {
								"pageNum": 1,
								"pageSize": 10,
								"status": i ? i : '',
								"subjectOid": app.globalData.selectedSubjectOid,
							},
							"token": app.globalData.token,
							"userOid": app.globalData.userOid
						},
						success: function (r) {
							// console.log(r,i)
							var list = r.data.data.rows;
							var total = r.data.data.total;

							list.forEach(function (item, index, array) {
								array[index] = {
									tmName: item.tmName,
									intCls: item.classifyCode,
									regNo: item.regNo,
									tmId: item.oid
								}
							});
							if (total > 99) {
								total = '99+'
							} else {
								total = total + ''
							}

							that.data.topTabItems[i].num = total

							if (i == 0) {
								that.setData({
									all: list,
									topTabItems: that.data.topTabItems
								})
							}
							if (i == 1) {
								that.setData({
									apply: list,
									topTabItems: that.data.topTabItems
								})
							}
							if (i == 2) {
								that.setData({
									register: list,
									topTabItems: that.data.topTabItems
								})
							}
							// if (i == 3) {
							// 	that.setData({
							// 		threeYear: list,
							// 		topTabItems: that.data.topTabItems
							// 	})
							// }
							if (i == 3) {
								that.setData({
									invalid: list,
									topTabItems: that.data.topTabItems
								})
							}
						}
					})
				}(i))
			}
			wx.request({
				url: app.globalData.port + 'trademark/subject/list',
				method: 'POST',
				header: { 'Content-Type': 'application/json' },
				data: {
					"data": {
						"pageNum": 1,
						"pageSize": 10,
						"threeFlag": 1,
						"subjectOid": app.globalData.selectedSubjectOid,
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (r) {
					// console.log(r,i)
					var list = r.data.data.rows;
					var total = r.data.data.total;

					list.forEach(function (item, index, array) {
						array[index] = {
							tmName: item.tmName,
							intCls: item.classifyCode,
							regNo: item.regNo,
							tmId: item.oid
						}
					});
					if (total > 99) {
						total = '99+'
					} else {
						total = total + ''
					}

					that.data.topTabItems[4].num = total

					that.setData({
						threeYear: list,
						topTabItems: that.data.topTabItems
					})
				}
			})
		}
		that.setData({
			topTabItems: that.data.topTabItems
		})
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