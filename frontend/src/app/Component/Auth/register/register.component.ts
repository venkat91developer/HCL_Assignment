import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import { RegisterUserIF } from '../../../Interface/common.interface';
import { AlertService } from '../../../Service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailExists = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private Service: WebService,
    private Alert: AlertService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  register() {
    if (this.registerForm.valid) {
      const data: RegisterUserIF = {
        username: this.registerForm.get('email')?.value || "",
        password: this.registerForm.get('password')?.value || "",
        fullname: this.registerForm.get('name')?.value || ""
      };

      // Check if email exists before proceeding
      this.Service.checkEmailExists(data.username).subscribe((response: any) => {
        if (response.exists) {
          this.emailExists = true;
          this.Alert.error("This email is already registered.");
        } else {
          this.emailExists = false;
          this.Service.registerUser(data).subscribe(async (res: any) => {
            if (res.success) {
              await this.Alert.success(res.message);
              this.router.navigateByUrl('login');
            } else {
              this.Alert.error(res.message);
            }
          });
        }
      });
    } else {
      this.Alert.error("Please fill in all required fields correctly.");
    }
  }

  // Custom Validator: Checks if password and confirmPassword match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }
}
