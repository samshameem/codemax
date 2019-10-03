import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { ManufacturersService } from 'app/main/manufacturers/manufacturers.service';
import { ConfirmDialogComponent } from 'app/partial/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'manufacturer-list',
    templateUrl: './manufacturer-list.component.html',
    styleUrls: ['./manufacturer-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManufacturersManufacturerListComponent implements OnInit, OnDestroy {
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    manufacturers: any;
    user: any;
    // dataSource: ManufacturersDataSource | null;
    dataSource: MatTableDataSource<ManufacturersDataSource>;
    displayedColumns = ['name', 'id', 'buttons'];
    selected: any;
    selectedManufacturers: any[];

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
     * @param {ManufacturersService} _manufacturersService
     */
    constructor(
        private _manufacturersService: ManufacturersService,
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
        // this.dataSource = new ManufacturersDataSource(this._manufacturersService);

        this._manufacturersService.onManufacturersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(manufacturers => {
                this.manufacturers = manufacturers;

                this.dataSource = new MatTableDataSource(this.manufacturers);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.length = this.manufacturers.length;

            });

        this._manufacturersService.onManufacturerSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });

        this._manufacturersService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

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
    * Delete Manufacturer
    */
    deleteManufacturer(manufacturer): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._manufacturersService.deleteManufacturer(manufacturer);
            }
            this.confirmDialogRef = null;
        });

    }

}

export class ManufacturersDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ManufacturersService} _manufacturersService
     */
    constructor(
        private _manufacturersService: ManufacturersService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._manufacturersService.onManufacturersChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}