import { Component, Inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { LivroInterface } from '../../types/livro.interface';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
})
export class LivroListaComponent implements OnInit {
  livros: LivroInterface[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.livroService.getLivros().subscribe(
      (livros) => {
        this.livros = livros;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('Terminou!');
      }
    );
  }

  remove(livro: LivroInterface) {
    this.livroService.remove(livro).subscribe(
      () => this.list(),
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('Terminou!');
      }
    );
  }


} 