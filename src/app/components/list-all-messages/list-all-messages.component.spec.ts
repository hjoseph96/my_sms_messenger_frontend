import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllMessagesComponent } from './list-all-messages.component';

describe('ListAllMessagesComponent', () => {
  let component: ListAllMessagesComponent;
  let fixture: ComponentFixture<ListAllMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
