export default{
	apiDomain : 'https://api.cnblogs.com/',
	AccessToken : 'https://oauth.cnblogs.com/connect/token',
	AuthCode : 'https://oauth.cnblogs.com/connect/authorize',
	CallBack : 'https://oauth.cnblogs.com/auth/callback',
}

export const authData = {
	clientId : "273d136d-9df0-42ad-bcbd-cb1f9824f363",
	clientSecret : "C6FH4OmZ0AV2Gp7FtK2lITL5TAsctNZpII7SkzVDOdXcXVJ3s6KYKoNJp5TuCqUv3LJpqzkyYNCyZBYT"
}

export const StorageKey = {
	USER_TOKEN : "USER_TOKEN"
}

//这里是一个全局变量，存放的是用户的信息，调用的时候不用写是哪个模块里的，直接用global.user_infomation.**就行
global.user_information = {
	userId : '',
	SpaceUserId : -1,
	BlogId : -1,
	DisplayName : '',
	face : '',
	Seniority : '',  //园龄
	BlogApp : ''
}