const HtmlDecode = require('../../Source/DataHandler/HomeworkDetails/HtmlDecode');

test('null test', ()=>{
	var teststr0 = null;
	var testRes0 = "";
	expect(HtmlDecode(teststr0)).toBe(testRes0);
});

test('decode test', ()=>{
	var teststr1 = "&amp;&lt;&gt;&nbsp;&#39;&quot;";
	var testRes1 = "&<> \'\"";
	expect(HtmlDecode(teststr1)).toBe(testRes1);
});