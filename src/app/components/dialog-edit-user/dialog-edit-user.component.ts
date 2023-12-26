import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../model/customers';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  customer: Customers = new Customers;
  loading = false;
  birthDate: Date | any;
  firestore: Firestore = inject(Firestore);
  customerId: any;
  docRef: any;
  docSnap: any;
  updateData: any;
  dayOfBirth: any;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, public app: AppComponent, public authService: AuthService) { }

  ngOnInit(): void {
    this.birthDate = new Date(this.customer.birthDate);    
  }

  saveUser() {
    this.loading = true;
    this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId);
    this.updateData = {
      ...this.customer.toJSON(),
      birthDate: this.birthDate.getTime()
    };
    updateDoc(this.docRef, this.updateData)
      .then(() => {
        this.dialogRef.close();
        this.loading = false;
      })
  }
}
