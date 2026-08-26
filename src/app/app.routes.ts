import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page';
import { Login } from './pages/login/login';
import { CadastroComponent } from './pages/register/register';

export const routes: Routes = [
   
{path:'',component:HomePageComponent},
{path:'login',component:Login},
{path:'register',component:CadastroComponent},
{path:'**', redirectTo:''}, //qualquer url inexistente é redirecionada para a home

];
