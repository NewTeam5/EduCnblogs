const CommentHandler = require('../../Source/DataHandler/BlogComment/CommentHandler');

test('\'>\' escape', ()=>{
	var testData0 = "/r>/r>/r>/r>/r>/r>";
	var testRes0  = "/r/r/r/r/r/r";
	expect(CommentHandler(testData0)).toBe(testRes0);
});

test('\'<\' not show', ()=>{
	var testData1 = "<content show test/r>";
	var testRes1  = "";
	expect(CommentHandler(testData1)).toBe(testRes1);
});

test('remove Quote', ()=>{
	var testData2 = "remove引用Quote引用test引用finished/r>";
	var testRes2 = "removeQuotetestfinished/r";
	expect(CommentHandler(testData2)).toBe(testRes2);
});

test('text content after 引', ()=>{
	var testData3 = "吸引人";
	var testRes3 = "吸人";
	expect(CommentHandler(testData3)).toBe(testRes3);
});

/*test('null test', ()=>{
	expect(CommentHandler(null)).toBe("");
});*/