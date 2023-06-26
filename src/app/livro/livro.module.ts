import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LivroCadastroComponent } from './components/cadastro/livro-cadastro.component';
import { LivroListaComponent } from './components/lista/livro-lista.component';
import { LivroRoutingModule } from './livro-routing.module';
import { LivroService } from './services/livro.service';


@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, LivroRoutingModule],
    declarations: [LivroListaComponent, LivroCadastroComponent],
    providers: [LivroService]
})
export class LivroModule { }