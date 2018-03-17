import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UploadedImage } from '../uploaded-image';

@Injectable()
export class ImageHistoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<UploadedImage[]> {
    const getAllUrl = 'api/image-upload';
    return this.http.get<UploadedImage[]>(getAllUrl);
  }


  getUploadRecordById(id: string, includeImage?: boolean): Observable<UploadedImage> {
    const getByIdUrl = 'api/image-upload';

    let callUrl = getByIdUrl + `/${id}`;
    if (includeImage) callUrl += '?includeImage=true';

    return this.http.get<UploadedImage>(callUrl);
  }

  deleteUploadRecordById(id: string): Observable<Object> {
    const deleteByIdUrl = 'api/image-upload';
    let callUrl = deleteByIdUrl + `/${id}`;
    return this.http.delete(callUrl);
  }

}
