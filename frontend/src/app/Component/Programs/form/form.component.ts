import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebService } from '../../../Service/web.service';
import { AlertService } from '../../../Service/alert.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
    private Service: WebService,
    private Alert: AlertService
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    if (this.programId) {
      this.Service.getProgramById(this.programId).subscribe((data: any) => {
        if (data.success && data.payload.length > 0) {
          this.programForm.patchValue(data.payload[0]);
        }
      });
    }
  }

  saveProgram() {
    if (this.programForm.valid) {
      const programData = this.programForm.value;

      if (this.programId) {
        // Update existing program
        this.Service.updateProgram(programData, this.programId).subscribe(() => {
          this.Alert.success('Program updated successfully');
          this.router.navigate(['/program']);
        });
      } else {
        // Add new program using WebService
        this.Service.addProgram(programData).subscribe(
          (data) => {
            if (data.success) {
              this.Alert.success('Success', data.message);
              this.router.navigate(['/program']);
            } else {
              this.Alert.error('Failed to add program')
            }
          },
          (error) => {
            this.Alert.error(JSON.stringify(error));
          }
        );
      }
    }
  }
}
