import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./client-create-update/client-create-update.component').then(
        (m) => m.ClientCreateUpdateComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./client-create-update/client-create-update.component').then(
        (m) => m.ClientCreateUpdateComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./clients.component').then(
        (m) => m.ClientsComponent
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
export class ClientsRoutingModule { }
