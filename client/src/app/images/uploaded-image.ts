import Buffer from "Buffer";

export class UploadedImage {
  _id: string;
  __v: string;
  uploadedAt: string;
  filename: string;
  fileSize: number;
  dimensions: {
    width: number,
    height: number
  };
  image: Buffer;
}
