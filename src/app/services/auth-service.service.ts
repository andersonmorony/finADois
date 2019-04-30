import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(public firebaseauth: AngularFireAuth) {}

  registerUser(value, callback) {
    this.firebaseauth.auth
      .createUserWithEmailAndPassword(value.email, value.senha)
      .then(res => {
        return callback(res);
      })
      .catch(err => {
        return callback(err);
      });
  }

  async login(user, callback) {
    this.firebaseauth.auth
      .signInWithEmailAndPassword(user.email, user.senha)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err);
      });
  }

  async logout() {
    return this.firebaseauth.auth.signOut();
  }

  async statusUser(callback) {
    this.firebaseauth.auth.onAuthStateChanged(res => {
      callback(res);
    });
  }
}
