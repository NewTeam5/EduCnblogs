function getComments(item){
    Authors = [];
    var data = [];
    if(item.isRequestSuccess){
        for(var i in item.comments)
        {
            data.push({
                key: item.comments[i].Id,
                Bodys: item.comments[i].Body,
                Author: item.comments[i].Author,
                DateAdded: item.comments[i].DateAdded,
                AuthorUrl: item.comments[i].AuthorUrl,
                FaceUrl: item.comments[i].FaceUrl,
            });
            var isIn = false;
            for(var author of Authors){
                if(author.Author === item.comments[i].Author){
                    isIn = true;
                    break;
                }
            }
            if(!isIn){
                Authors.push({
                    Author:item.comments[i].Author,
                    FaceUrl: item.comments[i].FaceUrl
                });
            }
        }
    }
    var tempVar = {
        Authors: Authors,
        data: data
    }
    return tempVar;
}

module.exports = getComments;