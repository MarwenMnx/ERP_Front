import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./product-create-update/product-create-update.component').then(
        (m) => m.ProductCreateUpdateComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./product-create-update/product-create-update.component').then(
        (m) => m.ProductCreateUpdateComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./product.component').then(
        (m) => m.ProductComponent
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
export class ProductsRoutingModule { }
