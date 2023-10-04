import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuteExchangeComponent } from './valute-exchange.component';

describe('ValuteExchangeComponent', () => {
  let component: ValuteExchangeComponent;
  let fixture: ComponentFixture<ValuteExchangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValuteExchangeComponent]
    });
    fixture = TestBed.createComponent(ValuteExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
