import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../model/customers';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  customer: Customers = new Customers();
  birthDate!: Date;
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public authService: AuthService) {
    
   }

  ngOnInit() {

  }

  saveCustomer() {
    this.customer.birthDate = this.birthDate.getTime();
    this.loading = true;
    let ref = collection(this.firestore, `users/${this.authService.userData.uid}/customers`);
    addDoc(ref, this.customer.toJSON())
      .then((result) => {
        this.loading = false;
        this.dialogRef.close();
      })
  }
}
