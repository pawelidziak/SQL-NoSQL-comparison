import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SurveyComponent} from './components/survey.component';

const routes: Routes = [
  {
    path: '', component: SurveyComponent
  }
]as Routes;

export const surveyRouting: ModuleWithProviders = RouterModule.forChild(routes);
