import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HouseFeature } from '../models/house-feature';

@Injectable({
  providedIn: 'root'
})
export class HouseFeatureService {

  private apiUrl = `${environment.apiUrl}/houseFeatures`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<HouseFeature[]> {
    return this.http.get<HouseFeature[]>(`${this.apiUrl}`);
  }

  public findHouseFeatureById(featureId: number): Observable<HouseFeature> {
    return this.http.get<HouseFeature>(`${this.apiUrl}/${featureId}`)
  }

  public createHouseFeature(houseFeature: HouseFeature): Observable<HouseFeature> {
    return this.http.post<HouseFeature>(`${this.apiUrl}`, houseFeature);
  }

  public updateHouseFeature(featureId: number, houseFeature: HouseFeature): Observable<HouseFeature> {
    return this.http.put<HouseFeature>(`${this.apiUrl}/${featureId}`, houseFeature);
  }

  public deleteHouseFeature(featureId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${featureId}`);
  }
}
