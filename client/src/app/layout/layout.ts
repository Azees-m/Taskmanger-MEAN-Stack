import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './layout.html',
  styleUrl:'./layout.css'
})
export class LayoutComponent {

  constructor(
    private router: Router,
    public confirmService:ConfirmService
  ){}

  username = '';

ngOnInit() {
  this.username = sessionStorage.getItem('username') || 'User';
}

logout() {
  this.confirmService.open(
    "Logout",
    "Are you sure?",
    () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  );
}
}