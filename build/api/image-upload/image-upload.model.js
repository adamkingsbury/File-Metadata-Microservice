'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _imageUploadSchema = {
  filename: { type: String, required: true },
  fileSize: { type: Number },
  imageBase64: { type: String },
  uploadedAt: { type: Date, default: Date.now, index: true },
  dimensions: {
    width: { type: Number }, //, required: true},
    height: { type: Number //, required: true}
    } }
};

exports.default = _mongoose2.default.Schema(_imageUploadSchema, { bufferCommands: false });
//# sourceMappingURL=image-upload.model.js.map