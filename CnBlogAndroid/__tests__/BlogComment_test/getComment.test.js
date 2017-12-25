const getComments = require('../../Source/DataHandler/BlogComment/getComments');

/*test('null test', ()=>{
	expect(getComments(null)).toBe("");
});*/

test('normal test', ()=>{
	var item = {
        comments:[{
			Id: 0,
			Body: "body",
			Author: "author",
			DateAdded: "dateadded",
			AuthorUrl: "authorurl",
			FaceUrl: "faceurl",
		},{
			Id: 0,
			Body: "body",
			Author: "author1",
			DateAdded: "dateadded",
			AuthorUrl: "authorurl",
			FaceUrl: "faceurl",
		},
	{
			Id: 0,
			Body: "body",
			Author: "author1",
			DateAdded: "dateadded",
			AuthorUrl: "authorurl",
			FaceUrl: "faceurl",
		}],
        isRequestSuccess: false,
    };
	var tempVar = {
		Authors: [{Author:"author",FaceUrl:"faceurl"},{Author:"author1",FaceUrl:"faceurl"}],
		data: item.comments,
	};
	expect(getComments(item))===(tempVar);
});