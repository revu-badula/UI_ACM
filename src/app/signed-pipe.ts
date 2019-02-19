import { IMyDate } from 'mydatepicker';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'signed'
})
export class SignedPipe implements PipeTransform {

    transform(data:any): any {
        if (data === null) { return ''; }
        else {
            if (data === true) {
                return 'yes';
            }
            else {
                return 'No';
            }

        }
    }
}