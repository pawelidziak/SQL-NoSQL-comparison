import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AnalysisComponent} from './components/analysis.component';
import {analysisRouting} from './analysis.routing';

@NgModule({
  declarations: [
    AnalysisComponent
  ],
  imports: [
    SharedModule,
    analysisRouting
  ],
  exports: [],
  providers: []
})
export class AnalysisModule {
}
