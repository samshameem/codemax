import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Model } from 'app/main/models/model.model';
import { InventorysService } from 'app/main/inventorys/inventorys.service';
import { ConfirmDialogComponent } from 'app/partial/confirm-dialog/confirm-dialog.component';

@Component({
    selector     : 'inventory-dialog',
    templateUrl  : './inventory-dialog.component.html',
    styleUrls    : ['./inventory-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InventoryDialogComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    inventorys: any;
    model: any;
    // dataSource: ModelDataSource | null;
    dataSource: MatTableDataSource<ModelDataSource>;
    displayedColumns = ['name', 'model_name', 'color', 'year', 'reg_number', 'note', 'pic_1', 'pic_2', 'buttons'];
    selected: any;
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
     * @param {inventoryService} _inventoryService
     * @param {Router} _router
     */
    constructor(
        private _inventorysService: InventorysService,
        public _matDialog: MatDialog,
        private dialogRef: MatDialogRef<InventoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    )
    {
        this.model = data.row;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.dataSource = new ModelDataSource(this._inventorysService);
        // this.dataSource = new MatTableDataSource(this.inventorys);

        this._inventorysService.onModelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(model => {
                this.model = model;

                this.dataSource = new MatTableDataSource(this.model);  
                this.dataSource.paginator = this.paginator;  
                this.dataSource.sort = this.sort;
                this.length = this.model.length;
            });

        /* this._inventorysService.onInventorysChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(inventory => {
                this.dataSource = new MatTableDataSource(inventory);
            }); */
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    sold(model): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Sold?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._inventorysService.sold(model).then((res) => {
                    // const modelIndex = this.model.indexOf(model);
                    // this.model.splice(modelIndex, 1);
                    // this._inventorysService.onModelsChanged.next(this.model);
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
export class ModelDataSource extends DataSource<any>
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