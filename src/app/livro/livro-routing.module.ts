import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LivroCadastroComponent } from "./components/cadastro/livro-cadastro.component";
import { LivroListaComponent } from "./components/lista/livro-lista.component";

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: 'lista',
        component: LivroListaComponent
    },
    {
        path: 'cadastro',
        component: LivroCadastroComponent,
    },
    {
        path: 'edicao/:id',
        component: LivroCadastroComponent
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LivroRoutingModule { }