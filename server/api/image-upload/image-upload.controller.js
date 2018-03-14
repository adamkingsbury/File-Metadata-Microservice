import ImageUploadDao from './image-upload.dao';
var sizeOf = require('image-size');
var fs = require('fs');

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

      //now read in the file so that it can be sent to mongo as imgBinary
      fs.readFile(fPath, buildResponse)
    });

    let buildResponse = function (err, fileData){
      console.log('Building response')
      if (err) return finaliseResponse(400,err);

      //build the mongo object
      let _imageUpload = {
        filename: req.file.originalname,
        fileSize: req.file.size,
        imgBinary: fileData,
        dimensions: {
          width: req.file.dimensions.width,
          height: req.file.dimensions.height
        }
      };

      // finaliseResponse(200, {response: "I would send the mongo call now"})
      ImageUploadDao
        .createNew(_imageUpload)
        .then((result) => {
          let objResult = result.toObject();
          delete objResult.imgBinary;
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

    ImageUploadDao
      .getById(_id)
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
