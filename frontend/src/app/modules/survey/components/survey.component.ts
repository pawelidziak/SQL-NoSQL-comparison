import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {RequestModel} from '@core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  req: RequestModel = {
    quantity: 100,
    simpleQuery: true,
    testsReps: 1
  };

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
        res => console.log(res),
        err => console.error(err)
      )
    );
  }

  readSurvey(): void {
    this.subscriptions.push(
      this.surveyService.readMany(this.req).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    );
  }

  updateSurvey(): void {
    this.subscriptions.push(
      this.surveyService.updateMany(this.req).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    );
  }

  deleteSurvey(): void {
    this.subscriptions.push(
      this.surveyService.deleteMany(this.req).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    );
  }
}
