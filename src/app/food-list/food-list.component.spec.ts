import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodListComponent } from './food-list.component'; // Cambiado a FoodListComponent

describe('FoodListComponent', () => {
  // Cambiado a FoodListComponent
  let component: FoodListComponent; // Cambiado a FoodListComponent
  let fixture: ComponentFixture<FoodListComponent>; // Cambiado a FoodListComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodListComponent], // Cambiado a FoodListComponent
    }).compileComponents();

    fixture = TestBed.createComponent(FoodListComponent); // Cambiado a FoodListComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí
  it('should have food items', () => {
    expect(component.foods.length).toBeGreaterThan(0);
  });

  it('should filter foods by category', () => {
    component.filterFoodsByCategory('Hamburguesas');
    expect(
      component.filteredFoods.every((food) => food.category === 'Hamburguesas')
    ).toBeTrue();
  });

  it('should show all foods when category is "Todos"', () => {
    component.filterFoodsByCategory('Todos');
    expect(component.filteredFoods.length).toEqual(component.foods.length);
  });
});
