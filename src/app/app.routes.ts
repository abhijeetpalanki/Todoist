import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
  {
    path: 'todo/:id',
    component: TodoComponent,
  },
];
