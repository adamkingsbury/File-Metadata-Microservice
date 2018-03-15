import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ImageHistoryComponent } from './image-history/image-history.component';
import { ImageHistoryService } from './image-history/image-history.service';
import { ImageDetailComponent } from './images/image-detail/image-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageHistoryComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ImageHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
