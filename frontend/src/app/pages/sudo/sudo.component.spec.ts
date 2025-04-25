import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudoComponent } from './sudo.component';

describe('SudoComponent', () => {
  let component: SudoComponent;
  let fixture: ComponentFixture<SudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
