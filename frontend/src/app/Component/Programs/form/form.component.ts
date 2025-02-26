import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private router: Router
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
      if (this.programId) {
        this.http.put(`/api/programs/${this.programId}`, this.programForm.value).subscribe(() => {
          this.router.navigate(['/programs']);
        });
      } else {
        this.http.post('/api/programs', this.programForm.value).subscribe(() => {
          this.router.navigate(['/programs']);
        });
      }
    }
  }
}
