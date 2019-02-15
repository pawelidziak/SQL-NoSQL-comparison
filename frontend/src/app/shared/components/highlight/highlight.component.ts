import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-highlight',
  template: `
    <pre *ngIf="code"><code [highlight]="code"></code></pre>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {
  @Input() code: string;

  constructor() {
  }

  ngOnInit() {
  }

}
