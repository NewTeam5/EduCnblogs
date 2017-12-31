const InfoHandler = require('../../Source/DataHandler/HomeworkDetails/InfoHandler');

test('null test', ()=>{
	var test0 = null;
	var testres0 = null;
	expect(InfoHandler(test0)).toBe(testres0);
});

test('integer test', ()=>{
	var test1 = 12;
	var testres1 = 12;
	expect(InfoHandler(test1)).toBe(testres1);
});

test('string test', ()=>{
	var test2 = "asd";
	var testres2 = "asd";
	expect(InfoHandler(test2)).toBe(testres2);	
});

test('struct var test', ()=>{
	var mystruct = {
		item1: 1,
		item2: "asdf",
		item3: 'a',
	}
	expect(InfoHandler(mystruct).item1).toBe(1);
	expect(InfoHandler(mystruct).item2).toBe("asdf");
	expect(InfoHandler(mystruct).item3).toBe('a');
});