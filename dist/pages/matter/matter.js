// pages/trademark/trademark.js
const app = getApp()
Page({
  data: {
    topTabItems: [
      {
        name: '进展信息'
      },
      {
        name: '待办列表'
      }
    ],
    wait:[
      // {
      //   img:'../../images/namei.jpg',
      //   tmName:'海贼王',
      //   date:'2018.10.20',
      //   regNo:'3435466',
      //   intCls:'40'
      // },
      // {
      //   img: '../../images/namei.jpg',
      //   tmName: '海贼王',
      //   date: '2018.10.20',
      //   regNo: '3435466',
      //   intCls: '40'
      // },
      // {
      //   img: '../../images/namei.jpg',
      //   tmName: '海贼王',
      //   date: '2018.10.20',
      //   regNo: '3435466',
      //   intCls: '40'
      // },
      // {
      //   img: '../../images/namei.jpg',
      //   tmName: '海贼王',
      //   date: '2018.10.20',
      //   regNo: '3435466',
      //   intCls: '40'
      // },
      
    ],
    progress:[
    ],
    currentTopItem: "0",
  },
  //切换顶部标签
  switchTab: function (e) {
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
    app.globalData.currentIdx = e.detail.current
  },
  //swiperChange
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTopItem: e.detail.current
    });
    app.globalData.currentIdx = e.detail.current

  },
  toTmDetail: function (e) {
		var tmId = e.currentTarget.dataset.tmid;
		wx.navigateTo({
			url: '../trademark/tmDetail?tmId=' + tmId,
		})
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面切换自适应高度
    var that = this;
    
		
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      currentTopItem: app.globalData.currentIdx
    })
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					//这里的4是变量，获取到的数据的个数
					clientHeight: res.screenHeight - 165
				});
			}
		});
		wx.showLoading({
			title: '加载中',
		})
		setTimeout(function () {
			wx.hideLoading()
			wx.request({
				url: app.globalData.port + 'trademark/subject/status',
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

					var list = r.data.data.rows;
					list.forEach(function (item, index, array) {
						array[index] = {
							tmName: item.tmName,
							intCls: item.classifyCode,
							regNo: item.regNo,
							tmId: item.oid,
							date: item.flowDate.substring(0, 10),
							img: item.imgUrl,
							businessName: item.businessName,
						}
					});
					// console.log(list)


					var month = [];
					var re_month = [month[0]];//去重后的数组
					for (var i = 0; i < list.length; i++) {
						month.push(list[i].date.substring(0, 7))
					}
					for (var i = 1; i < month.length; i++) {
						if (month[i] !== re_month[re_month.length - 1]) {
							re_month.push(month[i])
						}
					}
					for (var i = 0; i < re_month.length - 1; i++) {
						that.data.progress.push({})
					}
					that.setData({
						progress: that.data.progress
					})
					// console.log(re_month)
					for (var i = 0; i < re_month.length - 1; i++) {
						// console.log(that.data.progress[i])
						that.data.progress[i].month = re_month[i + 1]
						that.data.progress[i].detail = [];
						for (var j = 0; j < list.length; j++) {
							if (re_month[i + 1] == list[j].date.substring(0, 7)) {
								that.data.progress[i].detail.push(list[j])
							}
						}
					}
					that.setData({
						progress: that.data.progress
					})
				}
			})
		}, 2000)
  },
})