import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: number;
  table: string;
  tableNumber: number;
  amount: number;
  time: string;
  status: 'waiting' | 'preparing' | 'ready';
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // Mock data for orders
  private waitingOrders: Order[] = [
    { id: 104, table: 'Masa', tableNumber: 2, amount: 121.25, time: '10:41:35', status: 'waiting' },
    { id: 102, table: 'Masa', tableNumber: 1, amount: 46.25, time: '11:44:29', status: 'waiting' }
  ];
  
  private preparingOrders: Order[] = [
    { id: 101, table: 'Masa', tableNumber: 3, amount: 78.50, time: '10:30:15', status: 'preparing' },
    { id: 100, table: 'Masa', tableNumber: 4, amount: 92.75, time: '10:25:45', status: 'preparing' }
  ];
  
  private readyOrders: Order[] = [
    { id: 98, table: 'Masa', tableNumber: 5, amount: 145.20, time: '10:10:30', status: 'ready' },
    { id: 97, table: 'Masa', tableNumber: 6, amount: 63.40, time: '10:05:20', status: 'ready' }
  ];

  constructor() { }

  /**
   * Get waiting orders
   */
  getWaitingOrders(): Observable<Order[]> {
    return of(this.waitingOrders);
  }

  /**
   * Get preparing orders
   */
  getPreparingOrders(): Observable<Order[]> {
    return of(this.preparingOrders);
  }

  /**
   * Get ready orders
   */
  getReadyOrders(): Observable<Order[]> {
    return of(this.readyOrders);
  }

  /**
   * Get order by id
   */
  getOrderById(id: number): Observable<Order | undefined> {
    const allOrders = [...this.waitingOrders, ...this.preparingOrders, ...this.readyOrders];
    const order = allOrders.find(order => order.id === id);
    return of(order);
  }

  /**
   * Update order status
   */
  updateOrderStatus(id: number, status: 'waiting' | 'preparing' | 'ready'): Observable<boolean> {
    // Find order in any of the arrays
    let order: Order | undefined;
    let orderList: Order[] = [];
    
    if (order = this.waitingOrders.find(order => order.id === id)) {
      orderList = this.waitingOrders;
    } else if (order = this.preparingOrders.find(order => order.id === id)) {
      orderList = this.preparingOrders;
    } else if (order = this.readyOrders.find(order => order.id === id)) {
      orderList = this.readyOrders;
    }
    
    if (!order) {
      return of(false);
    }
    
    // Remove from current list
    const index = orderList.indexOf(order);
    orderList.splice(index, 1);
    
    // Update status and add to appropriate list
    order.status = status;
    
    if (status === 'waiting') {
      this.waitingOrders.push(order);
    } else if (status === 'preparing') {
      this.preparingOrders.push(order);
    } else if (status === 'ready') {
      this.readyOrders.push(order);
    }
    
    return of(true);
  }
} 