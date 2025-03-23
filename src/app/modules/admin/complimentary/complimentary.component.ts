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
import { AddComplimentaryComponent } from './add-complimentary/add-complimentary.component';
import { Customer } from './complimentary-customers.type';
import { ComplimentaryService } from './complimentary.service';

@Component({
    selector: 'app-complimentary',
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
    templateUrl: './complimentary.component.html',
    styleUrl: './complimentary.component.scss',
})
export class ComplimentaryComponent {
    customers$: Observable<Customer[]>;
    displayedColumns: string[] = ['id', 'name', 'header'];

    constructor(
        private _complimentaryService: ComplimentaryService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._complimentaryService.getCustomers().subscribe();
        this.customers$ = this._complimentaryService.customers$;
        this.openAddCustomerDialog();
    }
    onRowClicked(row: any) {
        console.log('Tıklanan Satır:', row);
    }

    openAddCustomerDialog(): void {
        this._matDialog.open(AddComplimentaryComponent, {
            width: '700px', // Dialog genişliği
            height: 'auto', // Yükseklik otomatik
            panelClass: 'custom-dialog-container', // Özel CSS sınıfı
        });
    }
}
