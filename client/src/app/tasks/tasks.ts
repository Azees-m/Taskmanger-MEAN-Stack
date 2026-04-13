import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  view: 'dashboard' | 'create' = 'dashboard';

setView(v: any) {
  this.view = v;
}
  isLoading = false;
  
  title = '';
  priority = 'medium';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastr:ToastrService,
    private cd:ChangeDetectorRef,
    private confirm:ConfirmService
  ) {}

  ngOnInit() {
    this.fetchTasks();
  }

  trackById(index: number, task: any) {
  return task._id;
}
  // GET tasks
fetchTasks() {
  this.isLoading = true;

  this.taskService.getTasks().subscribe({
    next: (res: any) => {
      console.log("Api responce",res)
      this.tasks = res; // ✅ flexible fix
      this.isLoading = false;
      this.cd.detectChanges();
    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);
    }
  });
}

  // ADD task

  // MARK DONE
markAsDone(taskId: string) {
  this.confirm.open(
    "Mark Done",
    "Mark this task as completed?",
    () => {
      this.taskService.updateTask(taskId, { status: 'done' })
        .subscribe(() => {
          const task = this.tasks.find(t => t._id === taskId);
          if (task) task.status = 'done';
        });
    }
  );
}

  // DELETE task
deleteTask(taskId: string) {
  this.confirm.open(
    "Delete Task",
    "Are you sure you want to delete?",
    () => {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter(t => t._id !== taskId);
      });
    }
  );
}
}
