import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  paramAvoirFinancierClient,
  paramAvoirMarchandiseClient,
  paramDevisClient,
  paramBonCommandeClient,
  paramBonRetourFinancierClient,
  paramBonLivraison,
  paramBonRetourMarchandiseClient,
  paramFactureVente,
  paramBonRetourTicketClient
} from './parametres-vente';

const routes: Routes = [

  {
    path: 'bonLivraison/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonLivraison
  },
  {
    path: 'bonLivraison/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonLivraison
  },
  {
    path: 'bonLivraison/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramBonLivraison
  },


  {
    path: 'bonretourticketclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramBonRetourTicketClient
  },
  {
    path: 'bonretourticketclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourTicketClient
  },
  {
    path: 'bonretourticketclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourTicketClient
  },

  {
    path: 'bonretourmarchandiseclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourMarchandiseClient
  },
  {
    path: 'bonretourmarchandiseclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourMarchandiseClient
  },
  {
    path: 'bonretourmarchandiseclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramBonRetourMarchandiseClient
  },
  {
    path: 'bonretourfinancierclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourFinancierClient
  },
  {
    path: 'bonretourfinancierclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonRetourFinancierClient
  },
  {
    path: 'bonretourfinancierclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramBonRetourFinancierClient
  },
  {
    path: 'devisclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramDevisClient
  },
  {
    path: 'devisclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramDevisClient
  },
  {
    path: 'devisclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramDevisClient
  },
  {
    path: 'boncommandeclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonCommandeClient
  },
  {
    path: 'boncommandeclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramBonCommandeClient
  },
  {
    path: 'boncommandeclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramBonCommandeClient
  },
  {
    path: 'avoirmarchandiseclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramAvoirMarchandiseClient
  },
  {
    path: 'avoirmarchandiseclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramAvoirMarchandiseClient
  },
  {
    path: 'avoirmarchandiseclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramAvoirMarchandiseClient
  },
  {
    path: 'avoirfinancierclient/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramAvoirFinancierClient
  },
  {
    path: 'avoirfinancierclient/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramAvoirFinancierClient
  },
  {
    path: 'avoirfinancierclient/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramAvoirFinancierClient
  },
  {
    path: 'facturevente/new',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramFactureVente
  },
  {
    path: 'facturevente/edit/:id',
    loadComponent: () =>
      import('./document-vente-create-update/document-vente-create-update.component').then(
        (m) => m.DocumentVenteCreateUpdateComponent
      ),
    data: paramFactureVente
  },
  {
    path: 'facturevente/list',
    loadComponent: () =>
      import('./document-vente-list/document-vente-list.component').then(
        (m) => m.DocumentVenteListComponent
      ),
    data: paramFactureVente
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDocumentVenteRoutingModule { }
