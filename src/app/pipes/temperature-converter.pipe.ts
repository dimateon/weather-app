import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(value: number, unit: string) {

    if(!value && isNaN(value)) {
      return null;
    }

    const temp = (value - 32) / 1.8 ;
    return temp.toFixed(2);
  }

}
