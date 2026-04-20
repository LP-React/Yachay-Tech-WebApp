import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationRuntimeComponent } from './simulation-runtime.component';

describe('SimulationRuntimeComponent', () => {
  let component: SimulationRuntimeComponent;
  let fixture: ComponentFixture<SimulationRuntimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationRuntimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationRuntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
