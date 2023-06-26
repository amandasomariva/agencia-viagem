import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PacoteService } from '../../services/pacote.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ClienteInterface } from '../../../cliente/types/cliente.interface';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { PassagemInterface } from '../../../passagem/types/passagem.interface';
import { PassagemService } from '../../../passagem/services/passagem.service';


import { LoadingService } from 'src/app/shared/services/loading.service';


@Component({
  selector: 'app-pacote-form-page',
  templateUrl: './pacote-form-page.component.html',
})
export class PacoteFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  pacoteForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string
  clientes: ClienteInterface[] = [];
  passagens: PassagemInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pacoteService: PacoteService,
    private alertController: AlertController,
    private clienteService: ClienteService,
    private passagemService: PassagemService,
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
    this.initializeForm();
    this.loadClientes();
    this.loadPassagens();
    this.loadPacoteOnEditMode()
  }

  private async loadClientes() {
    this.loadingService.on();
    this.subscription.add(
      this.clienteService.getClientes().subscribe((response) => {
        this.clientes = response;
        this.loadingService.off();
      })
    );
  }

  private async loadPassagens() {
    this.loadingService.on();
    this.subscription.add(
      this.passagemService.getPassagens().subscribe((response) => {
        this.passagens = response;
        this.loadingService.off();
      })
    );
  }

  private loadPacoteOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? id : '';

      if (this.id !== '') {
        this.loadingService.on()
        this.pacoteService.getPacote(this.id).subscribe((pacote) => {
          this.pacoteForm.patchValue({
            cliente: pacote.cliente,
            passagem: pacote.passagem,
            roteiro: pacote.roteiro,
            valor: pacote.valor,
            agente: pacote.agente,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.pacoteForm = this.formBuilder.group({
      cliente: '',
      passagem: '',
      roteiro: [
        'Roteiro qualquer',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          this.validaRoteiroPacoteTeste(),
        ]
      ],
      valor: [
        100.00,
        [
          Validators.required,
          this.validaValorPacoteTeste(),
        ]
      ],
      agente: 'carlos',
    })
  }

  validaRoteiroPacoteTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'roteiro') {
        return { invalidRoteiro: 'roteiro' }
      }
      return null;
    };
  }

  validaValorPacoteTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value < 100) {
        return { invalidValor: '100 reais' }
      }
      return null;
    };
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.pacoteService.save(this.pacoteForm.value).subscribe(
          () => {
            this.router.navigate(['./pacotes'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do pacote',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.pacoteService.update({
        ...this.pacoteForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./pacotes'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do pacote',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./pacotes'])
  }

  compareWith1(o1: ClienteInterface, o2: ClienteInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  compareWith2(o1: PassagemInterface, o2: PassagemInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


}
