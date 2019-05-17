import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {DbName, OperationType, RequestModel, SurveyResult} from '@core/models';
import {Observable} from 'rxjs';
import {FileUtils} from '@shared/utils/FileUtils';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private interval: any;
  selectedIndex = 0;
  surveyLoading = false;
  operations = OperationType;
  upToSave = false;
  databases = DbName;
  timer = 0;
  responseError = '';

  req: RequestModel = {
    dbSize: 100,
    quantity: 100,
    testsReps: 2
  };

  results: Map<OperationType | string, SurveyResult[]> = new Map([
    [OperationType.CREATE, []],
    [OperationType.READ_NO_INDEXES, []],
    [OperationType.READ_INDEXES, []],
    [OperationType.UPDATE, []],
    [OperationType.DELETE, []],
  ]);

  static scrollToResult(): void {
    const element = document.getElementById('resultTab');
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  constructor(private readonly surveyService: SurveyService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  operationTypeValues(): string[] {
    return Object.keys(OperationType).filter(
      (type) => isNaN(type as any) && type !== 'operationTypeValues'
    );
  }

  sendRequest(operation: OperationType): void {
    if (this.requestInvalid()) {
      return;
    }
    this.startTimer();
    SurveyComponent.scrollToResult();
    this.surveyLoading = true;
    this.subscriptions.push(
      this.recognizeReq(operation).subscribe(
        (res: SurveyResult) => this.addResult(res),
        (err: HttpErrorResponse) => {
          this.responseError = err.message;
          this.surveyLoading = false;
        }
      )
    );
  }

  /**
   * IMPORT / EXPORT
   */
  saveToFile(): void {
    FileUtils.saveMapToFile(this.results, `CRUD-${new Date().getTime()}`);
  }

  getFiles(event: any): void {
    FileUtils.readFileToMap(event, (result: any) => this.results = result);
  }

  /**
   * PRIVATE METHODS
   */
  private requestInvalid(): boolean {
    return this.req.quantity < 1 || this.req.dbSize < 1;
  }

  private recognizeReq(operation: OperationType): Observable<SurveyResult> {
    switch (operation) {
      case OperationType.CREATE:
        this.selectedIndex = 0;
        return this.surveyService.createMany(this.req);
      case OperationType.READ_NO_INDEXES:
        this.selectedIndex = 1;
        return this.surveyService.readNoIndexes(this.req);
      case OperationType.READ_INDEXES:
        this.selectedIndex = 2;
        return this.surveyService.readWithIndexes(this.req);
      case OperationType.UPDATE:
        this.selectedIndex = 3;
        return this.surveyService.updateMany(this.req);
      case OperationType.DELETE:
        this.selectedIndex = 4;
        return this.surveyService.deleteMany(this.req);
    }
  }

  private addResult(res: SurveyResult): void {
    const list = [...this.results.get(res.operation)];
    const index = list.findIndex(x => x.quantity === res.quantity);
    if (index !== -1) {
      list[index] = res;
    } else {
      list.push(res);
    }
    list.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
    this.results.set(res.operation, list);
    this.surveyLoading = false;
    this.upToSave = true;
    this.stopTimer();
    console.log(this.results.get(res.operation));
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.interval);
    this.timer = 0;
  }

}
