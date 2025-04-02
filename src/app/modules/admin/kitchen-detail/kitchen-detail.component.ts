import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kitchen-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen-detail.component.html',
  styleUrl: './kitchen-detail.component.scss'
})
export class KitchenDetailComponent {
  // Property to toggle between orders and no-orders state
  hasOrders: boolean = false; // Set to true to show orders by default

  // Demo method to toggle between states - for testing only
  toggleOrdersState(): void {
    this.hasOrders = !this.hasOrders;
  }
  showHazirlananSiparisler(): void {
    this.hasOrders = !this.hasOrders;
  }
}
