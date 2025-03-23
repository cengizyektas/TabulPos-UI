import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { roleTable, User } from './users.type';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    constructor(private _httpClient: HttpClient) {}

    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    getUsers(): Observable<User[]> {
        console.log('Kullanıcılar:', roleTable);
        return of(roleTable.users).pipe(
            tap((response) => {
                this._users.next(response);
            })
        );
    }

    getUserById(id: number): Observable<User> {
        return this.users$.pipe(
            take(1),
            map((users) => users.find((user) => user.id === id))
        );
    }
}
