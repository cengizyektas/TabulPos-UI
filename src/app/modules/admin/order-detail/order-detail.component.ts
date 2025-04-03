import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

interface MenuItem {
  name: string;
  price: number;
  quantity?: number;
  tag?: string;
  isNew?: boolean;
  wasUpdated?: boolean;
  isHighlighted?: boolean;
  quantityChanged?: boolean;
}

interface CategoryTab {
  name: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentModalComponent
  ],
})
export class OrderDetailComponent implements OnInit {
  tableTitle: string = 'Masa 2';
  categories: CategoryTab[] = [];
  cartItems: MenuItem[] = [];
  searchText: string = '';
  total: number = 0;
  tableId: string | null = null;
  adisyonNo: string = '276251204';
  selectedCategoryIndex: number = 0;
  
  // Payment modal control
  showPaymentModal: boolean = false;
  
  get filteredProducts(): MenuItem[] {
    if (!this.searchText && this.selectedCategoryIndex === 0) {
      return this.categories[this.selectedCategoryIndex]?.items || [];
    }
    
    let filtered = this.categories[this.selectedCategoryIndex]?.items || [];
    
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search));
    }
    
    return filtered;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get table ID from route params if available
    this.route.queryParams.subscribe(params => {
      if (params['tableId']) {
        this.tableId = params['tableId'];
        this.tableTitle = params['tableName'] || `Masa ${this.tableId}`;
      }
    });

    // Initial sample data
    this.initSampleData();
    
    // Add sample items to cart
    this.addToCart(this.categories[0].items[0]);
    this.addToCart(this.categories[0].items[0]);
    this.addToCart(this.categories[2].items[0]);
  }

  initSampleData() {
    this.categories = [
      {
        name: 'FAVORİ ÜRÜNLER',
        items: [
          { name: 'Ayvalık Tostu', price: 26.25, tag: 'yektas' },
          { name: 'Kaşarlı Tost', price: 22.00 },
          { name: 'Menemen', price: 20.00 },
        ]
      },
      {
        name: 'KAHVALTILIKLAR',
        items: [
          { name: 'Serpme Kahvaltı', price: 65.00 },
          { name: 'Omlet', price: 15.00 },
          { name: 'Kahvaltı Tabağı', price: 23.00 },
          { name: 'Peynir Tabağı', price: 20.00 },
        ]
      },
      {
        name: 'ÇORBALAR',
        items: [
          { name: 'Mercimek', price: 7.00 },
          { name: 'Ezogelin', price: 7.00 },
          { name: 'Yayla', price: 7.00 },
          { name: 'Sebze Çorbası', price: 6.00 },
          { name: 'Domates Çorbası', price: 7.00 },
        ]
      },
      {
        name: 'KIRMIZI ETLER',
        items: [
          { name: 'Köfte', price: 45.00 },
          { name: 'Kuzu Pirzola', price: 75.00 },
        ]
      },
      {
        name: 'SALATALAR',
        items: [
          { name: 'Çoban Salata', price: 18.00 },
          { name: 'Sezar Salata', price: 24.00 },
        ]
      },
      {
        name: 'İÇECEKLER',
        items: [
          { name: 'Ayran', price: 8.00 },
          { name: 'Çay', price: 5.00 },
          { name: 'Türk Kahvesi', price: 15.00 },
        ]
      }
    ];
    
    // Set the initial category to ÇORBALAR to match the image
    this.selectedCategoryIndex = 2;
  }

  selectCategory(index: number): void {
    this.selectedCategoryIndex = index;
  }

  addToCart(item: MenuItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
      existingItem.isNew = true;
      existingItem.wasUpdated = true;
      existingItem.quantityChanged = true;
      
      // Move the updated item to the top of the list
      const index = this.cartItems.indexOf(existingItem);
      if (index > 0) {
        this.cartItems.splice(index, 1);
        this.cartItems.unshift(existingItem);
      }
      
      // Reset animation flags after animation completes
      setTimeout(() => {
        existingItem.isNew = false;
        existingItem.wasUpdated = false;
        
        // Add highlight effect after quantity update animation
        existingItem.isHighlighted = true;
        setTimeout(() => {
          existingItem.isHighlighted = false;
        }, 1500);
      }, 700);
      
      setTimeout(() => {
        existingItem.quantityChanged = false;
      }, 400);
    } else {
      const newItem = { 
        ...item, 
        quantity: 1, 
        isNew: true,
        wasUpdated: false
      };
      // Add new item to the beginning of the array
      this.cartItems.unshift(newItem);
      
      // Reset animation flags after animation completes
      setTimeout(() => {
        newItem.isNew = false;
      }, 700);
    }
    
    this.calculateTotal();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
  }

  saveOrder() {
    // This would connect to a service in a real application
    console.log('Order saved for table:', this.tableTitle, this.cartItems, 'Total:', this.total);
    
    // Navigate back to order panel after saving
    this.router.navigate(['/order-panel'], { 
      queryParams: { 
        savedOrder: true,
        tableId: this.tableId
      }
    });
  }

  incrementQuantity(index: number) {
    const item = this.cartItems[index];
    item.quantity = (item.quantity || 1) + 1;
    item.quantityChanged = true;
    
    // Move item to top of the list
    if (index > 0) {
      this.cartItems.splice(index, 1);
      this.cartItems.unshift(item);
    }
    
    setTimeout(() => {
      item.quantityChanged = false;
    }, 400);
    
    this.calculateTotal();
  }

  decrementQuantity(index: number) {
    const item = this.cartItems[index];
    if (item.quantity && item.quantity > 1) {
      item.quantity--;
      item.quantityChanged = true;
      
      // Move item to top of the list
      if (index > 0) {
        this.cartItems.splice(index, 1);
        this.cartItems.unshift(item);
      }
      
      setTimeout(() => {
        item.quantityChanged = false;
      }, 400);
    } else {
      this.cartItems.splice(index, 1);
    }
    this.calculateTotal();
  }

  // Payment Modal functions
  openPaymentModal(): void {
    this.showPaymentModal = true;
  }
  
  closePaymentModal(): void {
    this.showPaymentModal = false;
  }
  
  handlePayment(event: {amount: string, type: string}): void {
    console.log('Processing payment:', {
      amount: event.amount,
      type: event.type,
      items: this.cartItems
    });
    
    // Close modal after processing
    this.closePaymentModal();
    
    // Here you would typically call a service to process the payment
  }
} 