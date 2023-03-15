import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-tags',
  templateUrl: './page-tags.component.html',
  styleUrls: ['./page-tags.component.sass']
})
export class PageTagsComponent {
  @Input() tags?: string[];
}
