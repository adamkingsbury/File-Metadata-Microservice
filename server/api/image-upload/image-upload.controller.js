import ImageUploadDao from './image-upload.dao';
var sizeOf = require('image-size');
var fs = require('fs');
var FileAPI = require('file-api')
  , File = FileAPI.File
  , FileReader = FileAPI.FileReader;

export default class ImageUploadController {




  static getAll(req, res) {
    ImageUploadDao
      .getAll()
      .then(imageUploads => res.status(200).json(imageUploads))
      .catch(error => res.status(400).json(error));
  }





  static createNew(req, res) {
    let fPath = process.cwd() + "/" + req.file.destination + req.file.filename;

    //calculate the dimensions of the file
    sizeOf(fPath, function (err, dimensions) {
      console.log('Processing Dimensions')
      if (err) return finaliseResponse(400,err);

      req.file.dimensions = dimensions;

      var fileReader = new FileReader();
      fileReader.readAsDataURL(new File(fPath));

      fileReader.addEventListener('error', function (err){
        finaliseResponse(400,err)
      });

      fileReader.addEventListener('load', function (loadVals) {
        console.log(loadVals);
        let data = loadVals.target.result;
        buildResponse(null, data);
      });
    });

    let buildResponse = function (err, fileData){
      console.log('Building response')
      if (err) return finaliseResponse(400,err);

      //build the mongo object
      let _imageUpload = {
        filename: req.file.originalname,
        fileSize: req.file.size,
        imageBase64: fileData,
        dimensions: {
          width: req.file.dimensions.width,
          height: req.file.dimensions.height
        }
      };

      //Write the record to the database
      ImageUploadDao
        .createNew(_imageUpload)
        .then((result) => {
          let objResult = result.toObject();
          delete objResult.imageBase64;
          finaliseResponse(201, objResult);
        })
        .catch(error => finaliseResponse(400, error));
    }


    let finaliseResponse = function (status, json) {
      console.log('finalising response');
      console.log(json);
      //always clear out the temporary file
      fs.unlink(req.file.destination + req.file.filename, function (){
        //now send the buildResponse
        res.status(status).json(json);
      });
    }

  }





  static getById(req, res) {
    let _id = req.params.id;
    let includeImage = req.query.includeImage === "true";

    ImageUploadDao
      .getById(_id, includeImage)
      .then((findResult) => res.status(200).json(findResult))
      .catch(error => res.status(400).json(error));
  }








  static removeById(req, res) {
    let _id = req.params.id;

    ImageUploadDao
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
