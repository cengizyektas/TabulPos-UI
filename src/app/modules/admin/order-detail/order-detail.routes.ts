import { Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';

export default [
    {
        path     : '',
        component: OrderDetailComponent,
        data: {
            layout: 'empty'
        }
    }
] as Routes; 