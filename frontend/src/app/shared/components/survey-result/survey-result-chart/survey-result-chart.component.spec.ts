import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultChartComponent } from './survey-result-chart.component';

describe('SurveyResultChartComponent', () => {
  let component: SurveyResultChartComponent;
  let fixture: ComponentFixture<SurveyResultChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
