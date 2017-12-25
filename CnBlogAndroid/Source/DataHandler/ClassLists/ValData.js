
function ValData(state){
    let ans = [];
    for(let i in state.classes) {
		ans.push({
		    key: state.classes[i].schoolClassId,
			nameCn: state.classes[i].nameCn,
			universityNameCn: state.classes[i].universityNameCn,
			imgurl: state.imgs[i],
		})
	}
    return ans;
}
module.exports = ValData;
