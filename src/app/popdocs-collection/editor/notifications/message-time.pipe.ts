import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageTime'
})
export class MessageTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
        const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
        if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
            return 'just now';
        }
        const intervals = {
          years: 31536000,
          months: 2592000,
          weeks: 604800,
          today: 86400,
          hours: 3600,
          minutes: 60,
          seconds: 1
        };
        let counter;
        for (const i in intervals) {
          if (i) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0){
              return counter + ' ' + i + ' ago'; // singular (1 day ago)
            }
          }
        }
    }
    return value;
}

}
