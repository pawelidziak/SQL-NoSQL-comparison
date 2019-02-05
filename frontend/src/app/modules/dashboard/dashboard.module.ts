import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard.component';
import {dashboardRouting} from './dashboard.routing';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
}
