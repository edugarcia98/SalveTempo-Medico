import { Pipe, PipeTransform } from '@angular/core';
import { Sintoma } from '../consulta';

@Pipe({
  name: 'filtersintoma',
  pure: false
})
export class FiltersintomaPipe implements PipeTransform {

  transform(items: Sintoma[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.nome.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
