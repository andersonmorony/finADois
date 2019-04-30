import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalheDespesasPage } from './detalhe-despesas.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheDespesasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalheDespesasPage]
})
export class DetalheDespesasPageModule {}
