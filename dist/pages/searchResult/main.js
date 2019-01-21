const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isShow:true,
		tmName:'',
    core: false,
    important: false,
    relative: false,
		qita: false,
    moreBoxHeight: '',
		allcheck:false,
		classifyList:[],
		searchResult:1,
		trademarkList:[],
		coreList:[],
		importantList:[],
		relativeList:[],
		qitaList:[],
		displayList:[],
		displaySelectedList:[],
  },
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  toIntcls:function(e){
		var that = this;
		var intcls= e.currentTarget.dataset.intcls;
		var relationType = e.currentTarget.dataset.relationtype;
		var intclsName='';
		var trademarkList = [];
		if (relationType==1){
			for(var i=0;i<that.data.coreList.length;i++){
				if (that.data.coreList[i].trademarkClassify.code == intcls){
					//
					intclsName = that.data.coreList[i].trademarkClassify.name;
					trademarkList = that.data.coreList[i].trademarkList;
				}
			}
		}
		if (relationType == 2) {
			for (var i = 0; i < that.data.importantList.length; i++) {
				if (that.data.importantList[i].trademarkClassify.code == intcls) {
					//
					intclsName = that.data.importantList[i].trademarkClassify.name;
					trademarkList = that.data.importantList[i].trademarkList;
				}
			}
		} 
		if (relationType == 3) {
			for (var i = 0; i < that.data.relativeList.length; i++) {
				if (that.data.relativeList[i].trademarkClassify.code == intcls) {
					//
					intclsName = that.data.relativeList[i].trademarkClassify.name;
					trademarkList = that.data.relativeList[i].trademarkList;
				}
			}
		}
		if (relationType == 4) {
			for (var i = 0; i < that.data.qitaList.length; i++) {
				if (that.data.qitaList[i].trademarkClassify.code == intcls) {
					//
					intclsName = that.data.qitaList[i].trademarkClassify.name;
					trademarkList = that.data.qitaList[i].trademarkList;
				}
			}
		}
    wx.navigateTo({
			url: '../intClsDetail/intClsDetail?intcls=' + intcls + '&intclsName=' + intclsName + '&relationType=' + relationType + '&trademarkList=' + JSON.stringify(trademarkList),//带参
    })
  },
  coreClick: function () {
    if (this.data.core == false) {
      this.setData({
        core:true
      })
    } else {
      this.setData({
        core: false
      })
    }
  },
  importantClick: function () {
    if (this.data.important == false) {
      this.setData({
        important: true
      })
    } else {
      this.setData({
        important: false
      })
    }
  },
  relativeClick: function () {
    if (this.data.relative == false) {
      this.setData({
        relative: true
      })
    } else {
      this.setData({
        relative: false
      })
    }
  },
	qitaClick: function () {
		if (this.data.qita == false) {
			this.setData({
				qita: true
			})
		} else {
			this.setData({
				qita: false
			})
		}
	},
  showMorebox: function () {
		var that = this;
		var rows = that.data.classifyList;
		var displayList = [];
		for(var i= 0;i<rows.length;i++){
			var flag = 1;
			for (var j = 0; j < that.data.trademarkList.length;j++){
				if (rows[i].code != that.data.trademarkList[j].trademarkClassify.code){
					continue;
				}else{
					flag=2;
					break;
				}
			}
			if(flag==1){
				rows[i].selected = false;
				displayList.push(rows[i])
			}
		}
		that.setData({
			displayList: displayList,
		})
		
		that.setData({
      moreBoxHeight: 740
    })
  },
	selectQita:function(e){
		var idx = e.currentTarget.dataset.idx;
		var that = this;
		that.data.displayList[idx].selected = !that.data.displayList[idx].selected;
		that.setData({
			displayList: that.data.displayList,
		})
	},
	allcheck:function(){
		var that = this;
		// that.data.displayList[idx].selected = !that.data.displayList[idx].selected;
		// that.setData({
		// 	displayList: that.data.displayList,
		// })
		if (that.data.allcheck == false) {
			for (var key in that.data.displayList) {
				var zhi = "displayList[" + key + "].selected";
				that.setData({
					[zhi]: true
				})
			}
			that.setData({
				allcheck: true
			})
		} else {
			for (var key in that.data.displayList) {
				var zhi = "displayList[" + key + "].selected";
				that.setData({
					[zhi]: false
				})
			}
			that.setData({
				allcheck: false
			})
		}
	},
	qitaConfirm:function(){
		var that = this;
		for(var i=0;i<that.data.displayList.length;i++){
			if (that.data.displayList[i].selected){
				(function (i) {
					wx.request({
						url: app.globalData.port + 'trademark/similar/code',
						method: 'POST',
						header: {
							"Content-Type": "application/json"
						},
						data: {
							"data": {
								"tmName": that.data.tmName,
								"classifyCode": that.data.displayList[i].code
							},
							"token": app.globalData.token,
							"userOid": app.globalData.userOid
						},
						success: function (res) {
							var data = res.data.data;
							that.data.trademarkList.push(data)
							that.data.qitaList.push(data)
							that.setData({
								trademarkList: that.data.trademarkList,
								qitaList: that.data.qitaList
							})
						}
					})
				}(i))
			}
		}
		that.closeMorebox();
	},
  closeMorebox: function () {
    this.setData({
      moreBoxHeight: 0
    })
    // console.log(123)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		var tmName = options.tmName;
		var industryOid = options.industryOid;
		var searchName = options.searchName;
		var goodCode  = options.goodCode;
		console.log(tmName, industryOid, searchName, goodCode)
		that.setData({
			tmName: tmName
		})
		if (industryOid!=undefined){
			wx.request({
				url: app.globalData.port + 'trademark/similar/industry',
				method: 'POST',
				header: {
					"Content-Type": "application/json"
				},
				data: {
					"data": {
						"industryOid": industryOid,
						"searchName": searchName,
						"tmName": tmName
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (res) {
					console.log(res)
					
					var data = res.data.data;
					var searchResult = data.searchResult;
					var trademarkList = data.trademarkList;
					var coreList= [];
					var importantList= [];
					var relativeList= [];
					for (var i = 0; i < trademarkList.length;i++){
						if (trademarkList[i].trademarkClassify.relationType == 1 || trademarkList[i].trademarkClassify.relationType == '' || trademarkList[i].trademarkClassify.relationType == null){
							coreList.push(trademarkList[i]);
						}
						if (trademarkList[i].trademarkClassify.relationType == 2){
							importantList.push(trademarkList[i]);
						}
						if (trademarkList[i].trademarkClassify.relationType == 3){
							relativeList.push(trademarkList[i]);
						}
					}
					that.setData({
						isShow: false,
						searchResult: searchResult,
						coreList: coreList,
						importantList: importantList,
						relativeList: relativeList,
					})
				}
			})
		}
		if(goodCode!=undefined){
			wx.request({
				url: app.globalData.port + 'trademark/similar/good',
				method: 'POST',
				header: {
					"Content-Type": "application/json"
				},
				data: {
					"data": {
						"goodCode": goodCode,
						"searchName": searchName,
						"tmName": tmName
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (res) {
					console.log(res)

					var data = res.data.data;
					var searchResult = data.searchResult;
					var trademarkList = data.trademarkList;
					var coreList= [];
					var importantList= [];
					var relativeList= [];
					for (var i = 0; i < trademarkList.length;i++){
						if (trademarkList[i].trademarkClassify.relationType == 1 || trademarkList[i].trademarkClassify.relationType == '' || trademarkList[i].trademarkClassify.relationType == null){
							coreList.push(trademarkList[i]);
						}
						if (trademarkList[i].trademarkClassify.relationType == 2){
							importantList.push(trademarkList[i]);
						}
						if (trademarkList[i].trademarkClassify.relationType == 3){
							relativeList.push(trademarkList[i]);
						}
					}
					that.setData({
						isShow:false,
						searchResult: searchResult,
						trademarkList: trademarkList,
						coreList: coreList,
						importantList: importantList,
						relativeList: relativeList,
					})
				}
			})
		}
		wx.request({
			url: app.globalData.port + 'trademark/classify/list',
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
				var rows = res.data.data.rows;
				that.setData({
					classifyList: rows
				})
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