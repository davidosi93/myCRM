import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Firestore, doc, getDoc, deleteDoc, collection, DocumentData, Query, query, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Customers } from '../../model/customers';
import { Notes } from '../../model/notes';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../../dialog-edit-address/dialog-edit-address.component';
import { DialogAddNotesComponent } from '../../dialog-add-notes/dialog-add-notes.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { AppComponent } from 'src/app/app.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class CustomerDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  docRef: any;
  customerId: any;
  customer: Customers = new Customers();
  docSnap: any;
  allNotes: Notes[] = [];

  constructor(private route: ActivatedRoute,
    private location: Location,
    public app: AppComponent,
    public dialog: MatDialog,
    public authService: AuthService,
    public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomersWithIds().subscribe(() => {
      this.route.paramMap.subscribe(paramMap => {
        this.customerId = paramMap.get('id');
        this.getUser();
      });
    });
  }

  async getUser() {
    this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId);
    this.docSnap = await getDoc(this.docRef);
    this.customer = this.docSnap.data();
    this.getBirthdate();
    this.setupNotesListener();
  }

  private setupNotesListener() {
    const notesRef: Query<DocumentData> = query(
      collection(this.firestore, `users/${this.authService.userData.uid}/customers/${this.customerId}/notes`)
    );
    onSnapshot(notesRef, (snapshot: QuerySnapshot<DocumentData>) => {
      this.allNotes = snapshot.docs.map((doc) => doc.data() as Notes);
      console.log(this.allNotes);
    });
  }



  getBirthdate() {
    if (this.customer && this.customer.birthDate) {
      let timestamp = this.customer.birthDate;
      let date = new Date(timestamp);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let dayOfBirth = day + '.' + month + '.' + year;
      return dayOfBirth;
    }
    return '';
  }

  editMenuUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.customer = new Customers(this.customer);
    dialog.componentInstance.customerId = this.customerId;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.customer = new Customers(this.customer);
    dialog.componentInstance.customerId = this.customerId;
  }

  async deleteUser() {
    this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId);
    await deleteDoc(this.docRef);
    this.customer = new Customers();
    this.goBackToUserList();
  }

  goBackToUserList() {
    this.location.back();
  }

  openNotesDialog() {
    const dialog = this.dialog.open(DialogAddNotesComponent);
    dialog.componentInstance.customer = new Customers(this.customer);
    dialog.componentInstance.customerId = this.customerId;
  }
}
