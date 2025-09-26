import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  food: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItems.asObservable();
  cartCount$ = this.cartCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  addToCart(food: any) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(
      (item) => item.food.name === food.name
    );

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += 1;
    } else {
      currentItems.push({ food, quantity: 1 });
    }

    this.updateCart(currentItems);
  }

  removeFromCart(foodName: string) {
    const currentItems = this.cartItems.value.filter(
      (item) => item.food.name !== foodName
    );
    this.updateCart(currentItems);
  }

  updateQuantity(foodName: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(
      (item) => item.food.name === foodName
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(foodName);
      } else {
        currentItems[itemIndex].quantity = quantity;
        this.updateCart(currentItems);
      }
    }
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]) {
    this.cartItems.next(items);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(totalCount);
    const totalAmount = items.reduce(
      (sum, item) => sum + item.food.price * item.quantity,
      0
    );
    this.cartTotal.next(totalAmount);
  }

  getCurrentCart(): CartItem[] {
    return this.cartItems.value;
  }
}
