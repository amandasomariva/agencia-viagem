import { PacoteFormPageComponent } from './components/pacote-form-page/pacote-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PacoteListPageComponent } from './components/pacote-list-page/pacote.list-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: PacoteListPageComponent,
  },
  {
    path: 'cadastro',
    component: PacoteFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: PacoteFormPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacoteRoutingModule {}
