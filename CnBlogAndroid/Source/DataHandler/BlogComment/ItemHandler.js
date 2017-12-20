const CommentHandler = require('./CommentHandler');

function ItemHandler(item){
    let item1 = item;
    if(item!=null){
        item = item1.item;
    }
    item.Author = item.Author?item.Author:'';
    item.Body = item.Body?CommentHandler(Body):'';
    item.DateAdded = item.DateAdded?item.DateAdded:'';
    return item;
}

module.exports = ItemHandler;