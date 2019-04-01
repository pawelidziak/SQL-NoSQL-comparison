import {SurveyService} from "./infrastructure/services/SurveyService";

export class Test {
  private surveyCreate: SurveyService;

  constructor() {
    this.surveyCreate = new SurveyService();
    setTimeout(() => {
      this.surveyCreate.surveyRead({quantity: 100, dbSize: 200, testsReps: 2, simpleQuery: true})
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }, 2000);
  }
}

