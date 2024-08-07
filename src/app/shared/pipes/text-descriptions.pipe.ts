import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDescriptions'
})
export class TextDescriptionsPipe implements PipeTransform {

  transform(value: string): string {
    return value.length <= 95 ? value : `${value.slice(0, 95)}...`;
  }

}
