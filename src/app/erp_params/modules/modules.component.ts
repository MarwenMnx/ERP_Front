
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild, EventEmitter, Output, SimpleChanges
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import {filter, isEmpty} from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../static-data/aio-table-data';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import {RoleHttpService} from "../role_users/services/role-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationLoaderService} from "../../core/navigation/navigation-loader.service";

@Component({
  selector: 'vex-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ],
})
export class ModulesComponent {

  constructor(
     private nav_load: NavigationLoaderService
  ) { }

  listAccessModuleAff:any = []

  listAccessModule =  [
    {
      categoryid: 'menu1',
      id: 'donnes_de_base',
      name: 'DONNEES DE BASE',
      checked: false,
      niveau: [
        {
          id: 'produits',
          name: 'Produits',
          checked: false,
       /*
          niveau: [
            {
              id: 'produits_list',
              name: 'List',
              checked: false,
            },
            {
              id: 'produits_add',
              name: 'Ajouter produit',
              checked: false,
            }
            ,
            {
              id: 'produits_update',
              name: 'Modifier produit',
              checked: false,
            },
            {
              id: 'produits_promotion_remise',
              name: 'Promotion remise',
              checked: false,
              niveau: [
                {
                  id: 'promotion_remise_list',
                  name: 'List',
                  checked: false,
                },
                {
                  id: 'promotion_remise_add',
                  name: 'Ajouter',
                  checked: false,
                },
              ],
            },
          ],
       */
        },
        {
          id: 'clients',
          name: 'Clients',
          checked: false,
        /*
          niveau: [
            {
              id: 'clients_list',
              name: 'List',
              checked: false,
            },
            {
              id: 'clients_add',
              name: 'Ajouter client',
              checked: false,
            }
            ,
            {
              id: 'clients_update',
              name: 'Modifier client',
              checked: false,
            },
          ]
        */
        },
        {
          id: 'fournisseurs',
          name: 'Fournisseurs',
          checked: false,
          /*
          niveau: [
            {
              id: 'fournisseurs_list',
              name: 'List',
              checked: false,
            },
            {
              id: 'fournisseurs_add',
              name: 'Ajouter fournisseur',
              checked: false,
            }
            ,
            {
              id: 'fournisseurs_update',
              name: 'Modifier fournisseur',
              checked: false,
            },
          ]
          */
        },
        {
          id: 'quantiteInitial',
          name: 'Quantité - Initiale',
          checked: false,
        },
        {
          id: 'parametrageImportations',
          name: 'Paramétrer les importations',
          checked: false,
        },
        {
          id: 'importations',
          name: 'Importations',
          checked: false,
        },

      ],
    },

    {
      categoryid: 'menu2',
      id: 'pos_vente',
      name: 'POS - VENTE',
      checked: false,
      niveau: [
        {
          id: 'erp_pos_caisse',
          name: 'Caisse - Vente',
          checked: false,

          niveau: [
            {
              id: 'pos_validation_avec_payement',
              name: 'Validation Avec Payement',
              checked: false,
            },
            {
              id: 'pos_validation_sans_payement',
              name: 'Validation Sans Payement',
              checked: false,
            },
            {
              "id": "pos_validation_payement_partiel",
              "name": "Validation Avec Payement Partiel",
              "checked": true
            },
            { ///KO
              id: 'pos_genaration_ticket',
              name: 'Impression Rapport Ticket',
              checked: false,
            },
            { ///KO
              id: 'pos_genaration_talent_ticket',
              name: 'Impression ticket Talent',
              checked: false,
            },
            { //KO
              id: 'pos_genaration_bon_livraison',
              name: 'Génération Bon Livraison',
              checked: false,
            },
            {
              id: 'pos_accee_ticket',
              name: 'Recherche par Ticket',
              checked: false,
            },
            {
              id: 'pos_cloture_caisse',
              name: 'Clôture caisse',
              checked: false,
            },
            {
              id: 'pos_list_plan',
              name: 'Liste des plans',
              checked: false,
            },
            {
              id: "pos_pavee_num",
              name: "Pavé numerique",
              checked: true
            },
            {
              id: 'pos_modifier_unite',
              name: 'Modifier Unité',
              checked: false,
            },
            {
              id: 'pos_supprimer_article',
              name: 'Supprimer ligne article',
              checked: false,
            },
            {
              id: 'pos_annuler_vente',
              name: 'Annuler vente',
              checked: false,
            },
            {
              id: 'pos_reglement_avance',
              name: 'Règlement -  avance',
              checked: false,
            },
            {
              id: 'pos_ouvrir_tiroir',
              name: 'Ouvrir tiroir',
              checked: false,
            },
            {
              id: 'pos_ajout_client',
              name: 'Ajouter client',
              checked: false,
            },
          ],

        },
        {
          id: 'erp_pos_tickets',
          name: 'Tickets',
          checked: false,
          /*
          niveau: [
            {
              id: 'pos_tickets_list',
              name: 'Tickets',
              checked: false,
            },
            {
              id: 'pos_tickets_imprimer',
              name: 'Imprimer',
              checked: false,
            },
          ],
          */
        },
        {
          id: 'erp_pos_reglements',
          name: 'Règlements',
          checked: false,
          /*
          niveau: [
            {
              id: 'pos_reglement_list',
              name: 'Règlements',
              checked: false,
            },
          ],
          */
        },

        {
          id: 'erp_pos_retour_tickets',
          name: 'Retour ticket client',
          checked: false,
        },
      ],

    },

    {
      categoryid: 'docs_vente',
      id: 'docs_vente',
      name: 'Document Vente',
      checked: false,
      niveau: [
        {
          id: 'docs_vente_devis',
          name: 'Devis',
          checked: false,
        },
        {
          id: 'docs_vente_bon_commande',
          name: 'Bon Commande',
          checked: false,
        },
        {
          id: 'docs_vente_bon_livraison',
          name: 'Bon Livraison',
          checked: false,
        },
        {
          id: 'docs_vente_bon_retour_marchandise',
          name: 'Bon Retour Marchandise',
          checked: false,
        },
        {
          id: 'docs_vente_bon_retour_financier',
          name: 'Bon Retour Financier',
          checked: false,
        },
        {
          id: 'docs_vente_facture_vente',
          name:  'Facture Vente',
          checked: false,
        },
        {
          id: 'docs_vente_avoir_marchandise',
          name: 'Avoir Marchandise',
          checked: false,
        },
        {
          id: 'docs_vente_avoir_financier',
          name: 'Avoir Financier',
          checked: false,
        },
        {
          id: 'docs_vente_reglement_client',
          name: 'Règlement Client',
          checked: false,
        },
        {
          id: 'docs_vente_journal_commandes',
          name: 'Journal Commandes',
          checked: false,
        },
        {
          id: 'docs_vente_journal_vente',
          name: 'Journal Vente',
          checked: false,
        },
        {
          id: 'docs_vente_releve_client',
          name: 'Relève Client',
          checked: false,
        },
        {
          id: 'docs_vente_releve_details_client',
          name: 'Relève Client détaillée',
          checked: false,
        },
        {
          id: 'docs_vente_balance_client',
          name: 'Balance Client',
          checked: false,
        },
        {
          id: 'docs_vente_statistiques',
          name: 'Statistiques',
          checked: false,
          niveau: [
            {
              id: 'docs_vente_statistiques_reglement_vente',
              name: 'Statistiques/Règlement Vente',
              checked: false,
            },
            {
              id: 'docs_vente_statistiques_reglement_achat',
              name: 'Statistiques/Règlement Achat',
              checked: false,
            },
            {
              id: 'docs_vente_statistiques_chiffres_affaire_client',
              name: 'Statistiques/Chiffre Affaire Client',
              checked: false,
            },
            /*add new page chiffre affaire region client ici*/
            {
              id: 'docs_vente_statistiques_chiffres_affaire_règion_client',
              name: 'Statistiques/Chiffre Affaire Règion Client',
              checked: false,
            },
            {
              id: 'docs_vente_statistiques_vente_par_magasin',
              name: 'Statistiques/Vente Par Magasin',
              checked: false,
            },
            {
              id: 'docs_vente_statistiques_rayon',
              name: 'Statistiques/rayon',
              checked: false,
            },
            {
              id: 'docs_vente_statistiques_articles',
              name: 'Statistiques/article',
              checked: false,
            },
        ]
        },

        ]
    },

    {
      categoryid: 'docs_achat',
      id: 'docs_achat',
      name: 'Document Achat',
      checked: false,
      niveau: [
        {
          id: 'docs_achat_devis',
          name: 'Devis',
          checked: false,
        },
        {
          id: 'docs_achat_bon_commande',
          name: 'Bon Commande',
          checked: false,
        },
        {
          id: 'docs_achat_bon_reception',
          name: 'Bon Reception',
          checked: false,
        },
        {
          id: 'docs_achat_bon_achat',
          name: 'Bon Achat',
          checked: false,
        },
        {
          id: 'docs_achat_bon_retour_marchandise_fournisseur',
          name: 'Bon Retour Marchandise Fournisseur',
          checked: false,
        },
        {
          id: 'docs_achat_bon_retour_financier_fournisseur',
          name: 'Bon Retour Financier Fournisseur',
          checked: false,
        },
        {
          id: 'docs_achat_facture_achat',
          name: 'Facture Achat',
          checked: false,
        },
        {
          id: 'docs_achat_avoir_marchandise_fournisseur',
          name: 'Avoir Marchandise Fournisseur',
          checked: false,
        },
        {
          id: 'docs_achat_avoir_financier_fournisseur',
          name: 'Avoir Financier Fournisseur',
          checked: false,
        },
        {
          id: 'docs_achat_reglement_fournisseur',
          name: 'Règlement Fournisseur',
          checked: false,
        },
        {
          id: 'docs_achat_journal_commandes',
          name: 'Journal Commandes',
          checked: false,
        },
        {
          id: 'docs_achat_releve_fournisseur',
          name: 'Relève Fournisseur',
          checked: false,
        },

        {
          id: 'docs_achat_releve_details_fournisseur',
          name: 'Relève Fournisseur détaillée',
          checked: false,
        },
        {
          id: 'docs_achat_balance_fournisseur',
          name: 'Balance Fournisseur',
          checked: false,
        },
      ]
    },

    {
      categoryid: 'stock',
      id: 'stock',
      name: 'Stock',
      checked: false,
      niveau: [
        {
          id: 'stock_mouvement_stock',
          name: 'Mouvement Stock',
          checked: false,
        },
        {
          id: 'stock_correction_stock',
          name: 'Correction Stock',
          checked: false,
        },
        {
          id: 'stock_rappel_stock',
          name: 'Rappel Stock',
          checked: false,
        },
        {
          id: 'stock_valeur_stock',
          name: 'Valeur Stock',
          checked: false,
        },
        {
          id: 'stock_bon_casse',
          name: 'Bon Casse',
          checked: false,
        },
        {
          id: 'stock_bon_entree',
          name: 'Bon Entree',
          checked: false,
        },
        {
          id: 'stock_bon_sortie',
          name: 'Bon Sorties',
          checked: false,
        },
        {
          id: 'stock_demande_alimentation',
          name:'Demande Alimentation',
          checked: false,
        },
      ]
    },

    {
      categoryid: 'caisse',
      id: 'caisse',
      name: 'Caisse',
      checked: false,
      niveau: [
        {
          id: 'caisses_liste_caisse',
          name: 'Liste Caisses',
          checked: false,
        },
        {
          id: 'caisse_liste_session_caisse',
          name: 'Liste sessions Caisse',
          checked: false,
        },
        {
          id: 'type_caisse_session_caisse',
          name: 'Type Caisse',
          checked: false,
        },
        {
          id: 'charge_caisse_session_caisse',
          name: 'Charge caisse',
          checked: false,
        },
      ]
    },

    {
      categoryid: 'finance',
      id: 'finance',
      name: 'Finance',
      checked: false,
      niveau: [
        {
          id: 'finance_banque',
          name: 'Banque',
          checked: false,
        },
        {
          id: 'finance_compte_bancaire',
          name: 'Compte Bancaire',
          checked: false,
        },
      ]
    },

    {
      categoryid: 'parametrage',
      id: 'parametrage',
      name: 'Parametrâge',
      checked: false,
      niveau: [
        {
          id: 'parametrage_params_article',
          name: 'Params Article',
          checked: false,
          niveau: [
            {
              id: 'parametrage_params_article_categories',
              name: 'Catégories',
              checked: false,
            },
            {
              id: 'parametrage_params_article_familles',
              name: 'Familles',
              checked: false,
            },
            {
              id: 'parametrage_params_article_sousfamilles',
              name: 'Sous familles',
              checked: false,
            },
            {
              id: 'parametrage_params_article_marques',
              name: 'Marques',
              checked: false,
            },
            {
              id: 'parametrage_params_article_modeles',
              name: 'Modèles',
              checked: false,
            },
            {
              id: 'parametrage_params_article_unites',
              name: 'Unitésl',
              checked: false,
            },
            {
              id: 'parametrage_params_article_plans_articles',
              name: 'Plans articles',
              checked: false,
            },
          ]
        },
        {
          id: 'parametrage_taux_frais',
          name: 'Taux / Frais',
          checked: false,
          niveau: [
            {
              id: 'parametrage_taux_frais_taux_tva',
              name: 'Taux TVA',
              checked: false,
            },
            {
              id: 'parametrage_taux_frais_frais',
              name: 'Frais',
              checked: false,
            },
            {
              id: 'parametrage_taux_frais_type_charge',
              name: 'Type charge',
              checked: false,
            },
          ]
        },
        {
          id: 'parametrage_params_societe',
          name: 'Params Societé',
          checked: false,
          niveau: [
            {
              id: 'parametrage_params_societe_societe',
              name: 'Societé',
              checked: false,
            },
            {
              id: 'parametrage_params_societe_depot',
              name: 'Dépôt',
              checked: false,
            },
            {
              id: 'parametrage_params_societe_personel',
              name: 'Personnel',
              checked: false,
            },
            {
              id: 'parametrage_params_societe_role',
              name: 'Rôles',
              checked: false,
            },
            {
              id: 'parametrage_params_societe_exercices',
              name: 'Exercices',
              checked: false,
            },
            {
              id: 'parametrage_params_societe_params_general',
              name: 'Params Généal',
              checked: false,
            },
          ]
        },
        {
          id: 'parametrage_autres' ,
          name: 'Autres',
          checked: false,
          niveau: [
            {
              id: 'parametrage_autres_type_ticket',
              name: 'Type Ticket',
              checked: false,
            },
            {
              id: 'parametrage_autres_type_tiers',
              name: 'Type Tiers',
              checked: false,
            },
            {
              id: 'parametrage_autres_type_piece_jointe',
              name: 'Type Pièce Jointe',
              checked: false,
            },
          ]
        },
        {
          id: 'parametrage_balance_plu' ,
          name: 'Balance PLU',
          checked: false,
          niveau: [
            {
              id: 'parametrage_balance_plu_parametrage_balance',
              name: 'Balance Parametrage',
              checked: false,
            },
            {
              id: 'parametrage_balance_plu_articles',
              name: 'Balance articles',
              checked: false,
            },
          ]
        },
        {
          id: 'parametrage_adresses' ,
          name: 'Params Adresse',
          checked: false,
          niveau: [
            {
              id: 'parametrage_adresses_pays',
              name: 'Pays',
              checked: false,
            },
            {
              id: 'parametrage_adresses_gouvernorat',
              name: 'Gouvernorat',
              checked: false,
            },
            {
              id: 'parametrage_adresses_delegation',
              name: 'Delegation',
              checked: false,
            },
            {
              id: 'parametrage_adresses_localite',
              name: 'Localite',
              checked: false,
            },
          ]
        },
      ]
    },

    {
      categoryid: 'flotte',
      id: 'flotte',
      name: 'Flotte',
      checked: false,
      niveau: [
        {
          id: 'flotte_chauffeur',
          name: 'Chauffeur',
          checked: false,
        },
        {
          id: 'flotte_transporteur',
          name: 'Transporteur',
          checked: false,
        },
        {
          id: 'flotte_vehicule',
          name: 'Véhicule',
          checked: false,
          niveau: [
            {
              id: 'flotte_vehicule_marque',
              name: 'Marque',
              checked: false,
            },
            {
              id: 'flotte_vehicule_modele',
              name: 'Modèle',
              checked: false,
            },
            {
              id: 'flotte_vehicule_typevehicule',
              name: 'Type Véhicule',
              checked: false,
            },
            {
              id: 'flotte_vehicule_sous_typevehicule',
              name: 'Sous Type Véhicule',
              checked: false,
            },
            {
              id: 'flotte_vehicule_leasings',
              name: 'Leasing',
              checked: false,
            },
            {
              id: 'flotte_vehicule_vehicules',
              name: 'Véhicule',
              checked: false,
            },
          ]
        },
      ]
    },

  ];

  @Output() set_listAccess = new EventEmitter<any>();
  @Input()  listAccess:any =[] ;

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (changes['listAccess']) {
        console.log("******listAccesslistAccess*************",this.listAccess)
       this.listAccessModuleAff = []
       let lis_of_menus:any = this.nav_load.get_list_Of_Menu()
        this.listAccessModule.forEach((val:any, index: any) => {

          const idToSearch = val.id //'pos_genaration_bon_livraison';
          const element = this.findElementById(this.listAccess, idToSearch);
          // console.log('Found element:', element);
          if(element!=null){val.checked=element.checked}

          this.listAccessModule[index].niveau?.forEach((val1:any) => {

            if(val1!=undefined){

              const idToSearch = val1.id //'pos_genaration_bon_livraison';
              const element = this.findElementById(this.listAccess, idToSearch);
              //console.log('Found element:', element);
              if(element!=null){val1.checked=element.checked}

              val1?.niveau?.forEach((val2:any) => {

                const idToSearch = val2.id //'pos_genaration_bon_livraison';
                const element = this.findElementById(this.listAccess, idToSearch);
                //console.log('Found element:', element);
                if(element!=null){val2.checked=element.checked}

                val2?.niveau?.forEach((val3:any) => {
                  const idToSearch = val3.id //'pos_genaration_bon_livraison';
                  const element = this.findElementById(this.listAccess, idToSearch);
                  //console.log('Found element:', element);
                  if(element!=null){val3.checked=element.checked}
                });

              });
            }

          });

          const selectedState = lis_of_menus.findIndex((state:any) =>
            state.id.toString().trim().toLowerCase()==val.id.toString().trim().toLowerCase());
          if (selectedState>-1) {
            this.listAccessModuleAff.push(val)
          }

          if(this.listAccess[1]==undefined){
            let ev = {target:{checked:false}}
            this.PanelChanged(index, ev)
          }



        });

      }

    } catch (e) {
      console.log("Erruer : vex-modules >>> : " + e)

    }
  }

  ngOnInit() {

  }

  PanelChanged(index: any, event: any) {

    let is_selected = false
    if (event.target.checked){is_selected = true  }
      this.listAccessModule[index].niveau?.forEach((val:any) => {
        val.checked = is_selected;
        if(val!=undefined){
          val?.niveau?.forEach((val2:any) => {
            val2.checked = is_selected;

            val2?.niveau?.forEach((val3:any) => {
              val3.checked = is_selected;
            });

          });
        }

      });

    this.set_listAccess.emit(this.listAccessModuleAff)
  }

  PanelChanged2(num_niveau:number , objNv:any , indx_nv1:number, indx_nv2:number, indx_nv3:number) {


    if(num_niveau==1){
      objNv.niveau?.forEach((val:any) => {
        val.checked = objNv.checked;
        val.niveau?.forEach((val2:any) => {
          val2.checked = objNv.checked;
        });
      });
    }

    if(num_niveau==2){

      this.listAccess[indx_nv1].checked                  = false ;
      this.listAccess[indx_nv1].niveau[indx_nv2].checked  = false ;

      this.listAccess[indx_nv1].niveau[indx_nv2].niveau[indx_nv3].niveau?.forEach((val1:any) => {
        val1.checked = objNv.checked;
      });

      this.listAccess[indx_nv1].niveau[indx_nv2].niveau.forEach((val1:any) => {
        if(val1.checked==true){
          this.listAccess[indx_nv1].niveau[indx_nv2].checked = true
        }
      });

    }

    if(num_niveau==3){
      this.listAccess[indx_nv1].checked                  = false ;
      this.listAccess[indx_nv1].niveau[indx_nv2].checked  = false ;
      this.listAccess[indx_nv1].niveau[indx_nv2].niveau[indx_nv3].checked = false

      this.listAccess[indx_nv1].niveau[indx_nv2].niveau[indx_nv3].niveau.forEach((val:any) => {
        if(val.checked==true){
          this.listAccess[indx_nv1].niveau[indx_nv2].niveau[indx_nv3].checked = true
          this.listAccess[indx_nv1].niveau[indx_nv2].checked = true
        }
      });

    }

    this.listAccess[indx_nv1].checked = false
    this.listAccess[indx_nv1].niveau.forEach((val:any) => {
      if(val.checked==true){
        this.listAccess[indx_nv1].checked = true
      }
    });

    this.set_listAccess.emit(this.listAccessModuleAff)

  }

  findElementById(array: any[], id: string): any {
    for (let i = 0; i < array.length; i++) {
      const currentItem = array[i];
      if (currentItem.id === id) {
        return currentItem;
      }
      if (currentItem.niveau) {
        const foundInChildren = this.findElementById(currentItem.niveau, id);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
    return null;
  }

}
