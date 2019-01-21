const app = getApp();
Page({
  data:{
		holder:'',
		applicantCount:'',
		regCount:'',
		threeYearCount:'',
		failCount:'',
    progress:[],
    flag:false,
    number:0.5,
  },
  back:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  toBody: function () {
    wx.switchTab({
      url: '../manage/index',
    })
  },
  toTrademark:function(e){
    app.globalData.currentId = e.currentTarget.dataset.currentid
    wx.switchTab({
      url: '../trademark/trademark',
    })
  },
  toMatter: function (e) {
    app.globalData.currentIdx = e.currentTarget.dataset.currentid
    wx.switchTab({
      url: '../matter/matter',
    })
  },
  onLoad: function (options) {
		
		
  },
	onShow: function () {
		var that = this;
		wx.showLoading({
			title: '加载中',
		})
		setTimeout(function () {
			wx.hideLoading()
			if (app.globalData.selectedSubjectOid==''){
				wx.showToast({
					title: '网络异常或未绑定主体',  //标题
					icon: 'none',
					duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
					mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
				})
			}else{
				wx.request({
					url: app.globalData.port + 'subject/details',
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: {
						"data": {
							"oid": app.globalData.selectedSubjectOid,
						},
						"token": app.globalData.token,
						"userOid": app.globalData.userOid
					},
					success: function (r) {
						// console.log(r)
						var data = r.data.data;
						that.setData({
							holder: data.applicantCn
						})
					}
				})
				wx.request({
					url: app.globalData.port + 'trademark/subject/count',
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: {
						"data": {
							"subjectOid": app.globalData.selectedSubjectOid,
						},
						"token": app.globalData.token,
						"userOid": app.globalData.userOid
					},
					success: function (r) {
						// console.log(r)
						var data = r.data.data;
						that.setData({
							applicantCount: data.applicantCount,
							regCount: data.regCount,
							threeYearCount: data.threeYearCount,
							failCount: data.failCount,
						})
					}
				})
				wx.request({
					url: app.globalData.port + 'trademark/subject/status',
					method: 'POST',
					header: { 'Content-Type': 'application/json' },
					data: {
						"data": {
							"subjectOid": app.globalData.selectedSubjectOid,
							"pageNum": 1,
							"pageSize": 10,
						},
						"token": app.globalData.token,
						"userOid": app.globalData.userOid
					},
					success: function (r) {
						var list = r.data.data.rows;
						list.forEach(function (item, index, array) {
							array[index] = {
								tmName: item.tmName,
								intCls: item.classifyCode,
								regNo: item.regNo,
								tmId: item.oid,
								date: item.flowDate.substring(5, 10),
								img: item.imgUrl,
								businessName: item.businessName,
							}
						});
						for (var i = 0; i < list.length; i++) {
							that.data.progress.push(list[i])
						}
						that.setData({
							progress: that.data.progress
						})
					}
				})
			}
		}, 5000)
	}
})