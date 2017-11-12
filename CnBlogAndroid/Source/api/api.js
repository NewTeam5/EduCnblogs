export default {
    home:{
        
    },
    user : {
        info : "api/users",
        auth : "token"
    },
    ClassGet : {
        info : "api/edu/schoolclass",     //先用body方式
        blog : "api/edu/schoolclass/posts",
        commentList : "api/edu/schoolclass/comments",
        homeworkList : "api/edu/schoolclass/homeworks",
        bulletinList : "api/edu/schoolclass/bulletins",
        voteList : "api/edu/schoolclass/votes",
        member : "api/edu/schoolclass/members",   //班级成员列表
        classMate : "api/edu/member",     //同班同学之间是不是可以相互看还不确定
        blogID2Mem : "api/edu/member",     //博客id获得主人信息
        currentHomeword : "api/edu/homeworks/current",     //当前班级作业
        homeworkSubmit : "api/edu/homework/answers",      //获取答案提交列表（作业id）
        memBlog : "api/edu/answer/posts",     //通过博客id获取成员博客列表
        memAns : "/api/edu",          //获取成员提交答案（成员id && 作业id）
        unSubmitList : "api/edu/answer/uncommitted",    //未提交作业列表（班号 && 作业号）
        bulletinInfo : "api/edu/bulletin",           //根据公告id获取公告信息
        currentBulletin : "api/edu/bulletin/current",   //获取当前班级公告
        //投票未添加		
    },
	classAction : {
		addMemberByName : "api/edu/member/register/displayName",
	}
}