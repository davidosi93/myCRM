import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../model/customers';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Notes } from '../model/notes';

@Component({
  selector: 'app-dialog-edit-note',
  templateUrl: './dialog-edit-note.component.html',
  styleUrls: ['./dialog-edit-note.component.scss']
})
export class DialogEditNoteComponent implements OnInit {
  customer!: Customers;
  notes: Notes = new Notes();
  loading = false;
  firestore: Firestore = inject(Firestore);
  customerId: any;
  notesId: any;
  docRef: any;
  updateData: any;

  constructor(public dialogRef: MatDialogRef<DialogEditNoteComponent>, public app: AppComponent, public authService: AuthService) { }

  ngOnInit(): void { }

  saveNote() {
    this.loading = true;
    this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId, 'notes', this.notesId);
    this.updateData = this.notes.toJSON();
    updateDoc(this.docRef, this.updateData)
      .then(() => {
        this.dialogRef.close();
        this.loading = false;
      })
  }
}
