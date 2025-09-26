import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private selectedCategory = new BehaviorSubject<string>('Todos');

  currentCategory$ = this.selectedCategory.asObservable();

  setCategory(category: string) {
    console.log('🔄 CategoryService: Estableciendo categoría:', category);
    this.selectedCategory.next(category);
  }

  // AÑADE este método que falta
  getCurrentCategory(): string {
    return this.selectedCategory.value;
  }
}
