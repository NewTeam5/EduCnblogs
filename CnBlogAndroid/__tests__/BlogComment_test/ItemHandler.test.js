const ItemHandler = require('../../Source/DataHandler/BlogComment/ItemHandler');

test('null test', ()=>{
	expect(ItemHandler(null)).toBe(null);
});