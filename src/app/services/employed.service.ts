import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EmployedI } from '../models/employed.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployedService {

  private usuarioCollection: AngularFirestoreCollection<EmployedI>;
  private usuarios: Observable<EmployedI[]>;

  constructor(private afs: AngularFirestore) {
    this.usuarioCollection = afs.collection<EmployedI>('employed');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  getUsers(): Observable<EmployedI[]> {
    return this.usuarios
  }

  getUser(userId: string): Observable<EmployedI> {
    console.log(userId);
    return this.usuarioCollection.doc<EmployedI>(userId).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = userId;
        return user;
      })
    );
  }

  addemployed(userAdd: EmployedI): Promise<DocumentReference> {
    return this.usuarioCollection.add(userAdd);
  }

}
