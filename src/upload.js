
var AWS = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
AWS.config.update({
    accessKeyId: "AKIAIZCZC3VZZI5UYEEQ",
    secretAccessKey: "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"
  });
  
var s3 = new AWS.S3(); 


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'freelancebucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+"-"+file.originalname  )
    }
  })
})

const deleteFile =(request, response)=>{
  console.log(request.body.key)
  const key  = request.body.key
  var params = {
    Bucket: 'freelancebucket', 
    Key:  key

   };
   s3.deleteObject(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     response.send("ok")
   });
}



  module.exports={
    upload,
    deleteFile
  }

