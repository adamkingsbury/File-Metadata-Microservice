import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageDetailComponent, ImageDetailContent } from './image-detail/image-detail.component';
import { ImageHistoryComponent } from './image-history/image-history.component';
import { ImageHistoryService } from './service/image-history.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageDetailComponent, ImageDetailContent, //These two are found in the same file
    ImageHistoryComponent, ImageUploadComponent
  ],
  entryComponents: [ImageDetailContent],
  providers: [ImageHistoryService, ImageDetailComponent],
  exports: [
    ImageDetailComponent,
    ImageHistoryComponent,
    ImageUploadComponent
  ]
})

export class ImagesModule { }
