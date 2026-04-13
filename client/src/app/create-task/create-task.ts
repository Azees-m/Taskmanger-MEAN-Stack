import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.html',
  styleUrl:'./create-task.css'
})
export class CreateTaskComponent {

  title = '';
  description = '';
  priority = 'medium';
  status ="todo";
  dueDate : string="";
  

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  addTask() {
    if (!this.title.trim()) return;

    this.taskService.addTask({
       title: this.title,
       description: this.description,
    priority: this.priority,
    status: this.status,
    dueDate: this.dueDate

    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // 🔥 go back
      }
    });
  }
}