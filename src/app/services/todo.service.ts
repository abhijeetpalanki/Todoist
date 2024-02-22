import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firestore = inject(Firestore);

  addTodo(data: object, categoryId: string) {
    const dbCategoryInstance = doc(this.firestore, `categories/${categoryId}`);
    updateDoc(dbCategoryInstance, { todoCount: increment(1) });

    const dbInstance = collection(
      this.firestore,
      `categories/${categoryId}/todos`
    );
    return addDoc(dbInstance, data);
  }

  getAllTodos(categoryId: string) {
    const dbInstance = collection(
      this.firestore,
      `categories/${categoryId}/todos`
    );
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateTodo(todoId: string, data: object, categoryId: string) {
    const docInstance = doc(
      this.firestore,
      `categories/${categoryId}/todos`,
      todoId
    );
    return updateDoc(docInstance, data);
  }

  deleteTodo(todoId: string, categoryId: string) {
    const dbCategoryInstance = doc(this.firestore, `categories/${categoryId}`);
    updateDoc(dbCategoryInstance, { todoCount: increment(-1) });

    const docInstance = doc(
      this.firestore,
      `categories/${categoryId}/todos`,
      todoId
    );
    return deleteDoc(docInstance);
  }

  markComplete(categoryId: string, todoId: string) {
    const docInstance = doc(
      this.firestore,
      `categories/${categoryId}/todos`,
      todoId
    );
    return updateDoc(docInstance, {
      isCompleted: true,
    });
  }

  markUncomplete(categoryId: string, todoId: string) {
    const docInstance = doc(
      this.firestore,
      `categories/${categoryId}/todos`,
      todoId
    );
    return updateDoc(docInstance, {
      isCompleted: false,
    });
  }
}
