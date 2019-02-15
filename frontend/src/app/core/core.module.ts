import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './guards';
import {Overlay} from '@angular/cdk/overlay';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {GestureConfig} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {hljsLanguages} from '@shared/components/highlight/highlight.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    Overlay, // needed for angular ckd
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages
      }
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
