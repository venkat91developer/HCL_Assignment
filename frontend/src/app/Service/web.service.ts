import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class WebService {
    private apiUrl = env.NODE_URL;
  
    constructor(private http: HttpClient) {}
  
    addProgram(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}programs`, data);
    }
    getProgram(): Observable<any> {
      return this.http.get(`${this.apiUrl}programs`);
    }
    updateProgram(data:FormData,id:any): Observable<any> {
      return this.http.put(`${this.apiUrl}programs/${id}`, data);
    }
    deleteProgram(id:any): Observable<any> {
      return this.http.delete(`${this.apiUrl}programs/${id}`);
    }
    addParticipant(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}programs/participant`, data);
    }
    getParticipant(): Observable<any> {
      return this.http.get(`${this.apiUrl}programs/participant`);
    }
    updateParticipant(data:FormData,id:any): Observable<any> {
      return this.http.put(`${this.apiUrl}programs/participant/${id}`, data);
    }
    deleteParticipant(id:any): Observable<any> {
      return this.http.delete(`${this.apiUrl}programs/${id}`);
    }
}

