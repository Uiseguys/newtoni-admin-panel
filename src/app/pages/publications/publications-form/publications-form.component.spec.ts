import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsFormComponent } from './publications-form.component';

describe('PublicationsFormComponent', () => {
  let component: PublicationsFormComponent;
  let fixture: ComponentFixture<PublicationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
