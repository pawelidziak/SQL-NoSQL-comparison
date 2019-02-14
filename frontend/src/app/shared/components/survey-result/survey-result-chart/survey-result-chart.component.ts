import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SurveyResult} from '@core/models';

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
  showChart = true;

  constructor() {
  }

  ngOnInit() {
    this.initChartOptions();
    this.initChartLabelsAndData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.showChart = false;
      this.initChartLabelsAndData();
      setTimeout(() => this.showChart = true, 1);
    }
  }

  private initChartOptions(): void {
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        labels: {
          fontSize: 15
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontSize: 20
          },
          scaleLabel: {
            display: true,
            labelString: 'Time [ms]',
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 20
          },
          scaleLabel: {
            display: true,
            labelString: 'Quantity',
            fontSize: 20
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
      for (const dbRes of res.dbResult) {
        const index = this.chartData.findIndex(x => x.label === dbRes.dbName);
        if (index !== -1) {
          this.chartData[index].data.push(dbRes.time);
        } else {
          this.chartData.push(
            {data: [dbRes.time], label: dbRes.dbName}
          );
        }
      }
    }
  }
}
