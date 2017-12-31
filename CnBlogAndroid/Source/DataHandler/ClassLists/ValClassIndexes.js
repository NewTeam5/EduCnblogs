
function ValClassIndexes(data){
    let ans = [];
    for(let i in data) {
        ans.push(i);
    }
    return ans;
}
module.exports = ValClassIndexes;
