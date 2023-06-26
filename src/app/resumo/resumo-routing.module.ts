
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ResumoFormPageComponent } from './components/resumo.component';



const routes: Route[] = [

  {
    path: '',
    component: ResumoFormPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumoRoutingModule {}
