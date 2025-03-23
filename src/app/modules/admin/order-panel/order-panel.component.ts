import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
    createSampleRestaurantData,
    RestaurantAreasModel,
} from '../table-area-definition/table-area-definition.type';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';

@Component({
    selector: 'app-order-panel',
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        MatTabsModule,
        RestaurantPanelComponent,
    ],
    templateUrl: './order-panel.component.html',
    styleUrl: './order-panel.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class OrderPanelComponent {
    restaurantData: RestaurantAreasModel;

    ngOnInit(): void {
        this.restaurantData = createSampleRestaurantData();
    }
}
