import { Component, OnInit } from '@angular/core';
import { ImageHistoryService } from '../service/image-history.service';
import { UploadedImage } from '../uploaded-image';
import { ImageDetailComponent } from '../image-detail/image-detail.component';


@Component({
  selector: 'app-image-history',
  templateUrl: './image-history.component.html',
  styleUrls: ['./image-history.component.css']
})
export class ImageHistoryComponent implements OnInit {

  uploadHistory: UploadedImage[];

  constructor(
    private imageHistService: ImageHistoryService,
    private imageDetail:ImageDetailComponent
  ) { }

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

  showDetail (recordToShow: UploadedImage):void{
    this.imageDetail.open(recordToShow);
  }

}
