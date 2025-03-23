import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularDraggableModule } from 'angular2-draggable';
import { createSampleRestaurantData, RestaurantAreasModel } from './table-area-definition.type';
import { CommonModule } from '@angular/common';
import { RestaurantLayoutComponent } from './restaurant-layout/restaurant-layout.component';

@Component({
    selector: 'app-table-area-definition',
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        AngularDraggableModule,
        MatTabsModule,
        RestaurantLayoutComponent
    ],
    templateUrl: './table-area-definition.component.html',
    styleUrl: './table-area-definition.component.scss',
})
export class TableAreaDefinitionComponent {

    restaurantData: RestaurantAreasModel;

  ngOnInit(): void {
    // Örnek veriyi yükle
    this.restaurantData = createSampleRestaurantData();
  }
}
