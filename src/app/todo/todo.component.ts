import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todoService = inject(TodoService);
  toastr = inject(ToastrService);
  activatedRoute = inject(ActivatedRoute);

  catId!: string;
  todos!: Array<any>;

  todoValue!: string;
  todoId!: string;
  dataStatus: string = 'Add';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      this.catId = val.id;
    });

    this.todoService.getAllTodos(this.catId).subscribe((list) => {
      this.todos = list;
    });
  }

  onSubmit(f: NgForm) {
    let todoData = {
      todo: f.value.todoText,
      isCompleted: false,
    };

    if (this.dataStatus === 'Add') {
      this.todoService.addTodo(todoData, this.catId).then(() => {
        this.toastr.success('New todo added successfully!');
        f.resetForm();
      });
    } else if (this.dataStatus === 'Edit') {
      this.todoService
        .updateTodo(this.todoId, todoData, this.catId)
        .then(() => {
          this.toastr.info('Todo updated successfully!');
          f.resetForm();
          this.dataStatus = 'Add';
        });
    }
  }

  onEdit(todo: string, id: string) {
    this.todoValue = todo;
    this.todoId = id;
    this.dataStatus = 'Edit';
  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId, this.catId).then(() => {
      this.toastr.error('Todo deleted successfully!');
    });
  }

  completeTodo(todoId: string) {
    this.todoService.markComplete(this.catId, todoId).then(() => {
      this.toastr.info('Todo marked completed!');
    });
  }

  uncompleteTodo(todoId: string) {
    this.todoService.markUncomplete(this.catId, todoId).then(() => {
      this.toastr.warning('Todo marked uncompleted!');
    });
  }
}
