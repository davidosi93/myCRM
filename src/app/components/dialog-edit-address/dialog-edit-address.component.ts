import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../model/customers';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  customer: Customers = new Customers();
  loading = false;
  firestore: Firestore = inject(Firestore);
  customerId: any;
  docRef: any;
  docSnap: any;
  updateData: any;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.saveAddressForm.valid) {
      this.loading = true;
      this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId);
      this.updateData = this.customer.toJSON();
      updateDoc(this.docRef, this.updateData)
        .then(() => {
          this.dialogRef.close();
          this.loading = false;
        })
    }
  }

  saveAddressForm = new FormGroup({
    street: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl('')
  })
}
