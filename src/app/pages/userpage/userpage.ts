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
  showDoacoesDisponiveis = false;
  doacoesDisponiveis: any[] = [];
  showSolicitacoes = false;
  solicitacoes: any[] = [];
  showLocalidadesParceiras = false;
  localidadesParceiras: any[] = [];
  showHistorico = false;
  historicoVisualizacoes: any[] = [];
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
  solicitacaoStatus: string | null = null;
  motivoRecusaSolicitacao: any = null;

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
    this.solicitacaoStatus = null;
    this.carregarStatusSolicitacao(doacao);
    if (this.usuario?.tipo_usuario === 'ONG') {
      const formData = new FormData();
      formData.append('ong_id', this.usuario.id.toString());
      this.http.post(`http://localhost:8000/api/doacoes/${doacao.iddoacoes}/visualizacoes`, formData).subscribe({
        error: (err) => console.error('Erro ao registrar visualiza??o da doa??o', err)
      });
    }
  }

  carregarStatusSolicitacao(doacao: any) {
    if (!this.usuario || this.usuario.tipo_usuario !== 'ONG') return;
    const formData = new FormData();
    formData.append('doacao_id', doacao.iddoacoes.toString());
    formData.append('ong_id', this.usuario.id.toString());
    this.http.post<any>('http://localhost:8000/api/solicitacoes/status', formData).subscribe({
      next: (status) => this.solicitacaoStatus = status.status,
      error: (err) => console.error('Erro ao carregar status da solicita??o', err)
    });
  }

  fecharDetalhesDoacao() {
    this.doacaoSelecionada = null;
    this.solicitacaoStatus = null;
  }

  abrirModalRecusa(solicitacao: any) {
    this.motivoRecusaSolicitacao = solicitacao;
  }

  fecharModalRecusa() {
    this.motivoRecusaSolicitacao = null;
  }

  abrirModalNovaDoacao() {
    this.showModalDoacao = true;
  }

  fecharModalNovaDoacao() {
    this.showModalDoacao = false;
    this.arquivoSelecionado = null;
  }

  toggleDoacoesDisponiveis() {
    this.showDoacoesDisponiveis = !this.showDoacoesDisponiveis; 
    if (this.showDoacoesDisponiveis) {
      this.carregarTodasDoacoes();
    }
  }

  carregarTodasDoacoes() {
    this.http.get('http://localhost:8000/api/doacoes').subscribe({
      next: (data: any) => {
        this.doacoesDisponiveis = data;
      },
      error: (err) => console.error('Erro ao carregar doações disponíveis', err)
    });
  }


  toggleSolicitacoes() {
    this.showSolicitacoes = !this.showSolicitacoes;
    if (this.showSolicitacoes) this.carregarSolicitacoes();
  }

  toggleLocalidadesParceiras() {
    this.showLocalidadesParceiras = !this.showLocalidadesParceiras;
    if (this.showLocalidadesParceiras) this.carregarLocalidadesParceiras();
  }

  carregarLocalidadesParceiras() {
    if (!this.usuario) return;
    this.http.get(`http://localhost:8000/api/localidades-parceiras?produtor_id=${this.usuario.id}`).subscribe({
      next: (data: any) => this.localidadesParceiras = data,
      error: (err) => console.error('Erro ao carregar localidades parceiras', err)
    });
  }

  toggleHistorico() {
    this.showHistorico = !this.showHistorico;
    if (this.showHistorico) this.carregarHistorico();
  }

  carregarHistorico() {
    if (!this.usuario) return;
    this.http.get(`http://localhost:8000/api/doacoes/historico-visualizacoes?ong_id=${this.usuario.id}`).subscribe({
      next: (data: any) => this.historicoVisualizacoes = data,
      error: (err) => console.error('Erro ao carregar hist?rico de visualiza??es', err)
    });
  }

  carregarSolicitacoes() {
    if (!this.usuario) return;
    this.http.get(`http://localhost:8000/api/solicitacoes?userid=${this.usuario.id}&tipo_usuario=${this.usuario.tipo_usuario}`).subscribe({
      next: (data: any) => this.solicitacoes = data,
      error: (err) => console.error('Erro ao carregar solicita??es', err)
    });
  }

  solicitarDoacao() {
    if (!this.usuario || !this.doacaoSelecionada) return;
    const formData = new FormData();
    formData.append('doacao_id', this.doacaoSelecionada.iddoacoes.toString());
    formData.append('ong_id', this.usuario.id.toString());
    this.http.post('http://localhost:8000/api/solicitacoes', formData).subscribe({
      next: (res: any) => {
        alert(res.mensagem || 'Interesse registrado com sucesso.');
        this.fecharDetalhesDoacao();
        if (this.showSolicitacoes) this.carregarSolicitacoes();
      },
      error: (err) => alert(err.error?.detail || 'N?o foi poss?vel registrar seu interesse.')
    });
  }

  decidirSolicitacao(solicitacao: any, decisao: 'ACEITA' | 'RECUSADA', motivoRecusa = '') {
    if (!this.usuario) return;
    const formData = new FormData();
    formData.append('produtor_id', this.usuario.id.toString());
    formData.append('decisao', decisao);
    if (decisao === 'RECUSADA') formData.append('motivo_recusa', motivoRecusa.trim());
    this.http.post(`http://localhost:8000/api/solicitacoes/${solicitacao.id}/decisao`, formData).subscribe({
      next: () => {
        this.fecharModalRecusa();
        this.carregarSolicitacoes();
      },
      error: (err) => alert(err.error?.detail || 'N?o foi poss?vel atualizar a solicita??o.')
    });
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
