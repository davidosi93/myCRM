import { Injectable } from '@angular/core';
import { Firestore, collection, query, onSnapshot } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private firestore: Firestore, private authService: AuthService) { }

    getCustomersWithIds() {
        return this.authService.authUser$
            .pipe(
                take(1),
                switchMap(user => {
                    if (user) {
                        const colRef = collection(this.firestore, `users/${user.uid}/customers`);
                        const q = query(colRef);
                        return new Observable<any[]>(observer => {
                            const unsubscribe = onSnapshot(q, querySnapshot => {
                                const customers = [];
                                querySnapshot.forEach(doc => {
                                    const id = doc.id;
                                    const data = doc.data();
                                    customers.push({ id, ...data });
                                });
                                observer.next(customers);
                            });
                            return () => unsubscribe();
                        });
                    } else {
                        return of([]);
                    }
                })
            );
    }
}
