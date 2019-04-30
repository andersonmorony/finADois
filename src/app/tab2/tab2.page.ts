import { DFixasService } from './../services/d-fixas.service';
import { DInesperadasService } from './../services/d-inesperadas.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MesesService } from './../services/meses.service';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [DatePipe]
})
export class Tab2Page implements OnInit {
  valorPagoInesperado: string;
  valorNPagoInesperado: string;
  valorPagoFixo: any;
  valorNPagoFixo: any;
  today: number = Date.now();
  mesAtual;
  item: any;
  valorTotalFixo;
  valorTotalInesperado;
  nomeMes: string;
  idDoc;
  uid;
  constructor(
    private mesesService: MesesService,
    public datePipe: DatePipe,
    private loadingController: LoadingController,
    private dInesperadaService: DInesperadasService,
    private dFIxasServices: DFixasService,
    public navCtrl: NavController,
    public authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.mesAtual = this.datePipe.transform(this.today, 'MM');
    this.mesAtual = +this.mesAtual;
    this.authService.statusUser(dados => {
      this.uid = dados.uid;
      this.mesesService.getAll(dados.uid).subscribe(res => {
        res.forEach(element => {
          if (element.mes === this.mesAtual) {
            this.item = element;
            this.loadTodo(this.item.id);
            this.nomeMes = element.nome;
            this.idDoc = element.id;
          }
        });
      });
    });
  }
  async loadTodo(idDoc) {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    await loading.present();

    this.dInesperadaService.getAll(idDoc, this.uid).subscribe(res => {
      this.item = res;
      this.valorTotalInesperado = this.valores(res);
      this.valorPagoInesperado = this.valoresPago(res);
      this.valorNPagoInesperado = this.valoresNPago(res);
    });

    this.dFIxasServices.getAllDFixo(idDoc, this.uid).subscribe(res => {
      this.item = res;
      this.valorTotalFixo = this.valores(res);
      this.valorPagoFixo = this.valoresPago(res);
      this.valorNPagoFixo = this.valoresNPago(res);
      loading.dismiss();
    });
  }
  valores(list) {
    let n = 0;
    for (const item of list) {
      n += item.preco;
    }
    return n.toFixed(2);
  }
  valoresPago(list) {
    let n = 0;
    for (const item of list) {
      if (item.pago) {
        n += item.preco;
      }
    }
    return n.toFixed(2);
  }
  valoresNPago(list) {
    let n = 0;
    for (const item of list) {
      if (!item.pago) {
        n += item.preco;
      }
    }
    return n.toFixed(2);
  }
  goDetalheFixo(event) {
    this.navCtrl.navigateForward(`/detalhe-despesas/Fixo/${this.idDoc}`);
  }
  goDetalheInesperado(event) {
    this.navCtrl.navigateForward(`/detalhe-despesas/Inesperado/${this.idDoc}`);
  }
}
