import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeituraCodbarrasComponent } from './leitura-codbarras/leitura-codbarras.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'leitura',
    pathMatch: 'full',
  },
  {
    path: 'leitura',
    component: LeituraCodbarrasComponent,
    data: {
      title: 'Home Page'
    }
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
