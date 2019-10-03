import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { Manufacturer } from 'app/main/manufacturers/manufacturer.model';

@Injectable()
export class ModelFormService implements Resolve<any>
{
    routeParams: any;
    model: any;
    onModelChanged: BehaviorSubject<any>;
    onManufacturersChanged: BehaviorSubject<any>;
    manufacturers: Manufacturer[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onModelChanged = new BehaviorSubject({});
        this.onManufacturersChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getModel(),
                this.getManufacturers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Model
     *
     * @returns {Promise<any>}
     */
    getModel(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onModelChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(`${environment.apiUrl}/model/get/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.model = response;
                        this.onModelChanged.next(this.model);
                        resolve(response);
                    }, reject);
            }
        });
    }

    getManufacturers(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.apiUrl}/manufacturer/getall`)
                .subscribe((response: any) => {
                    if (!response) {
                        this.manufacturers = [];
                        // return;
                    } else {
                        this.manufacturers = response;

                        this.manufacturers = this.manufacturers.map(manufacturers => {
                            return new Manufacturer(manufacturers);
                        });
                    }

                    this.onManufacturersChanged.next(this.manufacturers);
                    // this.onManufacturerSelected.next(this.manufacturers[0]);
                    resolve(this.manufacturers);
                }, reject);
        });
    }

    /**
     * Save model
     *
     * @param model
     * @returns {Promise<any>}
     */
    saveModel(model): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/model/update/` + model.id, model)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add model
     *
     * @param model
     * @returns {Promise<any>}
     */
    addModel(model): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/model/insert`, model)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
