import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../../model/customers';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';
import { Firestore, addDoc, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { UserProfile } from 'firebase/auth';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  customer: Customers = new Customers();
  customer$: Observable<UserProfile[]>;
  colRef: any;
  allCustomers: any = [];
  userId: string | any;

  constructor(public dialog: MatDialog, public authService: AuthService) { }

  async ngOnInit() {
    const querySnapshot = await getDocs(collection(this.firestore, "users", "5sZ47cYXq9cVnIHpOn7c1tvj4I72", "customers"));
    querySnapshot.forEach((doc) => {
      this.allCustomers.push(doc.data());
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
