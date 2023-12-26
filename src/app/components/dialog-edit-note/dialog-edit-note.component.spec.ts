import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditNoteComponent } from './dialog-edit-note.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditNoteComponent', () => {
  let component: DialogEditNoteComponent;
  let fixture: ComponentFixture<DialogEditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, 
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule, 
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogEditNoteComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Firestore, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DialogEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
