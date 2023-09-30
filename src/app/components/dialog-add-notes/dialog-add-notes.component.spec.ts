import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNotesComponent } from './dialog-add-notes.component';

describe('DialogAddNotesComponent', () => {
  let component: DialogAddNotesComponent;
  let fixture: ComponentFixture<DialogAddNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddNotesComponent]
    });
    fixture = TestBed.createComponent(DialogAddNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
