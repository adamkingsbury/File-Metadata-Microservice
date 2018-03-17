import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


import {UploadedImage} from '../uploaded-image';
import { ImageHistoryService } from '../service/image-history.service';

@Component({
  selector: 'app-image-detail',
  encapsulation: ViewEncapsulation.None,
  template: ''
})
export class ImageDetailComponent {

  constructor(
    private modalService: NgbModal,
    private historyService: ImageHistoryService
  ) { }


  @Output() onDeletion = new EventEmitter<string>();
  detailKey: string;

  open(content: UploadedImage): void {

    const modalRef = this.modalService.open(
      ImageDetailContent,
      { windowClass: 'image-detail-modal modal-dialog-centered', size: 'lg' }
    );

    //load and populate the modal contents using the api service
    this.detailKey = content._id;
    this.historyService.getUploadRecordById(this.detailKey, true)
      .subscribe(rec => {
        modalRef.componentInstance.displayRecord = rec;
      });

    //listen for modal close, check if the delete button was used and delete if needed
    const me = this;
    modalRef.result.then(
      function(closeResult) {
        if (closeResult === 'Delete Click') {
          me.historyService
            .deleteUploadRecordById(me.detailKey)
            .subscribe(function(){
              me.onDeletion.emit(me.detailKey);
          });
        }
      }
    );
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailContent {
  @Input() displayRecord: UploadedImage;
  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {};

  showSafeUrlEncoding() {
    return this.sanitizer.bypassSecurityTrustUrl(this.displayRecord.imageBase64);
  }
}
