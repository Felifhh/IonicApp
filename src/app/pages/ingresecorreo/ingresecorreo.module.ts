import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresecorreoPageRoutingModule } from './ingresecorreo-routing.module';

import { IngresecorreoPage } from './ingresecorreo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresecorreoPageRoutingModule
  ],
  declarations: [IngresecorreoPage]
})
export class IngresecorreoPageModule {}
