import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports:[CommonModule,FormsModule],
  standalone:true,
  template: ``,
  styles: []
})
export class AppComponent implements OnInit {
  participants: any[] = [];
  newParticipant = { name: '', age: null, email: '', dateJoined: '', medicalResearchProgram: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadParticipants();
  }

  loadParticipants() {
    // this.http.get<any[]>('http://localhost:3000/participants').subscribe(data => this.participants = data);
  }

  addParticipant() {
    this.http.post('http://localhost:3000/participants', this.newParticipant).subscribe(() => {
      this.loadParticipants();
      this.newParticipant = { name: '', age: null, email: '', dateJoined: '', medicalResearchProgram: '' };
    });
  }

  deleteParticipant(id: string) {
    this.http.delete(`http://localhost:3000/participants/${id}`).subscribe(() => this.loadParticipants());
  }
}
