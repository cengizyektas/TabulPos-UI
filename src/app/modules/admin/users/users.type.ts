export class Role {
    name: string;
    friendlyName: string;
    applicationGroup: number;
    isSelected: boolean;
    userId: number;
    restaurantId: number;
    customerId: number | null;
    id: number;
    rowVersion: any;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number | null;
    updateUserId: number | null;
    offsetMinute: number;
    objectState: number;
    isError: boolean;
    errorMessage: string | null;
    errorTitle: string | null;

    constructor(data: any) {
        this.name = data.name;
        this.friendlyName = data.friendlyName;
        this.applicationGroup = data.applicationGroup;
        this.isSelected = data.isSelected;
        this.userId = data.userId;
        this.restaurantId = data.restaurantId;
        this.customerId = data.customerId;
        this.id = data.id;
        this.rowVersion = data.rowVersion;
        this.guid = data.guid;
        this.isActive = data.isActive;
        this.insertDate = data.insertDate;
        this.updateDate = data.updateDate;
        this.insertUserId = data.insertUserId;
        this.updateUserId = data.updateUserId;
        this.offsetMinute = data.offsetMinute;
        this.objectState = data.objectState;
        this.isError = data.isError;
        this.errorMessage = data.errorMessage;
        this.errorTitle = data.errorTitle;
    }
}

export class UserRole {
    userId: number;
    roleId: number;
    role: Role;
    restaurantId: number;
    customerId: number | null;
    id: number;
    rowVersion: any;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number | null;
    updateUserId: number | null;
    offsetMinute: number;
    objectState: number;
    isError: boolean;
    errorMessage: string | null;
    errorTitle: string | null;

    constructor(data: any) {
        this.userId = data.userId;
        this.roleId = data.roleId;
        this.role = new Role(data.role);
        this.restaurantId = data.restaurantId;
        this.customerId = data.customerId;
        this.id = data.id;
        this.rowVersion = data.rowVersion;
        this.guid = data.guid;
        this.isActive = data.isActive;
        this.insertDate = data.insertDate;
        this.updateDate = data.updateDate;
        this.insertUserId = data.insertUserId;
        this.updateUserId = data.updateUserId;
        this.offsetMinute = data.offsetMinute;
        this.objectState = data.objectState;
        this.isError = data.isError;
        this.errorMessage = data.errorMessage;
        this.errorTitle = data.errorTitle;
    }
}

export  class User {
    name: string;
    surname: string;
    identityNumber: string | null;
    password: string | null;
    email: string;
    userName: string;
    tsmPassword: string | null;
    pin: number;
    phoneNumber: string;
    countryCode: string | null;
    isUserValidated: boolean | null;
    lastLoginTime: string;
    lastLogoutTime: string;
    lastMobileLogin: string | null;
    lastWinLogin: string | null;
    isUsingNewVersion: boolean;
    isCallerIdUser: boolean;
    roles: UserRole[];
    areas: any[];
    paramObject: {
        isUsingNewVersion: boolean;
        isSmsNotification: boolean;
        isEmailNotification: boolean;
        isWebNotification: boolean;
        hasSeenOrderOnboarding: boolean;
        isNotShowNewPriceMessage: boolean;
        hideNewPriceLastCallMessage: boolean;
        clickedNewVersionLink: boolean;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        previousEmail: string;
        previousPhone: string;
        isReadInformationMessages: boolean;
        isUserLoginBlocked: boolean;
        isCanUsePatronMobile: boolean;
        autoAssignToAllBranch: boolean;
        lastPasswordDate: string;
    };
    userId: number;
    restaurantId: number;
    customerId: number;
    id: number;
    rowVersion: any;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number | null;
    updateUserId: number | null;
    offsetMinute: number;
    objectState: number;
    isError: boolean;
    errorMessage: string | null;
    errorTitle: string | null;

