import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    let unit: any = ' °C';
    if (args) {
      unit = args;
    }
    return value + unit;
  }

}
