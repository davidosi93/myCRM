import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  private errorMessageSource = new Subject<string>();
  errorMessage$ = this.errorMessageSource.asObservable();

  showError(errorMessage: string) {
    this.errorMessageSource.next(errorMessage);
  }
}
