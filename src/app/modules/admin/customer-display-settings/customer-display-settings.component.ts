import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-customer-display-settings',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './customer-display-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './customer-display-settings.component.scss'
})
export class CustomerDisplaySettingsComponent {
  // Form model
  settings = {
    businessName: 'test',
    slogan: 'Afiyet Olsun',
    generalFontSize: 12,
    itemsFontSize: 19,
    themeColor: '#000000',
    textColor: '#000000',
    orderTypes: {
      tableSales: true,
      takeAway: false,
      delivery: false
    },
    logo: null,
    displayEnabled: true // New property for "Müşteri Bilgi Ekranı Kullanılsın"
  };

  // Preview data for customer display
  previewData = {
    tableInfo: {
      tableNumber: 2,
      orderNumber: '1374158',
      dateTime: '20.05.2018 21:23'
    },
    items: [
      { name: 'SÜTLÜ TÜRK KAHVESİ', quantity: 1, variant: 'Tam', price: 7.00 },
      { name: 'SU', quantity: 1, variant: 'Tam', price: 2.00 },
      { name: 'Çay', quantity: 1, variant: 'Tam', price: 2.00 },
      { name: 'BEYAZ PEYNİRLİ SANDVİÇ', quantity: 1, variant: 'Tam', price: 12.50 },
      { name: 'BEYAZ PEYNİRLİ SANDVİÇ', quantity: 1, variant: 'Tam', price: 12.50 }
    ],
    discount: 0.00,
    grossTotal: 33.12,
    total: 36.00
  };

  constructor() { }

  // Method to handle logo selection
  onLogoSelect(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.settings.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to save settings
  saveSettings(): void {
    console.log('Saving settings:', this.settings);
    // Here you would normally save to backend
    alert('Ayarlar güncellendi!');
  }

  // Calculate totals
  get subtotal(): number {
    return this.previewData.items.reduce((total, item) => total + item.price, 0);
  }
}
