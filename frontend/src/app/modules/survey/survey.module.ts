import {NgModule} from '@angular/core';
import {SurveyComponent} from './components/survey.component';
import {surveyRouting} from './survey.routing';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatTabsModule
} from '@angular/material';
import {SharedModule} from '@shared/shared.module';
import {SurveyService} from '@modules/survey/survey.service';
import {SurveyResultModule} from '@shared/components/survey-result/survey-result.module';

@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    SharedModule,
    surveyRouting,
    SurveyResultModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [],
  providers: [
    SurveyService
  ]
})
export class SurveyModule {
}
