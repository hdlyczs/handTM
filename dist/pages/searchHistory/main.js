var util = require('../utils/index.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMsg: false,
    text: '编辑',
    isEdit: false,
    height: '',
    allcheck: false,//全选
    list: [0,1],
    checkedList: [],
    removeList: [],
    ajaxList: [],
    pageNum : 2
  },
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  edit: function () {
    const This = this
    if (This.data.isEdit == false) {
      This.setData({
        text: '取消',
        isEdit: true
      })
      wx.getSystemInfo({
        success: function (res) {
          var height = res.screenHeight;
          var width = res.screenWidth;
          height = height * 750 / width;
          This.setData({
            height: height - 145 - 395
          })
        }
      })
    } else {
      This.setData({
        text: '编辑',
        isEdit: false,
        height:''
      })
    }
  },
  check: function (e) {
    var index = e.currentTarget.dataset.idx;
    var zhi = "checkedList[" + index + "].selected";
    this.setData({
      [zhi]: !this.data.checkedList[index].selected,
    })
  },
  allcheckClick: function () {
    if (this.data.allcheck == false) {
      for (var key in this.data.checkedList) {
        var zhi = "checkedList[" + key + "].selected";
        this.setData({
          [zhi]: true
        })
      }
      this.setData({
        allcheck:true
      })
    } else {
      for (var key in this.data.checkedList) {
        var zhi = "checkedList[" + key + "].selected";
        this.setData({
          [zhi]: false
        })
      }
      this.setData({
        allcheck: false
      })
    }
  },
  remove: function () {
    var that = this;
    var ajaxList = [];
    that.setData({
      ajaxList:[]
    })
    for (var i = 0; i < that.data.checkedList.length; i++) {
      if (that.data.checkedList[i].selected == true) {
        var zhi = "removeList[" + i + "].selected";
        that.setData({
          [zhi]:true
        })
        //这里i就是要删除的list的index;
        ajaxList.push(that.data.list[i].oid)
      }
    }
    that.setData({
      ajaxList: ajaxList
    })
    //for(this.data.removeList) 发送ajax 可以用promiseAll
    
    
    //发送请求删除数据
    wx.request({
      url: app.globalData.port + 'history/delete',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "data": {
          "oids": that.data.ajaxList
        },
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
      },
      success: function (res) {
        if (that.data.ajaxList.length == that.data.list.length) {
          that.setData({
            noMsg:true
          })
        }
      }
    })
  },
  scrolltolower:function(){
    var that = this;
    var checkedList = that.data.checkedList;
    var removeList = that.data.removeList;
    var list = that.data.list;
    wx.request({
      url: app.globalData.port + 'history/list',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "data": {
          "pageNum": that.data.pageNum,
          "pageSize": 10
        },
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
      },
      success: function (res) {
        var rows = res.data.data.rows;
        // console.log(rows)
        for (var i = 0; i < rows.length; i++) {
          var obj = rows[i]
          list.push(obj);
        }
        for (var i = 0; i < rows.length; i++) {
          var obj = { selected: false }
          checkedList.push(obj);
        }
        for (var i = 0; i < rows.length; i++) {
          var obj = { selected: false }
          removeList.push(obj);
        }
        that.setData({
          checkedList: checkedList,
          removeList: removeList,
          list: list,
          pageNum: that.data.pageNum+1
        })
        if (that.data.list.length == 0) {
          that.setData({
            noMsg: true
          })
        }
      }
    })
  },
	toResult:function(e){
		var searchType = e.currentTarget.dataset.searchtype;
		var searchOid = e.currentTarget.dataset.searchoid;
		var tmName = e.currentTarget.dataset.word;
		var searchName = e.currentTarget.dataset.searchname;

		if (searchType==1){
			wx.navigateTo({
				url: '../searchResult/main?tmName=' + tmName + '&industryOid=' + searchOid + '&searchName=' + searchName, //还要先跳到加载页
			})
		}
		if (searchType==2){
			wx.navigateTo({
				url: '../searchResult/main?tmName=' + tmName + '&goodCode=' + searchOid + '&searchName=' + searchName, //还要先跳到加载页
			})
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var checkedList = [];
    var removeList = [];
    wx.request({
      url: app.globalData.port + 'history/list',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "data": {
          "pageNum": 1,
          "pageSize": 10
        },
        "token": app.globalData.token,
        "userOid": app.globalData.userOid
      },
      success: function (res) {
        var rows = res.data.data.rows;
        for (var i = 0; i < rows.length; i++) {
          var obj = { selected: false }
          checkedList.push(obj);
        }
        for (var i = 0; i < rows.length; i++) {
          var obj = { selected: false }
          removeList.push(obj);
        }
        that.setData({
          list: rows,
          checkedList: checkedList,
          removeList: removeList
        })
        if (that.data.list.length == 0) {
          that.setData({
            noMsg: true
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