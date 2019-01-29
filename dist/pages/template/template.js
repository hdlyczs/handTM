function hideAddDetail(display) {
	var that = this;
	// that.setData({
	// 	display: display
	// })
	console.log('1')
}
function showAddDetail() {
	var that = this;
	that.setData({
		display: "block"
	})
}
module.exports = {
	hideAddDetail: hideAddDetail,
	showAddDetail: showAddDetail
};
