// Temel sınıf - ortak alanlar için
export class BaseEntity {
    id: number;
    rowVersion: string;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number;
    updateUserId: number;
    offsetMinute: number;
    objectState: number;
    isError: boolean;
    errorMessage: string | null;
    errorTitle: string | null;
    userId: number;
    restaurantId: number;
    customerId: number | null;
}

// Parametre objesi modeli
export class TableParamObject {
    y: number;
    x: number;
    height: number;
    radius: number;
    lastAmountChangedTime: string | null;
}

// Masa modeli
export class RestaurantTable extends BaseEntity {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    status: number;
    orderStatus: number;
    orderId: number | null;
    orderUserId: number | null;
    capacity: number | null;
    restaurantAreaId: number;
    orderTotal: number | null;
    orderPaidTotal: number | null;
    orderInsertDate: string | null;
    orderUpdateDate: string | null;
    reservName: string | null;
    reservTime: string | null;
    isWaitingPayment: boolean;
    qrCodeUrl: string | null;
    displayName: string | null;
    restaurantCustomer: any | null; // Tip genişletilebilir
    paramObject: TableParamObject;
}

// Alan modeli
export class RestaurantArea extends BaseEntity {
    name: string;
    region: string | null;
    zoneBackground: string | null;
    sortNo: number;
    salesChannelId: number;
    tables: RestaurantTable[];
    paramObject: any | null; // Tip genişletilebilir
}

// Tüm restoran alanlarını içeren model
export class RestaurantAreasModel {
    restaurantAreas: RestaurantArea[];
}

// Örnek bir veri oluşturma fonksiyonu
export function createSampleRestaurantData(): RestaurantAreasModel {
    // Örnek masa parametre nesnesi
    const tableParam: TableParamObject = {
        x: 0,
        y: 0,
        height: 0,
        radius: 0,
        lastAmountChangedTime: null,
    };

    // Örnek masa
    const table1: RestaurantTable = {
        name: 'Masa 1',
        x: 20,
        y: 10,
        width: 240,
        height: 145,
        status: 1,
        orderStatus: 2,
        orderId: null,
        orderUserId: null,
        capacity: 5,
        restaurantAreaId: 121513,
        orderTotal: null,
        orderPaidTotal: null,
        orderInsertDate: null,
        orderUpdateDate: null,
        reservName: null,
        reservTime: null,
        isWaitingPayment: false,
        qrCodeUrl: null,
        displayName: null,
        restaurantCustomer: null,
        paramObject: tableParam,
        userId: 0,
        restaurantId: 69567,
        customerId: null,
        id: 1503628,
        rowVersion: 'AAAAAf5d+Tw=',
        guid: '93d46598-6cf8-4e34-9c88-805bc6867998',
        isActive: true,
        insertDate: '2025-03-22T06:23:50.75',
        updateDate: '2025-03-22T19:09:04.01',
        insertUserId: 283785,
        updateUserId: 283785,
        offsetMinute: 0,
        objectState: 1,
        isError: false,
        errorMessage: null,
        errorTitle: null,
    };

    // İkinci bir örnek masa
    const table2: RestaurantTable = {
        ...table1,
        id: 1503629,
        guid: 'a4e57609-7df9-5f45-0d99-916ad7978001',
        name: 'Masa 2',
        x: 270,
        y: 10,
        width: 240,
        height: 145,
        status: 0,
        paramObject: {
            height: 0,
            x: 100,
            y: 100,
            radius: 2,
            lastAmountChangedTime: null,
        },
    };

    // Örnek salon alanı
    const salonArea: RestaurantArea = {
        name: 'FENERBAHÇE SALON',
        region: null,
        zoneBackground: null,
        sortNo: 1,
        salesChannelId: 60484,
        tables: [table1, table2],
        paramObject: null,
        userId: 0,
        restaurantId: 69567,
        customerId: null,
        id: 121513,
        rowVersion: 'AAAAAf3zBG8=',
        guid: '734f518d-0fe3-4acc-9b96-6e9586fdcb2d',
        isActive: true,
        insertDate: '2025-03-22T06:23:34.017',
        updateDate: '2025-03-22T06:24:21.583',
        insertUserId: 283785,
        updateUserId: 283785,
        offsetMinute: 0,
        objectState: 1,
        isError: false,
        errorMessage: null,
        errorTitle: null,
    };

    // İkinci bir örnek alan - bahçe
    const bahceArea: RestaurantArea = {
        ...salonArea,
        id: 121514,
        guid: '856f629d-1gf4-5acc-0c07-7f0697fedd3e',
        name: 'MENEKŞE RESTORANT',
        sortNo: 2,
        tables: [],
    };

    // Üç adet yeni masa ekleyerek mevcut masaların yanına konumlandırma
    const table3: RestaurantTable = {
        ...table1,
        id: 1503630,
        guid: 'b5f68710-8eg0-6g56-1ea0-027be8089112',
        name: 'Masa 3',
        x: 520, // Table2'nin yanında (x:270 + width:240 + 10 boşluk)
        y: 10,   // Table1 ve Table2 ile aynı hizada
        width: 240,
        height: 145,
        status: 0,
    };

    const table4: RestaurantTable = {
        ...table1,
        id: 1503631,
        guid: 'c6g79821-9fh1-7h67-2fb1-138cf9190223',
        name: 'Masa 4',
        x: 770, // Table3'ün yanında (x:520 + width:240 + 10 boşluk)
        y: 10,  // Aynı hizada
        width: 240,
        height: 145,
        status: 0,
    };

    const table5: RestaurantTable = {
        ...table1,
        id: 1503632,
        guid: 'd7h80932-0gi2-8i78-3gc2-249dg0201334',
        name: 'Masa 5',
        x: 1020, // Table4'ün yanında (x:770 + width:240 + 10 boşluk)
        y: 10,   // Aynı hizada
        width: 240,
        height: 145,
        status: 0,
    };

    // Ana veri modeli
    const restaurantData: RestaurantAreasModel = {
        restaurantAreas: [
            {
                ...salonArea,
                tables: [...salonArea.tables, table3, table4, table5]
            }, 
            bahceArea
        ],
    };

    return restaurantData;
}
