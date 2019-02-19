import { IMyDate } from 'mydatepicker';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
       name: 'filterDate'
})
export class SystemFilterPipeDate implements PipeTransform {

       transform(date: any): any {
              if (date === null || date === undefined) { return ''; }
              else {
                     let d = new Date(date);

                     let day = d.getDate();
                     let month = d.getMonth() + 1;
                     let year = d.getFullYear();

                     return month + "/" + day + "/" + year;
              }
       }
}