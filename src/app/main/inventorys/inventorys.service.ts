import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'environments/environment';
import { Inventory } from 'app/main/inventorys/inventory.model';

@Injectable()
export class InventorysService implements Resolve<any>
{
    onInventorysChanged: BehaviorSubject<any>;
    onModelsChanged: BehaviorSubject<any>;

    inventorys: Inventory[];
    model: any;

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
        this.onInventorysChanged = new BehaviorSubject({});
        this.onModelsChanged = new BehaviorSubject({});
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
            Promise.all([this.getInventorys()]).then(
                ([data]) => {
                    this.onInventorysChanged.subscribe(inventory => {
                        this.inventorys = inventory;
                        // this.getInventorys();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get inventorys
     *
     * @returns {Promise<any>}
     */
    getInventorys(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${environment.apiUrl}/model/getInventory`)
                .subscribe((response: any) => {
                    if(!response){
                        this.inventorys = [];
                        // return;
                    } else {
                        this.inventorys = response;

                        this.inventorys = this.inventorys.map(inventory => {
                            return new Inventory(inventory);
                        });                        
                    }

                    this.onInventorysChanged.next(this.inventorys);
                    resolve(this.inventorys);
                }, reject);
        });
    }

    /**
     * Update inventory
     *
     * @param inventory
     * @returns {Promise<any>}
     */
    sold(model): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(`${environment.apiUrl}/model/sold/`+ model.id, model)
                .subscribe(response => {
                    this._snackBar.open('sold', 'Ok', {
                        duration: 2000,
                    });

                    const departmentIndex = this.model.indexOf(model);
                    this.model.splice(departmentIndex, 1);
                    this.onModelsChanged.next(this.model);
                    // this.onInventorysChanged.next(this.inventorys);
                    this.getInventorys();
                    resolve(response);
                });
        });
    }

    /**
     * Delete inventory
     *
     * @param inventory
     */
    deleteInventory(inventory): any {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(`${environment.apiUrl}/inventory/delete/${inventory.id}`, inventory)
                .subscribe(
                    (response: any) => {
                        this._snackBar.open('Deleted', 'Ok', {
                            duration: 2000,
                        });

                        const inventoryIndex = this.inventorys.indexOf(inventory);
                        this.inventorys.splice(inventoryIndex, 1);
                        this.onInventorysChanged.next(this.inventorys);
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

    getInventory(model): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/model/getInven/${model.model_name}`)
                .subscribe((response: any) => {
                    this.model = response;

                    this.onModelsChanged.next(this.model);
                    resolve(this.model);
                    return response;
                }, reject);
        });
    }
}
