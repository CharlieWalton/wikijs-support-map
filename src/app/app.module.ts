import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageDescriptionComponent } from './page-description/page-description.component';
import { PageTagsComponent } from './page-tags/page-tags.component';
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  declarations: [
    AppComponent,
    PageDescriptionComponent,
    PageTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule
  ],
  providers: [],
  entryComponents: [PageDescriptionComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(PageDescriptionComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
 }
