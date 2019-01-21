//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    icons:[
      // {
      //   name:'浙江求标网络科技有限公司',
      //   date:'2018.10.20',
      //   address:'浙江省杭州市滨江区滨安路650号ix-xork大厦A幢1108',
      //   tmNum:'326'
      // },
      // {
      //   name: '浙江求标网络科技有限公司',
      //   date: '2018.10.20',
      //   address: '浙江省杭州市滨江区滨安路650号ix-xork大厦A幢1108',
      //   tmNum: '326'
      // },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
	toAddBody: function () {
		wx.navigateTo({
			url: '../addBody/addBody'
		})
	},
	changeSelected:function(e){
		var subjectOid = e.currentTarget.dataset.subjectoid;
		wx.showModal({
			title: '关联提示',
			content: '是否更换当前主体',
			confirmText: '确认更换',
			cancelText: '再想想',
			success: function (res) {
				if (res.confirm) {
					wx.request({
						url: app.globalData.port + 'subject/select',
						method: 'POST',
						header: {
							"Content-Type": "application/json"
						},
						data: {
							"data": {
								oid: subjectOid
							},
							"token": app.globalData.token,
							"userOid": app.globalData.userOid
						},
						success: function (result) {
							app.globalData.selectedSubjectOid = subjectOid
							wx.switchTab({
								url: '../all/all',
							})
						}
					})
				}
			}
		})
	},
  onLoad: function () {
		
	},
	onShow:function(){
		
		var that = this;
		wx.request({
			url: app.globalData.port + 'subject/list',
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
			success: function (result) {
				// console.log(result)
				var list = result.data.data.rows;
				list.forEach(function (item, index, array) {
					array[index] = {
						subjectOid:item.oid,
						name: item.applicantCn,
						date: item.createTime.substring(0,10),
						address: '',
						isSelected: item.isSelected,
						tmNum: item.allTmCount
					}
				});
				that.setData({
					icons: list
				})
			}
		})
	}
})
