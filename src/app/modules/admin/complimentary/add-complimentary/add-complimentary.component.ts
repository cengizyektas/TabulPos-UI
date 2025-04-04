import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-add-customer',
    imports: [MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './add-complimentary.component.html',
    styleUrl: './add-complimentary.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class AddComplimentaryComponent {}
