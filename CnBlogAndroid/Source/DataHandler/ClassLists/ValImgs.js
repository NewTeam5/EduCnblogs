
function ValImgs(posts){
	let ans = [];
    for(let i in posts) {
        ans = ans.concat(posts[i].icon);
    }
    return ans;
}
module.exports = ValImgs;
