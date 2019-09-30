import { Pipe, PipeTransform } from '@angular/core';
// A pipe takes in data as input and transforms it to a desired output.
@Pipe({ //this is a decorator
  name: 'tokenizer' //defining name of decorator
})
export class TokenizerPipe implements PipeTransform { //creates a class
// About pipe transform: Angular invokes the transform method with the value of a binding as the first argument, and any parameters as the second argument in list form.
  transform(value: any, ...args: any[]): any {

    if ( typeof value === 'string') {
      let result: string;
      result = ''; //blank
      if (args) { //if pararmeters were given
        result = this.pad(value, args, '0');
      } else {
        for (let i = 0; i < value.length - 1; i++) { //iterate over
          result += value[i]; //and add
          result += ',';
        }
        result += value[value.length - 1];
      }
      return result;
    }
  }

  private pad (value: any, size: any, fill: string): string {
    let result: string;
    result = '';
    for (let i = 0; i < value.length - 1; i++) {
      result += value[i];
      result += size;
    }
    result += value[value.length - 1];
    return result;
  }

}
