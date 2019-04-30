import { filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { MesesService } from '../services/meses.service';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  providers: [DatePipe]
})
export class CadastroPage implements OnInit {
  user: any = {
    email: '',
    senha: '',
    cfSenha: ''
  };
  today: number = Date.now();
  mesAtual = this.datePipe.transform(this.today, 'MM');
  constructor(
    private navCtrl: NavController,
    private authService: AuthServiceService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private mesesService: MesesService,
    public datePipe: DatePipe,
    public router: Router
  ) {}

  ngOnInit() {}

  async createAccount() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    if (this.user.senha === this.user.cfSenha) {
      const resp = this.authService.registerUser(this.user, res => {
        if (res.message) {
          this.presentToast(res.message, 'danger');
          loading.dismiss();
        } else {
          loading.message = 'Preparando o Ambiente';
          this.mesesService
            .newUserMeses(res.user.uid, this.mesAtual)
            .finally(() => {
              loading.dismiss();
              this.router.navigateByUrl('tabs');
            });
        }
      });
    } else {
      this.presentToast('Senhas diferentes', 'danger');
      loading.dismiss();
    }
  }
  async loadTodo() {}
  async presentToast(msg, cor) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: cor,
      position: 'top'
    });
    toast.present();
  }
}
