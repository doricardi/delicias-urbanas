import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css',
})
export class FoodListComponent implements OnInit, OnDestroy {
  foods = [
    {
      name: 'Hamburguesa con Queso',
      category: 'Hamburguesas',
      price: 76860,
      imageUrl: '/assets/images/hamburguesadequeso.png',
    },
    {
      name: 'Hamburguesa de Pollo',
      category: 'Hamburguesas',
      price: 65880,
      imageUrl: '/assets/images/hamburguesadepollo.jpg',
    },
    {
      name: 'Hamburguesa Vegetariana',
      category: 'Hamburguesas',
      price: 82005,
      imageUrl: '/assets/images/hamburguesavegetariana.jpg',
    },
    {
      name: 'Papas Clásicas',
      category: 'Papas Fritas',
      price: 29280,
      imageUrl: '/assets/images/papasfritas.jpg',
    },
    {
      name: 'Papas Fritas Grandes',
      category: 'Papas Fritas',
      price: 40260,
      imageUrl: '/assets/images/papasfritasgrandes.jpg',
    },
    {
      name: 'Papas Fritas Medianas',
      category: 'Papas Fritas',
      price: 34770,
      imageUrl: '/assets/images/papasfritasmedianas.jpg',
    },
    {
      name: 'Brownies',
      category: 'Postres',
      price: 51240,
      imageUrl: '/assets/images/brownies.jpg',
    },
    {
      name: 'Helado de Chocolate',
      category: 'Postres',
      price: 38430,
      imageUrl: '/assets/images/heladodechocolate.jpg',
    },
    {
      name: 'Tiramisú',
      category: 'Postres',
      price: 62220,
      imageUrl: '/assets/images/tiramisu.jpg',
    },
    {
      name: 'Coctel de Pomelo',
      category: 'Bebidas',
      price: 21960,
      imageUrl: '/assets/images/cocteldepomelo.jpg',
    },
    {
      name: 'Limonada',
      category: 'Bebidas',
      price: 22960,
      imageUrl: '/assets/images/limonada.jpg',
    },
    {
      name: 'Té de Melocoton',
      category: 'Bebidas',
      price: 19960,
      imageUrl: '/assets/images/tedemelocoton.jpg',
    },
    {
      name: 'Gaseosa',
      category: 'Bebidas',
      price: 25960,
      imageUrl: '/assets/images/gaseosa.jpg',
    },
  ];

  filteredFoods = [...this.foods];
  currentCategory: string = 'Todos';
  private routerSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) {
    // Escuchar cambios de ruta
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Cuando la ruta cambia a la página principal, aplicar el filtro actual
        if (this.router.url === '/') {
          this.applyCurrentFilter();
        }
      });
  }

  ngOnInit() {
    console.log('✅ FoodListComponent iniciado');
    console.log('📊 Total de alimentos:', this.foods.length);
    console.log(
      '🍔 Hamburguesas:',
      this.foods.filter((f) => f.category === 'Hamburguesas').length
    );
    console.log(
      '🍟 Papas Fritas:',
      this.foods.filter((f) => f.category === 'Papas Fritas').length
    );
    console.log(
      '🍰 Postres:',
      this.foods.filter((f) => f.category === 'Postres').length
    );
    console.log(
      '🥤 Bebidas:',
      this.foods.filter((f) => f.category === 'Bebidas').length
    );

    // Suscribirse a los cambios de categoría
    this.categoryService.currentCategory$.subscribe((category) => {
      console.log('🎯 Categoría recibida:', category);
      this.currentCategory = category;
      this.applyCurrentFilter();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private applyCurrentFilter() {
    console.log('🔍 Aplicando filtro para:', this.currentCategory);

    if (this.currentCategory === 'Todos') {
      this.filteredFoods = [...this.foods];
      console.log(
        '📦 Mostrando TODOS los alimentos:',
        this.filteredFoods.length
      );
    } else {
      this.filteredFoods = this.foods.filter(
        (food) => food.category === this.currentCategory
      );
      console.log(
        `📦 Alimentos en ${this.currentCategory}:`,
        this.filteredFoods.length
      );
    }

    // Debug: mostrar nombres de alimentos filtrados
    console.log(
      '📋 Alimentos filtrados:',
      this.filteredFoods.map((f) => f.name)
    );
  }

  filterFoodsByCategory(category: string) {
    console.log('🎯 Filtrando manualmente por:', category);
    this.currentCategory = category;
    this.applyCurrentFilter();
  }

  addToCart(food: any) {
    console.log('🛒 Agregando al carrito:', food.name);
    this.cartService.addToCart(food);
    this.showAddedToCartMessage(food.name);
  }

  private showAddedToCartMessage(foodName: string) {
    const notification = document.createElement('div');
    notification.textContent = `¡${foodName} agregado al carrito!`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 1000;
      font-family: Arial, sans-serif;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
