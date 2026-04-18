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
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.fetchTasks();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.fetchTasks();
  }
}
  // GET tasks
  
currentPage = 1;
itemsPerPage = 5;

selectedStatus = '';
selectedPriority = '';

totalPages = 1;

fetchTasks() {  
  this.isLoading = true;

  this.taskService.getTasks(
    this.currentPage,
    this.itemsPerPage,
    this.selectedStatus,
    this.selectedPriority
  ).subscribe({
    next: (res: any) => {
      console.log("API RESPONSE:", res);

      this.tasks = [...(res.tasks || [])];
      this.totalPages = res.totalPages || 1;

      this.isLoading = false;

      // 🔥 IMPORTANT FIX
      this.cd.detectChanges();
    },
    error: () => {
      this.isLoading = false;
    }
  });
}

getPages(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
  this.fetchTasks();
}

applyFilter() {
  this.currentPage = 1;
  this.fetchTasks();
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
          this.fetchTasks();
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

        // 🔥 ensure new reference
        this.tasks = this.tasks.filter(t => t._id !== taskId);
        this.fetchTasks();

      });
    }
  );
}

}
