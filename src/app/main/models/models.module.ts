import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
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
import { MatProgressSpinnerModule } from '@angular/material'; 
import { ConfirmDialogModule } from 'app/partial/confirm-dialog/confirm-dialog.module'; 

import { ModelsService } from 'app/main/models/models.service';
import { ModelsComponent } from 'app/main/models/models.component';
import { ModelsModelListComponent } from 'app/main/models/model-list/model-list.component';
import { ModelFormComponent } from 'app/main/models/model-form/model-form.component';
import { ModelFormService } from 'app/main/models/model-form/model-form.service';

const routes: Routes = [
    {
        path: 'models',
        component: ModelsComponent,
        children : [],
        resolve  : {
            data: ModelsService
        }
    },
    {
        path: 'model/:id',
        component: ModelFormComponent,
        resolve: {
            data: ModelFormService
        }
    }
];

@NgModule({
    declarations: [
        ModelsComponent,
        ModelsModelListComponent,
        ModelFormComponent
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
        MatSelectModule,

        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,

    ],
    providers   : [
        ModelsService,
        ModelFormService
    ],
    entryComponents: [
        ModelsModelListComponent
    ]
})
export class ModelsModule
{
}
