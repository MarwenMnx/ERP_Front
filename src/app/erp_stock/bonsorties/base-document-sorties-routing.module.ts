import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramBonSorties } from './parametres-sorties';



const routes: Routes = [

  {
    path: 'bonSorties/new',
    loadComponent: () =>
      import('../bonsorties/bonsorties-create-update/bonsorties-create-update.component').then(
        (m) => m.BonsortiesCreateUpdateComponent
      ),
    data: paramBonSorties
  },
  {
    path: 'bonSorties/edit/:id',
    loadComponent: () =>
    import('./bonsorties-create-update/bonsorties-create-update.component').then(
        (m) => m.BonsortiesCreateUpdateComponent
      ),
    data: paramBonSorties
  },
  {
    path: 'bonSorties/list',
    loadComponent: () =>
    import('../bonsorties/bonsorties.component').then(
        (m) => m.BonsortiesComponent
      ),
      data: paramBonSorties
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentSortiesRoutingModule { }
