import ImageUploadController from './image-upload-controller';
import multer from 'multer';

//set multer storage to in memory
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

export default class image-uploadRoutes {
  static init(router) {
    router
      .route('/api/image-upload')
      .get(ImageUploadController.getAll)
      .post(upload.single('image'))
      .post(ImageUploadController.createNew);

    router
      .route('/api/image-upload/:id')
      .delete(ImageUploadController.removeById);
  }
}
