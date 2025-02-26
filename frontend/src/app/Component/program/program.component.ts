import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../Service/web.service';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [],
  templateUrl: './program.component.html',
  styleUrl: './program.component.scss'
})
export class ProgramComponent {
  programForm: FormGroup;
  loading = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private programService: WebService) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.programForm.invalid) return;
    this.loading = true;
    const formData = new FormData();
    Object.entries(this.programForm.value).forEach(([key, value]) => formData.append(key, value as string));
    if (this.selectedFile) formData.append('fileAttachment', this.selectedFile);

    this.programService.addProgram(formData).subscribe(
      () => { this.loading = false; alert('Program added successfully!'); },
      () => { this.loading = false; alert('Error adding program'); }
    );
  }
}
