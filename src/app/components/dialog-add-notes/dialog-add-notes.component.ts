import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Notes } from '../model/notes';
import { Customers } from '../model/customers';
import { CustomerDetailComponent } from '../dashboard/customer-detail/customer-detail.component';

@Component({
  selector: 'app-dialog-add-notes',
  templateUrl: './dialog-add-notes.component.html',
  styleUrls: ['./dialog-add-notes.component.scss']
})

export class DialogAddNotesComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  note: Notes = new Notes();
  customerId: any;
  customer: Customers = new Customers();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddNotesComponent>,
    public authService: AuthService,
    public customerDetailComponent: CustomerDetailComponent) { }

  ngOnInit(): void { }

  saveNote() {
    this.loading = true;
    let ref = collection(this.firestore, `users/${this.authService.userData.uid}/customers/${this.customerId}/notes`);
    addDoc(ref, this.note.toJSON())
      .then(async () => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch(error => {
        console.error('Fehler beim Hinzufügen der Notiz:', error);
      });
  }


}
