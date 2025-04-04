import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AngularDraggableModule } from 'angular2-draggable';
import {
    RestaurantArea,
    RestaurantTable,
} from '../../table-area-definition/table-area-definition.type';

@Component({
    selector: 'app-restaurant-layout',
    imports: [
        AngularDraggableModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatMenuModule,
    ],
    templateUrl: './restaurant-panel.component.html',
    styleUrl: './restaurant-panel.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class RestaurantPanelComponent {
    @Input() restaurantArea: RestaurantArea;

    // Aktif seçilen masa
    selectedTable: RestaurantTable | null = null;

    // Yeni masa için varsayılan değerler
    newTableDefaults = {
        square: { width: 150, height: 150, radius: 0 },
        round: { width: 150, height: 150, radius: 1 },
    };

    constructor(private router: Router) {}

    ngOnInit(): void {
        if (!this.restaurantArea) {
            this.createSampleRestaurantArea();
        }
    }
    
    // Dolu masaların sayısını hesapla
    getBusyTablesCount(): number {
        if (!this.restaurantArea?.tables) return 0;
        return this.restaurantArea.tables.filter(table => table.status === 1).length;
    }
    
    // Rezerve masaların sayısını hesapla
    getReservedTablesCount(): number {
        if (!this.restaurantArea?.tables) return 0;
        return this.restaurantArea.tables.filter(table => table.status === 2).length;
    }
    
    // Masa seçme işlemi - sipariş detay sayfasına yönlendir
    selectTable(table: RestaurantTable): void {
        this.selectedTable = table;
        this.router.navigate(['/order-detail'], {
            queryParams: {
                tableId: table.id.toString(),
                tableName: table.name
            }
        });
    }

    // Masa taşıma işlemi tamamlandığında
    onMoveEnd(event, table: RestaurantTable) {
        table.x = event.x;
        table.y = event.y;
    }

    // Masa boyutlandırma işlemi tamamlandığında
    onTableResized(event: any, table: RestaurantTable): void {
        table.width = event.size.width;
        table.height = event.size.height;
    }

    // Masa şekli kontrolü (yuvarlak mı?)
    isRoundTable(table: RestaurantTable): boolean {
        return table.paramObject && table.paramObject.radius === 1;
    }
    
    // Sipariş oluşturulduğundan beri geçen süreyi hesapla
    getElapsedTime(dateString: string): string {
        if (!dateString) return '';
        
        const orderDate = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - orderDate.getTime();
        
        // Dakika cinsinden süre
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) {
            return `${diffMins} dakika`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            
            // Saat ve dakika için tek satırda basitleştirilmiş format
            if (mins === 0) {
                return `${hours} saat`;
            } else {
                return `${hours} s ${mins} dk`;
            }
        }
    }

    addSquareTable(): void {
        const tableCount = this.restaurantArea.tables.length + 1;
        const newTable: RestaurantTable = this.createNewTable(
            `Masa ${tableCount}`,
            false
        );
        this.restaurantArea.tables.push(newTable);
        this.selectedTable = newTable;
    }

    addRoundTable(): void {
        const tableCount = this.restaurantArea.tables.length + 1;
        const newTable: RestaurantTable = this.createNewTable(
            `Masa ${tableCount}`,
            true
        );
        this.restaurantArea.tables.push(newTable);
        this.selectedTable = newTable;
    }

    deleteSelectedTable(): void {
        if (this.selectedTable) {
            const index = this.restaurantArea.tables.findIndex(
                (t) => t.id === this.selectedTable.id
            );
            if (index !== -1) {
                this.restaurantArea.tables.splice(index, 1);
                this.selectedTable = null;
            }
        }
    }

    // Örnek bir RestaurantArea oluştur (test için)
    private createSampleRestaurantArea(): void {
        this.restaurantArea = {
            name: 'Salon',
            region: null,
            zoneBackground: null,
            sortNo: 1,
            salesChannelId: 1,
            tables: [],
            paramObject: null,
            userId: 0,
            restaurantId: 1,
            customerId: null,
            id: 1,
            rowVersion: '',
            guid: this.generateGuid(),
            isActive: true,
            insertDate: new Date().toISOString(),
            updateDate: new Date().toISOString(),
            insertUserId: 1,
            updateUserId: 1,
            offsetMinute: 0,
            objectState: 1,
            isError: false,
            errorMessage: null,
            errorTitle: null,
        };

        // Örnek masalar ekle ve bazılarına sipariş ekle
        const table1 = this.createNewTable('Masa 1', false);
        table1.status = 1; // Dolu masa
        table1.orderTotal = 245.50;
        table1.orderInsertDate = new Date(Date.now() - 45 * 60000).toISOString(); // 45 dakika önce
        
        const table2 = this.createNewTable('Masa 2', true);
        table2.status = 0; // Boş masa
        
        const table3 = this.createNewTable('Masa 3', false);
        table3.status = 2; // Rezerve masa
        table3.reservName = 'Ahmet Yılmaz';
        table3.reservTime = new Date(Date.now() + 60 * 60000).toISOString(); // 1 saat sonra
        
        const table4 = this.createNewTable('Masa 4', true);
        table4.status = 1; // Dolu masa
        table4.isWaitingPayment = true;
        table4.orderTotal = 358.75;
        table4.orderInsertDate = new Date(Date.now() - 90 * 60000).toISOString(); // 90 dakika önce
        
        this.restaurantArea.tables = [table1, table2, table3, table4];
    }

    // Yeni masa oluştur
    private createNewTable(name: string, isRound: boolean): RestaurantTable {
        const defaults = isRound
            ? this.newTableDefaults.round
            : this.newTableDefaults.square;

        return {
            name: name,
            x: 50 + (this.restaurantArea?.tables?.length || 0) * 200,
            y: 50 + (this.restaurantArea?.tables?.length || 0) * 50,
            width: defaults.width,
            height: defaults.height,
            status: 0,
            orderStatus: 0,
            orderId: null,
            orderUserId: null,
            capacity: 4,
            restaurantAreaId: this.restaurantArea.id,
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
            paramObject: {
                x: 0,
                y: 0,
                height: 0,
                radius: isRound ? 1 : 0,
                lastAmountChangedTime: null,
            },
            userId: 0,
            restaurantId: this.restaurantArea.restaurantId,
            customerId: null,
            id: this.generateTempId(),
            rowVersion: '',
            guid: this.generateGuid(),
            isActive: true,
            insertDate: new Date().toISOString(),
            updateDate: new Date().toISOString(),
            insertUserId: 1,
            updateUserId: 1,
            offsetMinute: 0,
            objectState: 1,
            isError: false,
            errorMessage: null,
            errorTitle: null,
        };
    }

    // Geçici ID oluştur
    private generateTempId(): number {
        return -Math.floor(Math.random() * 10000);
    }

    // GUID oluştur
    private generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }
}
