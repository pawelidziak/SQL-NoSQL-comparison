import {Component, OnInit} from '@angular/core';
import {MongoComplexQueries, MongolEntry, MongoSimpleQueries, MysqlComplexQueries, MysqlEntry, MysqlSimpleQueries} from '../db-queries';
import {DbName} from '@core/models';
import {QueryModel} from '@modules/info/db-queries/QueryModel';

interface InfoQuery {
  title: string;
  queryList: QueryModel[];
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  /**
   * MySQL
   */
  private mysqlEntry = MysqlEntry;
  private mysqlSimple = MysqlSimpleQueries;
  private mysqlComplex = MysqlComplexQueries;

  /**
   * MongoDB
   */
  private mongoEntry = MongolEntry;
  private mongoSimple = MongoSimpleQueries;
  private mongoComplex = MongoComplexQueries;

  componentData: Map<DbName | string, InfoQuery[]> = new Map();

  constructor() {
  }

  ngOnInit() {
    this.createComponentData();
  }

  dbNameValues(): string[] {
    return Object.keys(DbName).filter(
      (type) => isNaN(type as any) && type !== 'dbNameValues'
    );
  }

  scrollToElement(id): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  private createComponentData(): void {
    for (const db of this.dbNameValues()) {
      const allQueries = this.getQueries(db);
      this.componentData.set(db, [
          {
            title: `${db} Entry`,
            queryList: allQueries[0]
          },
          {
            title: `${db} Simple Queries`,
            queryList: allQueries[1]
          },
          {
            title: `${db} Complex Queries`,
            queryList: allQueries[2]
          }
        ]
      );
    }
  }

  private getQueries(db: DbName | string): any[] {
    switch (db) {
      case DbName.MongoDB:
        return [this.mongoEntry, this.mongoSimple, this.mongoComplex];
      case DbName.MySQL:
        return [this.mysqlEntry, this.mysqlSimple, this.mysqlComplex];
      default:
        return [];
    }
  }

}
