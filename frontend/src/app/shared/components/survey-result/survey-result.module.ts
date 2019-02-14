import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {SurveyResultComponent} from './survey-result.component';
import {MatCardModule} from '@angular/material';
import { SurveyResultTableComponent } from './survey-result-table/survey-result-table.component';

@NgModule({
  declarations: [
    SurveyResultComponent,
    SurveyResultTableComponent
  ],
  imports: [
    SharedModule,

    MatCardModule
  ],
  exports: [
    SurveyResultComponent
  ],
  providers: []
})
export class SurveyResultModule {
}
