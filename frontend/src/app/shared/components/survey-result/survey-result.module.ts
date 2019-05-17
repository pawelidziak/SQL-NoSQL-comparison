import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {SurveyResultComponent} from './survey-result.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {SurveyResultTableComponent} from './survey-result-table/survey-result-table.component';
import {SurveyResultChartComponent} from './survey-result-chart/survey-result-chart.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    SurveyResultComponent,
    SurveyResultTableComponent,
    SurveyResultChartComponent
  ],
  imports: [
    SharedModule,

    MatCardModule,
    MatButtonModule,
    ChartsModule
  ],
  exports: [
    SurveyResultComponent
  ],
  providers: []
})
export class SurveyResultModule {
}
