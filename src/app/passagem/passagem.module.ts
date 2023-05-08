import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PassagemRoutingModule } from './passagem-routing.module';
import { PassagemFormPageComponent } from './components/passagem-form-page/passagem-form-page.component';
import { PassagemListPageComponent } from './components/passagem-list-page/passagem-list.page.component';
import { PassagemService } from './services/passagem.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, PassagemRoutingModule],
  declarations: [PassagemListPageComponent, PassagemFormPageComponent],
  providers: [PassagemService],
})
export class PassagemModule {}

