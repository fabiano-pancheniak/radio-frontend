import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferirComponent } from './deferir.component';

describe('DeferirComponent', () => {
  let component: DeferirComponent;
  let fixture: ComponentFixture<DeferirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
