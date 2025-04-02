import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  name: string;
  price: number;
  quantity?: number;
  tag?: string;
}

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class PaymentModalComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() tableName: string = '';
  @Input() total: number = 0;
  @Output() close = new EventEmitter<void>();
  @Output() payment = new EventEmitter<{amount: string, type: string}>();
  
  amount: string = '0';
  
  ngOnInit() {
    this.amount = this.total.toFixed(2);
  }
  
  closeModal() {
    this.close.emit();
  }
  
  appendNumber(num: string) {
    if (num === 'Tüm') {
      this.selectAll();
      return;
    }
    
    if (num === '1/n') {
      this.splitEvenly();
      return;
    }
    
    if (num === 'indirim') {
      this.applyDiscount();
      return;
    }
    
    if (num === '') {
      return;
    }
    
    if (this.amount === '0' && num !== '.') {
      this.amount = num;
    } else if (num === '.' && this.amount.includes('.')) {
      return; // Do not allow multiple decimal points
    } else {
      this.amount += num;
    }
  }
  
  backspace() {
    if (this.amount.length > 0) {
      this.amount = this.amount.slice(0, -1);
      if (this.amount === '' || this.amount === '0') {
        this.amount = '0';
      }
    }
  }
  
  selectAll() {
    // Set the amount to the total
    this.amount = this.total.toFixed(2);
  }
  
  splitEvenly() {
    // Split the total evenly among all items
    if (this.items.length > 0) {
      const splitAmount = this.total / this.items.length;
      this.amount = splitAmount.toFixed(2);
    }
  }
  
  applyDiscount() {
    // Apply a 10% discount as an example
    const discountedAmount = this.total * 0.9;
    this.amount = discountedAmount.toFixed(2);
  }
  
  processPayment(type: string) {
    this.payment.emit({
      amount: this.amount,
      type: type
    });
  }
} 