import { TaskList } from './../../model/task-list';
import { Component, OnInit, DoCheck } from '@angular/core';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]')

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.setLocalStorage();

  }

  public setEmitTaskList(event:string){
    this.taskList.push({task: event, checked: false});
  }

  public deleteItemTaskList(event:number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Confirma deletar todas as tasks?");
    if(confirm){
    this.taskList=[]
    }
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Sua alteração deixou o campo vazio. Deseja deletar esse item?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last)=> Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
