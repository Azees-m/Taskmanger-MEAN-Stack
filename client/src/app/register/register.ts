import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  name='';
  email = '';
  password = '';
  confirmpassword = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

onRegister(form: any) {

if (form.invalid || this.password !== this.confirmpassword) {
  this.toastr.warning('Please fix the form errors');
  return;
}

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.register(this.name,this.email, this.password )
    .subscribe({
      next: (res) => {
        const msg = res?.message || "Register sucess"
        this.isLoading = false;
        this.toastr.success(msg);
        this.router.navigate(['/login']);
        sessionStorage.setItem("username",res.name);
      },
      error: (err) => {
  this.isLoading = false;

  const msg =
    err?.error?.message ||   // ✅ backend message
    err?.error ||           // fallback
    "Registration failed";

  this.errorMessage = msg;

  this.toastr.error(msg);   // ✅ SHOW IN UI
  form.resetForm({
    email: "",          // keep values
    password: "",
    confirmpassword: ""
  });
}
    });
}
}
