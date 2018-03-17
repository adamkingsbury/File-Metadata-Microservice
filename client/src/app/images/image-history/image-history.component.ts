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
    const me = this;
    this.getHistory();
    this.imageDetail.onDeletion.subscribe(function(deleteId){
      me.deleteRecord(deleteId);
    });
  }

  getHistory():void {
    this.imageHistService.getAll()
      .subscribe(data => {
        this.uploadHistory = data;
      });
  }

  showDetail (recordToShow: UploadedImage):void{
    this.imageDetail.open(recordToShow);
  }

  deleteRecord (deleteId: string): void {
    console.log('A delete event was recieved....quickly deleting');
    console.log(`original length: ${this.uploadHistory.length}`);
    // quickly delete the value on client side
    this.uploadHistory = this.uploadHistory.filter((rec: UploadedImage) => {
      return rec._id !== deleteId;
    });
    console.log(`new length: ${this.uploadHistory.length}`);


    //more slowly refresf the list from server.
    console.log('now more slowly refreshing')
    this.getHistory();
  }
}
