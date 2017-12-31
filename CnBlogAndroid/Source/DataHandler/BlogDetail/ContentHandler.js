const head = '<!DOCTYPE html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<link type="text/css" rel="stylesheet" href="/bundles/blog-common.css?v=ChDk9h03-S75WEqNhGvXkWireJ5cCWdK1xRM9NIXfnM1"/>'+
'<link id="mobile-style" media="only screen and (max-width: 768px)" type="text/css" rel="stylesheet"'+
'href="https://www.cnblogs.com/skins/UnlimitedSunlight/bundle-UnlimitedSunlight-mobile.css"/>'+
'<link type="text/css" rel="stylesheet" href="/bundles/blog-common.css?v=ChDk9h03-S75WEqNhGvXkWireJ5cCWdK1xRM9NIXfnM1"/>'+
'<style type="text/css"> * {word-wrap:break-word; word-break:break-all;}</style>'+
'<script src="//common.cnblogs.com/script/jquery.js" type="text/javascript"></script>'+
'<script src="/bundles/blog-common.js?v=hm0KZwWzsEv1qy3Vf9Vq9zW3uMF7kiGWJjjCrkS4nJY1" type="text/javascript"></script>'+
'</head>';
const tail = '</head>';
function ContentHandler(item){
    var content = head + (item.content != null?item.content:'')+tail;
    return content;
}
module.exports = ContentHandler;