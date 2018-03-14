var express = require('express');
var router = express.Router();
import ImageUploadController from '../api/image-upload/image-upload.controller';
import multer from 'multer';


//setup multer to write to a temporary file location
var storage = {dest: 'tmp-uploads/'};
var upload = multer(storage);


//Routes
router
  .route('/')
  .get(ImageUploadController.getAll)
  .post(upload.single('image'))
  .post(ImageUploadController.createNew);


router
  .route('/:id')
  .get(ImageUploadController.getById)
  .delete(ImageUploadController.removeById);

module.exports = router;
