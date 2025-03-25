import { Routes } from '@angular/router';
import { UrunTanimlamaComponent } from './uruntanimlama.component';
import { UrunlerListComponent } from './list/list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
export default [
    {
        path: '',
        component: UrunTanimlamaComponent,
        children: [
            {
                path: '',
                component: UrunlerListComponent,
            },
            {
                path: 'product-detail',
                component: ProductDetailComponent,
            },
        ],
    },
] as Routes;
