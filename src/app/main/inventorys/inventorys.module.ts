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

import { InventorysService } from 'app/main/inventorys/inventorys.service';
import { InventorysComponent } from 'app/main/inventorys/inventorys.component';
import { InventorysInventoryListComponent } from 'app/main/inventorys/inventory-list/inventory-list.component';
import { InventoryDialogComponent } from 'app/main/inventorys/inventory-dialog/inventory-dialog.component';

const routes: Routes = [
    {
        path: 'inventorys',
        component: InventorysComponent,
        children : [],
        resolve  : {
            data: InventorysService
        }
    }
];

@NgModule({
    declarations: [
        InventorysComponent,
        InventorysInventoryListComponent,
        InventoryDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        ConfirmDialogModule,
        FlexLayoutModule,
        CommonModule,
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
        InventorysService
    ],
    entryComponents: [
        InventoryDialogComponent,
        InventorysInventoryListComponent
    ]
})
export class InventorysModule
{
}
