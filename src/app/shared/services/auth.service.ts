import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { ErrorServiceService } from './error-service.service';
import { Observable, Subscription, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; // Save logged in user data
  signIn: SignInComponent;
  authUser$: Observable<firebase.default.User | null>;
  userSubscription: Subscription | undefined;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private errorService: ErrorServiceService, // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.authUser$ = this.afAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user_1) => {
        if (user_1) {
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error) {
      this.errorService.showError('Login failed. Please check your e-mail and password');
    }
  }

  // Login as GuestUser
  async GuestSignIn() {
    const guestEmail = 'guest@example.com';
    const guestPassword = 'secureGuestPassword';
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(guestEmail, guestPassword);
      await this.SetUserData(result.user);
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('Fehler bei der Gastanmeldung:', error);
      this.errorService.showError('Fehler bei der Gastanmeldung.');
    }
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['sign-in']);
      })
      .catch((error) => {
        this.errorService.showError('Signup failed. Please check your e-mail and password');
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}