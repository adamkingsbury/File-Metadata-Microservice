'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageUpload2 = require('./image-upload.dao');

var _imageUpload3 = _interopRequireDefault(_imageUpload2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sizeOf = require('image-size');
var fs = require('fs');
var FileAPI = require('file-api'),
    File = FileAPI.File,
    FileReader = FileAPI.FileReader;

var ImageUploadController = function () {
  function ImageUploadController() {
    _classCallCheck(this, ImageUploadController);
  }

  _createClass(ImageUploadController, null, [{
    key: 'getAll',
    value: function getAll(req, res) {
      _imageUpload3.default.getAll().then(function (imageUploads) {
        return res.status(200).json(imageUploads);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'createNew',
    value: function createNew(req, res) {
      var fPath = process.cwd() + "/" + req.file.destination + req.file.filename;

      //calculate the dimensions of the file
      sizeOf(fPath, function (err, dimensions) {
        console.log('Processing Dimensions');
        if (err) return finaliseResponse(400, err);

        req.file.dimensions = dimensions;

        var fileReader = new FileReader();
        fileReader.readAsDataURL(new File(fPath));

        fileReader.addEventListener('error', function (err) {
          finaliseResponse(400, err);
        });

        fileReader.addEventListener('load', function (loadVals) {
          console.log(loadVals);
          var data = loadVals.target.result;
          buildResponse(null, data);
        });
      });

      var buildResponse = function buildResponse(err, fileData) {
        console.log('Building response');
        if (err) return finaliseResponse(400, err);

        //build the mongo object
        var _imageUpload = {
          filename: req.file.originalname,
          fileSize: req.file.size,
          imageBase64: fileData,
          dimensions: {
            width: req.file.dimensions.width,
            height: req.file.dimensions.height
          }
        };

        //Write the record to the database
        _imageUpload3.default.createNew(_imageUpload).then(function (result) {
          var objResult = result.toObject();
          delete objResult.imageBase64;
          finaliseResponse(201, objResult);
        }).catch(function (error) {
          return finaliseResponse(400, error);
        });
      };

      var finaliseResponse = function finaliseResponse(status, json) {
        console.log('finalising response');
        console.log(json);
        //always clear out the temporary file
        fs.unlink(req.file.destination + req.file.filename, function () {
          //now send the buildResponse
          res.status(status).json(json);
        });
      };
    }
  }, {
    key: 'getById',
    value: function getById(req, res) {
      var _id = req.params.id;
      var includeImage = req.query.includeImage === "true";

      _imageUpload3.default.getById(_id, includeImage).then(function (findResult) {
        return res.status(200).json(findResult);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'removeById',
    value: function removeById(req, res) {
      var _id = req.params.id;

      _imageUpload3.default.removeById(_id).then(function () {
        return res.status(200).end();
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }]);

  return ImageUploadController;
}();

exports.default = ImageUploadController;
//# sourceMappingURL=image-upload.controller.js.map