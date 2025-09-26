import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  isCartOpen: boolean = false;
  isCheckoutOpen: boolean = false;

  // Datos del cliente para el checkout
  customerInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.totalAmount = total;
    });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCheckoutOpen) {
      this.isCheckoutOpen = false;
    }
  }

  openCheckout() {
    this.isCheckoutOpen = true;
  }

  closeCheckout() {
    this.isCheckoutOpen = false;
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.food.name, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.food.name, item.quantity - 1);
  }

  removeItem(foodName: string) {
    this.cartService.removeFromCart(foodName);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Finalizar compra
  finalizePurchase() {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Validar información del cliente
    if (!this.customerInfo.name || !this.customerInfo.phone) {
      alert('Por favor completa al menos tu nombre y teléfono');
      return;
    }

    // Crear resumen de la compra
    const orderSummary = {
      customer: this.customerInfo,
      items: this.cartItems,
      total: this.totalAmount,
      orderNumber: this.generateOrderNumber(),
      date: new Date().toLocaleString(),
    };

    // Mostrar confirmación
    this.showOrderConfirmation(orderSummary);

    // Limpiar carrito y cerrar modales
    this.cartService.clearCart();
    this.isCheckoutOpen = false;
    this.isCartOpen = false;

    // Resetear información del cliente
    this.customerInfo = {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    };
  }

  private generateOrderNumber(): string {
    return 'ORD-' + Date.now().toString().slice(-6);
  }

  private showOrderConfirmation(order: any) {
    const itemsList = order.items
      .map((item: CartItem) => `- ${item.food.name} x${item.quantity}`)
      .join('\n');

    const confirmation = `
¡Pedido realizado con éxito!

Número de orden: ${order.orderNumber}
Total: Gs. ${order.total.toLocaleString()}

Detalles del pedido:
${itemsList}

Te contactaremos al ${order.customer.phone} para coordinar la entrega.

¡Gracias por tu compra!
    `;

    alert(confirmation);

    // También puedes mostrar una notificación más elegante
    this.showFancyConfirmation(order);
  }

  private showFancyConfirmation(order: any) {
    const notification = document.createElement('div');
    const itemsList = order.items
      .map(
        (item: CartItem) =>
          `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
         <span>${item.food.name} x${item.quantity}</span>
         <span>Gs. ${(item.food.price * item.quantity).toLocaleString()}</span>
       </div>`
      )
      .join('');

    notification.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
                  z-index: 2000; max-width: 400px; text-align: center;">
        <h3 style="color: #27ae60; margin-bottom: 15px;">¡Pedido Confirmado!</h3>
        <p><strong>Número:</strong> ${order.orderNumber}</p>
        <div style="text-align: left; margin: 15px 0;">
          ${itemsList}
        </div>
        <p><strong>Total:</strong> Gs. ${order.total.toLocaleString()}</p>
        <p style="color: #666; font-size: 14px;">Te contactaremos pronto al ${
          order.customer.phone
        }</p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #e67e22; color: white; border: none; padding: 10px 20px; 
                       border-radius: 5px; cursor: pointer; margin-top: 15px;">
          Aceptar
        </button>
      </div>
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                  background: rgba(0,0,0,0.5); z-index: 1999;"></div>
    `;

    document.body.appendChild(notification);
  }
}