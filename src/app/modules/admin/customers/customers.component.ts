import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerService } from './customers.service';
import { Customer } from './restaurant-customers.type';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
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
})
export class CustomersComponent implements OnInit {
    customers$: Observable<Customer[]>;
    displayedColumns: string[] = [
        'id',
        'name',
        'phone',
        'address',
        'debit',
        'isActive',
    ];
    constructor(
        private _customersevices: CustomerService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._customersevices.getCustomers().subscribe();
        this.customers$ = this._customersevices.customers$;
        console.log(this.customers$);
        this.openAddCustomerDialog();
    }
    onRowClicked(row: any) {
        console.log('Tıklanan Satır:', row);
    }

    openAddCustomerDialog(): void {
        this._matDialog.open(AddCustomerComponent, {
            width: '800px', // Dialog genişliği
            height: 'auto', // Yükseklik otomatik
            panelClass: 'custom-dialog-container', // Özel CSS sınıfı
        });
    }
}
