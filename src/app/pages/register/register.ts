import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

function passwordMatchValidator(control: AbstractControl) {
  const senha = control.get('senha')?.value;
  const confirmacao = control.get('confirmacao_senha')?.value;
  return senha && confirmacao && senha !== confirmacao ? { senhaDivergente: true } : null;
}

@Component({
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule], // <-- 1. Adicionado o ReactiveFormsModule aqui!
  selector: 'app-register',
  styleUrl: './register.css',
  template: `

    <!-- TELA 1: SELEÇÃO DE PERFIL -->
    @if (step === 'selecao') {
      <div class="selection-container">
        <h2>Em qual das opções você se encaixa?</h2>

        <div class="button-group">
          <button class="btn" (click)="escolherPerfil('produtor')">Sou Produtor</button>
          <button class="btn" (click)="escolherPerfil('ong')">Sou ONG</button>
        </div>

        <div class="footer">
          <p>Já tem uma conta? <a routerLink="/login">Fazer login</a></p>
        </div>
      </div>
    }

    <!-- TELA 2: FORMULÁRIO ÚNICO (ONG E PRODUTOR) -->
    @if (step !== 'selecao') {
      <div class="form-container">
        <h1>Cadastro</h1>
        <!-- O título muda dinamicamente -->
        <h2>Seja <span class="highlight">bem-vindo(a), {{ step === 'produtor' ? 'produtor' : 'ONG' }}!</span></h2>

        <!-- 2. Trocamos o action padrão pelo ngSubmit e ligamos o formGroup -->
        <form [formGroup]="cadastroForm" (ngSubmit)="enviarCadastro()">
          
          <div class="form-row">
            <div class="input-group flex-70">
              <label>Nome do Responsável *</label>
              <!-- 3. Adicionado formControlName a TODOS os inputs -->
              <input type="text" formControlName="nome_responsavel" placeholder="Nome do responsável">
            </div>
            <div class="input-group flex-30">
              <label>Data de Nascimento *</label>
              <input type="date" formControlName="data_nascimento">
            </div>
          </div>

          <div class="form-row">
            <div class="input-group flex-60">
              <label>E-mail *</label>
              <input type="email" formControlName="email" placeholder="email@email.com">
            </div>
            <div class="input-group flex-40">
              <label>Telefone</label>
              <input type="tel" formControlName="telefone" placeholder="11 12345-6789">
            </div>
          </div>

          <div class="form-row">
            <div class="input-group flex-50">
              <label>CNPJ *</label>
              <input type="text" formControlName="cnpj" placeholder="00.000.000/0000-00">
            </div>
            <div class="input-group flex-50">
              <label>CPF *</label>
              <input type="text" formControlName="cpf" placeholder="000.000.000-00">
            </div>
          </div>

          <div class="input-group">
            <label>Nome da empresa *</label>
            <input type="text" formControlName="nome_empresa" placeholder="Nome da organização">
          </div>

          <div class="input-group">
            <label>Foto com documento (RG/CPF) *</label>
            <!-- A foto não usa formControlName, ela é pega pelo evento (change) -->
            <input type="file" accept="image/*" (change)="onFileSelected($event)">
          </div>

          <!-- CAMPO CONDICIONAL: Só aparece se for produtor -->
          @if (step === 'produtor') {
            <div class="input-group">
              <label>Descrição *</label>
              <input type="text" formControlName="descricao" placeholder="Nos dê uma breve descrição da sua empresa">
            </div>
          }

          <p style="margin-top: 15px; font-weight: bold; color: #333;">Crie uma Senha</p>

          <div class="form-row">
            <div class="input-group flex-50">
              <label>Senha *</label>
              <input type="password" formControlName="senha" placeholder="Senha (mínimo 4 caracteres)">
            </div>
            <div class="input-group flex-50">
              <label>Confirmação de senha *</label>
              <input type="password" formControlName="confirmacao_senha" placeholder="Confirme sua senha">
            </div>
          </div>

          @if (cadastroForm.hasError('senhaDivergente') && (cadastroForm.get('confirmacao_senha')?.touched || cadastroForm.get('senha')?.touched)) {
            <p style="color: #e53935; font-size: 13px; margin-top: -5px; font-weight: 500;">
              As senhas digitadas não coincidem.
            </p>
          }

          <!-- O botão agora apenas dispara o submit do form inteiro -->
          <button type="submit" class="btn-submit" [disabled]="isSubmitting">
            {{ isSubmitting ? 'Cadastrando...' : 'Continuar' }}
          </button>

          <div class="footer-links">
            <p><a href="javascript:void(0)" (click)="voltar()">← Voltar para seleção</a></p>
            <p>Já tem uma conta? <a routerLink="/login">Fazer login</a></p>
          </div>
        </form>
      </div>
    }
  `
})
export class registerComponent implements OnInit {
  
  step: 'selecao' | 'ong' | 'produtor' = 'selecao';

  cadastroForm!: FormGroup;
  arquivoSelecionado: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome_responsavel: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cnpj: ['', Validators.required],
      nome_empresa: ['', Validators.required],
      telefone: [''],
      descricao: [''],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmacao_senha: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  escolherPerfil(perfil: 'ong' | 'produtor') {
    this.step = perfil;
    
    if (perfil === 'produtor') {
      this.cadastroForm.get('descricao')?.setValidators([Validators.required]);
    } else {
      this.cadastroForm.get('descricao')?.clearValidators();
    }
    this.cadastroForm.get('descricao')?.updateValueAndValidity();
  }

  voltar() {
    this.step = 'selecao';
  }

  onFileSelected(event: any) {
    this.arquivoSelecionado = event.target.files[0];
  }

  enviarCadastro() {
    if (this.cadastroForm.hasError('senhaDivergente')) {
      alert('As senhas digitadas não coincidem. Por favor, verifique.');
      return;
    }

    if (this.cadastroForm.invalid || !this.arquivoSelecionado) {
      alert('Por favor, preencha todos os campos obrigatórios e envie a foto do documento.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('foto_documento', this.arquivoSelecionado);
    
    const dados = { ...this.cadastroForm.value };
    delete dados.confirmacao_senha;
    formData.append('tipo_usuario', this.step.toUpperCase());
    
    for (const key in dados) {
      if (dados[key] !== null && dados[key] !== undefined) {
        formData.append(key, dados[key]);
      }
    }

    this.http.post('http://localhost:8000/api/cadastro', formData)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          alert('Cadastro realizado com sucesso! Redirecionando para a tela de login...');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Erro na requisição:', err);
          const msg = err.error?.detail || 'Erro ao tentar cadastrar. Verifique seus dados.';
          alert(msg);
        }
      });
  }
}