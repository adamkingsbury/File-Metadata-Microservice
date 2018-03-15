import { Component, OnInit } from '@angular/core';
import { ImageHistoryService } from './image-history.service';
import { UploadedImage } from './uploaded-image';


@Component({
  selector: 'app-image-history',
  templateUrl: './image-history.component.html',
  styleUrls: ['./image-history.component.css']
})
export class ImageHistoryComponent implements OnInit {

  uploadHistory: UploadedImage[];

  constructor(private imageHistService: ImageHistoryService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory():void {
    console.log("requesting getHistory")
    this.imageHistService.getAll()
      .subscribe(data => {
        console.log("Got the http data");
        console.log(data);
        this.uploadHistory = data;
      });
  }

}
