import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Kategori,
    Urun,
} from 'app/modules/apps/urun-tanimlama/uruntanim.types';
import {
    BehaviorSubject,
    Observable,
    map,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UrunService {
    // Private
    private _kategoriler: BehaviorSubject<Kategori[] | null> =
        new BehaviorSubject(null);
    private _Urun: BehaviorSubject<Urun | null> = new BehaviorSubject(null);
    private _urunler: BehaviorSubject<Urun[] | null> = new BehaviorSubject(
        null
    );

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    /**
     * Getter for labels
     */
    get kategoriler$(): Observable<Kategori[]> {
        return this._kategoriler.asObservable();
    }

    /**
     * Getter for notes
     */
    get urunler$(): Observable<Urun[]> {
        return this._urunler.asObservable();
    }

    /**
     * Getter for note
     */
    get note$(): Observable<Urun> {
        return this._Urun.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get labels
     */
    getKategoriler(): Observable<Kategori[]> {
        return this._httpClient
            .get<Kategori[]>('api/apps/notes/kategoriler')
            .pipe(
                tap((response: Kategori[]) => {
                    this._kategoriler.next(response);
                })
            );
    }

    /**
     * Add label
     *
     * @param title
     */
    addKategori(title: string): Observable<Kategori[]> {
        return this._httpClient
            .post<Kategori[]>('api/apps/notes/kategoriler', { title })
            .pipe(
                tap((labels) => {
                    // Update the labels
                    this._kategoriler.next(labels);
                })
            );
    }

    /**
     * Update label
     *
     * @param label
     */
    updateKategori(label: Kategori): Observable<Kategori[]> {
        return this._httpClient
            .patch<Kategori[]>('api/apps/notes/kategoriler', { label })
            .pipe(
                tap((labels) => {
                    // Update the notes
                    this.getUrunler().subscribe();

                    // Update the labels
                    this._kategoriler.next(labels);
                })
            );
    }

    /**
     * Delete a label
     *
     * @param id
     */
    deleteKategori(id: string): Observable<Kategori[]> {
        return this._httpClient
            .delete<
                Kategori[]
            >('api/apps/notes/kategoriler', { params: { id } })
            .pipe(
                tap((labels) => {
                    // Update the notes
                    this.getUrunler().subscribe();

                    // Update the labels
                    this._kategoriler.next(labels);
                })
            );
    }

    /**
     * Get notes
     */
    getUrunler(): Observable<Urun[]> {
        return this._httpClient.get<Urun[]>('api/apps/notes/all').pipe(
            tap((response: Urun[]) => {
                this._urunler.next(response);
            })
        );
    }

    /**
     * Get note by id
     */
    getUrunById(id: string): Observable<Urun> {
        return this._urunler.pipe(
            take(1),
            map((urunler) => {
                // Find within the folders and files
                const urun =urunler.find((value) => value.kategoriId === id) || null; 

                // Update the note
                this._Urun.next(urun);

                // Return the note
                return urun;
            }),
            switchMap((urun) => {
                if (!urun) {
                    return throwError(
                        'Ürün Bılınamadı ' + id + '!'
                    );
                }

                return of(urun);
            })
        );
    }
}
