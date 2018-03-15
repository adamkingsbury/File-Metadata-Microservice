import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { ImageHistoryComponent } from './images/image-history/image-history.component';
import { ImageHistoryService } from './images/service/image-history.service';
import { ImageDetailComponent } from './images/image-detail/image-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageHistoryComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ImageHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
