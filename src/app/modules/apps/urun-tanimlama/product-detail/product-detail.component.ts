import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-product-detail',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatTabsModule,
    ],
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean = false;
    private _destroyed$ = new Subject<void>();

    constructor(private _breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
        // Monitor screen size changes
        this._breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(takeUntil(this._destroyed$))
            .subscribe(result => {
                this.isScreenSmall = result.matches;
            });
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
