import mongoose from 'mongoose';
import Promise from 'bluebird';
import imageUploadSchema from './image-upload.model';
import _ from 'lodash';

imageUploadSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    imageUpload
    .find(_query)
    .select('-imageBase64')
    .sort({uploadedAt: 'desc'})
    .exec(function(err, todos) {
      err ? reject(err)
      : resolve(todos);
    });
  });
}

imageUploadSchema.statics.createNew = (uploadObject) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(uploadObject)) {
        return reject(new TypeError('imageUpload is not a valid object.'));
      }
      var _something = new imageUpload(uploadObject);
      _something.save(function(err, saved) {
        err ? reject(err)
        : resolve(saved);
      });
    });
}

imageUploadSchema.statics.getById = (id, includeImage) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    var img = imageUpload.findById(id);
    if (!includeImage) img.select("-imageBase64");
    img.exec(function(err, result) {
      err ? reject(err)
      : resolve(result);
    });
  });
}

imageUploadSchema.statics.removeById = (id) => {

  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    imageUpload
    .findByIdAndRemove(id)
    .exec(function(err, deleted) {
      err ? reject(err)
      : resolve();
    });
  });
}

const imageUpload = mongoose.model('imageUpload', imageUploadSchema);

export default imageUpload;
