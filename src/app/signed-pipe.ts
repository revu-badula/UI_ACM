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
        // data = data.substring(0, 10);
        // return data.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
}