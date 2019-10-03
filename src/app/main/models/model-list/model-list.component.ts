import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { ModelsService } from 'app/main/models/models.service';
import { ConfirmDialogComponent } from 'app/partial/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'model-list',
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModelsModelListComponent implements OnInit, OnDestroy {
    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
    models: any;
    user: any;
    // dataSource: ModelsDataSource | null;
    dataSource: MatTableDataSource<ModelsDataSource>;
    displayedColumns = ['model_name', 'color', 'reg_number', 'buttons'];
    selected: any;
    selectedModels: any[];

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
     * @param {ModelsService} _modelsService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _modelsService: ModelsService,
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

        this._modelsService.onModelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(models => {
                this.models = models;

                this.dataSource = new MatTableDataSource(this.models);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.length = this.models.length;

            });

        this._modelsService.onModelSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });

        this._modelsService.onUserDataChanged
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
    * Delete Model
    */
    deleteModel(model): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._modelsService.deleteModel(model);
            }
            this.confirmDialogRef = null;
        });

    }

}

export class ModelsDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ModelsService} _modelsService
     */
    constructor(
        private _modelsService: ModelsService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._modelsService.onModelsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}