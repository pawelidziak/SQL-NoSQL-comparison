import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {InfoComponent} from './components/info.component';
import {infoRouting} from './info.routing';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    SharedModule,
    infoRouting
  ],
  exports: [],
  providers: []
})
export class InfoModule {
}
