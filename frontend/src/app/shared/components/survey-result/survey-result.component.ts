import {Component, Input, OnInit} from '@angular/core';
import {OperationType, SurveyResult} from '@core/models';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.scss']
})
export class SurveyResultComponent implements OnInit {
  @Input() result: SurveyResult[];
  @Input() operation: OperationType;

  constructor() {
  }

  ngOnInit() {
  }

}
