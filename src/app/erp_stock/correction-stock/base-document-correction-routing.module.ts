import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramCorrectionStock } from './parametres-correction-stock';

const routes: Routes = [

  {
    path: 'correction_stock/new',
    loadComponent: () =>
      import('./correction-stock-create-update/correction-stock-create-update.component').then(
        (m) => m.CorrectionStockCreateUpdateComponent
      ),
    data: paramCorrectionStock
  },
  {
    path: 'correction_stock/edit/:id',
    loadComponent: () =>
    import('./correction-stock-create-update/correction-stock-create-update.component').then(
        (m) => m.CorrectionStockCreateUpdateComponent
      ),
    data: paramCorrectionStock
  },
  {
    path: 'correction_stock/list',
    loadComponent: () =>
    import('./correction-stock.component').then(
        (m) => m.CorrectionStockComponent
      ),
      data: paramCorrectionStock
   },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentCorrectionRoutingModule { }
