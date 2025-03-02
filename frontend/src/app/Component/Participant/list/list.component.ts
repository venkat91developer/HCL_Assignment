import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';

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
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ParticipantListComponent implements OnInit {
  participants: Participant[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private service: WebService) {}

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.service.getParticipant().subscribe((data: any) => {
      if (data.success) {
        this.participants = data.payload;
        this.totalPages = Math.ceil(this.participants.length / this.itemsPerPage);
      }
    });
  }

  deleteParticipant(id: string) {
    this.service.deleteParticipant(id).subscribe(() => {
      this.participants = this.participants.filter((p) => p.id !== id);
      this.totalPages = Math.ceil(this.participants.length / this.itemsPerPage);
      
      // Adjust current page if the last item on the last page is removed
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
