import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresecorreoPage } from './ingresecorreo.page';

const routes: Routes = [
  {
    path: '',
    component: IngresecorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresecorreoPageRoutingModule {}
