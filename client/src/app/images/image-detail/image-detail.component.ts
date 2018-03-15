import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {UploadedImage} from '../uploaded-image';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-detail',
  encapsulation: ViewEncapsulation.None,
  template: ''
})
export class ImageDetailComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content:UploadedImage): void {
    console.log("Image Detail Open Triggered");
    console.log(JSON.stringify(content));

    const modalRef = this.modalService.open(
      ImageDetailContent,
      { windowClass: 'image-detail-modal modal-dialog-centered' }
    );

    modalRef.componentInstance.displayRecord = content;
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
  constructor(public activeModal: NgbActiveModal) {};
}
