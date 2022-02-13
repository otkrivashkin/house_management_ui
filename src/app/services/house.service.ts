import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { House } from '../models/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private apiUrl = `${environment.apiUrl}/houses`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<House[]> {
    return this.http.get<House[]>(`${this.apiUrl}`);
  }

  public findHouseById(houseId: number): Observable<House> {
    return this.http.get<House>(`${this.apiUrl}/${houseId}`)
  }

  public createHouse(house: House): Observable<House> {
    return this.http.post<House>(`${this.apiUrl}`, house);
  }

  public updateHouse(houseId: number, house: House): Observable<House> {
    return this.http.put<House>(`${this.apiUrl}/${houseId}`, house);
  }

  public deleteHouse(houseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${houseId}`);
  }
}
