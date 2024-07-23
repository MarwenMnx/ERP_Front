import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramBonCasse } from './parametres-casse';

const routes: Routes = [

  {
    path: 'bonCasse/new',
    loadComponent: () =>
      import('./boncasse-create-update/boncasse-create-update.component').then(
        (m) => m.BonCasseCreateUpdateComponent
      ),
    data: paramBonCasse
  },
  {
    path: 'bonCasse/edit/:id',
    loadComponent: () =>
    import('./boncasse-create-update/boncasse-create-update.component').then(
        (m) => m.BonCasseCreateUpdateComponent
      ),
    data: paramBonCasse
  },
  {
    path: 'bonCasse/list',
    loadComponent: () =>
    import('./boncasse.component').then(
        (m) => m.BonCasseComponent
      ),
      data: paramBonCasse
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentCasseRoutingModule { }
