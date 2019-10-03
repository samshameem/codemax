import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { InventorysService } from 'app/main/inventorys/inventorys.service';
import { ConfirmDialogComponent } from 'app/partial/confirm-dialog/confirm-dialog.component';
import { InventoryDialogComponent } from 'app/main/inventorys/inventory-dialog/inventory-dialog.component';

@Component({
    selector: 'inventory-list',
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InventorysInventoryListComponent implements OnInit, OnDestroy {
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    inventorys: any;
    user: any;
    dataSource: InventorysDataSource | null;
    // dataSource: MatTableDataSource<InventorysDataSource>;
    displayedColumns = ['name', 'model_name', 'list'];
    selected: any;
    dialogRef: any
    selectedInventorys: any[];

    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InventorysService} _inventorysService
     */
    constructor(
        private _inventorysService: InventorysService,
        public _matDialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.dataSource = new InventorysDataSource(this._inventorysService);

        /* this._inventorysService.onInventorysChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(inventorys => {
                this.inventorys = inventorys;

                this.dataSource = new MatTableDataSource(this.inventorys);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.length = this.inventorys.length;

            }); */

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
    * Delete Inventory
    */
    deleteInventory(inventory): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._inventorysService.deleteInventory(inventory);
            }
            this.confirmDialogRef = null;
        });

    }

    viewInventory(inventory): void {
        this._inventorysService.getInventory(inventory).then((res) => {
            this.dialogRef = this._matDialog.open(InventoryDialogComponent, {
                panelClass: 'inventory-dialog',
                data: {
                    row: res
                }
            });

            this.dialogRef.afterClosed().subscribe(result => {
                this._inventorysService.onInventorysChanged;
                this.dialogRef = null;
            });
        });
    }

}

export class InventorysDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {InventorysService} _inventorysService
     */
    constructor(
        private _inventorysService: InventorysService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._inventorysService.onInventorysChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}