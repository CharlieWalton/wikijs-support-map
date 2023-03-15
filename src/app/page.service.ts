import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Page, PageResponse } from './page';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private apollo: Apollo) { }

  getPages(): Observable<PageResponse> {
    const coordRegExp = /\(([0-9]+\.[0-9]+)\,\s?([0-9]+\.[0-9]+)\)/;
    const telephoneRegExp = /\s+(\+?[0-9]([0-9 ]{6,10}|[0-9 ])[0-9])/;
    const fullStopRegExp = /[\.|\s]+$/;
    return this.apollo
    .watchQuery<PageResponse>({
      query: gql`
      {
        pages {
          list (orderBy: TITLE) {
            id
            path
            title
            description
            tags
          }
        }
      }`
    })
    .valueChanges.pipe(map(response => {
      var match;
      var output: any = {};
      output.pages = {};
      output.pages.list = [];
      response.data.pages.list.forEach((page: Page) => {
        page = Object.assign({}, page)
        output.pages.list.push(page);

        match = page.description.match(coordRegExp);
        if (match == null) { return; }
        page.description = page.description.replace(coordRegExp, "").trim();
        page.lat = +match[1];
        page.lon = +match[2];
        
        match = page.description.match(telephoneRegExp);
        if (match == null) { return; }
          page.description = page.description.replace(telephoneRegExp, "").trim();
          page.telephone = match[1];
        
        page.description = page.description.replace(fullStopRegExp, ".")
        })
      return output;
    })
     );

  }
}