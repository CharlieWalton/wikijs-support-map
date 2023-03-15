import { Component, Input } from '@angular/core';
import { Page } from '../page';

@Component({
  selector: 'app-page-description',
  templateUrl: './page-description.component.html',
  styleUrls: ['./page-description.component.sass']
})
export class PageDescriptionComponent {
  @Input() page?: Page;
}
