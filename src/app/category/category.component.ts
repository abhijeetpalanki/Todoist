import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categoryService = inject(CategoryService);
  toastr = inject(ToastrService);

  categories!: Array<any>;
  categoryName!: string;
  categoryId!: string;
  categoryColorCode!: string;
  categoryTodoCount!: number;
  dataStatus: string = 'Add';

  colors: Array<any> = [
    '#e7845e',
    '#fc0184',
    '#f6b93f',
    '#20c898',
    '#f03734',
    '#aad450',
    '#026467',
    '#fefefe',
    '#928779',
    '#fcdebe',
    '#90a583',
    '#b26e63',
    '#c6caed',
  ];

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((list) => {
      this.categories = list;
    });
  }

  onSubmit(f: NgForm) {
    if (this.dataStatus === 'Add') {
      let randomNumber = Math.floor(Math.random() * this.colors.length);

      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.colors[randomNumber],
        todoCount: 0,
      };

      this.categoryService.addCategory(todoCategory).then(() => {
        this.toastr.success('New category saved successfully!');
        f.resetForm();
      });
    } else if (this.dataStatus === 'Edit') {
      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.categoryColorCode,
        todoCount: this.categoryTodoCount,
      };

      this.categoryService
        .updateCategory(this.categoryId, todoCategory)
        .then(() => {
          this.toastr.info('Category updated successfully!');
          f.resetForm();
          this.dataStatus = 'Add';
        });
    }
  }

  onEdit(category: any, categoryId: string) {
    this.categoryName = category.category;
    this.categoryId = categoryId;
    this.categoryColorCode = category.colorCode;
    this.categoryTodoCount = category.todoCount;
    this.dataStatus = 'Edit';
  }

  onDelete(id: string) {
    this.categoryService.deleteCategory(id).then(() => {
      this.toastr.error('Category deleted successfully!');
    });
  }
}
