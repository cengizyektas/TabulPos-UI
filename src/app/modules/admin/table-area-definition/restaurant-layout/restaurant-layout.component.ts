import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularDraggableModule } from 'angular2-draggable';
import { RestaurantArea, RestaurantTable } from '../table-area-definition.type';

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
    ],
    templateUrl: './restaurant-layout.component.html',
    styleUrl: './restaurant-layout.component.scss',
    standalone: true,
})
export class RestaurantLayoutComponent {
    @Input() restaurantArea: RestaurantArea;

    // Aktif seçilen masa
    selectedTable: RestaurantTable | null = null;

    // Yeni masa için varsayılan değerler
    newTableDefaults = {
        square: { width: 150, height: 150, radius: 0 },
        round: { width: 150, height: 150, radius: 1 },
    };

    constructor() {}

    ngOnInit(): void {
        if (!this.restaurantArea) {
            this.createSampleRestaurantArea();
        }
    }
    // Masa seçme işlemi
    selectTable(table: RestaurantTable): void {
        this.selectedTable = table;
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

    addSquareTable(): void {
        const tableCount = this.restaurantArea.tables.length + 1;
        const newTable: RestaurantTable = this.createNewTable(
            `Masa ${tableCount}`,
            false
        );
        this.restaurantArea.tables.push(newTable);
        this.selectedTable = newTable;
        console.log(this.restaurantArea.tables);
    }

    addRoundTable(): void {
        const tableCount = this.restaurantArea.tables.length + 1;
        const newTable: RestaurantTable = this.createNewTable(
            `Masa ${tableCount}`,
            true
        );
        this.restaurantArea.tables.push(newTable);
        this.selectedTable = newTable;
        console.log(this.restaurantArea.tables);
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

        // Örnek masalar ekle
        this.addSquareTable();
        this.addRoundTable();
    }

    // Yeni masa oluştur
    private createNewTable(name: string, isRound: boolean): RestaurantTable {
        const defaults = isRound
            ? this.newTableDefaults.round
            : this.newTableDefaults.square;

        return {
            name: name,
            x: 50,
            y: 50,
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
