import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, format = 'MMMM D YYYY'): any {
    return moment(value).format(format);
  }

}
