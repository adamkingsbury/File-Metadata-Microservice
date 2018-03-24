'use strict';

var _imageUpload = require('../api/image-upload/image-upload.controller');

var _imageUpload2 = _interopRequireDefault(_imageUpload);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();


//setup multer to write to a temporary file location
var storage = { dest: 'tmp-uploads/' };
var upload = (0, _multer2.default)(storage);

//Routes
router.route('/').get(_imageUpload2.default.getAll).post(upload.single('image')).post(_imageUpload2.default.createNew);

router.route('/:id').get(_imageUpload2.default.getById).delete(_imageUpload2.default.removeById);

module.exports = router;
//# sourceMappingURL=image-upload.js.map