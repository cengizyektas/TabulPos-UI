import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Role {
    id: number;
    name: string;
    friendlyName: string;
}

interface Permission {
    id: number;
    name: string;
    friendlyName: string;
    applicationGroup: number;
}

@Component({
    selector: 'app-permission-screen',
    templateUrl: './app-permission.component.html',
    styleUrls: ['./app-permission.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
    ],
})
export class AppPermissionComponent implements OnInit {
    roles: Role[] = [];
    permissions: Permission[] = [];
    savePermissions = new EventEmitter<any>();

    permissionMatrix: {
        [permissionId: number]: { [roleId: number]: boolean };
    } = {};
    permissionGroups: { [key: string]: Permission[] } = {};

    constructor() {}

    ngOnInit(): void {
        this.roles = [
            { id: 1, name: 'Garson', friendlyName: 'Garson' },
            { id: 2, name: 'Mutfak', friendlyName: 'Mutfak' },
            { id: 3, name: 'Kurye', friendlyName: 'Kurye' },
            { id: 4, name: 'Kasa', friendlyName: 'Kasa' },
            { id: 5, name: 'Müdür', friendlyName: 'Müdür' },
            { id: 6, name: 'ÇağrıMerkezi', friendlyName: 'Çağrı Merkezi' },
        ];
        this.permissions = [
            {
                id: 112,
                name: 'TableOperations',
                friendlyName: 'Masa ve Bölge İşlemleri.',
                applicationGroup: 1,
            },
            {
                id: 113,
                name: 'RestaurantGeneral',
                friendlyName: 'Restoran ile ilgili genel tanımlamalar.',
                applicationGroup: 1,
            },
            {
                id: 114,
                name: 'CategoryProduct',
                friendlyName: 'Kategori ve Ürün İşlemleri.',
                applicationGroup: 1,
            },
            {
                id: 115,
                name: 'UserOperations',
                friendlyName: 'Genel kullanıcı işlemleri.',
                applicationGroup: 1,
            },
            {
                id: 116,
                name: 'Authorization',
                friendlyName: 'Yetkilendirme işlemleri',
                applicationGroup: 1,
            },
            {
                id: 117,
                name: 'StockEntry',
                friendlyName: 'Stok girişi,stok sayımı işlemleri.',
                applicationGroup: 1,
            },
            {
                id: 118,
                name: 'FoodBasketStatus',
                friendlyName:
                    'Yemek Sepeti üzerinde restoran durumunu değiştirebilir',
                applicationGroup: 1,
            },
            {
                id: 119,
                name: 'B2BOrder',
                friendlyName: 'B2B Sipariş Verebilir',
                applicationGroup: 1,
            },
            {
                id: 120,
                name: 'StockView',
                friendlyName: 'Stok Miktarlarını görüntüleyebilir.',
                applicationGroup: 1,
            },
            {
                id: 121,
                name: 'CentralIntegration',
                friendlyName: 'Merkezi entegrasyon durumlarını yönetebilir.',
                applicationGroup: 1,
            },
            {
                id: 122,
                name: 'CentralSync',
                friendlyName: 'Merkezi eşleştirme yapabilir',
                applicationGroup: 1,
            },
            {
                id: 123,
                name: 'IntegrationProducts',
                friendlyName:
                    'Entegrasyon Ürünlerini ve Fiyatlarını yönetebilir.',
                applicationGroup: 1,
            },
            {
                id: 124,
                name: 'IntegrationView',
                friendlyName:
                    'Entegrasyonlar ekranını görebilir ve işlem yapabilir',
                applicationGroup: 1,
            },
        ];
        this.initializePermissionMatrix();
        this.groupPermissionsByCategory();
    }

    initializePermissionMatrix(): void {
        this.permissions.forEach((permission) => {
            this.permissionMatrix[permission.id] = {};
            this.roles.forEach((role) => {
                this.permissionMatrix[permission.id][role.id] = false;
            });
        });
    }
    groupPermissionsByCategory(): void {
        this.permissionGroups = {};

        this.permissions.forEach((permission) => {
            const category =
                permission.applicationGroup.toString() || 'Sınıflandırılmamış';
            if (!this.permissionGroups[category]) {
                this.permissionGroups[category] = [];
            }
            this.permissionGroups[category].push(permission);
        });
    }

    togglePermission(permissionId: number, roleId: number): void {
        this.permissionMatrix[permissionId][roleId] =
            !this.permissionMatrix[permissionId][roleId];
    }

    onSave(): void {
        this.savePermissions.emit(this.permissionMatrix);
    }

    getCategoryName(groupId: string): string {
        if (groupId === '1') {
            return 'Restaurant Tanım Yetkilendirmeleri';
        } else if (groupId === '2') {
            return 'Gider/Masraf İşlemler';
        }
        return groupId;
    }
}
