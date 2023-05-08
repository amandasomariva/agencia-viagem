import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PacoteRoutingModule } from './pacote-routing.module';
import { PacoteFormPageComponent } from './components/pacote-form-page/pacote-form-page.component';
import { PacoteListPageComponent } from './components/pacote-list-page/pacote.list-page.component';
import { PacoteService } from './services/pacote.service';
import { ClienteService } from '../cliente/services/cliente.service';
import { PassagemService } from '../passagem/services/passagem.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, PacoteRoutingModule],
  declarations: [PacoteListPageComponent, PacoteFormPageComponent],
  providers: [PacoteService, ClienteService, PassagemService],
})
export class PacoteModule {}
