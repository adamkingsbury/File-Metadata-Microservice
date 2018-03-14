import mongoose from 'mongoose';

const _imageUploadSchema = {
  filename: {type: String, required: true},
  fileSize: {type: Number},
  imgBinary: {type: Buffer },
  uploadedAt: {type: Date, default: Date.now},
  dimensions: {
    width: {type: Number},//, required: true},
    height: {type: Number}//, required: true}
  }
}

export default mongoose.Schema(_imageUploadSchema, { bufferCommands: false });
