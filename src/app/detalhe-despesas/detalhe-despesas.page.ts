import { DInesperadasService, DInesperadas } from './../services/d-inesperadas.service';
import { LoadingController, ModalController, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DFixasService, Dfixas } from './../services/d-fixas.service';
import { ModalNovaDispesaComponent } from './../modal/modal-nova-dispesa/modal-nova-dispesa.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-detalhe-despesas',
  templateUrl: './detalhe-despesas.page.html',
  styleUrls: ['./detalhe-despesas.page.scss']
})
export class DetalheDespesasPage implements OnInit {
  idDoc = this.route.snapshot.paramMap.get('id');
  tipoDoc = this.route.snapshot.paramMap.get('tipo');
  contasFixas: Dfixas[];
  contasInesperadas: DInesperadas[];

  constructor(
    private route: ActivatedRoute,
    private fixoService: DFixasService,
    private InesperadaService: DInesperadasService,
    private loadingController: LoadingController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.loadTodo();
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    await loading.present();
    this.authService.statusUser(user => {
        if (this.tipoDoc === 'Fixo') {
          this.fixoService.getAllDFixo(this.idDoc, user.uid).subscribe(res => {
            this.contasFixas = res;
            loading.dismiss();
          });
        } else {
          this.InesperadaService.getAll(this.idDoc, user.uid).subscribe(res => {
            this.contasInesperadas = res;
            loading.dismiss();
          });
        }
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalNovaDispesaComponent,
      componentProps: { tipo: this.tipoDoc }
    });
    return await modal.present();
  }
  async editModal(id) {
    const modal = await this.modalController.create({
      component: ModalNovaDispesaComponent,
      componentProps: { edit: true, idDoc: id, tipo: this.tipoDoc }
    });
    return await modal.present();
  }

  async presentActionSheet(event) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            if (this.tipoDoc === 'Fixo') {
              this.fixoService.removeTodo(event.toElement.id);
            } else {
              this.InesperadaService.removeItem(event.toElement.id);
            }
            this.presentToast('Item Deletado com sucesso');
          }
        },
        {
          text: 'Editar',
          role: 'edit',
          icon: 'create',
          handler: () => {
            this.editModal(event.toElement.id);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
