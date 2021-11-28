import { isFormattedError } from "@angular/compiler";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "multifilter",
})
export class MultiFilterPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    // console.log("items:", items);
    // console.log("filter:", filter);
    // console.log("defaultFilter:", defaultFilter);
    if (!filter || !Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      return items.filter((item) => {
        return filterKeys.some((keyName) => {
          return (
            new RegExp(filter[keyName], "gi").test(item[keyName]) ||
            new RegExp(filter[keyName], "gi").test(item.usuario[keyName]) ||
            filter[keyName] == ""
          );
        });
      });
    }
  }
}
