import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import {
    kategoriler as kategorilerData,
    urunler as urunlerData,
} from 'app/mock-api/apps/notes/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NotesMockApi {
    private _kategoriler: any[] = kategorilerData;
    private _urunler: any[] = urunlerData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/apps/notes/kategoriler')
            .reply(() => [200, cloneDeep(this._kategoriler)]);

        this._fuseMockApiService
            .onPost('api/apps/notes/kategoriler')
            .reply(({ request }) => {
                // Create a new label
                const kategoriler = {
                    id: FuseMockApiUtils.guid(),
                    baslik: request.body.title,
                };

                // Update the labels
                this._kategoriler.push(kategoriler);

                return [200, cloneDeep(this._kategoriler)];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/notes/kategoriler')
            .reply(({ request }) => {
                // Get label
                const updatedLabel = request.body.kategori;

                // Update the label
                this._kategoriler = this._kategoriler.map((kategori) => {
                    if (kategori.id === updatedLabel.id) {
                        return {
                            ...kategori,
                            baslik: updatedLabel.baslik,
                        };
                    }

                    return kategori;
                });

                return [200, cloneDeep(this._kategoriler)];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Labels - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/notes/kategoriler')
            .reply(({ request }) => {
                // Get label id
                const id = request.params.get('id');

                // Delete the label
                this._kategoriler = this._kategoriler.filter((kategori) => kategori.id !== id);

                // Go through notes and delete the label
                this._urunler = this._urunler.map((note) => ({
                    ...note,
                    labels: note.labels.filter((item) => item !== id),
                }));

                return [200, cloneDeep(this._kategoriler)];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Note Tasks - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/notes/tasks')
            .reply(({ request }) => {
                // Get note and task
                let updatedNote = request.body.note;
                const task = request.body.task;

                // Update the note
                this._urunler = this._urunler.map((note) => {
                    if (note.id === updatedNote.id) {
                        // Update the tasks
                        if (!note.tasks) {
                            note.tasks = [];
                        }

                        note.tasks.push({
                            id: FuseMockApiUtils.guid(),
                            content: task,
                            completed: false,
                        });

                        // Update the updatedNote with the new task
                        updatedNote = cloneDeep(note);

                        return {
                            ...note,
                        };
                    }

                    return note;
                });

                return [200, updatedNote];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Notes - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService.onGet('api/apps/notes/all').reply(() => {
            // Clone the labels and notes
            const kategoriler = cloneDeep(this._kategoriler);
            let urunler = cloneDeep(this._urunler);

            // Attach the labels to the notes
            urunler = urunler.map((urun) => ({
                ...urun,
                kategori: kategoriler.find((kategori) => kategori.id === urun.kategoriId),
            }));

            return [200, urunler];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Notes - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/notes')
            .reply(({ request }) => {
                // Get note
                const note = request.body.note;

                // Add an id
                note.id = FuseMockApiUtils.guid();

                // Push the note
                this._urunler.push(note);

                return [200, note];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Notes - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/notes')
            .reply(({ request }) => {
                // Get note
                const updatedNote = request.body.updatedNote;

                // Update the note
                this._urunler = this._urunler.map((note) => {
                    if (note.id === updatedNote.id) {
                        return {
                            ...updatedNote,
                        };
                    }

                    return note;
                });

                return [200, updatedNote];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Notes - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/notes')
            .reply(({ request }) => {
                // Get the id
                const id = request.params.get('id');
                // Find the note and delete it
                this._urunler.forEach((item, index) => {
                    if (item.id === id) {
                        this._urunler.splice(index, 1);
                    }
                });
                // Return the response
                return [200, true];
            });
    }
}
