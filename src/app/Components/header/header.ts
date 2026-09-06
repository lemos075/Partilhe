import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  template: `
    <header class="headermain">
      <a routerLink="/" title="Ir para o início" style="cursor: pointer; display: flex; align-items: center; text-decoration: none;">
        <img class="imglogoHEADER" src="Logos/logo.png" alt="Partilhe Logo" />
      </a>
      <div class="nav-links">
        <button class="btnHEADER" routerLink="/">Home</button>
        <button class="btnHEADER" routerLink="/">Sobre nós</button>
        <button class="btnHEADER" routerLink="/">Contato</button>
      </div>

      <div class="loginHEADERArea">
        @if (usuario) {
          <button class="btnHEADERLogin" routerLink="/userpage" title="Meu Painel">
            <img class="loginImg" src="icons/usermanicon.png" alt="Perfil"/>
            {{ primeiroNome }}
          </button>
        } @else {
          <button class="btnHEADERLogin" routerLink="/login">
            <img class="loginImg" src="icons/usermanicon.png" alt="login image"/>
            login
          </button>
        }
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  usuario: any = null;
  private platformId = inject(PLATFORM_ID);

  get primeiroNome(): string {
    if (!this.usuario?.nome_responsavel) return 'Painel';
    return this.usuario.nome_responsavel.split(' ')[0];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const data = window.localStorage.getItem('partilhe_user');
          if (data) {
            this.usuario = JSON.parse(data);
          }
        }
      } catch (e) {
        console.warn('Erro ao carregar usuário no header', e);
      }
    }
  }
}
