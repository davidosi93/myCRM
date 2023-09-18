import { Component, OnInit, inject } from '@angular/core';
import { Customers } from '../../model/customers';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  customer: Customers = new Customers();
  colRef: any;
  allCustomers: any = [];
  user: any;

  constructor(public dialog: MatDialog, public authService: AuthService) { }

  ngOnInit() {
    this.authService.authUser$
      .pipe(
        take(1),
        switchMap(user => {
          if (user) {
            return this.getCustomers();
          } else {
            return [];
          }
        })
      )
      .subscribe(() => { });
  }


  async getCustomers() {
    this.colRef = collection(this.firestore, `users/${this.authService.userData.uid}/customers`);
    const querySnapshot = await getDocs(this.colRef);
    querySnapshot.forEach((doc) => {
      this.allCustomers.push(doc.data());
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
