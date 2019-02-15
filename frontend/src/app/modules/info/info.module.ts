import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {InfoComponent} from './components/info.component';
import {infoRouting} from './info.routing';
import {MyHighlightModule} from '@shared/components/highlight/highlight.module';
import {MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    SharedModule,
    infoRouting,

    MyHighlightModule,
    MatTabsModule
  ],
  exports: [],
  providers: []
})
export class InfoModule {
}
