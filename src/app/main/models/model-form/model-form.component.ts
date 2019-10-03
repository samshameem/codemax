import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Manufacturer } from 'app/main/manufacturers/manufacturer-form/manufacturer-form.model';
import { Model } from 'app/main/models/model-form/model-form.model';
import { ModelFormService } from 'app/main/models/model-form/model-form.service';

@Component({
    selector     : 'model-form',
    templateUrl  : './model-form.component.html',
    styleUrls    : ['./model-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModelFormComponent implements OnInit, OnDestroy
{
    model: Model;
    manufacturers: Manufacturer;
    pageType: string;
    modelForm: FormGroup;
    user: any;
    picname: any;
    pic_1: any;
    pic_2: any;
    loading: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {modelService} _modelService
     * @param {FormBuilder} _formBuilder
     * @param {Router} _router
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _modelFormService: ModelFormService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.model = new Model();
        this.manufacturers = new Manufacturer();

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
        // Subscribe to update model on changes
        this._modelFormService.onModelChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(model => {
                if ( model ) {
                    this.model = new Model(model);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.model = new Model();
                }

                this.modelForm = this.createModelForm();
            });

        this._modelFormService.onManufacturersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(manufacturers => {
                // this.manufacturers = new Manufacturer(manufacturers);
                this.manufacturers = manufacturers;
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
     * Create model form
     *
     * @returns {FormGroup}
     */
    createModelForm(): FormGroup
    {

        return this._formBuilder.group({

            id      : [this.model.id],
            manufacturer_id    : [this.model.manufacturer_id],
            model_name    : [this.model.model_name],
            color    : [this.model.color],
            year    : [this.model.year],
            reg_number    : [this.model.reg_number],
            note    : [this.model.note],
            pic_1    : [this.model.pic_1],
            pic_2    : [this.model.pic_2],
        });
    }

    /**
     * Save model
     */
    saveModel(): void
    {
        const data = this.modelForm.getRawValue();

        this._modelFormService.saveModel(data)
            .then(() => {

                // Trigger the subscription with new data
                this._modelFormService.onModelChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Model edit saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // this._router.navigate(['/models']);
            });
    }

    /**
     * Add model
     */
    addModel(): void
    {
        this.loading = true;
        // const data = this.modelForm.getRawValue();
        const formData = new FormData();
        formData.append('manufacturer_id', this.modelForm.get('manufacturer_id').value);
        formData.append('model_name', this.modelForm.get('model_name').value);
        formData.append('color', this.modelForm.get('color').value);
        formData.append('year', this.modelForm.get('year').value);
        formData.append('reg_number', this.modelForm.get('reg_number').value);
        formData.append('note', this.modelForm.get('note').value);
        formData.append('pic_1', this.pic_1);
        formData.append('pic_2', this.pic_2);

        this._modelFormService.addModel(formData)
            .then((res) => {

                // Trigger the subscription with new data
                // this._modelFormService.onModelChanged.next(res);

                // Show the success message
                this._matSnackBar.open(res.message, 'Done', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this.loading = false;
                // this._router.navigate(['/models']);
            },
            err => {
                this.loading = false;
                this._matSnackBar.open(err.message, 'ok', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    onFileChange(event, pic) {
        let reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            this.picname = event.target.name;
            reader.readAsDataURL(file);

            reader.onload = () => {
                event.target.previousSibling.innerHTML = file.name;
                if(pic == 'pic_1'){
                    this.pic_1 = event.target.files[0];
                } else { 
                    this.pic_2 = event.target.files[0];
                }
            };
        }
    }
}
