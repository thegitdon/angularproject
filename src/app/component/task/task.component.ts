import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks?: Task[];
  editEmployee?: Task; //from Component to UI
  deleteEmployee?: Task;

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

  onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.taskService.create(addForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTasks();
          addForm.reset();
        },
        error => {
          console.log(error);
          //addForm.reset();
        });
  }

  onUpdateEmloyee(task: Task): void {
    this.taskService.update(task?.id, task) //this.editEmployee?.id; currentEmp
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTasks();
          //this.message = response.message ? response.message : 'This task was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  onDeleteEmloyee(employeeId: any): void { //number
    this.taskService.delete(employeeId)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTasks();
        },
        error => {
          console.log(error);
        });
  }

  searchEmployees(key: string): void {
    console.log(key);
    const results: Task[] = [];
    for (const employee of this.tasks!) {
      if (employee.description!.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.title!.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.retrieveTasks();
    }
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
      this.editEmployee = task;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = task;
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
