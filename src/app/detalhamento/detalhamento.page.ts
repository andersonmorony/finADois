import { NavController, ModalController } from '@ionic/angular';
import { DInesperadasService, DInesperadas } from './../services/d-inesperadas.service';
import { LoadingController } from '@ionic/angular';
import { DFixasService, Dfixas } from './../services/d-fixas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalNovaDispesaComponent } from '../modal/modal-nova-dispesa/modal-nova-dispesa.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-detalhamento',
  templateUrl: './detalhamento.page.html',
  styleUrls: ['./detalhamento.page.scss']
})
export class DetalhamentoPage implements OnInit {
  dFIxas: Dfixas[];
  totaldFixas;
  totalInesperadas;
  dInesperadas: DInesperadas[];
  idDoc = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private dFIxasServices: DFixasService,
    private dInesperadaService: DInesperadasService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private modalController: ModalController,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.loadTodo();
  }
  ionViewWillEnter() {}

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    await loading.present();
    this.authService.statusUser(dado => {
      this.dInesperadaService
        .getAll(this.idDoc, dado.uid)
        .subscribe(res => {
          this.dInesperadas = res;
          this.totalInesperadas = this.valores(this.dInesperadas);
        });
    });
    this.authService.statusUser(dado => {
    this.dFIxasServices.getAllDFixo(this.idDoc, dado.uid)
    .subscribe(res => {
      this.dFIxas = res;
      this.totaldFixas = this.valores(this.dFIxas);
      loading.dismiss();
      });
    });
  }

  async novoDespesa(event) {
    const modal = await this.modalController.create({
      component: ModalNovaDispesaComponent,
      componentProps: { tipo: event.target.dataset.tipo }
    });
    return await modal.present();
  }

  goDetalheFixo(event) {
    this.navCtrl.navigateForward(`/detalhe-despesas/Fixo/${this.idDoc}`);
  }
  goDetalheInesperado(event) {
    this.navCtrl.navigateForward(`/detalhe-despesas/Inesperado/${this.idDoc}`);
  }

  // Joga os total de despesas fixas na tela
  valores(dfixas) {
    let n = 0;
    for (const data of dfixas) {
      n += data.preco;
    }
    return n.toFixed(2);
  }
}
