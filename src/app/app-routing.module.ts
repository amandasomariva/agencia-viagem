import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'resumo',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'livros',
    loadChildren: () => import('./livro/livro.module').then(m => m.LivroModule)
  },
  {
    path: 'autores',
    loadChildren: () => import('./autor/autor.module').then(m => m.AutorModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'passagens',
    loadChildren: () => import('./passagem/passagem.module').then(m => m.PassagemModule)
  },
  {
    path: 'pacotes',
    loadChildren: () => import('./pacote/pacote.module').then(m => m.PacoteModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then(m => m.SobreModule)
  },
  {
    path: 'resumo',
    loadChildren: () => import('./resumo/resumo.module').then(m => m.ResumoModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
