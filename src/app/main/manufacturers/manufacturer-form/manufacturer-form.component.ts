import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { Manufacturer } from 'app/main/manufacturers/manufacturer.model';
import { Manufacturer } from 'app/main/manufacturers/manufacturer-form/manufacturer-form.model';
import { ManufacturerFormService } from 'app/main/manufacturers/manufacturer-form/manufacturer-form.service';

@Component({
    selector     : 'manufacturer-form',
    templateUrl  : './manufacturer-form.component.html',
    styleUrls    : ['./manufacturer-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManufacturerFormComponent implements OnInit, OnDestroy
{
    manufacturer: Manufacturer;
    pageType: string;
    manufacturerForm: FormGroup;
    user: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {manufacturerService} _manufacturerService
     * @param {FormBuilder} _formBuilder
     * @param {Router} _router
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _manufacturerFormService: ManufacturerFormService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.manufacturer = new Manufacturer();

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
        // Subscribe to update manufacturer on changes
        this._manufacturerFormService.onManufacturerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(manufacturer => {

                if ( manufacturer ) {
                    this.manufacturer = new Manufacturer(manufacturer);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.manufacturer = new Manufacturer();
                }

                this.manufacturerForm = this.createManufacturerForm();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create manufacturer form
     *
     * @returns {FormGroup}
     */
    createManufacturerForm(): FormGroup
    {

        return this._formBuilder.group({

            id      : [this.manufacturer.id],
            name    : [this.manufacturer.name]
        });
    }

    /**
     * Save manufacturer
     */
    saveManufacturer(): void
    {
        const data = this.manufacturerForm.getRawValue();

        this._manufacturerFormService.saveManufacturer(data)
            .then(() => {

                // Trigger the subscription with new data
                this._manufacturerFormService.onManufacturerChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Manufacturer edit saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // this._router.navigate(['/manufacturers']);
            });
    }

    /**
     * Add manufacturer
     */
    addManufacturer(): void
    {
        const data = this.manufacturerForm.getRawValue();

        this._manufacturerFormService.addManufacturer(data)
            .then((res) => {

                // Trigger the subscription with new data
                this._manufacturerFormService.onManufacturerChanged.next(res);

                // Show the success message
                this._matSnackBar.open(res.message, 'Done', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // this._router.navigate(['/manufacturers']);
            },
            err => {
                this._matSnackBar.open(err.message, 'ok', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }
}
