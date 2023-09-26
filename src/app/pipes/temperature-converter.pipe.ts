import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kalvinToCelsius',
  standalone: true,
})
export class KalvinToCelsiusPipe implements PipeTransform {

  transform(value: number) {

    if(!value && isNaN(value)) {
      return null;
    }

    const temp = value - 273;
    return temp.toFixed(0);
  }

}
