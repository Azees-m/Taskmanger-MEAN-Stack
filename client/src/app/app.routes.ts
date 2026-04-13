import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { TasksComponent } from './tasks/tasks';
import { CreateTaskComponent } from './create-task/create-task'
import { LayoutComponent } from './layout/layout';

import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate:[authGuard], // 🔥 wrapper
    children: [
      { path: 'dashboard', component: TasksComponent },
      { path: 'create-task', component: CreateTaskComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
];
