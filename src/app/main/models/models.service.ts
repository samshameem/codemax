import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'environments/environment';
import { Model } from 'app/main/models/model.model';

@Injectable()
export class ModelsService implements Resolve<any>
{
    onModelsChanged: BehaviorSubject<any>;
    onModelSelected: BehaviorSubject<any>;

    // onModelsChanged: BehaviorSubject<any>;
    onSelectedModelsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    models: Model[];
    selectedModels: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _snackBar: MatSnackBar
    ) {

        // Set the defaults
        this.onModelsChanged = new BehaviorSubject({});
        this.onModelSelected = new BehaviorSubject({});

        // this.onModelsChanged = new BehaviorSubject([]);
        this.onSelectedModelsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([this.getModels()]).then(
                ([data]) => {
                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getModels();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get models
     *
     * @returns {Promise<any>}
     */
    getModels(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.apiUrl}/model/getall`)
                .subscribe((response: any) => {
                    if(!response){
                        this.models = [];
                        // return;
                    } else {
                        this.models = response;

                        this.models = this.models.map(model => {
                            return new Model(model);
                        });                        
                    }

                    this.onModelsChanged.next(this.models);
                    this.onModelSelected.next(this.models[0]);
                    // this.onModelsChanged.next(this.models);
                    resolve(this.models);
                }, reject);
        });
    }

    /**
     * Delete model
     *
     * @param model
     */
    deleteModel(model): any {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(`${environment.apiUrl}/model/delete/${model.id}`, model)
                .subscribe(
                    (response: any) => {
                        this._snackBar.open('Deleted', 'Ok', {
                            duration: 2000,
                        });

                        const modelIndex = this.models.indexOf(model);
                        this.models.splice(modelIndex, 1);
                        this.onModelsChanged.next(this.models);
                        resolve();
                    },
                    err => {
                        this._snackBar.open('Error: ' + err.statusText, 'Ok', {
                            duration: 2000,
                        });
                    }
                );
        });
    }

}
