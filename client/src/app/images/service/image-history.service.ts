import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UploadedImage } from '../uploaded-image';

@Injectable()
export class ImageHistoryService {

  constructor(private http: HttpClient) { }

  getAllUrl = 'api/image-upload';

  getAll(): Observable<UploadedImage[]> {
    return this.http.get<UploadedImage[]>(this.getAllUrl);
  }

}
