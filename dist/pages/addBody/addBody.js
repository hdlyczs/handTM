//获取应用实例
const app = getApp()

Page({
	data: {
		title:'添加主体',
		display:'',
		cuoDisplay:'none',
		searchIconLeft:240,
		placeholder:'center',
		value:'',
		bodyBoxH:'980',
		items:[
			
		],
		bodys:[]
	},
	//事件处理函数
	
	back: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	// 获取到焦点
	focus: function (e) {
		var that = this;
		var value = e.detail.value;
		this.setData({
			searchIconLeft:14,
			placeholder:'left',
		})
	},
	
	// 失去焦点
	blur: function (e) {
		var that = this;
		var value = e.detail.value;
		// if (value == '' || value == null){
		// 	this.setData({
		// 		searchIconLeft: 240,
		// 		placeholder:'center'
		// 	})
		// }
	},
	// 输入时
	bindinput: function (e) {
		var that = this;
		var value = e.detail.value;
		if (value != "" && value != null) {
			this.setData({
				cuoDisplay: 'block',
				value: value
			})
		}
		if (value == '' || value == null) {
			this.setData({
				cuoDisplay: 'none',
				value: value
			})
		}
	},
	bindconfirm:function(e){
		var that = this;
		if (that.data.value != null && that.data.value != ''){
			wx.showLoading({
				title: '搜索中',
			})
			wx.request({
				url: app.globalData.port + 'subject/tmkoo/list',
				method: 'POST',
				header: {
					"Content-Type": "application/json"
				},
				data: {
					"data": {
						"applicantCn": that.data.value,
						"pageNum": 1,
						"pageSize": 10
					},
					"token": app.globalData.token,
					"userOid": app.globalData.userOid
				},
				success: function (res) {
					wx.hideLoading()
					var data = res.data.data;
					//判断是否已关联  但现在后台返回了
					// var bodys = that.data.bodys;
					// for(var i=0;i<data.length;i++){
					// 	for(var j=0;j<bodys.length;j++){
					// 		if (data[i].idCardNo != '' && data[i].idCardNo != null){
					// 			if (data[i].idCardNo==bodys[j].idCardNo){
					// 				data.isRelated=true;
					// 			}
					// 		}
					// 		if (data[i].idCardNo == '' && data[i].idCardNo == null){
					// 			if (data[i].applicantCn == bodys[j].applicantCn){
					// 				data.isRelated = true;
					// 			}
					// 		}
					// 	}
					// 	data[i].isRelated = false;
					// }
					that.setData({
						items: data
					})
				}
			})
		}
	},
	//清除文本
	clearText:function(e){
		this.setData({
			value: '',
			cuoDisplay: 'none',
			searchIconLeft: 240,
			placeholder: 'center',
		})
	},
	addBody:function(e){
		var _this = this;
		wx.showModal({
			title: '关联提示',
			content: '是否关联此主体',
			confirmText:'确认关联',
			cancelText:'再想想',
			success:function(res){
				if(res.confirm){
					var that = this;
					var allTmCount = e.currentTarget.dataset.alltmcount;
					var applicantCn = e.currentTarget.dataset.applicantcn;
					var idCardNo = e.currentTarget.dataset.idcardno;
					var validTmCount = e.currentTarget.dataset.validtmcount;
					var idx = e.currentTarget.dataset.idx;
					wx.request({
						url: app.globalData.port + 'subject/add',
						method: 'POST',
						header: { 'Content-Type': 'application/json' },
						data: {
							"data": {
								"allTmCount": allTmCount,
								"applicantCn": applicantCn,
								"idCardNo": idCardNo,
								"validTmCount": validTmCount
							},
							"token": app.globalData.token,
							"userOid": app.globalData.userOid
						},
						success: function (r) {
							// console.log(r)
							wx.showToast({
								title: '绑定主体成功',  //标题
								icon: 'none',
								duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
								mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
							})
							_this.data.items[idx].isBound = 1
							_this.setData({
								items: _this.data.items
							})
							app.globalData.selectedSubjectOid = r.data.data.subjectOid
						}
					})
				}
				if(res.cancel){

				}
			}
		})
	},
	// deleteBody: function () {
	// 	wx.showModal({
	// 		title: '删除提示',
	// 		content: '是否删除关联',
	// 		confirmText: '确认删除',
	// 		cancelText: '再想想',
	// 		success: function (res) {
	// 			if (res.confirm) {
	// 				wx.request({
	// 					url: '',
	// 					method: 'POST',
	// 					header: {
	// 						"Content-Type": "application/x-www-form-urlencoded"
	// 					},
	// 					data: {

	// 					},
	// 					success: function (r) {

	// 					}
	// 				})
	// 			}
	// 			if (res.cancel) {

	// 			}
	// 		}
	// 	})
	// },
	onLoad: function () {
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
				that.setData({
					bodys:result.data.data.rows
				})
			}
		})
	}
})
