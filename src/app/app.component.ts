import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
   // { title: 'Home', url: '/', icon: 'home' },
   // { title: 'Livros', url: '/livros', icon: 'book' },
  //{ title: 'Autores', url: '/autores', icon: 'people-circle' },
   // { title: 'Autores Favoritos', url: '/autores/favoritos', icon: 'heart' },
    { title: 'Resumo', url: '/resumo', icon: 'bar-chart' },
    { title: 'Clientes', url: '/clientes', icon: 'people-circle' },
    { title: 'Clientes Favoritos', url: '/clientes/favoritos', icon: 'heart' },
    { title: 'Passagens', url: '/passagens', icon: 'airplane' },
    { title: 'Pacotes', url: '/pacotes', icon: 'cube' },
    { title: 'Quem somos', url: '/sobre', icon: 'archive' },
  ];
  constructor() {}
}
