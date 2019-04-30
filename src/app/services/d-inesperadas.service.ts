import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface DInesperadas {
  id?: string;
  descricao: string;
  preco: number;
  pago: boolean;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class DInesperadasService {
  private despesas: Observable<DInesperadas[]>;
  private subCollection: AngularFirestoreCollection<DInesperadas>;

  constructor(private afs: AngularFirestore) {}

  getAll(idDoc, uid) {
    this.subCollection = this.afs
      .collection('Usuarios').doc(uid).collection('Meses')
      .doc(idDoc)
      .collection('dInesperada');
    this.despesas = this.subCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.despesas;
  }
  addDespesaInesperada(item) {
    return this.subCollection.add(item);
  }
  updateItem(id: string, item) {
    return this.subCollection.doc(id).update(item);
  }
  getItem(id) {
    return this.subCollection.doc<DInesperadas>(id).valueChanges();
  }
  removeItem(id) {
    return this.subCollection.doc(id).delete();
  }
}
