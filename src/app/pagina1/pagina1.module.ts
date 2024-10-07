import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Pagina1PageRoutingModule } from './pagina1-routing.module';
import { Pagina1Page } from './pagina1.page';
import { HttpClientModule } from '@angular/common/http'; // Importar o HttpClientModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pagina1PageRoutingModule,
    HttpClientModule // Certifique-se de adicionar aqui
  ],
  declarations: [Pagina1Page]
})
export class Pagina1PageModule {}