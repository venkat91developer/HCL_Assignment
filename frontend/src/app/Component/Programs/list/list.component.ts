import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProgramListComponent {
  programs: Program[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    this.http.get<Program[]>('/api/programs').subscribe((data) => {
      this.programs = data;
      this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    });
  }

  deleteProgram(id: string) {
    this.http.delete(`/api/programs/${id}`).subscribe(() => {
      this.programs = this.programs.filter((p) => p.id !== id);
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
