import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export interface Meses {
  id?: string;
  nome: string;
  mes: number;
}

@Injectable({
  providedIn: 'root'
})
export class MesesService {
  private meses: Observable<Meses[]>;
  private mesesCollection: AngularFirestoreCollection<Meses>;
  private all = [];
  nomeMes;

  constructor(private afs: AngularFirestore) {}

   getAll(uid) {
    this.mesesCollection = this.afs
      .collection('Usuarios')
      .doc(uid)
      .collection<Meses>('Meses', ref => ref.orderBy('mes', 'desc'));
    this.meses = this.mesesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.meses;
  }

  async newUserMeses(idUser, mes) {
    for (let index = 1; index <= mes; index++) {
      this.attNomeMes(index);
      this.afs
        .collection('Usuarios')
        .doc(idUser)
        .collection('Meses')
        .add({
          mes: index,
          nome: this.nomeMes
        });
    }
  }

  private attNomeMes(index) {
    if (index === 1) {
      this.nomeMes = 'Janeiro';
    } else if (index === 2) {
      this.nomeMes = 'Fevereiro';
    } else if (index === 3) {
      this.nomeMes = 'Março';
    } else if (index === 4) {
      this.nomeMes = 'Abril';
    } else if (index === 5) {
      this.nomeMes = 'Maio';
    } else if (index === 6) {
      this.nomeMes = 'Junho';
    } else if (index === 7) {
      this.nomeMes = 'Julho';
    } else if (index === 8) {
      this.nomeMes = 'Agosto';
    } else if (index === 9) {
      this.nomeMes = 'Setembro';
    } else if (index === 10) {
      this.nomeMes = 'Outubro';
    } else if (index === 11) {
      this.nomeMes = 'Novembro';
    } else if (index === 12) {
      this.nomeMes = 'Dezembro';
    }
  }
}
