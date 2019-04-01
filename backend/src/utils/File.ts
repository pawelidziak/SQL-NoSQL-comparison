import * as fs from 'fs';
import {SurveyResult} from "../infrastructure/dto/SurveyResult";


export class File {
  static saveToFile(surveyResult: SurveyResult) {
    const path = `results/${surveyResult.operation}-size${surveyResult.dbSize}.txt`;

    File.checkForFile(path, () => {
      //It is now safe to write/read to file.dat
      fs.readFile(path, (err, data) => {
        let text = data.toString();
        console.log(text);
        if (text.length === 0) {
          text = `\t${surveyResult.quantity}\n`;
        } else {
          text = text.slice(0, -1);
          text += `${surveyResult.quantity}\n`;
        }
        for (const res of surveyResult.dbResult) {
          text += `${res.dbName}\t${res.time}\n`;
        }
        this.save(path, text);
      });
    });

  }

  static save(path: string, text: string) {
    fs.writeFile(path, text, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }

  private convertToExcel(surveyResult: SurveyResult) {
    let text = `\t${surveyResult.quantity}\n`;
    for (const res of surveyResult.dbResult) {
      text += `${res.dbName}\t${res.time}\n`;
    }
  }

  private static checkForFile(path: string, callback: any) {
    fs.exists(path, (exists) => {
      if (exists) {
        console.log('nie tworze');
        callback();
      } else {
        fs.writeFile(path, '', {flag: 'wx'}, (err) => {
          if (err) {
            return console.error(err);
          }
          console.log('tworze');
          callback();
        });
      }
    });
  }
}
