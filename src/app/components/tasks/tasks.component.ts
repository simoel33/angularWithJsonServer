import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/Models/tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editForm = false;
  showFrom = false;
  myTask: Tasks = {
    label: '',
    completed: false
  }
  tasks: Tasks[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    return this.taskService.finall().subscribe(tasks => this.tasks = tasks);
  }
  deleteTask(id:any) {
    this.taskService.deletee(id).
      subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id != id)
      })  
  }

  persistTsak() {
   
    this.taskService.persist(this.myTask)
      .subscribe((tasks) => {
        this.tasks = [tasks, ...this.tasks] // sprea operator
        this.resetform();
        this.showFrom = false;
      })
    
  }

  resetform() {
     this.myTask = {
      label: '',
      completed: false

    }
  }

  tooggleCompleted(tasks: Tasks) {
    
    this.taskService.completed(tasks.id, tasks.completed).
      subscribe(() => {
        tasks.completed = !tasks.completed;
      })
  }

  edit(task:any) {
    this.myTask = task;
    this.editForm = true;
    this.showFrom = true;
  }

  editFromTask() {
    this.taskService.update(this.myTask)
      .subscribe(() => {
        this.resetform();
        this.editForm = false;
        this.showFrom = false;
    })
  }
} 
