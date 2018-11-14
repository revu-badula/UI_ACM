import { IMyDate } from 'mydatepicker';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'controlPipe'
})
export class ControlPipe implements PipeTransform {

    transform(data): any {
        if (data === null) { return ''; }
        else {
            if (data === true) {
                return 'Open';
            }
            else {
                return 'Close';
            }

        }
    }
}