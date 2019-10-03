import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { InventorysService } from 'app/main/inventorys/inventorys.service';


@Component({
    selector     : 'inventorys',
    templateUrl  : './inventorys.component.html',
    styleUrls    : ['./inventorys.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InventorysComponent implements OnInit, OnDestroy
{
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InventorysService} _inventorysService
     */
    constructor(
        private _inventorysService: InventorysService,
    )
    {

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
