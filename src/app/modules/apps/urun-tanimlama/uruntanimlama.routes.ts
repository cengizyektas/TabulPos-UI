import { Routes } from '@angular/router';
import { UrunTanimlamaComponent } from './uruntanimlama.component';
import { UrunlerListComponent } from './list/list.component';
export default [
    {
        path: '',
        component: UrunTanimlamaComponent,
        children: [
            {
                path: '',
                component: UrunlerListComponent,
            },
        ],
    },
] as Routes;
