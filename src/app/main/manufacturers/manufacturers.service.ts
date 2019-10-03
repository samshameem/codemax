import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'environments/environment';
import { Manufacturer } from 'app/main/manufacturers/manufacturer.model';

@Injectable()
export class ManufacturersService implements Resolve<any>
{
    onManufacturersChanged: BehaviorSubject<any>;
    onManufacturerSelected: BehaviorSubject<any>;

    // onManufacturersChanged: BehaviorSubject<any>;
    onSelectedManufacturersChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    manufacturers: Manufacturer[];
    selectedManufacturers: string[] = [];

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
        this.onManufacturersChanged = new BehaviorSubject({});
        this.onManufacturerSelected = new BehaviorSubject({});

        this.onSelectedManufacturersChanged = new BehaviorSubject([]);
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
            Promise.all([this.getManufacturers()]).then(
                ([data]) => {
                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getManufacturers();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get manufacturers
     *
     * @returns {Promise<any>}
     */
    getManufacturers(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.apiUrl}/manufacturer/getall`)
                .subscribe((response: any) => {
                    if(!response){
                        this.manufacturers = [];
                        // return;
                    } else {
                        this.manufacturers = response;

                        this.manufacturers = this.manufacturers.map(manufacturer => {
                            return new Manufacturer(manufacturer);
                        });                        
                    }

                    this.onManufacturersChanged.next(this.manufacturers);
                    this.onManufacturerSelected.next(this.manufacturers[0]);
                    // this.onManufacturersChanged.next(this.manufacturers);
                    resolve(this.manufacturers);
                }, reject);
        });
    }


    /**
     * Delete manufacturer
     *
     * @param manufacturer
     */
    deleteManufacturer(manufacturer): any {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(`${environment.apiUrl}/manufacturer/delete/${manufacturer.id}`, manufacturer)
                .subscribe(
                    (response: any) => {
                        this._snackBar.open('Deleted', 'Ok', {
                            duration: 2000,
                        });

                        const manufacturerIndex = this.manufacturers.indexOf(manufacturer);
                        this.manufacturers.splice(manufacturerIndex, 1);
                        this.onManufacturersChanged.next(this.manufacturers);
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

    /**
     * Delete selected manufacturers
     */
    deleteSelectedManufacturers(): void {
        for (const manufacturerId of this.selectedManufacturers) {
            const manufacturer = this.manufacturers.find(_manufacturer => {
                return _manufacturer.id === manufacturerId;
            });
            const manufacturerIndex = this.manufacturers.indexOf(manufacturer);
            this.manufacturers.splice(manufacturerIndex, 1);
        }
        this.onManufacturersChanged.next(this.manufacturers);
    }


}
