import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { AppComponent } from 'app/app.component';
import { MyMaterialModule } from 'app/material.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';
import { ManufacturersModule } from 'app/main/manufacturers/manufacturers.module';
import { InventorysModule } from 'app/main/inventorys/inventorys.module';
import { ModelsModule } from 'app/main/models/models.module';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardModule,
        data: {
            title: 'Dashboard',
        }
    },
    {
        path: 'manufacturers',
        component: ManufacturersModule,
        data: {
            title: 'Manufacturers',
        }
    },
    {
        path: 'models',
        component: ModelsModule,
        data: {
            title: 'Models',
        }
    },
    {
        path: 'inventorys',
        component: InventorysModule,
        data: {
            title: 'Inventorys',
        }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        // Material
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MyMaterialModule,
        DashboardModule,
        ManufacturersModule,
        ModelsModule,
        InventorysModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
