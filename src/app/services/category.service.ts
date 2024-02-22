import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  firestore = inject(Firestore);

  addCategory(data: object) {
    const dbInstance = collection(this.firestore, 'categories');
    return addDoc(dbInstance, data);
  }

  getAllCategories() {
    const dbInstance = collection(this.firestore, 'categories');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateCategory(id: string, data: object) {
    const docInstance = doc(this.firestore, 'categories', id);
    return updateDoc(docInstance, data);
  }

  deleteCategory(id: string) {
    const docInstance = doc(this.firestore, 'categories', id);
    return deleteDoc(docInstance);
  }
}
