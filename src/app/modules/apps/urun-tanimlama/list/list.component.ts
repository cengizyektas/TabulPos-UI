import { AsyncPipe, NgClass,CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NotesLabelsComponent } from 'app/modules/apps/urun-tanimlama/labels/labels.component';
import { UrunService } from 'app/modules/apps/urun-tanimlama/uruntanim.service';
import { Kategori, Urun } from 'app/modules/apps/urun-tanimlama/uruntanim.types';

import { cloneDeep } from 'lodash-es';
import {
    BehaviorSubject,
    Observable,
    Subject,
    combineLatest,
    distinctUntilChanged,
    map,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'urunler-list',
    templateUrl:'./list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatSidenavModule,
        MatRippleModule,
        CommonModule,
        NgClass,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        FuseMasonryComponent,
        AsyncPipe,
        RouterModule
    ],
})
export class UrunlerListComponent implements OnInit, OnDestroy {
    kategoriler$: Observable<Kategori[]>;
    urunler$: Observable<Urun[]>;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    filter$: BehaviorSubject<string> = new BehaviorSubject('urunler');
    searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
    masonryColumns: number = 4;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matDialog: MatDialog,
        private _urunlerservis: UrunService
    ) {}

    get filterStatus(): string {
        return this.filter$.value;
    }


    ngOnInit(): void {
        this._urunlerservis.getKategoriler().subscribe();
        this._urunlerservis.getUrunler().subscribe();

        this.kategoriler$ = this._urunlerservis.kategoriler$;
        
        this.urunler$ =combineLatest([
            this._urunlerservis.urunler$,
            this.filter$,
            this.searchQuery$,
        ]).pipe(
            distinctUntilChanged(),
            map(([urunler, filter, searchQuery]) => {
                if (!urunler || !urunler.length) {
                    return;
                }

                // Store the filtered notes
                let filteredUrunler = urunler;

                // Filter by query
                if (searchQuery) {
                    searchQuery = searchQuery.trim().toLowerCase();
                    filteredUrunler = filteredUrunler.filter(
                        (urun) =>
                            urun.urunAdi.toLowerCase().includes(searchQuery) ||
                        urun.urunKodu.toLowerCase().includes(searchQuery)
                    );
                }

                // Show all
                if (filter === 'urunler') {
                    // Do nothing
                }

                const isArchive = filter === 'aktif';
                filteredUrunler = filteredUrunler.filter(
                    (urun) => urun.aktif != isArchive
                );

                // Filter by label

              
                if (filter.startsWith('kategori:')) {
                     const labelId = filter.split(':')[1];
                    filteredUrunler = filteredUrunler.filter(
                        (urun) =>
                            urun.kategoriId.includes(labelId)
                    );
                }

                return filteredUrunler;
            })
        );

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // We're not using masonry columns anymore so this is simplified
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    // Add touch-specific methods
    /**
     * Handle product card tap/click
     * @param urun The product that was tapped
     */
    onProductTap(urun: Urun): void {
        // Navigate to product detail or show quick preview
        console.log('Product tapped:', urun);
        // Implement your navigation logic here
    }

    /**
     * Edit the product
     * @param urun The product to edit
     */
    onEdit(urun: Urun): void {
        console.log('Edit product:', urun);
        // Implement your editing logic here
    }

    /**
     * View product details
     * @param urun The product to view
     */
    onView(urun: Urun): void {
        console.log('View product:', urun);
        // Implement your view logic here
    }

    /**
     * Delete the product
     * @param urun The product to delete
     */
    onDelete(urun: Urun): void {
        console.log('Delete product:', urun);
        // Implement your delete logic here
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

 
    /**
     * Open the edit labels dialog
     */
    openEditLabelsDialog(): void {
        this._matDialog.open(NotesLabelsComponent, { autoFocus: false });
    }

    filterByArchived(): void {
        this.filter$.next('aktif');
    }

    /**
     * Filter by label
     *
     * @param labelId
     */
    filterByLabel(labelId: string): void {
        const filterValue = `kategori:${labelId}`;
        this.filter$.next(filterValue);
    }

    /**
     * Filter by query
     *
     * @param query
     */
    filterByQuery(query: string): void {
        this.searchQuery$.next(query);
    }

    /**
     * Reset filter
     */
    resetFilter(): void {
        this.filter$.next('urunler');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {       
        return item.id || index;
    }
}
