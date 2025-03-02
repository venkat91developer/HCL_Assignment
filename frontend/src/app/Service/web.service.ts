import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WebService {
    private apiUrl = env.NODE_URL;
  
    constructor(private http: HttpClient,private route:Router) {}
    gotoRoute(path:string){
      this.route.navigateByUrl(path);
    }
    addProgram(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}programs`, data);
    }
    getProgram(): Observable<any> {
      return this.http.get(`${this.apiUrl}programs`);
    }
    getProgramById(id:string): Observable<any> {
      return this.http.get(`${this.apiUrl}programs/${id}`);
    }
    updateProgram(data:any,id:string): Observable<any> {
      return this.http.put(`${this.apiUrl}programs/${id}`, data);
    }
    deleteProgram(id:string): Observable<any> {
      return this.http.delete(`${this.apiUrl}programs/${id}`);
    }
    addParticipant(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}participant`, data);
    }
    getParticipant(): Observable<any> {
      return this.http.get(`${this.apiUrl}participant`);
    }
    getParticipantById(id:string): Observable<any> {
      return this.http.get(`${this.apiUrl}participant/${id}`);
    }
    updateParticipant(data:FormData,id:string): Observable<any> {
      return this.http.put(`${this.apiUrl}participant/${id}`, data);
    }
    deleteParticipant(id:string): Observable<any> {
      return this.http.delete(`${this.apiUrl}participant/${id}`);
    }
    registerUser(data:any) {
      return this.http.post(`${this.apiUrl}user/createUser`,data);
    }
    checkEmailExists(email:any) {
      return this.http.get(`${this.apiUrl}user/checkEmail?email=${email}`);
    }
    login(data:any) {
      return this.http.post(`${this.apiUrl}auth/login`,data);
    }
    getUserInfo(id:string) {
      return this.http.get(`${this.apiUrl}user/getUser/${id}`);
    }
}