    constructor(data: any) {
        this.name = data.name;
        this.surname = data.surname;
        this.identityNumber = data.identityNumber;
        this.password = data.password;
        this.email = data.email;
        this.userName = data.userName;
        this.tsmPassword = data.tsmPassword;
        this.pin = data.pin;
        this.phoneNumber = data.phoneNumber;
        this.countryCode = data.countryCode;
        this.isUserValidated = data.isUserValidated;
        this.lastLoginTime = data.lastLoginTime;
        this.lastLogoutTime = data.lastLogoutTime;
        this.lastMobileLogin = data.lastMobileLogin;
        this.lastWinLogin = data.lastWinLogin;
        this.isUsingNewVersion = data.isUsingNewVersion;
        this.isCallerIdUser = data.isCallerIdUser;
        this.roles = data.roles.map((role: any) => new UserRole(role));
        this.areas = data.areas;
        this.paramObject = data.paramObject;
        this.userId = data.userId;
        this.restaurantId = data.restaurantId;
        this.customerId = data.customerId;
        this.id = data.id;
        this.rowVersion = data.rowVersion;
        this.guid = data.guid;
        this.isActive = data.isActive;
        this.insertDate = data.insertDate;
        this.updateDate = data.updateDate;
        this.insertUserId = data.insertUserId;
        this.updateUserId = data.updateUserId;
        this.offsetMinute = data.offsetMinute;
        this.objectState = data.objectState;
        this.isError = data.isError;
        this.errorMessage = data.errorMessage;
        this.errorTitle = data.errorTitle;
    }
}

export class RoleTable {
    allRoles: Role[];
    users: User[];
    userId: number;
    restaurantId: number;
    customerId: number | null;
    id: number;
    rowVersion: any;
    guid: string;
    isActive: boolean;
    insertDate: string;
    updateDate: string;
    insertUserId: number | null;
    updateUserId: number | null;
    offsetMinute: number;
    objectState: number;
    isError: boolean;
    errorMessage: string | null;
    errorTitle: string | null;

    constructor(data: any) {
        this.allRoles = data.allRoles.map((role: any) => new Role(role));
        this.users = data.users.map((user: any) => new User(user));
        this.userId = data.userId;
        this.restaurantId = data.restaurantId;
        this.customerId = data.customerId;
        this.id = data.id;
        this.rowVersion = data.rowVersion;
        this.guid = data.guid;
        this.isActive = data.isActive;
        this.insertDate = data.insertDate;
        this.updateDate = data.updateDate;
        this.insertUserId = data.insertUserId;
        this.updateUserId = data.updateUserId;
        this.offsetMinute = data.offsetMinute;
        this.objectState = data.objectState;
        this.isError = data.isError;
        this.errorMessage = data.errorMessage;
        this.errorTitle = data.errorTitle;
    }
}

