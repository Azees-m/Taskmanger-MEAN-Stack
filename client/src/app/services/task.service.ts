import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  // GET all tasks
getTasks(page: number, limit: number, status?: string, priority?: string) {

  let params: any = {
    page,
    limit
  };

  if (status) params.status = status;
  if (priority) params.priority = priority;

  return this.http.get<any>(this.API_URL, { params });
}

  // ADD task
  addTask(task: { title: string; priority: string ,description:string ,status:string,dueDate:string}) {
    return this.http.post<any>(this.API_URL, task);
  }

  // UPDATE task (mark done)
  updateTask(taskId: string, data: any) {
    return this.http.put(`${this.API_URL}/${taskId}`, data);
  }

  // DELETE task
  deleteTask(taskId: string) {
    return this.http.delete(`${this.API_URL}/${taskId}`);
  }
}
