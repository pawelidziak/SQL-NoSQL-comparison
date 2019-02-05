import {Component, OnInit} from '@angular/core';
import {ParentService} from "@core/services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private parentService: ParentService) {
  }

  ngOnInit() {
    this.getAllParents();
  }

  private getAllParents() {
    this.parentService.getAll().subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }
}
