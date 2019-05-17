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
  // myColors = [
  //   {
  //     backgroundColor: 'rgba(103, 58, 183, .1)',
  //     borderColor: 'rgb(103, 58, 183)',
  //     pointBackgroundColor: 'rgb(103, 58, 183)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
  //   },
  //   // ...colors for additional data sets
  // ];
  myColors = [
    {
      fill: false,
      backgroundColor: '#673ab7',
      borderColor: '#673ab7',
    },
    {
      fill: false,
      backgroundColor: '#ff9800',
      borderColor: '#ff9800',
    },
    {
      fill: false,
      backgroundColor: '#2196f3',
      borderColor: '#2196f3',
    },
    {
      fill: false,
      backgroundColor: '#cddc39',
      borderColor: '#cddc39',
    },
    // ...colors for additional data sets
  ];

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
        // position: 'bottom',
        labels: {
          fontSize: 15,
          padding: 20
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

  downloadImg(canvasOne: boolean): void {
    let image: any;
    if (canvasOne) {
      image = document.getElementById('canvasOne');
    } else {
      image = document.getElementById('canvasTwo');
    }

    console.log(image);
    console.log(image.getContext('2d'));

    const dataURL = image.toDataURL();
    const tmpLink = document.createElement('a');
    tmpLink.download = 'image.png';
    tmpLink.href = dataURL;
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  }
}
