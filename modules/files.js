const fs = require('fs')
var path = require('path');
var filePath = path.resolve('./public/listdir/images');

module.exports={
  findAllPicture:function(){
    fs.readdir(filePath,function(err,files){
      if(err){
        return console.log(err)
      }
      console.log(files)
    })
  }
}