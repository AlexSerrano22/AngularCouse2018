import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(value: string, limit = 25, ellipsis = '...'): any {
    return value.substr(0, limit) + ellipsis;
  }

}
