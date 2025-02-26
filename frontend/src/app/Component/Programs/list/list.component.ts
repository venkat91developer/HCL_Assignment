import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import Swal from 'sweetalert2';

interface Program {
  _id: string;
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

  constructor(private http: HttpClient,private Service:WebService) {}

  ngOnInit() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    this.Service.getProgram().subscribe(async (data) => {
      try {
        const response = data;
        if(response.success) {
          this.programs = response.payload;
        }
      } catch (error) {
        await Swal.fire('',JSON.stringify(error), 'error');
      }
    });
  }

  async deleteProgram(id: string) {
    if(id){
      Swal.fire({
        title: "Do you want to delete the record?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          this.Service.deleteProgram(id).subscribe(async (data) => {
            try {
              const response = data;
              console.log(response)
              if(response.success) {
                await Swal.fire('',response.message, 'success');
                this.fetchPrograms();
              }
            } catch (error) {
              await Swal.fire('',JSON.stringify(error), 'error');
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
