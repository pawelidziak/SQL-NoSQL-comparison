import {Component, OnInit} from '@angular/core';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  masterTitle = 'Comparative analysis of relational and non-relational databases on selected examples';
  masterAuthor = 'Paweł Idziak, Wrocław 2019';

  navLinks: NavLink[] = [
    {path: 'survey', label: 'Survey'},
    {path: 'info', label: 'Information'},
    {path: 'analysis', label: 'Analysis'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
