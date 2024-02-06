import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): unknown {
    if (!value) return null;
    if (!args) return value;

    const lowerArgs = (args as string).toLowerCase();

    return value.filter((item: any) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(lowerArgs)
    )
  }
}
