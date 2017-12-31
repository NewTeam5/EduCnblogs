
function AddMemberHint(data){
    if (data === null) {
        return '请求失败！';
    } else if(data.isSuccess) {
        return '添加成功，请刷新查看！';
        //this.props.navigation.goBack();
    } else if(data.isWarning) {
        return data.message;
    } else {
        return '发生错误，请稍后重试！';
    }
}
module.exports = AddMemberHint;
