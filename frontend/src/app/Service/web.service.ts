import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {
    private apiUrl = 'http://localhost:3000/api/v1/';
  
    constructor(private http: HttpClient) {}
  
    addProgram(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}programs/add`, data);
    }
}