const jsonData =
{
    "allRoles": [
        {
            "name": "RestaurantWaiter",
            "friendlyName": "Garson",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 3,
            "rowVersion": null,
            "guid": "18d5641b-e572-49b4-89da-245dd6f94588",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "RestaurantKitchen",
            "friendlyName": "Mutfak",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 4,
            "rowVersion": null,
            "guid": "f11da07b-550f-491a-bae9-98ee6406045f",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "RestaurantDelivery",
            "friendlyName": "Kurye",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 5,
            "rowVersion": null,
            "guid": "e4fb8036-de29-4372-bd68-1c864d8661ec",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "RestaurantCase",
            "friendlyName": "Kasa",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 6,
            "rowVersion": null,
            "guid": "dd1d87aa-1b1a-4025-84c7-0fd950f3b049",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "RestaurantManager",
            "friendlyName": "Müdür",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 7,
            "rowVersion": null,
            "guid": "501ee8c5-4215-42b9-992d-f3583b076c69",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "Callcenter",
            "friendlyName": "Çağrı Merkezi",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 10,
            "rowVersion": null,
            "guid": "70c9b5ea-0ef8-4c73-b44d-69684dfaed93",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        },
        {
            "name": "Technical",
            "friendlyName": "Teknik",
            "applicationGroup": 1,
            "isSelected": false,
            "userId": 0,
            "restaurantId": 0,
            "customerId": null,
            "id": 20,
            "rowVersion": null,
            "guid": "72c584c8-d0e9-4255-8bd8-a3d44c2018d4",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        }
    ],
    "users": [
        {
            "name": "yektas",
            "surname": "",
            "identityNumber": null,
            "password": null,
            "email": "yektas3041@gmail.com",
            "userName": "5437916577",
            "tsmPassword": null,
            "pin": 0,
            "phoneNumber": "5437916577",
            "countryCode": null,
            "isUserValidated": null,
            "lastLoginTime": "2025-03-23T00:41:44.853",
            "lastLogoutTime": "2025-03-23T00:41:23.487",
            "lastMobileLogin": null,
            "lastWinLogin": null,
            "isUsingNewVersion": false,
            "isCallerIdUser": false,
            "roles": [
                {
                    "userId": 283785,
                    "roleId": 2,
                    "role": {
                        "name": "RestaurantAdmin",
                        "friendlyName": "İşletme Yönetici",
                        "applicationGroup": 1,
                        "isSelected": false,
                        "userId": 0,
                        "restaurantId": 0,
                        "customerId": null,
                        "id": 2,
                        "rowVersion": null,
                        "guid": "4ac558fa-d537-4de7-b9a1-01c6cae07cc2",
                        "isActive": true,
                        "insertDate": "0001-01-01T00:00:00",
                        "updateDate": "0001-01-01T00:00:00",
                        "insertUserId": null,
                        "updateUserId": null,
                        "offsetMinute": 0,
                        "objectState": 0,
                        "isError": false,
                        "errorMessage": null,
                        "errorTitle": null
                    },
                    "restaurantId": 0,
                    "customerId": null,
                    "id": 0,
                    "rowVersion": null,
                    "guid": "6f9a6a30-d06b-49ce-93dd-ca8c712ae933",
                    "isActive": true,
                    "insertDate": "0001-01-01T00:00:00",
                    "updateDate": "0001-01-01T00:00:00",
                    "insertUserId": null,
                    "updateUserId": null,
                    "offsetMinute": 0,
                    "objectState": 1,
                    "isError": false,
                    "errorMessage": null,
                    "errorTitle": null
                }
            ],
            "areas": [],
            "paramObject": {
                "isUsingNewVersion": false,
                "isSmsNotification": false,
                "isEmailNotification": false,
                "isWebNotification": false,
                "hasSeenOrderOnboarding": false,
                "isNotShowNewPriceMessage": false,
                "hideNewPriceLastCallMessage": false,
                "clickedNewVersionLink": false,
                "isEmailVerified": false,
                "isPhoneVerified": false,
                "previousEmail": "",
                "previousPhone": "",
                "isReadInformationMessages": false,
                "isUserLoginBlocked": false,
                "isCanUsePatronMobile": false,
                "autoAssignToAllBranch": false,
                "lastPasswordDate": "2025-03-22T06:21:00.2107884Z"
            },
            "userId": 0,
            "restaurantId": 0,
            "customerId": 66931,
            "id": 283785,
            "rowVersion": null,
            "guid": "134af003-730f-471d-8b8e-63dc1fa17987",
            "isActive": true,
            "insertDate": "0001-01-01T00:00:00",
            "updateDate": "0001-01-01T00:00:00",
            "insertUserId": null,
            "updateUserId": null,
            "offsetMinute": 0,
            "objectState": 0,
            "isError": false,
            "errorMessage": null,
            "errorTitle": null
        }
    ],
    "userId": 0,
    "restaurantId": 0,
    "customerId": null,
    "id": 0,
    "rowVersion": null,
    "guid": "8b542804-2f1b-49ff-b4bb-1465c8506a7a",
    "isActive": true,
    "insertDate": "0001-01-01T00:00:00",
    "updateDate": "0001-01-01T00:00:00",
    "insertUserId": null,
    "updateUserId": null,
    "offsetMinute": 0,
    "objectState": 1,
    "isError": false,
    "errorMessage": null,
    "errorTitle": null
}
export const roleTable = new RoleTable(jsonData);
