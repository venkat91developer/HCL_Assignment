import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProgramFormComponent {
  programForm: FormGroup;
  programId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private Service:WebService
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    if (this.programId) {
      this.http.get(`/api/programs/${this.programId}`).subscribe((data: any) => {
        this.programForm.patchValue(data);
      });
    }
  }

  saveProgram() {
    if (this.programForm.valid) {
      const programData = {
        name: this.programForm.get('name')?.value,
        description: this.programForm.get('description')?.value,
        startDate: this.programForm.get('startDate')?.value,
        endDate: this.programForm.get('endDate')?.value,
        budget: this.programForm.get('budget')?.value
      };
  
      if (this.programId) {
        // Update existing program
        this.Service.updateProgram(programData,this.programId).subscribe(() => {
          this.router.navigate(['/program']);
        });
      } else {
        // Add new program using WebService
        this.Service.addProgram(programData).subscribe(async (data) => {
          try {
            const response = data;
            if(response.success) {
              await Swal.fire('',response.message, 'success');
              this.router.navigate(['/program']);
            }
          } catch (error) {
            await Swal.fire('',JSON.stringify(error), 'error');
          }
        });
      }
    }
  }
  
  
}
