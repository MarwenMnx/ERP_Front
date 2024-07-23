import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import {RoleHttpService} from "../../erp_params/role_users/services/role-http.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  prefix_grp:any = '';// '/'+'mbk';

  constructor(private readonly layoutService: VexLayoutService , private roleService:RoleHttpService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([

    /////***********RAZINA---DEGIN****************//////
      /*
      {
        type: 'dropdown',
        label: 'Recommantation',
        icon: 'mat:settings',
        children: [
          {
            type: 'link',
            label: 'sans probabilité',
            icon: 'mat:picture_in_picture',
            route: '/erp_params/prediction'
          },
          {
            type: 'link',
            label: 'avec probabilité',
            icon: 'mat:picture_in_picture',
            route: '/erp_params/proprediction'
          },

        ]
      },
      */
      /////***********RAZINA---END****************//////

      this.roleService.checkPrivilegeAccess("dashboard")?{
        type: 'link',
        id: 'dashboard',
        label: 'DASHBOARD',
        icon: 'mat:picture_in_picture',
        route: '#'
      }:null,

      this.roleService.checkPrivilegeAccess("donnes_de_base")?{
        type: 'dropdown',
        id: 'donnes_de_base',
        label: 'DONNES DE BASE',
        icon: 'mat:settings',
        children: [
          this.roleService.checkPrivilegeAccess("produits")?{
            type: 'link',
            label: 'Produits',
            icon: 'mat:picture_in_picture',
            route: this.prefix_grp+'/products'
          }:null,
          this.roleService.checkPrivilegeAccess("clients")?{
            type: 'link',
            label: 'Clients',
            icon: 'mat:picture_in_picture',
            route: '/clients'
          }:null,
          this.roleService.checkPrivilegeAccess("fournisseurs")?{
            type: 'link',
            label: 'Fournisseurs',
            icon: 'mat:picture_in_picture',
            route: '/fournisseurs'
          }:null,
          this.roleService.checkPrivilegeAccess("quantiteInitial")?{
            type: 'link',
            label: 'Quantite - Initial',
            icon: 'mat:picture_in_picture',
            route: '/quantiteInitial'
          }:null,
          this.roleService.checkPrivilegeAccess("parametrageImportations")?{
            type: 'link',
            label: 'Paramétrer Importations',
            icon: 'mat:picture_in_picture',
            route: '/parametrageImportations'
          }:null,
          this.roleService.checkPrivilegeAccess("importations")?{
            type: 'link',
            label: 'Importations',
            icon: 'mat:picture_in_picture',
            route: '/importations'
          }:null
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("pos_vente")?{
        type: 'dropdown',
        id: 'pos_vente',
        label: 'POS - VENTE',
        icon: 'mat:view_compact',
        children: [
          this.roleService.checkPrivilegeAccess("erp_pos_caisse")?{
            type: 'link',
            label: 'Caisse - Vente',
            route: '/erp_pos/caisse',
            icon: 'mat:view_compact',
            routerLinkActiveOptions: { exact: true }
          }:null,
          this.roleService.checkPrivilegeAccess("erp_pos_tickets")?{
            type: 'link',
            label: 'Liste des ventes',
            icon: 'mat:picture_in_picture',
            route: '/erp_pos/tickets',
            routerLinkActiveOptions: { exact: true }
          }:null,
          this.roleService.checkPrivilegeAccess("erp_pos_reglements")?{
            type: 'link',
            label: 'Liste des règlements',
            icon: 'mat:picture_in_picture',
            route: 'erp_pos/tickets/reglement'
          }:null,
          this.roleService.checkPrivilegeAccess("erp_pos_retour_tickets")?{
            type: 'link',
            label: 'Retour ticket client',
            icon: 'mat:picture_in_picture',
            route: 'bonretourticketclient/list'
          }:null,
          /*
          this.roleService.checkPrivilegeAccess("clients")?{
            type: 'link',
            label: 'Retour_article',
            icon: 'mat:picture_in_picture',
            route: '/erp_pos/caisse3'
          }:null
          */
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("docs_vente")?{
        type: 'dropdown',
        id: 'docs_vente',
        label: 'DOCS - VENTE',
        icon: 'mat:settings',
        children: [
          this.roleService.checkPrivilegeAccess("docs_vente_devis")?{
            type: 'link',
            label: 'Devis',
            icon: 'mat:picture_in_picture',
            route: 'devisclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_bon_commande")?{
            type: 'link',
            label: 'Bon Commande',
            icon: 'mat:picture_in_picture',
            route: 'boncommandeclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_bon_livraison")?{
            type: 'link',
            label: 'Bon Livraison',
            route: 'bonLivraison/list',
            icon: 'mat:view_compact',
            routerLinkActiveOptions: { exact: true }
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_bon_retour_marchandise")?{
            type: 'link',
            label: 'Bon Retour Marchandise',
            icon: 'mat:picture_in_picture',
            route: 'bonretourmarchandiseclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_bon_retour_financier")?{
            type: 'link',
            label: 'Bon Retour Financier',
            icon: 'mat:picture_in_picture',
            route: 'bonretourfinancierclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_facture_vente")?{
            type: 'link',
            label: 'Facture Vente',
            icon: 'mat:picture_in_picture',
            route: 'facturevente/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_avoir_marchandise")?{
            type: 'link',
            label: 'Avoir Marchandise',
            icon: 'mat:picture_in_picture',
            route: 'avoirmarchandiseclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_avoir_financier")?{
            type: 'link',
            label: 'Avoir Financier',
            icon: 'mat:picture_in_picture',
            route: 'avoirfinancierclient/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_reglement_client")?{
            type: 'link',
            label: 'Règlement Client',
            icon: 'mat:picture_in_picture',
            route: '/reglements'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_journal_commandes")?{
            type: 'link',
            label: 'Journal Commandes',
            icon: 'mat:picture_in_picture',
            route: '/commandes_clients'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_journal_vente")?{
            type: 'link',
            label: 'Journal Vente',
            icon: 'mat:picture_in_picture',
            route: '/journal-vente'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_releve_client")?{
            type: 'link',
            label: 'Relève Client',
            icon: 'mat:picture_in_picture',
            route: '/releveClient'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_releve_details_client")?{
            type: 'link',
            label: 'Relève Client détaillée',
            icon: 'mat:picture_in_picture',
            route: '/releveClientDetaillee'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_balance_client")?{
            type: 'link',
            label: 'Balance Client',
            icon: 'mat:picture_in_picture',
            route: '/balanceClient'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_vente_statistiques")?{
            type: 'dropdown',
            label: 'Statistiques',
            icon: 'mat:view_compact',
            children: [
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_reglement_vente")?{
                type: 'link',
                label: 'Statistiques/Règlement Vente',
                icon: 'mat:picture_in_picture',
                route: '/statistique-reglementVente'
              }:null,
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_reglement_achat")?{
                type: 'link',
                label: 'Statistiques/Règlement Achat',
                icon: 'mat:picture_in_picture',
                route: '/statistique-reglementAchat'
              }:null,
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_chiffres_affaire_client")?{
                type: 'link',
                label: 'Statistiques/Chiffre Affaire Client',
                icon: 'mat:picture_in_picture',
                route: '/statistique-ChiffreAffaireClient'
              }:null,

              /*add new page chiffre affaire region client ici*/
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_chiffres_affaire_règion_client")?{
                type: 'link',
                label: 'Statistiques/Chiffre Affaire Règion Client',
                icon: 'mat:picture_in_picture',
                route: '/statistique-ChiffreAffaireRegionClient'
              }:null,
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_vente_par_magasin")?{
                type: 'link',
                label: 'Statistiques/Vente Par Magasin',
                icon: 'mat:picture_in_picture',
                route: '/statistique-VenteParMagasin'
              }:null,
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_rayon")?{
                type: 'link',
                label: 'Statistiques/rayon',
                icon: 'mat:picture_in_picture',
                route: '/statistique-rayon'
              }:null,
              this.roleService.checkPrivilegeAccess("docs_vente_statistiques_articles")?{
                type: 'link',
                label: 'Statistiques/article',
                icon: 'mat:picture_in_picture',
                route: '/statistique-article'
              }:null,
           ]
          }:null


        ]
      }:null,

      this.roleService.checkPrivilegeAccess("docs_achat")?{
        type: 'dropdown',
        id: 'docs_achat',
        label: 'DOCS - ACHAT',
        icon: 'mat:view_compact',
        children: [
          this.roleService.checkPrivilegeAccess("docs_achat_devis")?{
            type: 'link',
            label: 'Devis',
            icon: 'mat:picture_in_picture',
            route: 'devisFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_bon_commande")?{
            type: 'link',
            label: 'Bon Commande',
            icon: 'mat:picture_in_picture',
            route: 'bonCommandeFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_bon_reception")?{
            type: 'link',
            label: 'Bon Reception',
            route: 'bonReception/list',
            icon: 'mat:view_compact',
            routerLinkActiveOptions: { exact: true }
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_bon_achat")?{
            type: 'link',
            label: 'Bon Achat',
            icon: 'mat:picture_in_picture',
            route: 'bonAchat/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_bon_retour_marchandise_fournisseur")?{
            type: 'link',
            label: 'Bon Retour Marchandise Fournisseur',
            icon: 'mat:picture_in_picture',
            route: 'bonRetourMarchandiseFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_bon_retour_financier_fournisseur")?{
            type: 'link',
            label: 'Bon Retour Financier Fournisseur',
            icon: 'mat:picture_in_picture',
            route: 'bonRetourFinancierFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_facture_achat")?{
            type: 'link',
            label: 'Facture Achat',
            icon: 'mat:picture_in_picture',
            route: 'factureAchat/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_avoir_marchandise_fournisseur")?{
            type: 'link',
            label: 'Avoir Marchandise Fournisseur',
            icon: 'mat:picture_in_picture',
            route: 'avoirMarchandiseFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_avoir_financier_fournisseur")?{
            type: 'link',
            label: 'Avoir Financier Fournisseur',
            icon: 'mat:picture_in_picture',
            route: 'avoirFinancierFournisseur/list'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_reglement_fournisseur")?{
            type: 'link',
            label: 'Règlement Fournisseur',
            icon: 'mat:picture_in_picture',
            route: '/fournisseur/reglements'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_journal_commandes")?{
            type: 'link',
            label: 'Journal Commandes',
            icon: 'mat:picture_in_picture',
            route: '/commandes_fournisseurs'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_releve_fournisseur")?{
            type: 'link',
            label: 'Relève Fournisseur',
            icon: 'mat:picture_in_picture',
            route: '/releveFournisseur'
          }:null,

          this.roleService.checkPrivilegeAccess("docs_achat_releve_details_fournisseur")?{
            type: 'link',
            label: 'Relève Fournisseur détaillée',
            icon: 'mat:picture_in_picture',
            route: '/releveFournisseurDetaillee'
          }:null,
          this.roleService.checkPrivilegeAccess("docs_achat_balance_fournisseur")?{
            type: 'link',
            label: 'Balance Fournisseur',
            icon: 'mat:picture_in_picture',
            route: '/balanceFournisseur'
          }:null
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("stock")?{
        type: 'dropdown',
        id: 'stock',
        label: 'STOCK',
        icon: 'mat:view_compact',
        children: [
          /*ici l'ajout du Mouvement-stock*/
          this.roleService.checkPrivilegeAccess("stock_mouvement_stock")?{
            type: 'link',
            label: 'Mouvement Stock',
            icon: 'mat:picture_in_picture',
            route: '/Mouvement-stock'
          }:null,
          this.roleService.checkPrivilegeAccess("stock_rappel_stock")?{
              type: 'link',
              label: 'Rappel Stock',
              icon: 'mat:picture_in_picture',
              route: '/rappel_stock'
            }:null,
          this.roleService.checkPrivilegeAccess("stock_valeur_stock")?{
              type: 'link',
              label: 'Valeur Stock',
              icon: 'mat:picture_in_picture',
              route: '/valeur_stock'
            }:null,
          this.roleService.checkPrivilegeAccess("stock_bon_casse")?{
                type: 'link',
                label: 'Bon Casse',
                route: 'bonCasse/list',
                icon: 'mat:view_compact',
                routerLinkActiveOptions: { exact: true }
              }:null,
          this.roleService.checkPrivilegeAccess("stock_bon_sortie")?{
            type: 'link',
            label: 'Bon Sorties',
            route: 'bonSorties/list',
            icon: 'mat:view_compact',
            routerLinkActiveOptions: { exact: true }
          }:null,
          this.roleService.checkPrivilegeAccess("stock_bon_entree")?{
                  type: 'link',
                  label: 'Bon Entree',
                  route: 'bonEntree/list',
                  icon: 'mat:view_compact',
                  routerLinkActiveOptions: { exact: true }
                }:null,

          this.roleService.checkPrivilegeAccess("stock_demande_alimentation")?{
                  type: 'link',
                  label: 'Demande Alimentation',
                  route: 'demande_alimentation/list',
                  icon: 'mat:view_compact',
                  routerLinkActiveOptions: { exact: true }
                }:null,

          this.roleService.checkPrivilegeAccess("stock_correction_stock")?{
            type: 'link',
            label: 'Correction Stock',
            icon: 'mat:picture_in_picture',
            route: '/correction-stock/list'
          }:null,
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("caisse")?{
        type: 'dropdown',
        id: 'caisse',
        label: 'CAISSE',
        icon: 'mat:view_compact',
        children: [
          /*ici l'ajout du Sessions-caisses*/
          this.roleService.checkPrivilegeAccess("caisses_liste_caisse")?{
            type: 'link',
            label: 'Liste Caisses',
            icon: 'mat:picture_in_picture',
            route: '/caisses'
          }:null,
          this.roleService.checkPrivilegeAccess("caisse_liste_session_caisse")?{
            type: 'link',
            label: 'Liste sessions Caisse',
            icon: 'mat:picture_in_picture',
            route: '/Sessions-caisses'
          }:null,
          this.roleService.checkPrivilegeAccess("charge_caisse_session_caisse")?{
            type: 'link',
            label: 'Charge caisse',
            icon: 'mat:picture_in_picture',
            route: '/chargeCaisse'
          }:null,
          this.roleService.checkPrivilegeAccess("type_caisse_session_caisse")?{
            type: 'link',
            label: 'Type caisse',
            icon: 'mat:picture_in_picture',
            route: '/typeCaisse'
          }:null
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("finance")?{
        type: 'dropdown',
        id: 'finance',
        label: 'FINANCE',
        icon: 'mat:settings',
        children: [
          /*ici l'ajout du  banque*/
          this.roleService.checkPrivilegeAccess("finance_banque")?{
            type: 'link',
            label: 'Banque',
            icon: 'mat:picture_in_picture',
            route: '/banque'
          }:null,
          this.roleService.checkPrivilegeAccess("finance_compte_bancaire")?{
            type: 'link',
            label: 'Compte Bancaire',
            icon: 'mat:picture_in_picture',
            route: '/compte_bancaire'
          }:null
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("parametrage")?{
        type: 'dropdown',
        id: 'parametrage',
        label: 'PARAMETRAGE',
        icon: 'mat:settings',
        children: [
            this.roleService.checkPrivilegeAccess("parametrage_params_article")?{
            type: 'dropdown',
            label: 'Params Article',
            children: [
              this.roleService.checkPrivilegeAccess("parametrage_params_article_categories")?{
                type: 'link',
                label: 'Catégories',
                icon: 'mat:picture_in_picture',
                route: '/categories'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_familles")?{
                type: 'link',
                label: 'Familles',
                icon: 'mat:picture_in_picture',
                route: '/familles'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_sousfamilles")?{
                type: 'link',
                label: 'Sous Familles',
                icon: 'mat:picture_in_picture',
                route: '/sousfamilles'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_marques")?{
                type: 'link',
                label: 'Marque',
                icon: 'mat:picture_in_picture',
                route: '/marque'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_modeles")?{
                type: 'link',
                label: 'Modèle',
                icon: 'mat:picture_in_picture',
                route: '/modele'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_unites")?{
                type: 'link',
                label: 'Unité',
                icon: 'mat:picture_in_picture',
                route: '/unitè'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_params_article_plans_articles")?{
                type: 'link',
                label: 'Plans article',
                icon: 'mat:picture_in_picture',
                route: '/plan'
              }:null,
            ]
          }:null,
            this.roleService.checkPrivilegeAccess("parametrage_taux_frais")?{
            type: 'dropdown',
            label: 'Taux / Frais',
            children: [
              this.roleService.checkPrivilegeAccess("parametrage_taux_frais_taux_tva")?{
                type: 'link',
                label: 'Taux Tva',
                icon: 'mat:picture_in_picture',
                route: '/tauxtva'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_taux_frais_frais")?{
                type: 'link',
                label: 'Frais',
                icon: 'mat:picture_in_picture',
                route: '/frais'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_taux_frais_type_charge")?{
                type: 'link',
                label: 'Type Charges',
                icon: 'mat:picture_in_picture',
                route: '/type_charge'
              }:null,
            ]
          }:null,
            this.roleService.checkPrivilegeAccess("parametrage_params_societe")?{
            type: 'dropdown',
            label: 'Params Societé',
            children: [
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_societe")?{
                type: 'link',
                label: 'Societé',
                icon: 'mat:picture_in_picture',
                route: '/societe'
              }:null,
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_depot")?{
                type: 'link',
                label: 'Dépôt',
                icon: 'mat:picture_in_picture',
                route: '/depot'
              }:null,
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_personel")?{
                type: 'link',
                label: 'Personnel',
                icon: 'mat:picture_in_picture',
                route: '/users'
              }:null,
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_role")?{
                type: 'link',
                label: 'Rôles',
                icon: 'mat:picture_in_picture',
                route: '/roles'
              }:null,
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_exercices")?{
                type: 'link',
                label: 'Exercices',
                icon: 'mat:picture_in_picture',
                route: '/exercices'
              }:null,
                this.roleService.checkPrivilegeAccess("parametrage_params_societe_params_general")?{
                type: 'link',
                label: 'Params Général',
                icon: 'mat:picture_in_picture',
                route: '/paramsGeneral'
              }:null
            ]
          }:null,
            this.roleService.checkPrivilegeAccess("parametrage_autres")?{
            type: 'dropdown',
            label: 'Autres',
            children: [
              /*ici l'ajout du  type ticket*/
              this.roleService.checkPrivilegeAccess("parametrage_autres_type_ticket")?{
                type: 'link',
                label: 'Type Ticket',
                icon: 'mat:picture_in_picture',
                route: '/ticket'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_autres_type_tiers")?{
                type: 'link',
                label: 'Type Tiers',
                icon: 'mat:picture_in_picture',
                route: '/type_tiers'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_autres_type_piece_jointe")?{
                type: 'link',
                label: 'Type Pièce Jointe',
                icon: 'mat:picture_in_picture',
                route: '/type_piece_jointe'
              }:null
            ]
          }:null,
            this.roleService.checkPrivilegeAccess("parametrage_balance_plu")?{
            type: 'dropdown',
            label: 'Balance PLU',
            children: [
              /*ici route de balance */
              this.roleService.checkPrivilegeAccess("parametrage_balance_plu_parametrage_balance")?{
                type: 'link',
                label: 'Balance Parametrage',
                icon: 'mat:picture_in_picture',
                route: '/balancePlu'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_balance_plu_articles")?{
                type: 'link',
                label: 'Balance articles',
                icon: 'mat:picture_in_picture',
                route: '/balancePluProducts'
              }:null
            ]
          }:null,
            this.roleService.checkPrivilegeAccess("parametrage_adresses")?{
            type: 'dropdown',
            label: 'Params Adresse',
            children: [
              this.roleService.checkPrivilegeAccess("parametrage_adresses_pays")?{
                type: 'link',
                label: 'Pays',
                icon: 'mat:picture_in_picture',
                route: '/pays'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_adresses_gouvernorat")?{
                type: 'link',
                label: 'Gouvernorat',
                icon: 'mat:picture_in_picture',
                route: '/gouvernorat'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_adresses_delegation")?{
                type: 'link',
                label: 'Delegation',
                icon: 'mat:picture_in_picture',
                route: '/delegation'
              }:null,
              this.roleService.checkPrivilegeAccess("parametrage_adresses_localite")?{
                type: 'link',
                label: 'Localite',
                icon: 'mat:picture_in_picture',
                route: '/localite'
              }:null,
            ]
          }:null,
        ]
      }:null,

      this.roleService.checkPrivilegeAccess("flotte")?{
        type: 'dropdown',
        id: 'flotte',
        label: 'FLOTTE',
        icon: 'mat:settings',
        children: [
          /*ici l'ajout du route Chauffeur */
          this.roleService.checkPrivilegeAccess("flotte_chauffeur")?{
            type: 'link',
            label: 'Chauffeur',
            icon: 'mat:picture_in_picture',
            route: '/chauffeur'
          }:null,
          this.roleService.checkPrivilegeAccess("flotte_transporteur")?{
            type: 'link',
            label: 'Transporteur',
            icon: 'mat:picture_in_picture',
            route: '/transporteur'
          }:null,
          this.roleService.checkPrivilegeAccess("flotte_vehicule")?{
            type: 'dropdown',
            label: 'Véhicule',
            children: [
              /*ici l'ajout du  marqueVehicule*/
              this.roleService.checkPrivilegeAccess("flotte_vehicule_marque")?{
                type: 'link',
                label: 'Marque',
                icon: 'mat:picture_in_picture',
                route: '/marqueVehicule'
              }:null,
              this.roleService.checkPrivilegeAccess("flotte_vehicule_modele")?{
                type: 'link',
                label: 'Modèle',
                icon: 'mat:picture_in_picture',
                route: '/modeleVehicule'
              }:null,
              this.roleService.checkPrivilegeAccess("flotte_vehicule_typevehicule")?{
                type: 'link',
                label: 'Type Véhicule',
                icon: 'mat:picture_in_picture',
                route: '/typeVehicule'
              }:null,
              this.roleService.checkPrivilegeAccess("flotte_vehicule_sous_typevehicule")?{
                type: 'link',
                label: 'Sous Type Véhicule',
                icon: 'mat:picture_in_picture',
                route: '/sous_type_Vehicule'
              }:null,
              this.roleService.checkPrivilegeAccess("flotte_vehicule_leasings")?{
                type: 'link',
                label: 'Leasings',
                icon: 'mat:picture_in_picture',
                route: '/leasings'
              }:null,
              this.roleService.checkPrivilegeAccess("flotte_vehicule_vehicules")?{
                type: 'link',
                label: 'Véhicules',
                icon: 'mat:picture_in_picture',
                route: '/véhicule'
              }:null
            ]
          }:null
        ]
      }:null,

    ]);
  }

  get_list_Of_Page(){
    let itemsMenu:any = this.items$.source
    let lis_of_pages:any=[]
    // console.log("***********nav_load****************",itemsMenu._value)

    itemsMenu._value.forEach((nv:any) => {
      nv?.children.forEach((nv1:any) => {

        if(nv1 && nv1.route){
          lis_of_pages.push({
            route:nv1.route,
            label:nv1.label,
          })
        }

      });
    });
    return  lis_of_pages
  }

  get_list_Of_Menu(){
    let itemsMenu:any = this.items$.source
    let lis_of_menus:any=[]

    itemsMenu._value.forEach((nvA:any) => {
        if(nvA){
          lis_of_menus.push({
            id:nvA.id,
            label:nvA.label,
          })
        }
    });
    // console.log("***********lis_of_menus****************",lis_of_menus)
    return  lis_of_menus
  }

}
