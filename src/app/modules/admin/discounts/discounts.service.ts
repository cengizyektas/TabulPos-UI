import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take, tap } from 'rxjs';
import { Discount } from './discounts.type';

@Injectable({ providedIn: 'root' })
export class DiscountService {
    private _discount: BehaviorSubject<Discount[] | null> = new BehaviorSubject(
        null
    );
    constructor(private _httpClient: HttpClient) {}

    get discount$(): Observable<Discount[]> {
        return this._discount.asObservable();
    }

    getDiscount(): Observable<Discount[]> {
        return discountData.pipe(
            tap((response) => {
                this._discount.next(response);
            })
        );
    }

    getDiscountById(id: number): Observable<Discount> {
        return this.discount$.pipe(
            take(1),
            map((discount) => {
                return discount.find<Discount>(
                    (discount): discount is Discount => discount.id === id
                );
            })
        );
    }
}
export const discountData = of([
    {
        name: 'Siber Pazartesi',
        amount: 400.22,
        discountType: 2,
        discountStartDate: '2025-11-24T00:00:00',
        discountFinishDate: '2025-11-24T23:59:59',
        usageType: 1,
        usedDiscount: null,
        remainingDiscount: null,
        userId: 0,
        restaurantId: 69567,
        customerId: null,
        id: 12680,
        rowVersion: 'AAAAAf5DMOs=',
        guid: '819e5c8d-5531-4869-bf38-278a7908ec6e',
        isActive: true,
        insertDate: '2025-03-22T17:12:03.81',
        updateDate: '2025-03-22T17:12:03.81',
        insertUserId: 283785,
        updateUserId: 0,
        offsetMinute: 0,
        objectState: 1,
        isError: false,
        errorMessage: null,
        errorTitle: null,
    },
    {
        name: 'Black Friday',
        amount: 10.0,
        discountType: 1,
        discountStartDate: '2025-11-29T00:00:00',
        discountFinishDate: '2025-11-29T23:59:59',
        usageType: 2,
        usedDiscount: 2.0,
        remainingDiscount: 8.0,
        userId: 12345,
        restaurantId: 69568,
        customerId: 2001,
        id: 12681,
        rowVersion: 'AAAAAf6XYZs=',
        guid: '92d3e7b1-a1c2-4d7b-9b88-5f01e7e6a2f3',
        isActive: true,
        insertDate: '2025-03-22T17:30:00',
        updateDate: '2025-03-22T17:30:00',
        insertUserId: 98765,
        updateUserId: 0,
        offsetMinute: 0,
        objectState: 1,
        isError: false,
        errorMessage: null,
        errorTitle: null,
    },
    {
        name: 'Kamil İndirimi',
        amount: 400.22,
        discountType: 2,
        discountStartDate: '2025-11-24T00:00:00',
        discountFinishDate: '2025-11-24T23:59:59',
        usageType: 1,
        usedDiscount: null,
        remainingDiscount: null,
        userId: 0,
        restaurantId: 69567,
        customerId: null,
        id: 12680,
        rowVersion: 'AAAAAf5DMOs=',
        guid: '819e5c8d-5531-4869-bf38-278a7908ec6e',
        isActive: true,
        insertDate: '2025-03-22T17:12:03.81',
        updateDate: '2025-03-22T17:12:03.81',
        insertUserId: 283785,
        updateUserId: 0,
        offsetMinute: 0,
        objectState: 1,
        isError: false,
        errorMessage: null,
        errorTitle: null,
    },
]);
