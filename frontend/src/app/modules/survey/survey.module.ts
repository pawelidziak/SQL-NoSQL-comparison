import {NgModule} from '@angular/core';
import {SurveyComponent} from './components/survey.component';
import {surveyRouting} from './survey.routing';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatTabsModule} from '@angular/material';
import {SharedModule} from '@shared/shared.module';
import {SurveyService} from '@modules/survey/survey.service';

@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    SharedModule,
    surveyRouting,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule
  ],
  exports: [],
  providers: [
    SurveyService
  ]
})
export class SurveyModule {
}
