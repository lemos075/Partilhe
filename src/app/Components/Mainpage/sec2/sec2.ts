import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-sec2',
  styleUrl: './sec2.css',
  template: ` 
  
    <section class="section2MainPage">
      <legend>regiões</legend>
      <h2 class="h2Section2">
        Conheça as atuais regiões com <span>maiores</span> indice de<span> carencia</span>
      </h2>

      <button type="button" class="btnMainPageSection2" routerLink="/register">
        Veja todas as regiões
      </button>

      <br />

      <div class="cardMainPageSection2">
        <h3>Ilha de marajó</h3>
        <div class="adjustInputCardSection2">
          <span class="countCardSection2">0</span>
          <p>doações</p>
        </div>
        <img class="imgSection2DonationCard" src="photos/Ilha-do-Marajo.png" alt="Ilha de Marajó" />
        <button class="btnSection2DonationCard" routerLink="/register">Doar</button>
      </div>
      <div class="cardMainPageSection2">
        <h3>Belágua</h3>
        <div class="adjustInputCardSection2">
          <span class="countCardSection2">0</span>
          <p>doações</p>
        </div>
        <img class="imgSection2DonationCard" src="photos/belagua.png" alt="Belágua" />
        <button class="btnSection2DonationCard" routerLink="/register">Doar</button>
      </div>
      <div class="cardMainPageSection2">
        <h3>Marajá do sena</h3>
        <div class="adjustInputCardSection2">
          <span class="countCardSection2">0</span>
          <p>doações</p>
        </div>
        <img class="imgSection2DonationCard" src="photos/maraja-do-sena.png" alt="Marajá do Sena" />
        <button class="btnSection2DonationCard" routerLink="/register">Doar</button>
      </div>
      <div class="cardMainPageSection2">
        <h3>chaves</h3>
        <div class="adjustInputCardSection2">
          <span class="countCardSection2">0</span>
          <p>doações</p>
        </div>
        <img class="imgSection2DonationCard" src="photos/pacaraima.png" alt="Chaves" />
        <button class="btnSection2DonationCard" routerLink="/register">Doar</button>
      </div>
    </section>
  `,
})
export class Sec2 {}
