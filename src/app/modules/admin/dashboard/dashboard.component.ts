import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { FirmaService, Firma } from '../../../services/firma.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatTabsModule,
        NgApexchartsModule,
        MatTableModule,
        MatProgressSpinnerModule
    ]
})
export class DashboardComponent implements OnInit {
    // GitHub Sorunlar Özeti
    githubIssues = {
        newIssues: 214,
        closedIssues: 75,
        fixed: 3,
        wontFix: 4,
        reopened: 8,
        needsTriage: 6
    };

    // Yeni ve Kapatılan sorunlar grafiği
    newVsClosedChartOptions: any;
    
    // Günlük satış grafiği
    dailySalesChartOptions: any;
    
    // Bugünün verileri
    todaysData = {
        totalSales: '₺210,00',
        guestCount: 3,
        openOrders: '₺167,50',
        expenses: '₺0,00'
    };

    // Firma verileri
    firmaListesi: Firma[] = [];
    displayedColumns: string[] = ['firmaId', 'firmaAdi', 'firmaKodu', 'telefon', 'email', 'aktif'];
    isLoading = true;

    selectedWeek: 'this-week' | 'last-week' = 'this-week';

    constructor(
        private http: HttpClient,
        private firmaService: FirmaService
    ) {}

    ngOnInit(): void {
        this.updateRandomData();
        this.initializeCharts();
        this.loadFirmaList();
    }

    selectWeek(week: 'this-week' | 'last-week'): void {
        this.selectedWeek = week;
    }

    private loadFirmaList(): void {
        this.isLoading = true;
        this.firmaService.getFirmaList().subscribe({
            next: (response) => {
                this.firmaListesi = response.data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Firma listesi yüklenirken hata oluştu:', error);
                this.isLoading = false;
            }
        });
    }

    private updateRandomData(): void {
        // Rastgele veriler oluşturma
        const totalSale = Math.floor(Math.random() * 500) + 100;
        const openOrder = Math.floor(Math.random() * 200) + 50;
        const guests = Math.floor(Math.random() * 10) + 1;
        const expenses = Math.floor(Math.random() * 50);

        // Verileri güncelleme
        this.todaysData = {
            totalSales: `₺${totalSale},00`,
            guestCount: guests,
            openOrders: `₺${openOrder},50`,
            expenses: `₺${expenses},00`
        };

        // Günlük satış grafiği için verileri güncelleme
        const salesData = [
            Math.floor(Math.random() * 50) + 30,  // 00:00
            Math.floor(Math.random() * 50) + 30,  // 01:00
            Math.floor(Math.random() * 30) + 10,  // 02:00
            Math.floor(Math.random() * 10) + 5,   // 03:00
            Math.floor(Math.random() * 5) + 1,    // 04:00
            Math.floor(Math.random() * 5) + 1,    // 05:00
            Math.floor(Math.random() * 10) + 5,   // 06:00
            Math.floor(Math.random() * 20) + 10,  // 07:00
            Math.floor(Math.random() * 30) + 20,  // 08:00
            Math.floor(Math.random() * 40) + 30,  // 09:00
            Math.floor(Math.random() * 50) + 40,  // 10:00
            Math.floor(Math.random() * 60) + 40,  // 11:00
            Math.floor(Math.random() * 80) + 60,  // 12:00
            Math.floor(Math.random() * 60) + 40,  // 13:00
            Math.floor(Math.random() * 40) + 30,  // 14:00
            Math.floor(Math.random() * 50) + 40,  // 15:00
            Math.floor(Math.random() * 60) + 50,  // 16:00
            Math.floor(Math.random() * 70) + 60,  // 17:00
            Math.floor(Math.random() * 80) + 70,  // 18:00
            Math.floor(Math.random() * 90) + 80,  // 19:00
            Math.floor(Math.random() * 70) + 60,  // 20:00
            Math.floor(Math.random() * 60) + 40,  // 21:00
            Math.floor(Math.random() * 40) + 20,  // 22:00
            Math.floor(Math.random() * 30) + 10   // 23:00
        ];

        // Günlük satış grafiği verileri
        this.dailySalesChartOptions = {
            series: [{
                name: 'Satış',
                data: salesData
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                }
            },
            colors: ['#FFC107'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
            },
            yaxis: {
                title: {
                    text: 'Tutar(₺)'
                }
            }
        };
    }

    private initializeCharts(): void {
        // Yeni vs Kapatılan Sorunlar Grafiği
        this.newVsClosedChartOptions = {
            series: [
                {
                    name: 'Yeni Sorunlar',
                    type: 'line',
                    data: [42, 28, 43, 34, 20, 25, 22]
                },
                {
                    name: 'Kapatılan Sorunlar',
                    type: 'column',
                    data: [11, 10, 8, 11, 8, 10, 17]
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [2, 0]
            },
            grid: {
                borderColor: 'rgba(0,0,0,0.1)'
            },
            fill: {
                opacity: 1
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#4758B8', '#AAAAAA'],
            xaxis: {
                categories: ['Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
            }
        };
    }
} 