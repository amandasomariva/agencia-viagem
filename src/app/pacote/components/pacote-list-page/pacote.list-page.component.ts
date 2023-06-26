import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { PacoteService } from '../../services/pacote.service';
import { PacoteInterface } from '../../types/pacote.interface';

@Component({
  selector: 'app-pacote-list-page',
  templateUrl: './pacote-list-page.component.html',
})
export class PacoteListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  pacotes: PacoteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private pacoteService: PacoteService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.pacotes = [];
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

    const subscription = this.pacoteService.getPacotes()
      .subscribe(async (pacotes) => {
        this.pacotes = pacotes;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de pacotes carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de pacotes',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(pacote: PacoteInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o pacote ${pacote.roteiro}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.pacoteService.remove(pacote).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }


}
