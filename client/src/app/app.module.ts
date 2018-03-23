import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { ImagesModule } from './images/images.module';
import { TabsetComponent } from './tabset/tabset.component';



@NgModule({
  declarations: [
    AppComponent,
    TabsetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ImagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
