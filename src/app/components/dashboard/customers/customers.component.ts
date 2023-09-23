import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  allCustomers: any = [];

  constructor(public dialog: MatDialog, public authService: AuthService, public customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersWithIds().subscribe(customers => {
      this.allCustomers = customers;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
