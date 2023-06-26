import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PassagemService } from '../../services/passagem.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-passagem-form-page',
  templateUrl: './passagem-form-page.component.html',
})
export class PassagemFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  passagemForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private passagemService: PassagemService,
    private alertController: AlertController,
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
    this.loadPassagemOnEditMode()
  }


  private loadPassagemOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? id : '';

      if (this.id !== '') {
        this.loadingService.on()
        this.passagemService.getPassagem(this.id).subscribe((passagem) => {
          this.passagemForm.patchValue({
            tipo: passagem.tipo,
            dataIda: passagem.dataIda,
            dataVolta: passagem.dataVolta,
            origem: passagem.origem,
            destino: passagem.destino,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.passagemForm = this.formBuilder.group({
      tipo: 'economico',
      dataIda: '2023-07-01',
      dataVolta: '2023-07-02',
      origem: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.validaOrigemPassagemTeste(),
        ]
      ],
      destino: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.validaDestinoPassagemTeste(),
        ]
      ],
    })
  }



  validaOrigemPassagemTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'origem') {
        return { invalidOrigem: 'origem' }
      }
      return null;
    };
  }

  validaDestinoPassagemTeste(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'destino'){
        return { invalidDestino: 'destino' }
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
        this.passagemService.save(this.passagemForm.value).subscribe(
          () => {
            this.router.navigate(['./passagens'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados da passagem',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.passagemService.update({
        ...this.passagemForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./passagens'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados da passagem',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./passagens'])
  }




}

