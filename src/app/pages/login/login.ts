import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  styleUrl: './login.css',
  template: `
<section class="sectionLoginPage">
  
  <!-- TELA 1: LOGIN -->
  @if (step === 'login') {
    <div class="cardLoginPage">
      <h1>Login</h1>

      @if (mensagemErro) {
        <div class="error-message">
          {{ mensagemErro }}
        </div>
      }

      <form class="formLoginPage" [formGroup]="loginForm" (ngSubmit)="fazerLogin()">
        <label for="email">E-mail</label>
        <input 
          type="email" 
          id="email" 
          formControlName="email" 
          placeholder="seuemail@exemplo.com" 
        />
        @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
          <p style="color: #e53935; font-size: 12px; margin-top: -15px; margin-bottom: 15px;">
            Informe um e-mail válido.
          </p>
        }

        <label for="password">Senha</label>
        <input 
          type="password" 
          id="password" 
          formControlName="senha" 
          placeholder="Sua senha" 
        />
        @if (loginForm.get('senha')?.invalid && loginForm.get('senha')?.touched) {
          <p style="color: #e53935; font-size: 12px; margin-top: -15px; margin-bottom: 15px;">
            Informe sua senha.
          </p>
        }

        <!-- Aciona a função de mudar a tela -->
        <a href="javascript:void(0)" (click)="irParaReset()" class="forgot-password">Esqueci a senha</a>

        <button type="submit" class="login-btn" [disabled]="isSubmitting">
          {{ isSubmitting ? 'Entrando...' : 'Login' }}
        </button>
      </form>

      <div class="register-link">
        <span>Não possui uma conta? </span>
        <a routerLink="/register">Faça seu Cadastro</a>
      </div>
    </div>
  }

  <!-- TELA 2: REDEFINIR SENHA -->
  @if (step === 'reset') {
    <div class="cardLoginPage">
      <h1>Redefinir senha</h1>
      <p class="reset-desc">Por favor, informe seu email para redefinir a senha</p>

      @if (mensagemReset) {
        <div class="success-message">
          {{ mensagemReset }}
        </div>
      }

      <form class="formLoginPage" (submit)="enviarReset($event)">
        <label for="reset-email">Email</label>
        <input type="email" id="reset-email" name="resetEmail" placeholder="email@exemplo.com" required>
        
        <button type="submit" class="login-btn">Enviar link</button>
      </form>

      <div class="register-link">
        <!-- Volta para o login -->
        <a href="javascript:void(0)" (click)="voltarParaLogin()">← Voltar para o Login</a>
      </div>
    </div>
  }

</section>
  `,
})
export class Login implements OnInit {

  step: 'login' | 'reset' = 'login';
  loginForm!: FormGroup;
  mensagemErro: string = '';
  mensagemReset: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  irParaReset() {
    this.step = 'reset';
    this.mensagemErro = '';
    this.mensagemReset = '';
  }

  voltarParaLogin() {
    this.step = 'login';
    this.mensagemErro = '';
  }

  fazerLogin() {
    this.mensagemErro = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const credenciais = {
      email: this.loginForm.value.email.trim(),
      senha: this.loginForm.value.senha
    };

    this.http.post<any>('http://localhost:8000/api/login', credenciais)
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('partilhe_user', JSON.stringify(res.usuario));
          }
          this.router.navigate(['/userpage']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Erro no login:', err);
          if (err.status === 401) {
            this.mensagemErro = 'E-mail ou senha incorretos.';
          } else {
            this.mensagemErro = err.error?.detail || 'Erro ao conectar ao servidor. Tente novamente mais tarde.';
          }
        }
      });
  }

  enviarReset(event: Event) {
    event.preventDefault();
    this.mensagemReset = 'Se o e-mail estiver cadastrado, você receberá as instruções para redefinição em instantes.';
  }
}