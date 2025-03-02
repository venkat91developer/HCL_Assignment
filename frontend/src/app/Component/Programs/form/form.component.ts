import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
export class ProgramFormComponent implements OnInit {
  programForm: FormGroup;
  programId: string | null = null;
  minDate: any = new Date().toISOString().split('T')[0]; // Current date

  constructor(
    private fb: FormBuilder,
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

    // Ensure end date is always after start date
    this.programForm.get('startDate')?.valueChanges.subscribe(startDate => {
      this.programForm.get('endDate')?.setValidators([
        Validators.required,
        (control) => control.value > startDate ? null : { invalidEndDate: true }
      ]);
      this.programForm.get('endDate')?.updateValueAndValidity();
    });
  }

  saveProgram() {
    if (this.programForm.invalid) {
      this.Alert.error('All fields are required!');
      return;
    }

    const programData = this.programForm.value;

    if (programData.endDate <= programData.startDate) {
      this.Alert.error('End date must be after start date!');
      return;
    }

    if (this.programId) {
      this.Service.updateProgram(programData, this.programId).subscribe(() => {
        this.Alert.success('Program updated successfully');
        this.router.navigate(['/program']);
      });
    } else {
      this.Service.addProgram(programData).subscribe(
        (data) => {
          if (data.success) {
            this.Alert.success(data.message);
            this.router.navigate(['/program']);
          } else {
            this.Alert.error("Failed to add program");
          }
        },
        (error) => {
          this.Alert.error(JSON.stringify(error));
        }
      );
    }
  }
}
