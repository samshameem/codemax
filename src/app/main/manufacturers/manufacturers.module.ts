import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import { ConfirmDialogModule } from 'app/partial/confirm-dialog/confirm-dialog.module'; 

import { ManufacturersService } from 'app/main/manufacturers/manufacturers.service';
import { ManufacturersComponent } from 'app/main/manufacturers/manufacturers.component';
import { ManufacturersManufacturerListComponent } from 'app/main/manufacturers/manufacturer-list/manufacturer-list.component';
import { ManufacturerFormComponent } from 'app/main/manufacturers/manufacturer-form/manufacturer-form.component';
import { ManufacturerFormService } from 'app/main/manufacturers/manufacturer-form/manufacturer-form.service';

const routes: Routes = [
    {
        path: 'manufacturers',
        component: ManufacturersComponent,
        children : [],
        resolve  : {
            data: ManufacturersService
        }
    },
    {
        path: 'manufacturer/:id',
        component: ManufacturerFormComponent,
        resolve: {
            data: ManufacturerFormService
        }
    }
];

@NgModule({
    declarations: [
        ManufacturersComponent,
        ManufacturersManufacturerListComponent,
        ManufacturerFormComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        ConfirmDialogModule,
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTableModule,

        MatPaginatorModule,
        MatSortModule,

    ],
    providers   : [
        ManufacturersService,
        ManufacturerFormService
    ],
    entryComponents: [
        ManufacturersManufacturerListComponent
    ]
})
export class ManufacturersModule
{
}
