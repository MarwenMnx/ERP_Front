import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramBonEntree } from './parametres-entree';

const routes: Routes = [

  {
    path: 'bonEntree/new',
    loadComponent: () =>
      import('./bonentree-create-update/bonentree-create-update.component').then(
        (m) => m.BonentreeCreateUpdateComponent
      ),
    data: paramBonEntree
  },
  {
    path: 'bonEntree/edit/:id',
    loadComponent: () =>
    import('./bonentree-create-update/bonentree-create-update.component').then(
        (m) => m.BonentreeCreateUpdateComponent
      ),
    data: paramBonEntree
  },
  {
    path: 'bonEntree/list',
    loadComponent: () =>
    import('../bonentree/bonentree.component').then(
        (m) => m.BonentreeComponent
      ),
      data: paramBonEntree
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentEntreeRoutingModule { }
