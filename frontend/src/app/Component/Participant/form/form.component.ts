import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import { AlertService } from '../../../Service/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,RouterModule]
})
export class ParticipantFormComponent implements OnInit {
  participantForm: FormGroup;
  participantId: string | null = null;
  programs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private Service: WebService,
    private Alert: AlertService,
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
      this.getParticipantById(this.participantId);
    }
  }

  fetchPrograms() {
    this.Service.getProgram().subscribe((data: any) => {
      if(data.success){
        this.programs = data.payload;
      } else {
        this.programs = []
      }
    }, error => {
      this.Alert.error("Failed to load research programs.");
    });
  }

  getParticipantById(id: string) {
    this.Service.getParticipantById(id).subscribe((data: any) => {
      this.participantForm.patchValue(data);
    }, error => {
      this.Alert.error("Failed to fetch participant details.");
    });
  }

  saveParticipant() {
    if (this.participantForm.valid) {
      const formData = this.participantForm.value;      
      if (this.participantId) {
        this.Service.updateParticipant(formData,this.participantId).subscribe(async () => {
          await this.Alert.success("Participant updated successfully!");
          this.router.navigate(['/participant']);
        }, error => {
          this.Alert.error("Failed to update participant.");
        });
      } else {
        this.Service.addParticipant(formData).subscribe(async () => {
          await this.Alert.success("Participant added successfully!");
          this.router.navigate(['/participant']);
        }, error => {
          this.Alert.error("Failed to add participant.");
        });
      }
    } else {
      this.Alert.error("Please fill all required fields correctly.");
    }
  }
}
