import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditionsFormComponent } from "./editions-form.component";

describe("EditionsFormComponent", () => {
  let component: EditionsFormComponent;
  let fixture: ComponentFixture<EditionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditionsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
