import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramDemandeAlimentation } from './parametres-demande-alimentation';


const routes: Routes = [

  {
    path: 'demande_alimentation/new',
    loadComponent: () =>
      import('./demande-alimentation-stock-create-update/demande-alimentation-stock-create-update.component').then(
        (m) => m.DemandeAlimentationStockCreateUpdateComponent
      ),
    data: paramDemandeAlimentation
  },
  {
    path: 'demande_alimentation/edit/:id',
    loadComponent: () =>
    import('./demande-alimentation-stock-create-update/demande-alimentation-stock-create-update.component').then(
        (m) => m.DemandeAlimentationStockCreateUpdateComponent
      ),
    data: paramDemandeAlimentation
  },
  {
    path: 'demande_alimentation/list',
    loadComponent: () =>
    import('./demande-alimentation-stock.component').then(
        (m) => m.DemandeAlimentationStockComponent
      ),
      data: paramDemandeAlimentation
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentDemandeAlimentationRoutingModule { }
