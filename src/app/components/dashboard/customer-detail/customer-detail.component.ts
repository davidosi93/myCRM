import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Firestore, doc, getDoc, deleteDoc, collection, DocumentData, onSnapshot, QuerySnapshot, getDocs } from '@angular/fire/firestore';
import { Customers } from '../../model/customers';
import { Notes } from '../../model/notes';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../../dialog-edit-address/dialog-edit-address.component';
import { DialogAddNotesComponent } from '../../dialog-add-notes/dialog-add-notes.component';
import { DialogEditNoteComponent } from '../../dialog-edit-note/dialog-edit-note.component';
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
  notesId: string | null = null;
  customer: Customers = new Customers();
  notes: Notes = new Notes();
  docSnap: any;
  allNotes: { id: string, notes: Notes }[] = [];
  selectedNoteIndex: number | null = null;

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

  private setupNotesListener() {
    let notesRef = collection(this.firestore, `users/${this.authService.userData.uid}/customers/${this.customerId}/notes`);
    onSnapshot(notesRef, (snapshot: QuerySnapshot<DocumentData>) => {
      this.allNotes = snapshot.docs.map((doc) => {
        const id = doc.id;
        const notes = doc.data() as Notes;
        return { id, notes };
      });
    });
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

  editNotes() {
    if (this.notesId !== null) {
      let selectedNote = this.allNotes.find(note => note.id === this.notesId);
      if (selectedNote) {
        const dialog = this.dialog.open(DialogEditNoteComponent);
        dialog.componentInstance.customer = new Customers(this.customer);
        dialog.componentInstance.customerId = this.customerId;
        dialog.componentInstance.notes = new Notes(selectedNote.notes);
        dialog.componentInstance.notesId = this.notesId;
      }
    }
  }

  selectNote(index: number) {
    if (this.allNotes[index]) {
      let selectedNote = this.allNotes[index];
      this.notesId = selectedNote.id;
      this.editNotes();
    }
  }

  async deleteNote(index: number) {
    if (this.allNotes[index]) {
      let selectedNote = this.allNotes[index];
      this.notesId = selectedNote.id;
      this.docRef = doc(this.firestore, `users/${this.authService.userData.uid}/customers`, this.customerId, 'notes', this.notesId);
      await deleteDoc(this.docRef);
    }
  }

  async getNotesForCustomer(customerId: string): Promise<Notes[]> {
    const notesRef = collection(this.firestore, `users/${this.authService.userData.uid}/customers/${customerId}/notes`);
    const notesSnapshot = await getDocs(notesRef);
    const notes = notesSnapshot.docs.map((doc) => doc.data() as Notes);
    return notes;
  }

}
