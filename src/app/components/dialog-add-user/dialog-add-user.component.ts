import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../model/customers';
import { Firestore, collection, addDoc, collectionData, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  customerCollection = collection(this.firestore, 'users');
  customer$: Observable<any[]>;
  customer: Customers = new Customers();
  birthDate!: Date;
  loading = false;
  

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.customer$ = collectionData(this.customerCollection);
  }

  ngOnInit() {

  }

  saveCustomer() {
    this.loading = true;
    addDoc(this.customerCollection, this.customer.toJSON())
      .then(result => {
        this.loading = false;
        console.log("Adding customer finished", result);
        this.dialogRef.close();
      })
  }
}
