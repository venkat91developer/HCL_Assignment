import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Participant {
  id: string;
  programId: string;
  name: string;
  age: number;
  enrollmentDate: string;
  medicalReport: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  participants: Participant[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.http.get<Participant[]>('/api/participants').subscribe((data) => {
      this.participants = data;
      this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    });
  }

  deleteParticipant(id: string) {
    this.http.delete(`/api/participants/${id}`).subscribe(() => {
      this.participants = this.participants.filter((p) => p.id !== id);
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
