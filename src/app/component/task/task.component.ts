import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks?: Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe(//to be notified whenever some data comes back from the server; OK or Exception
        data => {
          this.tasks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public onOpenModal(task: Task, mode: string): void { //CrUD, which modal to open
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal'); //data-target -> id of the modal
    }
    if (mode === 'edit') {
      //this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      //this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    //if (container) {
    //this.deleteEmployee = employee;
    //button.setAttribute('data-target', '#deleteEmployeeModal');
    //container.appendChild(button);
    //container!.appendChild(button);
    //}
    container?.appendChild(button);
    button.click();
  }
}
