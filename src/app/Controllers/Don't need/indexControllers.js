const fs = require('fs');
const path = require('path');

module.exports = app =>{

    fs  
        .readFileSync(__dirname)
        .filter(file =>((file.indexOf('.')) !== 0 &&  (file !== "indexControllers.js")))
        .forEach(file => require(path.resolve(__dirname, file))(app))
}