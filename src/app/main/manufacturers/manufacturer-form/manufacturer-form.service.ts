import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class ManufacturerFormService implements Resolve<any>
{
    routeParams: any;
    manufacturer: any;
    onManufacturerChanged: BehaviorSubject<any>;

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
        this.onManufacturerChanged = new BehaviorSubject({});
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
                this.getManufacturer()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Manufacturer
     *
     * @returns {Promise<any>}
     */
    getManufacturer(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onManufacturerChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(`${environment.apiUrl}/manufacturer/get/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.manufacturer = response;
                        this.onManufacturerChanged.next(this.manufacturer);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save manufacturer
     *
     * @param manufacturer
     * @returns {Promise<any>}
     */
    saveManufacturer(manufacturer): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/manufacturer/update/` + manufacturer.id, manufacturer)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add manufacturer
     *
     * @param manufacturer
     * @returns {Promise<any>}
     */
    addManufacturer(manufacturer): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/manufacturer/insert`, manufacturer)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
