import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnInit {
  single: any[] = [];
  multi: any[] = [];

  view: any[] = [1100, 400];
  @Input() weather;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showGridLines = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '  ';
  showYAxisLabel = true;
  yAxisLabel = 't°C';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#cc0000']
  };

  // line, area
  autoScale = true;
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
    const weatherData = this.weather.list;
    const temp = [];
    const wind = [];
    const pressure = [];
    weatherData.forEach(function (item, index, array) {
      temp[index] = {
        name: new Date(item.dt_txt),
        value: item.main.temp
      };
      wind[index] = {
        name: new Date(item.dt_txt),
        value: item.wind.speed
      };
      pressure[index] = {
        name: new Date(item.dt_txt),
        value: item.main.pressure
      };
    });
    this.pushData(' °C ', temp);
    // this.pushData('Wind', wind);
    // this.pushData('Pressure', pressure);
  }

  pushData(title: string, data: any[]): void {
    this.single.push({name: title, value: data[data.length - 1].value});
    this.multi.push({name: title, series: data});
  }

  onSelect(event) {
    console.log(event);
    const contects = this.multi;
    const selectedSeria = this.multi.filter((item, index) => {
      return item.name === event.series;
    });
    console.log(selectedSeria);
    const selectedItem = this.weather.list.filter(function (item, index) {
      return selectedSeria[0].series[index].value === event.value;
    });
    const refDialog = this.dialog.open(ChartDialogComponent, {
      width: '400px',
      height: '400px',
      data: {weather: selectedItem[0]},
    });
    refDialog.afterClosed().subscribe(() => {
      console.log('closed');
    });
    console.log(selectedItem[0]);
  }
  yAxisTickFormatting(val) {
    return  val + ' °C';
  }
}
