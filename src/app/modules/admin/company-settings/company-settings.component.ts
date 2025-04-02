import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocationModalComponent } from './location-modal/location-modal.component';

@Component({
  selector: 'app-company-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CompanySettingsComponent implements OnInit {
  // Settings form data
  restaurant = {
    name: '',
    startTime: '06:00',
    endTime: '23:45',
    session: '1',
    socketAddress: 'localhost:5002',
    screenTimeout: 0,
    tableTimeout: 0
  };

  // Address information
  address = {
    country: 'Turkey',
    city: 'Ankara',
    district: '',
    neighborhood: '',
    streetName: '',
    streetAddress: '',
    buildingNo: '',
    postalCode: ''
  };

  // Location data
  location: { lat: number, lng: number, address: string } = {
    lat: 39.9272,  // Default coordinates for Ankara
    lng: 32.8644,
    address: 'Aşağı Eğlence, Şusurluk Sk. No:5, 06010 Keçiören/Ankara, Türkiye'
  };

  // Payment methods
  paymentMethods = [
    { name: 'Nakit', enabled: true },
    { name: 'Kredi Kartı', enabled: true },
    { name: 'Multinet', enabled: true },
    { name: 'Smart Ticket', enabled: false },
    { name: 'SetCard', enabled: false },
    { name: 'Pluxee (Sodexo)', enabled: false },
    { name: 'Diğer', enabled: false },
    { name: 'Basit Otel', enabled: false },
    { name: 'BizimHesap', enabled: false },
    { name: 'Metropol', enabled: false },
    { name: 'HMS Otel', enabled: false }
  ];

  // Parameters
  parameters = [
    { name: 'Gün başı ve gün sonu işlemleri manuel yapılsın', description: 'İşletmenizin kasa açılış ve kapanış kontrolünü manuel yönetmenizi sağlar.', enabled: false },
    { name: 'Gün sonu çıktısı alabilmek için açıkta sipariş olmasın', description: 'Gün sonu raporu ekranındaki "Yazdır" seçeneğini kullanabilmek için tüm siparişlerin kapalı olması gerekir.', enabled: false },
    { name: 'Perakende Modülü Kullanılsın', description: 'Perakende modülünü aktifleştirerek gel-al siparişlerinizi daha kolay yönetebilirsiniz.', enabled: false },
    { name: 'Sipariş hazır olduğunda zili çal', description: 'Mutfak tarafından hazırlanan ürünler için garsona sesli ve yazılı bildirim gider.', enabled: false },
    { name: 'Misafir sayısı girişi zorunlu olsun', description: 'İşletmenize gün içinde gelen müşteri sayısını takip edebilmenizi sağlar.', enabled: false },
    { name: 'Adisyon gruplama aktif', description: 'Ödemeyi ayrı ayrı yapacak gruplar için, aynı masa içinde birden fazla adisyon oluşturabilmeyi sağlar.', enabled: true },
    { name: 'Siparişi marşlı şekilde gönderme aktif', description: 'Girilen siparişteki ürünlerin, mutfakta hangi sıra ile hazırlanması gerektiği bilgisini gönderir.', enabled: true },
    { name: 'Her işlemden sonra kilit ekranı otomatik açılsın', description: 'Güvenlik amacıyla, yapılan her işlemden sonra tekrar şifre girmeniz istenir.', enabled: false },
    { name: 'Pin ile girişi engelle', description: 'Güvenlik nedeniyle pin kullanarak giriş yapılmasını engeller.', enabled: false }
  ];

  // Currency settings
  currencySettings = {
    enabled: false,
    rate: 1
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Initialize component
  }

  // Open location modal
  openLocationModal(): void {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: { location: this.location }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location = result;
        console.log('Saved location:', this.location);
      }
    });
  }

  // Save settings
  saveSettings(): void {
    console.log('Settings saved');
  }
}
