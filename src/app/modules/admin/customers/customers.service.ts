import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { Customer } from './restaurant-customers.type';




@Injectable({ providedIn: 'root' })
export class CustomerService {
   private _customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject(
        null
    );
    constructor(private _httpClient: HttpClient) {}

    get customers$(): Observable<Customer[]> {
        return this._customers.asObservable();
    }


    getCustomers(): Observable<Customer[]> {
        return dataCustomer.pipe(
            tap((response) => {
                this._customers.next(response);
            })
        );
    }


    getCustomerById(id: number): Observable<Customer> {
        return this.customers$.pipe(
            take(1),
            map((customers) => {
                return customers.find((customer) => customer.customerId === id);
            })
        );
    }
   

    
}
const  dataCustomer = of([{
    isDirty: false,
    name: "Edin ",
    surname: "Džeko",
    email: "cengiz.yekta@example.com",
    phone: "(537) 700 28 57",
    phone2: "(532) 123 45 67",
    credit: 1000.00,
    debit: 23232.00,
    restaurantCustomerAddressId: null,
    addressDescription: "Ev adresi",
    address: "İstanbul, Beşiktaş, Barbaros Bulvarı No:12",
    latitude: 41.0386,
    longitude: 28.9983,
    isCoordinateVerified: true,
    isAddressVerified: false,
    header: "Müşteri Bilgileri",
    town: "Beşiktaş",
    isDefault: true,
    note: "Düzenli müşteri",
    foodDeliveryId: 12345,
    foodDeliveryAddressId: 67890,
    externalAppId: null,
    taxNo: "1234567890",
    addresses: [
        {
            id: 1,
            description: "İş Adresi",
            city: "İstanbul",
            district: "Şişli",
            fullAddress: "Mecidiyeköy, Büyükdere Cd. No:10"
        }
    ],
    city: "İstanbul",
    branchName: "Beşiktaş Şubesi",
    addressIsActive: true,
    roleName: "VIP Müşteri",
    type: "Bireysel",
    district: "Etiler",
    transferredUserId: null,

    paramObject: {
        isDebitCustomer: true,
        openingBalance: 23232.0,
        isNewCustomer: false,
        smsPermitted: true,
        emailPermitted: false,
        pdpaPermitted: null
    },

    userId: 123456,
    restaurantId: 69567,
    customerId: 35824733,
    id: 35824733,
    rowVersion: "AAAAAf3zFkQ=",
    guid: "a55a8f18-48f7-44a2-9863-c6a6c6bc3e85",
    isActive: true,
    insertDate: "2025-03-22T06:30:15.553",
    updateDate: "2025-03-22T06:30:46.45",
    insertUserId: 283785,
    updateUserId: 283785,
    offsetMinute: 180,
    objectState: 1,
    isError: false,
    errorMessage: null,
    errorTitle: null
},
{
    isDirty: false,
    name: "Cengiz",
    surname: "YEKTAŞ",
    email: "cengiz.yekta@example.com",
    phone: "(537) 700 28 57",
    phone2: "(532) 123 45 67",
    credit: 1000.00,
    debit: 23232.00,
    restaurantCustomerAddressId: null,
    addressDescription: "Ev adresi",
    address: "İstanbul, Beşiktaş, Barbaros Bulvarı No:12",
    latitude: 41.0386,
    longitude: 28.9983,
    isCoordinateVerified: true,
    isAddressVerified: false,
    header: "Müşteri Bilgileri",
    town: "Beşiktaş",
    isDefault: true,
    note: "Düzenli müşteri",
    foodDeliveryId: 12345,
    foodDeliveryAddressId: 67890,
    externalAppId: null,
    taxNo: "1234567890",
    addresses: [
        {
            id: 1,
            description: "İş Adresi",
            city: "İstanbul",
            district: "Şişli",
            fullAddress: "Mecidiyeköy, Büyükdere Cd. No:10"
        }
    ],
    city: "İstanbul",
    branchName: "Beşiktaş Şubesi",
    addressIsActive: true,
    roleName: "VIP Müşteri",
    type: "Bireysel",
    district: "Etiler",
    transferredUserId: null,

    paramObject: {
        isDebitCustomer: true,
        openingBalance: 23232.0,
        isNewCustomer: false,
        smsPermitted: true,
        emailPermitted: false,
        pdpaPermitted: null
    },

    userId: 123456,
    restaurantId: 69567,
    customerId: 35824733,
    id: 35824733,
    rowVersion: "AAAAAf3zFkQ=",
    guid: "a55a8f18-48f7-44a2-9863-c6a6c6bc3e85",
    isActive: true,
    insertDate: "2025-03-22T06:30:15.553",
    updateDate: "2025-03-22T06:30:46.45",
    insertUserId: 283785,
    updateUserId: 283785,
    offsetMinute: 180,
    objectState: 1,
    isError: false,
    errorMessage: null,
    errorTitle: null
},{
    isDirty: false,
    name: "Arda",
    surname: "Güler",
    email: "cengiz.yekta@example.com",
    phone: "(537) 700 28 57",
    phone2: "(532) 123 45 67",
    credit: 1000.00,
    debit: 23232.00,
    restaurantCustomerAddressId: null,
    addressDescription: "Ev adresi",
    address: "İstanbul, Beşiktaş, Barbaros Bulvarı No:12",
    latitude: 41.0386,
    longitude: 28.9983,
    isCoordinateVerified: true,
    isAddressVerified: false,
    header: "Müşteri Bilgileri",
    town: "Beşiktaş",
    isDefault: true,
    note: "Düzenli müşteri",
    foodDeliveryId: 12345,
    foodDeliveryAddressId: 67890,
    externalAppId: null,
    taxNo: "1234567890",
    addresses: [
        {
            id: 1,
            description: "İş Adresi",
            city: "İstanbul",
            district: "Şişli",
            fullAddress: "Mecidiyeköy, Büyükdere Cd. No:10"
        }
    ],
    city: "İstanbul",
    branchName: "Beşiktaş Şubesi",
    addressIsActive: true,
    roleName: "VIP Müşteri",
    type: "Bireysel",
    district: "Etiler",
    transferredUserId: null,

    paramObject: {
        isDebitCustomer: true,
        openingBalance: 23232.0,
        isNewCustomer: false,
        smsPermitted: true,
        emailPermitted: false,
        pdpaPermitted: null
    },

    userId: 123456,
    restaurantId: 69567,
    customerId: 35824733,
    id: 35824733,
    rowVersion: "AAAAAf3zFkQ=",
    guid: "a55a8f18-48f7-44a2-9863-c6a6c6bc3e85",
    isActive: true,
    insertDate: "2025-03-22T06:30:15.553",
    updateDate: "2025-03-22T06:30:46.45",
    insertUserId: 283785,
    updateUserId: 283785,
    offsetMinute: 180,
    objectState: 1,
    isError: false,
    errorMessage: null,
    errorTitle: null
},{
    isDirty: false,
    name: "youssef ",
    surname: "en-nesyri",
    email: "cengiz.yekta@example.com",
    phone: "(537) 700 28 57",
    phone2: "(532) 123 45 67",
    credit: 1000.00,
    debit: 23232.00,
    restaurantCustomerAddressId: null,
    addressDescription: "Ev adresi",
    address: "İstanbul, Beşiktaş, Barbaros Bulvarı No:12",
    latitude: 41.0386,
    longitude: 28.9983,
    isCoordinateVerified: true,
    isAddressVerified: false,
    header: "Müşteri Bilgileri",
    town: "Beşiktaş",
    isDefault: true,
    note: "Düzenli müşteri",
    foodDeliveryId: 12345,
    foodDeliveryAddressId: 67890,
    externalAppId: null,
    taxNo: "1234567890",
    addresses: [
        {
            id: 1,
            description: "İş Adresi",
            city: "İstanbul",
            district: "Şişli",
            fullAddress: "Mecidiyeköy, Büyükdere Cd. No:10"
        }
    ],
    city: "İstanbul",
    branchName: "Beşiktaş Şubesi",
    addressIsActive: true,
    roleName: "VIP Müşteri",
    type: "Bireysel",
    district: "Etiler",
    transferredUserId: null,

    paramObject: {
        isDebitCustomer: true,
        openingBalance: 23232.0,
        isNewCustomer: false,
        smsPermitted: true,
        emailPermitted: false,
        pdpaPermitted: null
    },

    userId: 123456,
    restaurantId: 69567,
    customerId: 35824733,
    id: 35824733,
    rowVersion: "AAAAAf3zFkQ=",
    guid: "a55a8f18-48f7-44a2-9863-c6a6c6bc3e85",
    isActive: true,
    insertDate: "2025-03-22T06:30:15.553",
    updateDate: "2025-03-22T06:30:46.45",
    insertUserId: 283785,
    updateUserId: 283785,
    offsetMinute: 180,
    objectState: 1,
    isError: false,
    errorMessage: null,
    errorTitle: null
}]);
