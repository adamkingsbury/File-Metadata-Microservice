
export class UploadedImage {
	fileType: string;
  _id: string;
  __v: string;
  uploadedAt: string;
  filename: string;
  fileSize: number;
  dimensions: {
    width: number,
    height: number
  };
  imageBase64: string;
}
