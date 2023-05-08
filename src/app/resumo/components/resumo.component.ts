import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
//import { ResumoService } from '../../services/autor.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ClienteInterface } from '../../cliente/types/cliente.interface';
import { ClienteService } from '../../cliente/services/cliente.service';
import { PassagemInterface } from '../../passagem/types/passagem.interface';
import { PassagemService } from '../../passagem/services/passagem.service';
import { PacoteInterface } from '../../pacote/types/pacote.interface';
import { PacoteService } from '../../pacote/services/pacote.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-resumo-form-page',
  templateUrl: './resumo.component.html',
})
export class ResumoFormPageComponent implements OnInit,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  autorForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number
  clientes: ClienteInterface[] = [];
  passagens: PassagemInterface[] = [];
  pacotes: PacoteInterface[] = [];
  contador: Number = 0; 
  contadorPassagem: Number = 0;
  contadorPacote: Number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    //private autorService: AutorService,
    private alertController: AlertController,
    private clienteService: ClienteService,
    private passagemService: PassagemService,
    private pacoteService: PacoteService,
    private loadingService: LoadingService,
  ) {
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }

  ngOnInit(): void {
    this.loadingService
    //this.initializeForm();
    this.loadClientes();
    this.loadPassagens();
    this.loadPacotes();
    //this.loadAutorOnEditMode()
  }

  private async loadClientes() {
    this.loadingService.on();
    this.subscription.add(
      this.clienteService.getClientes().subscribe((response) => {
        this.clientes = response;
        this.loadingService.off();
        this.contador = this.clientes.length;
        console.log(response);
      })
    );
  }

  private async loadPassagens() {
    this.loadingService.on();
    this.subscription.add(
      this.passagemService.getPassagens().subscribe((response) => {
        this.passagens = response;
        this.loadingService.off();
        this.contadorPassagem = this.passagens.length;
        console.log(response);
      })
    );
  }

  private async loadPacotes() {
    this.loadingService.on();
    this.subscription.add(
      this.pacoteService.getPacotes().subscribe((response) => {
        this.pacotes = response;
        this.loadingService.off();
        this.contadorPacote = this.pacotes.length;
        console.log(response);
      })
    );
  }


}
