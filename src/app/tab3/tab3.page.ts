import { async } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from './../services/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private authService: AuthServiceService, private navCtrl: NavController) {}

  async logout() {
    this.authService.logout().finally(() => {
      this.navCtrl.navigateForward(`/login`);
    });
  }
}
