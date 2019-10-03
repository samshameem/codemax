import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component';

const routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            title: 'Dashboard',
        }
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
    ],
    exports: [DashboardComponent],
})
export class DashboardModule {}
