import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ManufacturersService } from 'app/main/manufacturers/manufacturers.service';


@Component({
    selector     : 'manufacturers',
    templateUrl  : './manufacturers.component.html',
    styleUrls    : ['./manufacturers.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManufacturersComponent implements OnInit, OnDestroy
{
    selected: any;
    pathArr: string[];
    hasSelectedManufacturers: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ManufacturersService} _manufacturersService
     */
    constructor(
        private _manufacturersService: ManufacturersService,
    )
    {

        // Set the defaults
        this.searchInput = new FormControl('');

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
        this._manufacturersService.onManufacturerSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
        });

        this._manufacturersService.onSelectedManufacturersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedManufacturers => {
                this.hasSelectedManufacturers = selectedManufacturers.length > 0;
            });

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

}
