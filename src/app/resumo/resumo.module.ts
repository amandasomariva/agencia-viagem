import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumoRoutingModule } from './resumo-routing.module';
import { ResumoFormPageComponent } from './components/resumo.component';
import { ClienteService } from '../cliente/services/cliente.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PassagemService } from '../passagem/services/passagem.service';
import { PacoteService } from '../pacote/services/pacote.service';



@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, ResumoRoutingModule],
  declarations: [ResumoFormPageComponent],
  providers: [ClienteService, PassagemService, PacoteService, HttpClient]
})
export class ResumoModule {}