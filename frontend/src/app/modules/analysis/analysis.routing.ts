import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnalysisComponent} from './components/analysis.component';

const routes: Routes = [
  {
    path: '', component: AnalysisComponent
  }
]as Routes;

export const analysisRouting: ModuleWithProviders = RouterModule.forChild(routes);
