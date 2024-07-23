import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./fournisseur-create-update/fournisseur-create-update.component').then(
        (m) => m.FournisseurCreateUpdateComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./fournisseur-create-update/fournisseur-create-update.component').then(
        (m) => m.FournisseurCreateUpdateComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./fournisseurs.component').then(
        (m) => m.FournisseursComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseursRoutingModule { }
