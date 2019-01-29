const app = getApp();
Page({
  data:{
    topTabItems:[
      {
        name:'法律信息'
      },
      {
        name: '进展信息'
      },
      
    ],
    currentTopItem: "0",
		clientHeight: 310,
    same:1,
    // 展开折叠
    selectedFlag: [false, false, false, false],
		trademarkInfo:null,
		trademarkFlow:[],
  },
  //返回上个页面
  goback:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //切换顶部标签
  switchTab: function (e) {
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
  },
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },

  onLoad: function (options) {
    //页面切换自适应高度
    var that = this;
		var tmId = options.tmId;
		// var tmId = '484b80784cfd4294919ad3ee144a1478';

		wx.request({
			url: app.globalData.port + 'trademark/search/details',
			method: 'POST',
			header: { 'Content-Type': 'application/json' },
			data: {
				"data": {
					oid: tmId
				},
				"token": app.globalData.token,
				"userOid": app.globalData.userOid
			},
			success: function (r) {
				// console.log(r)
				var data = r.data.data;
				if (data.trademarkInfo.announcementDate!=null){
					data.trademarkInfo.announcementDate = data.trademarkInfo.announcementDate.substring(0, 10)
				}
				if (data.trademarkInfo.applicationDate != null) {
					data.trademarkInfo.applicationDate = data.trademarkInfo.applicationDate.substring(0, 10)
				}
				if (data.trademarkInfo.regDate != null) {
					data.trademarkInfo.regDate = data.trademarkInfo.regDate.substring(0, 10)
				}
				if (data.trademarkInfo.privateDate != null) {
					data.trademarkInfo.tmRegDate = data.trademarkInfo.privateDate.substring(0, 10)
				}
				if (data.trademarkInfo.privateDate != null) {
					data.trademarkInfo.tmStopDate = data.trademarkInfo.privateDate.substring(11, 21)
				}
				if (data.trademarkInfo.tmRegDate != null) {
					data.trademarkInfo.threeDate = parseInt(data.trademarkInfo.tmRegDate.substring(0, 4)) + 3 + data.trademarkInfo.tmRegDate.substring(4, 10)
				}
				data.trademarkFlow.forEach(function (item, index, array) {
					array[index] = {
						businessName: item.businessName,
						flowDate: item.flowDate.substring(0, 10),
					}
				});
				that.setData({
					trademarkInfo: data.trademarkInfo,
					trademarkFlow: data.trademarkFlow
				})
				console.log(that.data.trademarkInfo, that.data.trademarkFlow)
			}
		})
  },
})