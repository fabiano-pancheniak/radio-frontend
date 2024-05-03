import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoioCulturalComponent } from './apoio-cultural.component';

describe('ApoioCulturalComponent', () => {
  let component: ApoioCulturalComponent;
  let fixture: ComponentFixture<ApoioCulturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApoioCulturalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApoioCulturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
