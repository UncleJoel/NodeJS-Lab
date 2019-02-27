const path = require('path');
const fs = require('fs');


var dataPath = path.join(__dirname, '../chirps.json');


fs.readFile(dataPath, (err, data) => {
    if(err) console.log(err);

    console.log(JSON.parse(data));
})