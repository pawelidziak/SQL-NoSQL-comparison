import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightComponent} from '@shared/components/highlight/highlight.component';
import {HighlightModule} from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import sql from 'highlight.js/lib/languages/sql';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'sql', func: sql}
  ];
}

@NgModule({
  declarations: [
    HighlightComponent
  ],
  imports: [
    CommonModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  exports: [
    HighlightComponent
  ],
  providers: []
})
export class MyHighlightModule {
}
