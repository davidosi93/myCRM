import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { ErrorServiceService } from 'src/app/shared/services/error-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
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