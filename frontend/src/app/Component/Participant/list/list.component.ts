import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import Swal from 'sweetalert2';

interface Participant {
  _id: string;
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
 async deleteParticipant(id: string) {
    if(id){
      Swal.fire({
        title: "Do you want to delete the record?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteParticipant(id).subscribe(async (response) => {
            if(response.success) {
              await Swal.fire('',response.message, 'success');
              this.fetchParticipants();
            }
          });
        } 
      });
    }
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
