import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ModelsService } from 'app/main/models/models.service';


@Component({
    selector     : 'models',
    templateUrl  : './models.component.html',
    styleUrls    : ['./models.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModelsComponent implements OnInit, OnDestroy
{
    selected: any;
    pathArr: string[];
    hasSelectedModels: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ModelsService} _modelsService
     */
    constructor(
        private _modelsService: ModelsService,
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
        this._modelsService.onModelSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
        });

        this._modelsService.onSelectedModelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedModels => {
                this.hasSelectedModels = selectedModels.length > 0;
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
