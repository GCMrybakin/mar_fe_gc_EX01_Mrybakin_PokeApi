import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon/pokemon.component';
import { PokemonDetailsComponent } from './components/pokemon/pokemon-details/pokemon-details.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
	{ path: 'register', component: RegisterComponent},
	{ path: 'login', component: LoginComponent},
	{ path: 'home', component: HomeComponent},
	{ path: 'about', component: AboutComponent},
	{ path: 'Pokemonlist', component: PokemonListComponent},
	{ path: 'Pokemon', component: PokemonComponent},
	{ path: 'PokemonDetails', component: PokemonDetailsComponent},
	{ path: '', redirectTo: '/home', pathMatch: 'full'},
	{ path: '**', component: ErrorPageComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
