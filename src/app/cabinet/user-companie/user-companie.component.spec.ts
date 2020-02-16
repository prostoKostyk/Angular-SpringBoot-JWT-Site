import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanieComponent } from './user-companie.component';

describe('UserCompanieComponent', () => {
  let component: UserCompanieComponent;
  let fixture: ComponentFixture<UserCompanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCompanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
