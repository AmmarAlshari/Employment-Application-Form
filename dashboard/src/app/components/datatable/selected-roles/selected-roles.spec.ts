import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRoles } from './selected-roles';

describe('SelectedRoles', () => {
  let component: SelectedRoles;
  let fixture: ComponentFixture<SelectedRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedRoles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
