import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreComponent } from './components/sobre.component';

const routes: Routes = [
  {
    path: '',
    component: SobreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobrePageRoutingModule {}
