import {Component, Input, OnInit} from '@angular/core';
import {SurveyResult} from '@core/models';

@Component({
  selector: 'app-survey-result-table',
  templateUrl: './survey-result-table.component.html',
  styleUrls: ['./survey-result-table.component.scss']
})
export class SurveyResultTableComponent implements OnInit {
  @Input() result: SurveyResult[];

  constructor() { }

  ngOnInit() {
  }

}
