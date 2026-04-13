import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,   // ✅ REQUIRED for *ngIf
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService
  ) {}

onLogin(form: any) {

  // ✅ Prevent invalid submit
  if (form.invalid) {
    this.toastr.warning('Please fill all fields correctly');
    return;
  }

  this.isLoading = true;

  this.authService.login(this.email, this.password)
    .subscribe({
      next: (res) => {
        this.isLoading = false;

        const msg = res?.message || "Login successful";

        this.toastr.success(msg);

        // 👉 Save token (important)
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('username',res.name)
        console.log("LOGIN RESPONSE:", res);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;

        const msg =
          err?.error?.message ||
          "Invalid email or password";

        this.toastr.error(msg);

        // ✅ Reset form state (fix your previous issue)
        form.resetForm({
          email: this.email,
          password: this.password
        });
      }
    });
}
}




