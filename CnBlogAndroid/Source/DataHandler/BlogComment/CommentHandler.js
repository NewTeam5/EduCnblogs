function CommentHandler(data){
    var s = data.split('');
    var result = '';
    var tag = 0;
    for(var i in s)
    {
        if(s[i]=='>')
        {
            tag = 0;
            if(s[i-1]=='/'&&s[i-2]=='r')
            {
                result+='\n';
            }
            continue;
        }
        if(s[i]=='<'||tag==1)
        {
            tag = 1;
            continue;
        }
        if(s[i]=='引'||(s[i]=='用'&&s[i-1]=='引'))
        {
            continue;
        }
        result+=s[i];
    }
    return result;
}
module.exports = CommentHandler;