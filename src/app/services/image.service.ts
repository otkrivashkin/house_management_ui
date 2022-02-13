import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${ environment.apiUrl }/images`;

  constructor(private http: HttpClient) {
  }

  public uploadImage(file: File): Observable<number> {
    const formData = new FormData();
    formData.set('file', file, file.name);

    return this.http.post<number>(`${this.apiUrl}/uploadImage`, formData);
  }

  public uploadImages(files: File[]): Observable<number[]> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }

    return this.http.post<number[]>(`${this.apiUrl}/uploadImages`, formData);
  }
}
