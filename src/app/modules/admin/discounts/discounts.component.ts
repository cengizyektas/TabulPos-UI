import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddDiscountsComponent } from './add-discounts/add-discounts.component';
import { DiscountService } from './discounts.service';
import { Discount } from './discounts.type';

@Component({
    selector: 'app-discount',
    imports: [
        MatTableModule,
        MatSidenavModule,
        AsyncPipe,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
    ],
    templateUrl: './discounts.component.html',
    styleUrl: './discounts.component.scss',
})
export class DiscountsComponent {
    discount$: Observable<Discount[]>;
    displayedColumns: string[] = [
        'name',
        'discountType',
        'discountAmount',
        'duzenleSil',
    ];

    constructor(
        private _discountservices: DiscountService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._discountservices.getDiscount().subscribe();
        this.discount$ = this._discountservices.discount$;
    }
    onRowClicked(row: any) {
        console.log('Tıklanan Satır:', row);
    }

    openAddDiscountDialog(): void {
        this._matDialog.open(AddDiscountsComponent, {
            width: '500px', // Dialog genişliği
            height: 'auto', // Yükseklik otomatik
            panelClass: 'custom-dialog-container', // Özel CSS sınıfı
        });
    }
}
