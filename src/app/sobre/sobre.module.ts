import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobrePageRoutingModule } from './sobre-routing.module';
import { SobreComponent } from './components/sobre.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrePageRoutingModule
  ],
  declarations: [SobreComponent]
})
export class SobreModule {}
