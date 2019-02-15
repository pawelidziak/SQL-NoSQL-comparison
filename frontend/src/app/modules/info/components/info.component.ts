import {Component, OnInit} from '@angular/core';
import {MysqlQueries, MongoQueries} from '../db-queries';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  mysql = MysqlQueries;
  mongo = MongoQueries;

  constructor() {
  }

  ngOnInit() {
  }

}
