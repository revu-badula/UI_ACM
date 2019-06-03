import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import { APP_CONFIG } from 'app/app.config';


@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    let url = APP_CONFIG.searchUser;
    return this.http
      .get(url+"?lastName="+term).pipe(
        map(response => response[1])
      );
  }
}

