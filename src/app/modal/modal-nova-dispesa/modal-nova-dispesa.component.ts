import { DInesperadasService } from './../../services/d-inesperadas.service';
import { DatePipe } from '@angular/common';
import { Dfixas, DFixasService } from './../../services/d-fixas.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-nova-dispesa',
  templateUrl: './modal-nova-dispesa.component.html',
  styleUrls: ['./modal-nova-dispesa.component.scss'],
  providers: [DatePipe]
})
export class ModalNovaDispesaComponent implements OnInit {
  tipo;
  edit;
  idDoc;
  today: number = Date.now();

  item = {
    descricao: '',
    preco: 0,
    pago: false,
    created_at: this.datePipe.transform(this.today, 'yyyy-MM-dd')
  };

  constructor(
    public modal: ModalController,
    public formModel: FormsModule,
    private dFixaService: DFixasService,
    private dInesperadaService: DInesperadasService,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.edit) {
      if (this.tipo === 'Fixo') {
        this.dFixaService.getDfixas(this.idDoc).subscribe(res => {
          this.item.descricao = res.descricao;
          this.item.preco = res.preco;
          this.item.pago = res.pago;
        });
      } else {
        this.dInesperadaService.getItem(this.idDoc).subscribe(res => {
          this.item.descricao = res.descricao;
          this.item.preco = res.preco;
          this.item.pago = res.pago;
        });
      }
    }
  }

  fechar() {
    this.modal.dismiss();
  }
  cadastrar() {
    if (this.tipo === 'Fixo') {
      this.dFixaService
        .addDespesaFixa(this.item)
        .then(() => {
          this.modal.dismiss();
          this.presentToast('Cadastro Efeituado com sucesso!');
        })
        .catch(error => {
          this.modal.dismiss();
          this.presentToast(error);
        });
    } else {
      this.dInesperadaService
        .addDespesaInesperada(this.item)
        .then(() => {
          this.modal.dismiss();
          this.presentToast('Cadastro Efeituado com sucesso!');
        })
        .catch(error => {
          this.modal.dismiss();
          this.presentToast(error);
        });
    }
  }
  edite() {
    if (this.tipo === 'Fixo') {
      this.dFixaService.updateTodo(this.idDoc, this.item).then(res => {
        this.presentToast('Item atualizado');
        this.modal.dismiss();
      });
    } else {
      this.dInesperadaService.updateItem(this.idDoc, this.item).then(res => {
        this.presentToast('Item atualizado');
        this.modal.dismiss();
      });
    }
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
