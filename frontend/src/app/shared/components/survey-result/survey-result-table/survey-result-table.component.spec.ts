import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultTableComponent } from './survey-result-table.component';

describe('SurveyResultTableComponent', () => {
  let component: SurveyResultTableComponent;
  let fixture: ComponentFixture<SurveyResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
