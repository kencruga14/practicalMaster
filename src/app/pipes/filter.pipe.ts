import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 1) return value;
   const resultName = [];
   for(const name of value){
       if(name.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
           resultName.push(name);
       };
   };
   return resultName;
  }

}

