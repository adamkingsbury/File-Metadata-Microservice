'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _imageUpload = require('./image-upload.model');

var _imageUpload2 = _interopRequireDefault(_imageUpload);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_imageUpload2.default.statics.getAll = function () {
  return new _bluebird2.default(function (resolve, reject) {
    var _query = {};

    imageUpload.find(_query).select('-imageBase64').sort({ uploadedAt: 'desc' }).exec(function (err, todos) {
      err ? reject(err) : resolve(todos);
    });
  });
};

_imageUpload2.default.statics.createNew = function (uploadObject) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isObject(uploadObject)) {
      return reject(new TypeError('imageUpload is not a valid object.'));
    }
    var _something = new imageUpload(uploadObject);
    _something.save(function (err, saved) {
      err ? reject(err) : resolve(saved);
    });
  });
};

_imageUpload2.default.statics.getById = function (id, includeImage) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    var img = imageUpload.findById(id);
    if (!includeImage) img.select("-imageBase64");
    img.exec(function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};

_imageUpload2.default.statics.removeById = function (id) {

  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    imageUpload.findByIdAndRemove(id).exec(function (err, deleted) {
      err ? reject(err) : resolve();
    });
  });
};

var imageUpload = _mongoose2.default.model('imageUpload', _imageUpload2.default);

exports.default = imageUpload;
//# sourceMappingURL=image-upload.dao.js.map