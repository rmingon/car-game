import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedPartyComponent } from './need-party.component';

describe('NeedPartyComponent', () => {
  let component: NeedPartyComponent;
  let fixture: ComponentFixture<NeedPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedPartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
