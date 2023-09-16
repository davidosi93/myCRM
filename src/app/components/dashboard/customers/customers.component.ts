import { Component, inject } from '@angular/core';
import { Customers } from '../../model/customers';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from 'firebase/auth';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  allCustomers: any = [];
  customer: Customers = new Customers();
  firestore: Firestore = inject(Firestore);
  customer$: Observable<UserProfile[]>;
  colRef: any;

  constructor(public dialog: MatDialog) {
    this.colRef = collection(this.firestore, 'users');
    this.customer$ = collectionData(this.colRef, { idField: 'uid' }) as Observable<UserProfile[]>;
    this.customer$.subscribe((changes: any) => {
      this.allCustomers = changes;
      console.log(changes);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
