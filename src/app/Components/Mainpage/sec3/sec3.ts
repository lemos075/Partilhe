import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-sec3',
  styleUrl: './sec3.css',
  template: ` 
  
    <section class="section3MainPage">
      <h2>Seja um colaborador</h2>
      <h1>como podemos <span>ajudar</span>?</h1>

      <div class="section3MainPageCards">
        <div class="cardMainPageSection3">
          <img src="Banners/pricing-02.jpg" alt="Crie sua conta">
          <h4>Crie sua Conta</h4>
          <p>Crie sua conta para fazer doações</p>
          <button class="btnSection2DonationCard" routerLink="/register">Crie sua conta</button>
        </div>

        <div class="cardMainPageSection3">
          <img src="Banners/pricing-01.jpg" alt="Locais de doação">
          <h4>Selecione o local para doação</h4>
          <p>É possível ver as localizações através<br> dos cards</p>
          <button class="btnSection2DonationCard" routerLink="/login">Veja as localizações</button>
        </div>

        <div class="cardMainPageSection3">
          <img src="Banners/pricing-03.jpg" alt="Faça sua doação">
          <h4>Espalhe felicidade</h4>
          <p>Com a doação você pratica uma boa ação e ajuda as vidas de quem mais precisa</p>
          <button class="btnSection2DonationCard" routerLink="/register">Faça sua doação</button>
        </div>
      </div>
    </section>
  `,
})
export class Sec3 {}
