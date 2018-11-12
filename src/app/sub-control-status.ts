import { IMyDate } from 'mydatepicker';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'subControlPipe'
})
export class SubControlPipe implements PipeTransform {

    transform(data): any {
        if (data === null) { return ''; }
        else {
            if (data === "true") {
                return 'Open';
            }
            else {
                return 'Close';
            }

        }
    }
}