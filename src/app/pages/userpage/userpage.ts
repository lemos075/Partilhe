import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  imports: [RouterLink, DatePipe],
  styleUrl: './userpage.css',
  templateUrl: './userpage.html',
})
export class Userpage implements OnInit {
  usuario: UsuarioLogado | null = null;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private http = inject(HttpClient);

  showModalDoacao = false;
  arquivoSelecionado: File | null = null;
  isSubmitting = false;

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

  showMinhasDoacoes = false;
  minhasDoacoes: any[] = [];
  doacaoSelecionada: any = null;

  toggleMinhasDoacoes() {
    this.showMinhasDoacoes = !this.showMinhasDoacoes;
    if (this.showMinhasDoacoes) {
      this.carregarDoacoes();
    }
  }

  carregarDoacoes() {
    if (!this.usuario) return;
    this.http.get(`http://localhost:8000/api/doacoes?userid=${this.usuario.id}`).subscribe({
      next: (data: any) => {
        this.minhasDoacoes = data;
      },
      error: (err) => console.error('Erro ao carregar doações', err)
    });
  }

  abrirDetalhesDoacao(doacao: any) {
    this.doacaoSelecionada = doacao;
  }

  fecharDetalhesDoacao() {
    this.doacaoSelecionada = null;
  }

  abrirModalNovaDoacao() {
    this.showModalDoacao = true;
  }

  fecharModalNovaDoacao() {
    this.showModalDoacao = false;
    this.arquivoSelecionado = null;
  }

  onFileSelected(event: any) {
    this.arquivoSelecionado = event.target.files[0];
  }

  salvarDoacao(nome: string, desc: string) {
    if (!nome || !this.arquivoSelecionado) {
      alert('Por favor, informe o nome da doação e selecione uma imagem.');
      return;
    }
    
    if (!this.usuario) {
      alert('Você precisa estar logado para fazer uma doação.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('userid', this.usuario.id.toString());
    formData.append('doacaonome', nome);
    formData.append('doacaodesc', desc);
    formData.append('doacaofoto', this.arquivoSelecionado);

    this.http.post('http://localhost:8000/api/userpage', formData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        alert(res.mensagem || 'Doação salva com sucesso!');
        this.fecharModalNovaDoacao();
        if (this.showMinhasDoacoes) {
          this.carregarDoacoes(); // recarrega a lista
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erro na requisição:', err);
        const msg = err.error?.detail || 'Erro ao tentar cadastrar a doação. Verifique seus dados.';
        alert(msg);
      }
    });
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
