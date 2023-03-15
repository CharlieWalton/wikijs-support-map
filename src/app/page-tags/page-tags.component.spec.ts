import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTagsComponent } from './page-tags.component';

describe('PageTagsComponent', () => {
  let component: PageTagsComponent;
  let fixture: ComponentFixture<PageTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
