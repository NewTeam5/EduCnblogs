const head = '<!DOCTYPE html><html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<style type="text/css">  * {word-wrap:break-word; word-break:break-all;}</style>'+
'</head>';
const tail = '</html>';
const HtmlDecode = require('./HtmlDecode');

function ContentHandler(item){
    item.content = head + (item.convertedContent==null?HtmlDecode(item.content):HtmlDecode(item.convertedContent)) + tail;
    return item;
}
module.exports = ContentHandler;