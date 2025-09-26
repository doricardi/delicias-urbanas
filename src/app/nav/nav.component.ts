import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  // SOLUCIÓN: Usar array de strings simple, no de objetos
  categories = ['Todos', 'Hamburguesas', 'Papas Fritas', 'Postres', 'Bebidas'];

  pages = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Nosotros' },
    { path: '/restaurantes', label: 'Restaurantes' },
    { path: '/contacto', label: 'Contacto' },
  ];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSelectCategory(category: string) {
    console.log('🎯 Nav: Categoría seleccionada:', category);

    // Navegar a la página principal si no estamos ahí
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.categoryService.setCategory(category);
        }, 50);
      });
    } else {
      this.categoryService.setCategory(category);
    }
  }

  // ELIMINA este método si no lo necesitas
  // isActiveCategory(category: string): boolean {
  //   return false; // Temporalmente desactivado
  // }
}
