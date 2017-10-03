import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScrimComponent } from './edit-scrim.component';

describe('EditScrimComponent', () => {
  let component: EditScrimComponent;
  let fixture: ComponentFixture<EditScrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
