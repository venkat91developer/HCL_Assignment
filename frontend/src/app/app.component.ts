import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports:[CommonModule,FormsModule],
  standalone:true,
  template: `
    <h1>Research Participants</h1>
    <form (submit)="addParticipant()">
      <input [(ngModel)]="newParticipant.name" placeholder="Name" required [ngModelOptions]="{standalone: true}">
      <input [(ngModel)]="newParticipant.age" type="number" placeholder="Age" required [ngModelOptions]="{standalone: true}">
      <input [(ngModel)]="newParticipant.email" type="email" placeholder="Email" required [ngModelOptions]="{standalone: true}">
      <input [(ngModel)]="newParticipant.dateJoined" type="date" required [ngModelOptions]="{standalone: true}">
      <input [(ngModel)]="newParticipant.medicalResearchProgram" placeholder="Program" required [ngModelOptions]="{standalone: true}">
      <button type="submit">Add Participant</button>
    </form>
    
    <ul>
      <li *ngFor="let participant of participants">
        {{ participant.name }} - {{ participant.age }} - {{ participant.email }}
        <button (click)="deleteParticipant(participant._id)">Delete</button>
      </li>
    </ul>
  `,
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
    this.http.get<any[]>('http://localhost:3000/participants').subscribe(data => this.participants = data);
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
