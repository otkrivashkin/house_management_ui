import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = `${environment.apiUrl}/skills`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}`);
  }

  public findSkillById(skillId: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${skillId}`)
  }

  public createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}`, skill);
  }

  public updateSkill(skillId: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${skillId}`, skill);
  }

  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${skillId}`);
  }
}
