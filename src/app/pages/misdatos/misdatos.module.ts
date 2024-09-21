import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisdatosPageRoutingModule } from './misdatos-routing.module';

import { MisdatosPage } from './misdatos.page';
import { MatDatepickerModule } from '@angular/material/datepicker'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisdatosPageRoutingModule,
    MatDatepickerModule
  ],
  declarations: [MisdatosPage]
})
export class MisdatosPageModule {}
