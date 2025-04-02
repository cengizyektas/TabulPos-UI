import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {
  private map: any;
  private marker: any;
  public location: { lat: number, lng: number, address: string } = {
    lat: 39.975969,  // Default coordinates for Ankara
    lng: 32.840523,
    address: ''
  };

  constructor(
    public dialogRef: MatDialogRef<LocationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { location?: { lat: number, lng: number, address: string } }
  ) {
    // If existing location was passed, use it
    if (data?.location) {
      this.location = { ...data.location };
    }
  }

  ngOnInit(): void {
    // We need to wait for the dialog to render before initializing the map
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    // Create map
    this.map = L.map('location-map', {
      center: [this.location.lat, this.location.lng],
      zoom: 17
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Add marker
    this.marker = L.marker([this.location.lat, this.location.lng], {
      draggable: true
    }).addTo(this.map);

    // Handle marker drag events
    this.marker.on('dragend', (event: any) => {
      const position = this.marker.getLatLng();
      this.location.lat = position.lat;
      this.location.lng = position.lng;
      this.reverseGeocode(position.lat, position.lng);
    });

    // Handle map click events
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.marker.setLatLng([lat, lng]);
      this.location.lat = lat;
      this.location.lng = lng;
      this.reverseGeocode(lat, lng);
    });

    // If we already have an address, update the UI
    if (this.data?.location?.address) {
      this.location.address = this.data.location.address;
    } else {
      this.reverseGeocode(this.location.lat, this.location.lng);
    }
  }

  private reverseGeocode(lat: number, lng: number): void {
    // In a real app, you would call a geocoding service here
    // For this example, we'll just construct a dummy address
    this.location.address = `Enlem: ${lat.toFixed(6)}, Boylam: ${lng.toFixed(6)}`;
    
    // In production, you might use Nominatim or another service:
    // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    // fetch(url).then(response => response.json()).then(data => {
    //   this.location.address = data.display_name;
    // });
  }

  onLearnPosition(): void {
    // Get user's current location if supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.location.lat = latitude;
          this.location.lng = longitude;
          this.marker.setLatLng([latitude, longitude]);
          this.map.setView([latitude, longitude], 15);
          this.reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location', error);
          alert('Konum alınamadı: ' + error.message);
        }
      );
    } else {
      alert('Tarayıcınız konum hizmetlerini desteklemiyor.');
    }
  }

  onSave(): void {
    this.dialogRef.close(this.location);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 