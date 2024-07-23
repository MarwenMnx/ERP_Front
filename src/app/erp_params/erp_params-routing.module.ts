
import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import {ProductComponent} from "./products/product.component";
import {LoginComponent} from "../login/login.component";

const routes: Routes = [
/*
  {
    path: ':key/products',
    component: ProductComponent,
    pathMatch: 'prefix'
  },

 */

/////***********RAZINA---DEGIN****************//////
  /*
  {
    path: 'erp_params/prediction',
    loadComponent: () =>
      import('./dashboard-params/components/prediction/prediction.component').then(
        (m) => m.PredictionComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'erp_params/proprediction',
    loadComponent: () =>
      import('./dashboard-params/components/proprediction/proprediction.component').then(
        (m) => m.PropredictionComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-params/dashboard-params.component').then(
        (m) => m.DashboardParamsComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  */
  /////***********RAZINA---END****************//////

  {
     path: 'products',
     loadChildren: () => import('./products/products.module').then(module => module.ProductsModule),
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(module => module.ClientsModule),
  },
  {
    path: 'fournisseurs',
    loadChildren: () => import('./fournisseurs/fournisseurs.module').then(module => module.FournisseursModule),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  /* ici route de banque*/

  {
    path: 'banque',
    loadComponent: () =>
      import('./banque/banque.component').then(
        (m) => m.BanqueComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  /* ici route de tauxTva*/

  {
    path: 'tauxtva',
    loadComponent: () =>
      import('./taux-tva/taux-tva.component').then(
        (m) => m.TauxtvaComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /*icic route de  ticket_type*/

  {
    path: 'ticket',
    loadComponent: () =>
      import('./type-cheque-ticket/typeChequeTicket.component').then(
        (m) => m.TypeChequeTicketComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  /*route de unitè  */

  {
    path: 'unitè',
    loadComponent: () =>
      import('./unite/unite.component').then(
        (m) => m.UniteComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /* route societe */

  {
    path: 'societe',
    loadComponent: () =>
      import('./societe/societe.component').then(
        (m) => m.SocieteComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /* route depot */

  {
    path: 'depot',
    loadComponent: () =>
      import('./depot/depot.component').then(
        (m) => m.DepotComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  // {
  //   path: 'clients',
  //   loadComponent: () =>
  //     import('./clients/clients.component').then(
  //       (m) => m.ClientsComponent
  //     ),
  //   data: {
  //     toolbarShadowEnabled: false
  //   }
  // },
  // {
  //   path: 'clients/new',
  //   loadComponent: () =>
  //     import('./clients/client-create-update/client-create-update.component').then(
  //       (m) => m.ClientCreateUpdateComponent
  //     ),
  // },

  {
    path: 'familles',
    loadComponent: () =>
      import('./familles/familles.component').then(
        (m) => m.FamillesComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'familles/new',
    loadComponent: () =>
      import('./familles/famille-create-update/famille-create-update.component').then(
        (m) => m.FamilleCreateUpdateComponent
      ),
  },



  /* frais */


  {
    path: 'frais',
    loadComponent: () =>
      import('./frais/frais.component').then(
        (m) => m.FraisComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'frais/new',
    loadComponent: () =>
      import('./frais/frais-create-update/frais-create-update.component').then(
        (m) => m.FraisCreateUpdateComponent
      ),
  },





  /*sous famille*/
  {
    path: 'sousfamilles',
    loadComponent: () =>
      import('./sous-famille/sous-famille.component').then(
        (m) => m.SousFamilleComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'sousfamilles/new',
    loadComponent: () =>
      import('./sous-famille/sous-famille-create-update/sous-famille-create-update.component').then(
        (m) => m.SousFamilleCreateUpdateComponent
      ),
  },




  /*routes de marque*/

  {
    path: 'marque',
    loadComponent: () =>
      import('./marque/marque.component').then(
        (m) => m.MarqueComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'marque/new',
    loadComponent: () =>
      import('./marque/marque-create-update/marque-create-update.component').then(
        (m) => m.MarqueCreateUpdateComponent
      ),
  },


  /*routes de modele*/

  {
    path: 'modele',
    loadComponent: () =>
      import('./modele/modele.component').then(
        (m) => m.ModeleComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'modele/new',
    loadComponent: () =>
      import('./modele/modele-create-update/modele-create-update.component').then(
        (m) => m.ModeleCreateUpdateComponent
      ),
  },

  {
    path: 'plan',
    loadComponent: () =>
      import('./plan/plan.component').then(
        (m) => m.PlanComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  { path: '', redirectTo: 'products', pathMatch: 'full' },

  {
    path: 'type_charge',
    loadComponent: () =>
      import('./type-charges/type-charges.component').then(
        (m) => m.TypeChargesComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /* nouveau route pour commandes-clients*/
  {
    path: 'commandes_clients',
    loadComponent: () =>
      import('./commandes-clients/commandes-clients.component').then(
        (m) => m.CommandesClientsComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /* nouveau route pour commandes-fournisseur*/
  {
    path: 'commandes_fournisseurs',
    loadComponent: () =>
      import('./commandes-fournisseurs/commandes-fournisseurs.component').then(
        (m) => m.CommandesFournisseursComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  /* nouveau route pour journal vente*/
  {
    path: 'journal-vente',
    loadComponent: () =>
      import('./journal-vente/journal-vente.component').then(
        (m) => m.JournalVenteComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /* nouveau route pour Mouvement stock*/
  {
    path: 'Mouvement-stock',
    loadComponent: () =>
      import('../erp_stock/mouvement-stock/mouvement-stock.component').then(
        (m) => m.MouvementStockComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },



  /* nouveau route pour Utulisateurs & rôles*/
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then(
        (m) => m.UsersComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('./role_users/roles.module').then((m) => m.RolesModule),
    data: { toolbarShadowEnabled: false }
  },

  {
    path: 'exercices',
    loadComponent: () =>
      import('./exercices/exercices.component').then(
        (m) => m.ExercicesComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'paramsGeneral',
    loadComponent: () =>
      import('./params-general/params-general.component').then(
        (m) => m.ParamsGeneralComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  /* nouveau route pour corrrection de stock*/
  // {
  //   path: 'correction_stock',
  //   loadComponent: () =>
  //     import('../erp_stock/correction-stock/correction-stock.component').then(
  //       (m) => m.CorrectionStockComponent
  //     ),
  //   data: {
  //     toolbarShadowEnabled: false
  //   }
  // },

  /* nouveau route pour compte bancaire*/
  {
    path: 'compte_bancaire',
    loadComponent: () =>
      import('./compteBancaires/compte-bancaire/compte-bancaire.component').then(
        (m) => m.CompteBancaireComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'reglements',
    loadComponent: () =>
      import('./reglements/reglements.component').then(
        (m) => m.ReglementsComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      title:"Règlements Client",
      enumTypeDoc:'enum_type_document_vente',
      isAchat:false,
      tab_reg:      "reglementclients"
    }
  },

  {
    path: 'fournisseur/reglements',
    loadComponent: () =>
      import('./reglements/reglements.component').then(
        (m) => m.ReglementsComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      title:"Règlements Fournisseur",
      enumTypeDoc:'enum_type_document_achat',
      isAchat:true,
      tab_reg:      "reglementfournisseurs"
    }
  },

  {
    path: 'erp_pos/tickets',
    loadComponent: () =>
      import('./ticket/ticket.component').then(
        (m) => m.TicketComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'client/reglement',
    loadComponent: () =>
      import('./ticket/reglement-ticket/reglement-ticket.component').then(
        (m) => m.ReglementTicketComponent
      ),
    data: {
      addReg: true,
      title:        "Règlements Client",
      tab_reg:      "reglementclients",
      columns:      'columnsClient',
      //type:         "tickets",
      toolbarShadowEnabled: false,
    }
  },

  {
    path: 'fournisseur/reglement',
    loadComponent: () =>
      import('./ticket/reglement-ticket/reglement-ticket.component').then(
        (m) => m.ReglementTicketComponent
      ),
    data: {
      addReg: true,
      title:        "Règlements Fournisseur",
      tab_reg:      "reglementfournisseurs",
      columns:      'columnsFournisseur',
      //type:         "tickets",
      toolbarShadowEnabled: false,
      isAchat:true
    }
  },

  {
    path: 'erp_pos/tickets/reglement',
    loadComponent: () =>
      import('./ticket/reglement-ticket/reglement-ticket.component').then(
        (m) => m.ReglementTicketComponent
      ),
    data: {
      title:        "Règlements Ticket",
      tab_reg:      "reglementclients",
      type:         "tickets",
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'type_tiers',
    loadComponent: () =>
      import('./tiers-categorie/tiers-categorie.component').then(
        (m) => m.TiersCategorieComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  /*type piece jointe */

  {
    path: 'type_piece_jointe',
    loadComponent: () =>
      import('./type-piece-jointe/type-piece-jointe.component').then(
        (m) => m.TypePieceJointeComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'chauffeur',
    loadComponent: () =>
      import('../erp_flotte/chauffeur/chauffeur.component').then(
        (m) => m.ChauffeurComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'chauffeur',
    loadComponent: () =>
      import('../erp_flotte/chauffeur/chauffeur.component').then(
        (m) => m.ChauffeurComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'transporteur',
    loadComponent: () =>
      import('../erp_flotte/transporteur/transporteur.component').then(
        (m) => m.TransporteurComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  //route de marque vehicule
  {
    path: 'marqueVehicule',
    loadComponent: () =>
      import('../erp_flotte/marque/marque.component').then(
        (m) => m.MarqueComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  //route de modele vehicule
  {
    path: 'modeleVehicule',
    loadComponent: () =>
      import('../erp_flotte/modelevehicule/modelevehicule.component').then(
        (m) => m.ModelevehiculeComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },


  //route de type vehicule
  {
    path: 'typeVehicule',
    loadComponent: () =>
      import('../erp_flotte/typevehicule/typevehicule.component').then(
        (m) => m.TypevehiculeComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  //route de type sous type Vehicule
  {
    path: 'sous_type_Vehicule',
    loadComponent: () =>
      import('../erp_flotte/soustypevehicule/soustypevehicule.component').then(
        (m) => m.SoustypevehiculeComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  //route de type sous type Vehicule
  {
    path: 'leasings',
    loadComponent: () =>
      import('../erp_flotte/leasings/leasings.component').then(
        (m) => m.LeasingsComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  //route des Vehicules
  {
    path: 'véhicule',
    loadComponent: () =>
      import('../erp_flotte/vehicules/vehicules.component').then(
        (m) => m.VehiculesComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  //route de Rappel Stock
  {
    path: 'rappel_stock',
    loadComponent: () =>
      import('../erp_stock/rappel-stock/rappel-stock.component').then(
        (m) => m.RappelStockComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'valeur_stock',
    loadComponent: () =>
      import('../erp_stock/valeur-stock/valeur-stock.component').then(
        (m) => m.ValeurStockComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  {
    path: 'quantiteInitial',
    loadComponent: () =>
      import('./quantite-initiale/quantite-initiale.component').then(
        (m) => m.QuantiteInitialeComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'releveClient',
    loadComponent: () =>
      import('./releve-client/releve-client.component').then(
        (m) => m.ReleveClientComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: false
    }
  },
  {
    path: 'releveClientDetaillee',
    loadComponent: () =>
      import('./releve-client/releve-detaillee/releve-detaillee.component').then(
        (m) => m.ReleveDetailleeComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: false
    }
  },

  {
    path: 'releveFournisseur',
    loadComponent: () =>
      import('./releve-client/releve-client.component').then(
        (m) => m.ReleveClientComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },
  {
    path: 'releveFournisseurDetaillee',
    loadComponent: () =>
      import('./releve-client/releve-detaillee/releve-detaillee.component').then(
        (m) => m.ReleveDetailleeComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },

  {
    path: 'parametrageImportations',
    loadComponent: () =>
      import('./parametrage-importation/parametrage-importation.component').then(
        (m) => m.ParametrageImportationComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },
  {
    path: 'importations',
    loadComponent: () =>
      import('./parametrage-importation/pages/importation/importation.component').then(
        (m) => m.ImportationComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },



  //statistiques Chiffre affaire region client
  {
    path: 'statistique-ChiffreAffaireRegionClient',
    loadComponent: () =>
      import('../erp_documents_vente/statistiques/chiffre-affaire-region-client/chiffre-affaire-region-client.component').then(
        (m) => m.ChiffreAffaireRegionClientComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },


    //statistiques Chiffre affaire client
    {
      path: 'statistique-ChiffreAffaireClient',
      loadComponent: () =>
        import('../erp_documents_vente/statistiques/chiffre-affaire-client/chiffre-affaire-client.component').then(
          (m) => m.ChiffreAffaireClientComponent
        ),
      data: {
        toolbarShadowEnabled: false,
        isFournisseur: true
      }
    },


  //statistiques articles
  {
    path: 'statistique-article',
    loadComponent: () =>
      import('../erp_documents_vente/statistiques/pivot-table-article/pivot-table-article.component').then(
        (m) => m.PivotTableComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: true
    }
  },

   //statistiques Reglement Achat
   {
    path: 'statistique-reglementAchat',
    loadComponent: () =>
      import('../erp_documents_vente/statistiques/pivot-table-reglement-achat/pivot-table-reglement-achat.component').then(
        (m) => m.PivotTableReglementAchatComponent
      ),
    data: {
      toolbarShadowEnabled: false,
      isFournisseur: false
    }
  },



    //statistiques Reglement Vente
    {
      path: 'statistique-reglementVente',
      loadComponent: () =>
        import('../erp_documents_vente/statistiques/pivot-table-reglement-vente/pivot-table-reglement-vente.component').then(
          (m) => m.PivotTableReglementVenteComponent
        ),
      data: {
        toolbarShadowEnabled: false,
        isFournisseur: false
      }
    },


    //statistiques route Vente par Magasin
    {
      path: 'statistique-VenteParMagasin',
      loadComponent: () =>
        import('../erp_documents_vente/statistiques/pivot-table-vente-par-magasin/pivot-table-vente-par-magasin.component').then(
          (m) => m.PivotTableVenteParMagasinComponent
        ),
      data: {
        toolbarShadowEnabled: false,
        isFournisseur: false
      }
    },

    //statistiques route Rayon
    {
      path: 'statistique-rayon',
      loadComponent: () =>
        import('../erp_documents_vente/statistiques/pivot-table-rayon/pivot-table-rayon.component').then(
          (m) => m.PivotTableRayonComponent
        ),
      data: {
        toolbarShadowEnabled: false,
        isFournisseur: false
      }
    },


  /*route de pays  */
  {
    path: 'pays',
    loadComponent: () =>
      import('./pays/pays.component').then(
        (m) => m.PaysComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },

  /*route de gouvernorat  */
  {
    path: 'gouvernorat',
    loadComponent: () =>
      import('./gouvernorat/gouvernorat.component').then(
        (m) => m.GouvernoratComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  /*route de delegation  */
  {
    path: 'delegation',
    loadComponent: () =>
      import('./delegation/delegation/delegation.component').then(
        (m) => m.DelegationComponent
      ), data: {
        toolbarShadowEnabled: false
      }
  },
  /*route de localite  */
  {
    path: 'localite',
    loadComponent: () =>
      import('./localite/localite/localite.component').then(
        (m) => m.LocaliteComponent
      )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
