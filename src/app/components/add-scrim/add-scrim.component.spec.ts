import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScrimComponent } from './add-scrim.component';

describe('AddScrimComponent', () => {
  let component: AddScrimComponent;
  let fixture: ComponentFixture<AddScrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
