import { Component } from '@angular/core';
import {UploadedImage} from '../uploaded-image';
import { ImageHistoryService } from '../service/image-history.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  constructor(private imageHistService: ImageHistoryService) { }

  fileInputText: string = "Choose image file";
  validateTypeWarning: boolean = false;
  validateCountWarning: boolean = false;
  uploadDisabled: boolean = true;
  validExts: string[] = ['jpg', 'jpeg', 'png', 'gif'];
  formData: FormData;
  selectedFile: File;
  uploadResult: UploadedImage;

  validateSelection(event): void{
    let files: FileList = event.target.files;
    console.log(files[0]);

    //Reset the checks before proceeding
    this.fileInputText = "Choose image file";
    this.validateTypeWarning = false;
    this.validateCountWarning = false;
    this.uploadDisabled = true;
    this.formData = undefined;
    this.selectedFile = undefined;
    this.uploadResult = undefined;

    if (files.length > 0){
      let fName:string = files[0].name;
      let ext = fName.substring(fName.lastIndexOf('.') + 1).toLowerCase();
      console.log(`ext: ${ext}`);
      console.log(`valid extension: ${this.validExts.includes(ext)}`);

      if (files.length > 1) {
        this.validateCountWarning = true;
      }
      else {
        this.fileInputText = fName;
        if (!this.validExts.includes(ext)) this.validateTypeWarning = true;
        if (!this.validateTypeWarning && !this.validateCountWarning) {

          this.selectedFile = files[0];
          this.uploadDisabled = false;
        }
      }
    }
  }

  submitTheFile(): void{

    const _this = this;

    if (this.selectedFile) {
      let fd = new FormData();
      fd.append('image', _this.selectedFile, _this.selectedFile.name);

      _this.imageHistService.uploadRecord(fd).subscribe(function (result) {

        //setup the dimensions record from the returned result
        _this.uploadResult = result;

        //now read the file as url data on the client side to reduce server bandwidth
        let reader = new FileReader();
        reader.readAsDataURL(_this.selectedFile);
        reader.addEventListener("load", function () {
          _this.uploadResult.imageBase64 = <string>reader.result;
        }, false);
      });
    }
  }



}
