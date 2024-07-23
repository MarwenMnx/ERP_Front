import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./role-create-update/role-create-update.component').then(
        (m) => m.RoleCreateUpdateComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./role-create-update/role-create-update.component').then(
        (m) => m.RoleCreateUpdateComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./role/role.component').then(
        (m) => m.RoleComponent
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
export class RolesRoutingModule { }
