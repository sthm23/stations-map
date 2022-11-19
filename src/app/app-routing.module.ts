import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { MainComponent } from './components/main/main.component';
import { StaticComponent } from './components/static/static.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full',},
  {path: 'main', component: MainComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'statistic', component: StaticComponent},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
