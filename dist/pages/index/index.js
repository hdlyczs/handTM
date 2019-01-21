Page({
	data: {
		icon1:{
			style:"width:67rpx;height:50rpx;",
			mdoe:"widthFix",
			src:"https://qiutm-handtm.oss-cn-beijing.aliyuncs.com/images/icon1.png"
		},
		icon2:{
			style: "width:50rpx;height:50rpx;",
			mdoe: "widthFix",
			src: "https://qiutm-handtm.oss-cn-beijing.aliyuncs.com/images/icon2.png"
		},
		background: {
			style: "width:750rpx;height:830rpx;margin-top:120rpx;",
			mdoe: "widthFix",
			src: "https://qiutm-handtm.oss-cn-beijing.aliyuncs.com/images/background-idx.png"
		},
		grzx: {
			style: "width:58rpx;height:58rpx;",
			mdoe: "widthFix",
			src: "https://qiutm-handtm.oss-cn-beijing.aliyuncs.com/images/grzx.png"
		},
		kf: {
			style: "width:58rpx;height:59rpx;",
			mdoe: "widthFix",
			src: "https://qiutm-handtm.oss-cn-beijing.aliyuncs.com/images/kf.png"
		},
	},
	toSearch:function(){
    wx.navigateTo({
      url: "../search/main",
    })
	},
	toManage:function(){
    wx.switchTab({
      url: '../all/all',
    })
	},
	toGrzx:function(){
		wx.navigateTo({
			url: "../personCenter/personCenter",
		})
	},
	toKf:function(){
		wx.navigateTo({
			url: "../staff/staff",
		})
	}
})
