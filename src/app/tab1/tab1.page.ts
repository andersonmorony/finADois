import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { DetalhamentoPage } from './../detalhamento/detalhamento.page';
import { Route, Router } from '@angular/router';
import { MesesService, Meses } from './../services/meses.service';
import { NavController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe]
})
export class Tab1Page implements OnInit {
  meses: Meses[];
  today: number = Date.now();
  mesAtual: any;

  constructor(
    public router: Router,
    public mesesService: MesesService,
    public loadingController: LoadingController,
    public datePipe: DatePipe,
    private authService: AuthServiceService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.mesAtual = this.datePipe.transform(this.today, 'MM');
    this.loadTodo();
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();

    this.authService.statusUser(res => {
      this.mesesService.getAll(res.uid).subscribe(value => {
        this.meses = value;
        loading.dismiss();
      });
    });

  }

  go(id) {
    this.router.navigateByUrl('/detalhamento/' + id);
  }
}
