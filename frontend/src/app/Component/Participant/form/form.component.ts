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
export class ParticipantFormComponent {
  participantForm: FormGroup;
  participantId: string | null = null;
  programs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.participantForm = this.fb.group({
      programId: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      enrollmentDate: ['', Validators.required],
      medicalReport: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchPrograms();
    this.participantId = this.route.snapshot.paramMap.get('id');
    if (this.participantId) {
      this.http.get(`/api/participants/${this.participantId}`).subscribe((data: any) => {
        this.participantForm.patchValue(data);
      });
    }
  }

  fetchPrograms() {
    this.http.get('/api/programs').subscribe((data: any) => {
      this.programs = data;
    });
  }

  saveParticipant() {
    if (this.participantForm.valid) {
      if (this.participantId) {
        this.http.put(`/api/participants/${this.participantId}`, this.participantForm.value).subscribe(() => {
          this.router.navigate(['/participants']);
        });
      } else {
        this.http.post('/api/participants', this.participantForm.value).subscribe(() => {
          this.router.navigate(['/participants']);
        });
      }
    }
  }

}
