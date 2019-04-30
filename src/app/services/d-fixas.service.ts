import { Dfixas } from './d-fixas.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Dfixas {
  id?: string;
  descricao: string;
  preco: number;
  created_at: Date;
  pago: boolean;
}

@Injectable({
  providedIn: 'root'
})



export class DFixasService {
         private despesas: Observable<Dfixas[]>;
         private subCollection: AngularFirestoreCollection<Dfixas>;

         constructor(private afs: AngularFirestore) {}

          getAllDFixo(idDfixo, uid) {
            this.subCollection = this.afs.collection('Usuarios')
            .doc(uid)
            .collection('Meses')
            .doc(idDfixo)
            .collection('dFixas', res => res.orderBy('descricao', 'asc'));
            this.despesas = this.subCollection
              .snapshotChanges()
              .pipe(
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

        addDespesaFixa(dFixa) {
          return this.subCollection.add(dFixa);
        }
        updateTodo(id: string, dFixa) {
          return this.subCollection.doc(id).update(dFixa);
        }
        getDfixas(id) {
          return this.subCollection.doc<Dfixas>(id).valueChanges();
        }
        removeTodo(id) {
          return this.subCollection.doc(id).delete();
        }
       }
