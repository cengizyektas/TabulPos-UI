import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
    createSampleRestaurantData,
    RestaurantAreasModel,
} from '../table-area-definition/table-area-definition.type';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';

@Component({
    selector: 'app-order-panel',
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        MatTabsModule,
        RestaurantPanelComponent,
        RouterModule,
    ],
    templateUrl: './order-panel.component.html',
    styleUrl: './order-panel.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class OrderPanelComponent implements OnInit {
    restaurantData: RestaurantAreasModel;
    
    // Define active status for navigation items
    activeItem: string = 'bolgeler';
    
    // Dark mode state
    isDarkMode: boolean = false;
    
    // Sidebar collapsed state
    sidebarCollapsed: boolean = false;
    
    // Is mobile view
    isMobile: boolean = false;
    
    // Show sidebar on mobile
    showMobileSidebar: boolean = false;

    // Listen to window resize
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.checkIfMobile();
    }
    
    // Check if mobile view
    checkIfMobile(): void {
        this.isMobile = window.innerWidth <= 768;
    }

    // Method to set active navigation item
    setActive(item: string): void {
        this.activeItem = item;
        
        // On mobile, hide sidebar after selection
        if (this.isMobile) {
            this.showMobileSidebar = false;
        }
    }
    
    // Toggle dark mode
    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        
        // Optionally save this preference to localStorage
        localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
    }
    
    // Toggle sidebar collapse state
    toggleSidebar(): void {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        // On mobile, also toggle mobile sidebar
        if (this.isMobile) {
            this.showMobileSidebar = !this.showMobileSidebar;
        }
        
        // Optionally save this preference to localStorage
        localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed ? 'true' : 'false');
    }
    
    // Toggle mobile sidebar
    toggleMobileSidebar(): void {
        this.showMobileSidebar = !this.showMobileSidebar;
    }

    ngOnInit(): void {
        // Check if mobile on init
        this.checkIfMobile();
        
        // Get sample data first
        this.restaurantData = createSampleRestaurantData();
        
        // Override the area names to use nicer salon names
        if (this.restaurantData && this.restaurantData.restaurantAreas && this.restaurantData.restaurantAreas.length) {
            // Set better names for the areas
            const areaNames = ['FENERBAHÇE SALON', 'MENEKŞE RESTORANT', 'KALAMIŞ BAR'];
            
            for (let i = 0; i < this.restaurantData.restaurantAreas.length && i < areaNames.length; i++) {
                this.restaurantData.restaurantAreas[i].name = areaNames[i];
            }
        }
        
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            this.isDarkMode = true;
        }
        
        // Check for saved sidebar state
        const savedSidebarState = localStorage.getItem('sidebarCollapsed');
        if (savedSidebarState === 'true') {
            this.sidebarCollapsed = true;
        }
    }
}
