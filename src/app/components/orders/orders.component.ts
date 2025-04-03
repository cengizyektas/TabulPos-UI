import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Router } from '@angular/router';
import { Order, OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    RouterModule
  ]
})
export class OrdersComponent implements OnInit {
  // Order tabs
  tabs = [
    { id: 'waiting', label: 'Bekleyen Siparişler', count: 0, icon: 'inventory' },
    { id: 'preparing', label: 'Teslimata Çıkanlar', count: 0, icon: 'delivery_dining' },
    { id: 'ready', label: 'Açık Siparişler', count: 0, icon: 'restaurant' },
    { id: 'preparing', label: 'Hazırlanıyor', count: 0, icon: 'hourglass_empty' }
  ];
  
  activeTab = 'waiting';
  
  // Sidebar navigation 
  activeItem: string = 'siparisler';
  isDarkMode: boolean = false;
  
  // Orders data
  waitingOrders: Order[] = [];
  preparingOrders: Order[] = [];
  readyOrders: Order[] = [];
  
  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    // Load orders data from service
    this.loadOrders();
  }
  
  // Sidebar methods
  setActive(item: string): void {
    this.activeItem = item;
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
  
  loadOrders(): void {
    // Get waiting orders
    this.ordersService.getWaitingOrders().subscribe(orders => {
      this.waitingOrders = orders;
      this.tabs[0].count = this.waitingOrders.length;
    });
    
    // Get preparing orders
    this.ordersService.getPreparingOrders().subscribe(orders => {
      this.preparingOrders = orders;
      this.tabs[1].count = this.preparingOrders.length;
      this.tabs[3].count = this.preparingOrders.length + this.readyOrders.length;
    });
    
    // Get ready orders
    this.ordersService.getReadyOrders().subscribe(orders => {
      this.readyOrders = orders;
      this.tabs[2].count = this.readyOrders.length;
      this.tabs[3].count = this.preparingOrders.length + this.readyOrders.length;
    });
  }
  
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
  
  getActiveOrders(): Order[] {
    switch (this.activeTab) {
      case 'waiting':
        return this.waitingOrders;
      case 'preparing':
        return this.preparingOrders;
      case 'ready':
        return this.readyOrders;
      default:
        return this.waitingOrders;
    }
  }
  
  viewOrderDetails(order: Order): void {
    // Navigate to order details 
    this.router.navigate(['/order-detail'], { 
      queryParams: { 
        tableId: order.tableNumber,
        orderId: order.id
      }
    });
  }
  
  printOrder(order: Order): void {
    console.log('Print order', order);
    // This would connect to a print service in a real implementation
  }
  
  payOrder(order: Order): void {
    console.log('Pay order', order);
    // Navigate to payment screen or show payment modal
    this.router.navigate(['/order-detail'], { 
      queryParams: { 
        tableId: order.tableNumber,
        orderId: order.id,
        payment: true
      }
    });
  }
  
  showMoreOptions(order: Order): void {
    console.log('Show more options for', order);
  }
} 