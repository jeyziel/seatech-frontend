import { Pipe, PipeTransform } from '@angular/core';
import { translate } from '../helpers/translate-helper';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return translate(value as string);
  }

}
