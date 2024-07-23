import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paramAvoirFinancierFournisseur, paramAvoirMarchandiseFournisseur, paramBonAchat, paramBonCommandeFournisseur, paramBonReception, paramBonRetourFinancierFournisseur, paramBonRetourMarchandiseFournisseur, paramDevisfournisseur, paramFactureAchat } from './parametres-achat';

const routes: Routes = [
  {
    path: 'bonReception/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonReception
  },
  {
    path: 'bonReception/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonReception
  },
  {
    path: 'bonReception/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramBonReception
  },
  {
    path: 'bonAchat/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonAchat
  },
  {
    path: 'bonAchat/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonAchat
  },
  {
    path: 'bonAchat/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramBonAchat
  },
  {
    path: 'bonCommandeFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonCommandeFournisseur
  },
  {
    path: 'bonCommandeFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonCommandeFournisseur
  },
  {
    path: 'bonCommandeFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramBonCommandeFournisseur
  },
  {
    path: 'devisFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramDevisfournisseur
  },
  {
    path: 'devisFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramDevisfournisseur
  },
  {
    path: 'devisFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramDevisfournisseur
  },
  {
    path: 'bonRetourMarchandiseFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonRetourMarchandiseFournisseur
  },
  {
    path: 'bonRetourMarchandiseFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonRetourMarchandiseFournisseur
  },
  {
    path: 'bonRetourMarchandiseFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramBonRetourMarchandiseFournisseur
  },
  {
    path: 'bonRetourFinancierFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonRetourFinancierFournisseur
  },
  {
    path: 'bonRetourFinancierFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramBonRetourFinancierFournisseur
  },
  {
    path: 'bonRetourFinancierFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramBonRetourFinancierFournisseur
  },
  {
    path: 'avoirMarchandiseFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramAvoirMarchandiseFournisseur
  },
  {
    path: 'avoirMarchandiseFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramAvoirMarchandiseFournisseur
  },
  {
    path: 'avoirMarchandiseFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramAvoirMarchandiseFournisseur
  },
  {
    path: 'avoirFinancierFournisseur/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramAvoirFinancierFournisseur
  },
  {
    path: 'avoirFinancierFournisseur/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramAvoirFinancierFournisseur
  },
  {
    path: 'avoirFinancierFournisseur/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramAvoirFinancierFournisseur
  },
  {
    path: 'factureAchat/new',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramFactureAchat
  },
  {
    path: 'factureAchat/edit/:id',
    loadComponent: () =>
      import('./document-achat-create-update/document-achat-create-update.component').then(
        (m) => m.DocumentAchatCreateUpdateComponent
      ),
    data: paramFactureAchat
  },
  {
    path: 'factureAchat/list',
    loadComponent: () =>
      import('./document-achat-list/document-achat-list.component').then(
        (m) => m.DocumentAchatListComponent
      ),
    data: paramFactureAchat
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentAchatRoutingModule { }
