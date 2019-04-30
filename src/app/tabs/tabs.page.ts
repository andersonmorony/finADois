import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(private authService: AuthServiceService, private navCtrl: NavController) {}
  ngOnInit(): void {
    this.authService.statusUser(res => {
      if (!res) {
        this.navCtrl.navigateForward('/login');
      }
    });
  }
}
