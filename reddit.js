const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

let redditPath = path.join(__dirname, './popular-articles.json');

let redditArray = [];

rp('https://reddit.com/r/popular.json')
.then(res => JSON.parse(res))
.then(data => {
    data.data.children.forEach(article => {
        
        let ext =(path.extname(article.data.url))
        if(ext === '.jpg' || ext === '.png') {
            let filname = (article.data.id + ext);
            rp(article.data.url, {encoding: 'base64'})
            .then(media => {
                fs.writeFile(path.join(__dirname, `./downloads/${filname}`), media,{encoding: 'base64'},(err) => {
                    if(err) console.log(err)
                })
            })


        }
        redditArray.push({
            title: article.data.title,
            author: article.data.author,
            url: article.data.url,
        })
    });
    let myJson = JSON.stringify(redditArray);
    fs.appendFileSync(redditPath,myJson);
});



