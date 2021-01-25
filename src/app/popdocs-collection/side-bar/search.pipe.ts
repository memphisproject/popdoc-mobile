import { Pipe, PipeTransform } from '@angular/core';
import { Collection } from 'src/app/_models/Collection';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Collection[], filteredString: string, propName: string): Collection[] {
    if (value.length === 0 || filteredString  === '') {
     return value;
    }

    const filteredArray: Collection[] = value.filter(collection => {
      if (collection.title && collection.title.toLowerCase().indexOf(filteredString.toLowerCase()) === 0) {
        return collection;
     }
    });

    return filteredArray;
  }

}
