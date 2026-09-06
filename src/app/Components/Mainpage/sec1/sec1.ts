import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sec1',
  styleUrl: './sec1.css',
  template: ` 
  
    <div class="divMainPage">
      <img
        src="Banners/banner-bg.jpg"
        alt="banner pagina inicial"
        class="divBannerMainPage"
      />
    </div>

    <section class="sectionMainPage">
      <h1 class="h1Section1">
        Doar também é <span>amar</span><br />
        seja a mudança voce <span>mesmo</span>
      </h1>

      <input type="submit" name="line" id="line" class="lineMainPageSection" disabled value=""/>

      <p class="pSectionMainPage">
        Partilhe+ é um projeto sustentável que busca ajudar as pessoas carentes
        com fome e necessidade através de produtores afiliados ao projeto.
      </p>

      <button class="btnMainPageSection">Conheça o projeto Partilhe+</button>
    </section>

  `,
})
export class Sec1 {}
