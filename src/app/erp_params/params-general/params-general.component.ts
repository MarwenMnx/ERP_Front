import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../products/models/product.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../static-data/aio-table-data';
import { ProductCreateUpdateComponent } from '../products/product-create-update/product-create-update.component';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
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
import { Router } from '@angular/router';
import { ParamsGeneralHttpService } from './../params-general/services/params-general-http.service';
import {ParamsGeneral} from "./models/paramsGeneral.model";
import {ParamsGeneralCreateUpdateComponent} from "./params-general-create-update/params-general-create-update.component";
import { MatTabsModule } from '@angular/material/tabs';
import {Client} from "../clients/models/client.model";
import {ClientHttpService} from "../clients/services/client-http.service";
import {StandartAutocompleteComponent} from "../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component";
import {getDateByForma, hideLoading, showAlertError, showAlertSucess, showLoading} from "../../global-functions";
import {Tauxtva} from "../taux-tva/models/tauxTva.model";
import {TauxTvaHttpService} from "../taux-tva/services/taux-tva-http.service";
import {UtilService} from "../../utils/UtilService.service";

export const Questions = [
  {
    _id: 'timbre_fiscal',
    key: 'timbre_fiscal',
    value: '0',
    typeField: 'input',
    table:'',
    api:'',
    selected: true,
  },
  {
    _id: 'client_default',
    key: 'client_default',
    value: '0',
    typeField: 'listMultiple',
    table:'clients',
    api:'',
    selected: true,
  },
];


@Component({
  selector: 'vex-params-general',
  templateUrl: './params-general.component.html',
  styleUrls: ['./params-general.component.scss'],
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
    MatInputModule,MatTabsModule ,
    StandartAutocompleteComponent,MatSelectModule,
  ]
})

export class ParamsGeneralComponent {

  layoutCtrl = new UntypedFormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ParamsGeneral[]> = new ReplaySubject<ParamsGeneral[]>(1);
  data$: Observable<ParamsGeneral[]> = this.subject$.asObservable();
  listItems: ParamsGeneral[] = [];

  ///Garder ce traitement pour test dev//////
  listParamsGeneral:any = {
    OK: true,
    MESSAGE: "Operation effecuée avec succès",
    RESULTAT: [
      {
        _id: "665ec4b577279ba9ef40aaac",
        libelle: "params_general",
        code_societe: "s01",
        deleted: false,
        valeur:
          {
            pos_vente:
              {
                pos_default_client:
                  {
                    "_id": {
                      "$oid": "65ae7183d7ad1c1ad4154a94"
                    },
                    "code": "Code_client01",
                    "raisonSociale": "Raison_client01",
                    "matriculeFiscale": "Matricule_client01",
                    libelle: 'PASSAGER',
                    valeur: '',
                  },
              },
            doc_vente:
              {
                doc_vente_default_tva:
                  {
                    "_id": "659b043918a7182611bef517",
                    "libelle": "TVA 19",
                    "taux": 19,
                    "actif": false,
                    "code_societe": "s01",
                  },
                doc_vente_mode_reglement:
                  {
                    "key": "1",
                    "value": "ESPECE",
                  },
              }

          }
      }
    ]
  }

  constructor(private paramsGeneralHttpService:ParamsGeneralHttpService,public utilService:UtilService ,
              private clientServiceHttp: ClientHttpService,private tauxServiceHttp:TauxTvaHttpService,
              private router:Router) {}

  allClients: Client[]  = [];
  allTaux:Tauxtva[]     = [];
  listModeReglements    = this.utilService.parseEnumToObject("enum_modeReglement")
  first_params_id:any   = ''
  async ngOnInit() {

    this.paramsGeneralHttpService.GetAll().subscribe((res) => {
      if(res.RESULTAT.length>0){
        this.subject$.next(this.paramsGeneralHttpService.getData(res.RESULTAT));
        this.first_params_id    = res.RESULTAT[0]._id
        this.listParamsGeneral  = res
        this.listParamsGeneral.RESULTAT[0].valeur = JSON.parse(res.RESULTAT[0].valeur)
      }

    });

    await this.getAllClients()
    await this.getTaux()

  }

  async getAllClients() {
    return new Promise((resolve) => {
      this.clientServiceHttp.GetAll().subscribe((res) => {
        this.allClients = this.clientServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async getTaux() {
    return new Promise((resolve) => {
      this.tauxServiceHttp.GetAll().subscribe((res) => {
        this.allTaux = this.tauxServiceHttp.getData(res.RESULTAT);
        resolve(null)
      });
    });
  }

  async newItemEvent(type_event:any , data: any) {

    if(type_event=='client'){
      this.listParamsGeneral.RESULTAT[0].valeur.pos_vente.pos_default_client = data[1]
    }
    if(type_event=='taux_tva'){
      this.listParamsGeneral.RESULTAT[0].valeur.doc_vente.doc_vente_default_tva = data
    }

  }

  ngAfterViewInit() {

  }

  create() {

    let item:any = {
      _id:          this.first_params_id =='' ? undefined : this.listParamsGeneral.RESULTAT[0]._id , //"665ec4b577279ba9ef40aaac",
      libelle:      this.listParamsGeneral.RESULTAT[0].libelle+'_'+ Date() , //"params_general",
      code_societe: this.listParamsGeneral.RESULTAT[0].code_societe , //"s01",
      valeur:       JSON.stringify(this.listParamsGeneral.RESULTAT[0].valeur)//.toString()
    }

    if(this.first_params_id==''){
      this.paramsGeneralHttpService.AddNew(item).subscribe((res) => {
        if(res.OK){
          this.first_params_id                    = res.RESULTAT._id
          this.listParamsGeneral.RESULTAT[0]._id  = res.RESULTAT._id
          showAlertSucess('Enregistrer avec success', res.RESULTAT)
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }else{
      this.paramsGeneralHttpService.update(item).subscribe((res) => {
        if(res.OK){
          showAlertSucess('Enregistrer avec success', res.RESULTAT)
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }

  }


}
