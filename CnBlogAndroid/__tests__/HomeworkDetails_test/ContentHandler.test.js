const head = '<!DOCTYPE html><html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<style type="text/css">  * {word-wrap:break-word; word-break:break-all;}</style>'+
'</head>';
const tail = '</html>';
const ContentHandler = require('../../Source/DataHandler/HomeworkDetails/ContentHandler');

test('null test', ()=>{
	expect(ContentHandler(null)).toBe(null);
});

test('normal test', ()=>{
	var item = {
		content: "content",
		convertedContent: null,
	}
	var res = {
		content: head+"content"+tail,
		convertedContent: null,
	}
	expect(ContentHandler(item))===(res);
});

test('normal test', ()=>{
	var item = {
		content: "content",
		convertedContent: "notnull&amp;&lt;&gt;&nbsp;&#39;&quot;",
	}
	var res = {
		content: head+"content"+tail,
		convertedContent: "notnull&<> \'\"",
	}
	expect(ContentHandler(item))===(res);
});