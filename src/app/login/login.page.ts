import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { AuthServiceService } from './../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: any = {
    email: '',
    senha: '',
    id: ''
  };
  usuario: firebase.User;
  msgErro: any;

  constructor(
    private authService: AuthServiceService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTodo();
  }

  login() {
    this.authService.login(this.user, res => {
      if (res.message) {
        this.presentToast(res.message);
      }
    });
  }
  createAccount() {
    this.navCtrl.navigateForward(`/cadastro`);
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    await loading.present();

    this.authService.statusUser(res => {
      if (res) {
        this.navCtrl.navigateForward('/tabs');
      }
      loading.dismiss();
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }
}
