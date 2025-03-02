import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from '../../../Service/web.service';
import { AlertService } from '../../../Service/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private Service: WebService,
    private Alert: AlertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.get('email')?.value || "",
        password: this.loginForm.get('password')?.value || "",
      };

      this.Service.login(loginData).subscribe((data: any) => {
        //&& response.token
        if (data.success ) {
          const response = data.payload[0]
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('accessToken',response.accessToken)
          localStorage.setItem('refreshToken',response.refreshToken)
          
          this.Alert.success("Login successful!");
          this.router.navigateByUrl('/program');
        } else {
          this.Alert.error(data.message || "Invalid credentials.");
        }
      }, error => {
        this.Alert.error("Something went wrong. Please try again.");
      });
    } else {
      this.Alert.error("Please fill in all required fields correctly.");
    }
  }
}
