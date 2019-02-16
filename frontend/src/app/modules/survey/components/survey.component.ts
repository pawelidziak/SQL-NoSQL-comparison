import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from '../survey.service';
import {OperationType, RequestModel, SurveyResult} from '@core/models';
import {Observable} from 'rxjs';
import {FileUtils} from '@shared/utils/FileUtils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  selectedIndex = 0;
  surveyLoading = false;
  operations = OperationType;
  upToSave = false;

  req: RequestModel = {
    quantity: 100,
    simpleQuery: true,
    testsReps: 1
  };

  results: Map<OperationType | string, SurveyResult[]> = new Map([
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

  operationTypeValues(): string[] {
    return Object.keys(OperationType).filter(
      (type) => isNaN(type as any) && type !== 'operationTypeValues'
    );
  }

  sendRequest(operation: OperationType): void {
    if (this.requestInvalid()) {
      return;
    }
    this.surveyLoading = true;
    this.subscriptions.push(
      this.recognizeReq(operation).subscribe(
        (res: SurveyResult) => this.addResult(res),
        err => console.error(err)
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
    return this.req.quantity < 1 || this.req.quantity > 10000;
  }

  private recognizeReq(operation: OperationType): Observable<SurveyResult> {
    switch (operation) {
      case OperationType.CREATE:
        this.selectedIndex = 0;
        return this.surveyService.createMany(this.req);
      case OperationType.READ:
        this.selectedIndex = 1;
        return this.surveyService.readMany(this.req);
      case OperationType.UPDATE:
        this.selectedIndex = 2;
        return this.surveyService.updateMany(this.req);
      case OperationType.DELETE:
        this.selectedIndex = 3;
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
  }

}
