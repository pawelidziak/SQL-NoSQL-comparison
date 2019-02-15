import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: 'survey',
    loadChildren: './modules/survey/survey.module#SurveyModule'
  },
  {
    path: 'info',
    loadChildren: './modules/info/info.module#InfoModule'
  },
  {
    path: 'analysis',
    loadChildren: './modules/analysis/analysis.module#AnalysisModule'
  },
  {path: '**', redirectTo: 'survey', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
