import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page';
import { Login } from './pages/login/login';
import { registerComponent } from './pages/register/register';
import { Userpage } from './pages/userpage/userpage';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: Login },
  { path: 'register', component: registerComponent },
  { path: 'userpage', component: Userpage },
  { path: '**', redirectTo: '' },
];
