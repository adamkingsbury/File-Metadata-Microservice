import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


import {UploadedImage} from '../uploaded-image';
import { ImageHistoryService } from '../service/image-history.service';

@Component({
  selector: 'app-image-detail',
  encapsulation: ViewEncapsulation.None,
  template: ''
})
export class ImageDetailComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private historyService: ImageHistoryService
  ) { }

  ngOnInit() {
  }

  open(content:UploadedImage): void {
    console.log("Image Detail Open Triggered");

    let lookupKey = content._id;
    this.historyService.getUploadRecordById(lookupKey, true)
      .subscribe(rec => {
        modalRef.componentInstance.displayRecord = rec;
      });

    const modalRef = this.modalService.open(
      ImageDetailContent,
      { windowClass: 'image-detail-modal modal-dialog-centered', size: 'lg' }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
