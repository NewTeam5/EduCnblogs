
function JudgeStatus(response){
    if (response.status !== 200) {
        return null;
    } else {
        return response.json();
    }
}
module.exports = JudgeStatus;
