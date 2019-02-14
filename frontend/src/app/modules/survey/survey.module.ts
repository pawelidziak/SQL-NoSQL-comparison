import {NgModule} from '@angular/core';
import {SurveyComponent} from './components/survey.component';
import {surveyRouting} from './survey.routing';
import {MatButtonModule, MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    SharedModule,
    surveyRouting,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [],
  providers: []
})
export class SurveyModule {
}
