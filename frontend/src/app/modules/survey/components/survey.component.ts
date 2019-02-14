import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {OperationType, RequestModel, SurveyResult} from '@core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  operations = OperationType;

  req: RequestModel = {
    quantity: 100,
    simpleQuery: true,
    testsReps: 1
  };

  results: Map<OperationType, SurveyResult[]> = new Map([
    [OperationType.CREATE, []],
    [OperationType.READ, []],
    [OperationType.UPDATE, []],
    [OperationType.DELETE, []],
  ]);

  constructor(private readonly surveyService: SurveyService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  createSurvey(): void {
    this.subscriptions.push(
      this.surveyService.createMany(this.req).subscribe(
        (res: SurveyResult) => this.addResult(res),
        err => console.error(err)
      )
    );
  }

  readSurvey(): void {
    this.subscriptions.push(
      this.surveyService.readMany(this.req).subscribe(
        (res: SurveyResult) => this.addResult(res),
        err => console.error(err)
      )
    );
  }

  updateSurvey(): void {
    this.subscriptions.push(
      this.surveyService.updateMany(this.req).subscribe(
        (res: SurveyResult) => this.addResult(res),
        err => console.error(err)
      )
    );
  }

  deleteSurvey(): void {
    this.subscriptions.push(
      this.surveyService.deleteMany(this.req).subscribe(
        (res: SurveyResult) => this.addResult(res),
        err => console.error(err)
      )
    );
  }

  private addResult(res: SurveyResult) {
    const tmp = this.results.get(res.operation);
    const index = tmp.findIndex(x => x.quantity === res.quantity);
    if (index !== -1) {
      tmp[index] = res;
    } else {
      tmp.push(res);
    }
    tmp.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
  }

}
