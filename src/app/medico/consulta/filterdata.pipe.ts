import { Pipe, PipeTransform } from '@angular/core';
import { Consulta } from './consulta';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: Consulta[], filter: Date): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.data == filter);
  }

}
