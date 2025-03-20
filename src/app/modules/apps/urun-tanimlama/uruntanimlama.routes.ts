import { Routes } from '@angular/router';
import { UrunTanimlamaComponent } from './uruntanimlama.component';
import { NotesListComponent } from './list/list.component';
export default [
    {
        path: '',
        component: UrunTanimlamaComponent,
        children: [
            {
                path: '',
                component: NotesListComponent,
            },
        ],
    },
] as Routes;
