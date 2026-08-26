import { Component, signal } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { HeaderComponent } from './Components/header/header';
import { FooterComponent } from './Components/footer/footer';



@Component({
  selector: 'app-root',
  standalone:true, //garante compatibilidade visual com standalone
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('partilhe');

}
