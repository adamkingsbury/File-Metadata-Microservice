import mongoose from 'mongoose';

const _imageUploadSchema = {
  filename: {type: String, required: true},
  fileSize: {type: Number},
  imageBase64: {type: String },
  uploadedAt: {type: Date, default: Date.now},
  dimensions: {
    width: {type: Number},//, required: true},
    height: {type: Number}//, required: true}
  }
}

export default mongoose.Schema(_imageUploadSchema, { bufferCommands: false });
