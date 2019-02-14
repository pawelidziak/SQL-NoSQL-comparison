import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SurveyResult} from '@core/models';
import {BaseChartDirective} from 'ng2-charts';

interface BarData {
  data: number[];
  label: string;
}

@Component({
  selector: 'app-survey-result-chart',
  templateUrl: './survey-result-chart.component.html',
  styleUrls: ['./survey-result-chart.component.scss']
})
export class SurveyResultChartComponent implements OnInit, OnChanges {
  @Input() result: SurveyResult[];
  chartOptions: any;
  chartLabels = [];
  chartData: BarData[] = [];
  @ViewChild(BaseChartDirective) private chart;

  constructor() {
  }

  ngOnInit() {
    this.initChartOptions();
    this.initChartLabelsAndData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.initChartLabelsAndData();
      this.chart.refresh();
    }
  }

  private initChartOptions(): void {
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Time [ms]'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Quantity'
          }
        }]
      }
    };
  }

  private initChartLabelsAndData(): void {
    this.chartLabels = [];
    this.chartData = [];
    for (const res of this.result) {
      this.chartLabels.push(res.quantity);
      console.log(this.chartLabels);
      for (const dbRes of res.dbResult) {
        const index = this.chartData.findIndex(x => x.label === dbRes.dbName);
        if (index !== -1) {
          this.chartData[index].data.push(dbRes.time);
        } else {
          const tmp = [];
          tmp.push(dbRes.time);
          this.chartData.push(
            {data: tmp, label: dbRes.dbName}
          );
        }
      }
    }
  }
}
