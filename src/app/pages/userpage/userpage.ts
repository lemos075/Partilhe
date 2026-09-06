import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface UsuarioLogado {
  id: number;
  tipo_usuario: 'PRODUTOR' | 'ONG' | string;
  nome_responsavel: string;
  email: string;
  nome_empresa: string;
}

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './userpage.css',
  templateUrl: './userpage.html',
})
export class Userpage implements OnInit {
  usuario: UsuarioLogado | null = null;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

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
        console.warn('LocalStorage indisponível:', e);
      }
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem('partilhe_user');
        }
      } catch (e) {
        console.warn('Erro ao limpar localStorage:', e);
      }
    }
    this.router.navigate(['/login']);
  }
}
