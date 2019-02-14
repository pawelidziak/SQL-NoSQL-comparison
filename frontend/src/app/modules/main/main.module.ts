import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {MainComponent} from './components/main.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,

    MatTabsModule
  ],
  exports: [
    MainComponent
  ],
  providers: []
})
export class MainModule {
}
