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
import { UserService } from './users.service';
import { User } from './users.type';

@Component({
    selector: 'app-users2',
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
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {
    users$: Observable<User[]>;
    displayedColumns: string[] = [
        'id',
        'name',
        'email',
        'phoneNumber',
        'rolles',
    ];
    constructor(
        private _usersevices: UserService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._usersevices.getUsers().subscribe();
        this.users$ = this._usersevices.users$
      
    }
    onRowClicked(row: any) {
        console.log('Tıklanan Satır:', row);
    }
}
