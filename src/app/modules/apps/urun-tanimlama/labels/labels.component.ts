import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UrunService } from 'app/modules/apps/urun-tanimlama/uruntanim.service';
import { Kategori } from 'app/modules/apps/urun-tanimlama/uruntanim.types';
import {
    Observable,
    Subject,
    debounceTime,
    filter,
    switchMap,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'notes-labels',
    templateUrl: './labels.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        AsyncPipe,
    ],
})
export class NotesLabelsComponent implements OnInit, OnDestroy {
    kategoriler$: Observable<Kategori[]>;

    labelChanged: Subject<Kategori> = new Subject<Kategori>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _urunservis: UrunService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the labels
        this.kategoriler$ = this._urunservis.kategoriler$;

        // Subscribe to label updates
        this.labelChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                filter((label) => label.baslik.trim() !== ''),
                switchMap((label) => this._urunservis.updateKategori(label))
            )
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
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
     * Add label
     *
     * @param title
     */
    addLabel(title: string): void {
        this._urunservis.addKategori(title).subscribe();
    }

    /**
     * Update label
     */
    updateLabel(label: Kategori): void {
        this.labelChanged.next(label);
    }

    /**
     * Delete label
     *
     * @param id
     */
    deleteLabel(id: string): void {
        this._urunservis.deleteKategori(id).subscribe(() => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
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
