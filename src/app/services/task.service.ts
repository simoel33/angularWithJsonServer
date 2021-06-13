import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../Models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:3000/Tasks";
  constructor(private http: HttpClient) { }
  finall() {
    return this.http.get<Tasks[]>("http://localhost:3000/Tasks/")
  }
  
  deletee(id: any) {
    return this.http.delete(`http://localhost:3000/Tasks/${id}`);
  }

  persist(tasks:any) {
    return this.http.post<Tasks>("http://localhost:3000/Tasks/", tasks);
  }

  completed(id:any,completed:any) {
    return this.http.patch(`http://localhost:3000/Tasks/${id}`, { completed: !completed });

  }

  update(task: any) {
     
    return this.http.put(`http://localhost:3000/Tasks/${task.id}`,task)
  }
  }
