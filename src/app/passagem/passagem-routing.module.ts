import { PassagemFormPageComponent } from './components/passagem-form-page/passagem-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PassagemListPageComponent } from './components/passagem-list-page/passagem-list.page.component';


const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: PassagemListPageComponent,
  },
  {
    path: 'cadastro',
    component: PassagemFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: PassagemFormPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassagemRoutingModule {}
