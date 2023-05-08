import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { PassagemService } from '../../services/passagem.service';
import { PassagemInterface } from '../../types/passagem.interface';

@Component({
  selector: 'app-passagem-list-page',
  templateUrl: './passagem-list-page.component.html',
})
export class PassagemListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  passagens: PassagemInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private passagemService: PassagemService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.passagens = [];
  }

  ionViewWillEnter(): void {
    this.listar();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.passagemService.getPassagens()
      .subscribe(async (passagens) => {
        this.passagens = passagens;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de passagens carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de passagens',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(passagem: PassagemInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a passagem ${passagem.destino}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.passagemService.remove(passagem).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

}
