import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { ErrorServiceService } from 'src/app/shared/services/error-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMessage: string = '';
  usernameControl = new FormControl();
  passwordControl = new FormControl();

  constructor(
    public authService: AuthService,
    private errorService: ErrorServiceService
  ) { }

  ngOnInit() {
    this.errorService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }
}