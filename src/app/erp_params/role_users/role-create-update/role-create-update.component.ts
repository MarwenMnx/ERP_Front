import {Component, Inject, Input, OnInit} from '@angular/core';
import {VexPageLayoutComponent} from "@vex/components/vex-page-layout/vex-page-layout.component";
import {VexSecondaryToolbarComponent} from "@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import {VexBreadcrumbsComponent} from "@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import {MatButtonModule} from "@angular/material/button";
import {VexPageLayoutContentDirective} from "@vex/components/vex-page-layout/vex-page-layout-content.directive";
import {MatGridListModule} from "@angular/material/grid-list";
import {AsyncPipe, CommonModule, NgFor, NgIf} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {VexHighlightDirective} from "@vex/components/vex-highlight/vex-highlight.directive";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ModulesComponent} from "../../../erp_params/modules/modules.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../utils/shared.module";
import {
  getDateByForma,
  hideLoading,
  showAlertError,
  showLoading,
  succesAlerteAvecTimer
} from "../../../global-functions";
import {RoleHttpService} from "../services/role-http.service";
import {Role} from "../models/role.model";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {NavigationLoaderService} from "../../../core/navigation/navigation-loader.service";
import {StandartAutocompleteComponent} from "../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'vex-role-create-update',
  templateUrl: './role-create-update.component.html',
  styleUrls: ['./role-create-update.component.scss'],
  standalone: true,
  imports: [ VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    VexPageLayoutContentDirective,
    MatGridListModule, NgFor, MatTabsModule, VexHighlightDirective,
    MatExpansionModule,MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    NgFor,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,MatDialogModule,StandartAutocompleteComponent,
    AsyncPipe, MatPaginatorModule,MatTableModule,MatCardModule,RouterLink,
    ModulesComponent,FormsModule,CommonModule,ReactiveFormsModule,SharedModule
  ]
})
export class RoleCreateUpdateComponent implements OnInit {

  public defaults: Role = new Role(null)
  private routeSub: Subscription;
  private id: string = ''

  isAdminBongest:boolean    = false
  isSuperAdminGroup:boolean = false
  isAdminSociete:boolean    = false
  selectedStatus:  number   = 3 ;

  listAccess:any           =[];
  set_listAccess(p_listAccess:string = ''){
    this.listAccess = p_listAccess
  }

  constructor(
    private fb: FormBuilder,
    private serviceRoleHttp:RoleHttpService,
    private route: ActivatedRoute,private router:Router ,
    private nav_load: NavigationLoaderService , private tokenService:TokenService,
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id']
        this.mode = 'update';
      }
    });
  }

  form = this.fb.group({
    _id: [this.defaults?._id || ''],
    libelle: [this.defaults?.libelle || '', Validators.required] ,
    default_page: [this.defaults?.default_page || '', Validators.required] ,
    modules: [this.defaults?.modules ] ,
    adminBonGest:       [this.defaults?.adminBonGest || false],
    isSuperAdminGroup:  [this.defaults?.isSuperAdminGroup || false],
    isAdminSociete:     [this.defaults?.isAdminSociete || false],
    isAdminGroupSociete:[0],
  });

  mode: 'create' | 'update' = 'create';

  lis_of_pages:any=[]
  async ngOnInit() {

    if (this.tokenService.user && 'adminBonGest' in this.tokenService.user) {
      this.isAdminBongest = (this.tokenService.user as any).adminBonGest;
    }
    if (this.tokenService.user && 'isSuperAdminGroup' in this.tokenService.user) {
      this.isSuperAdminGroup = (this.tokenService.user as any).isSuperAdminGroup;
    }
    if (this.tokenService.user && 'isAdminSociete' in this.tokenService.user) {
      this.isAdminSociete = (this.tokenService.user as any).isAdminSociete;
    }

    showLoading()
    if (this.id) {
      this.mode = 'update';
      await this.getDetails()
      // console.log("***********getDetails****************",this.listAccess)

      /*
      this.listAccess = [
        {
          categoryid: '1',
          id: '1.1',
          name: 'Document Achat',
          checked: true,
          niveau: [
            {
              id: '1.1.1',
              name: 'Bon de reception',
              checked: true,
              niveau: [
                {
                  id: '1.1.1.1',
                  name: 'List',
                  checked: false,
                },
                {
                  id: '1.1.1.2',
                  name: 'Ajouter BR',
                  checked: false,
                }
                ,
                {
                  id: '1.1.1.3',
                  name: 'Modifier BR',
                  checked: false,
                },
              ],
            },
            {
              id: '1.1.2',
              name: 'Bon Achat',
              checked: false,
              niveau: [
                {
                  id: '1.1.2.1',
                  name: 'List',
                  checked: false,
                },
                {
                  id: '1.1.2.2',
                  name: 'Ajouter BA',
                  checked: false,
                }
                ,
                {
                  id: '1.1.2.3',
                  name: 'Modifier BA',
                  checked: false,
                },
              ]
            },
            {
              id: '1.1.3',
              name: 'test 3 (DGP) IgG',
              checked: false
            },
          ],
        },
        {
          categoryid: '2',
          id: '2.1',
          name: 'Document Vente',
          checked: false,
          niveau: [
            {
              id: '2.1.1',
              name: 'Caisse - Vente',
              checked: false,
              niveau: [
                {
                  id: '2.1.1.1',
                  name: 'Valider Sans Paiement',
                  checked: false,
                },
                {
                  id: '2.1.1.2',
                  name: 'Annuler vente',
                  checked: false,
                },
              ],
            },
            {
              id: '2.1.2',
              name: 'test 2  (DGP) IgG',
              checked: false,
            },
            {
              id: '2.1.3',
              name: 'test 3  (DGP) IgG',
              checked: false,
            },
          ],
        },
      ];
*/
    } else {
      this.defaults = {} as Role;
    }
    // this.form.patchValue(this.defaults);

    const isAdminGroupSociete:any = this.form.controls["isSuperAdminGroup"].value ;
    const isAdminSociete:any      = this.form.controls["isAdminSociete"].value ;

    if (isAdminGroupSociete !== null && isAdminGroupSociete !== undefined && isAdminGroupSociete === true) {
      this.form.controls['isAdminGroupSociete'].setValue(1);
      this.selectedStatus = 1;
    }

    if (isAdminSociete !== null && isAdminSociete !== undefined && isAdminSociete === true) {
      this.form.controls['isAdminGroupSociete'].setValue(2);
      this.selectedStatus = 2;
    }

    this.lis_of_pages = this.nav_load.get_list_Of_Page()

    hideLoading()
  }

  async newItemEvent(newValue: any) {
    // console.log("************222222222222*****")
    // console.log(newValue)
    this.form.controls["default_page"].setValue(newValue[1])
    // console.log("************3333333333*****")
    // if (this.form.contains(newValue[0])) {
    //   this.form.controls[newValue[0] as string].setValue(newValue[1])
    // }
    // if (["lignes", "reglements"].includes(newValue[0])) {
    //   this.changeTotals()
    // }
    // if (["client"].includes(newValue[0])) {
    //   this.checkSoldeClient()
    //   if (this.dataParams.withDocumentPrecedent == true && this.form.value.client && this.form.value.client._id) {
    //     showLoading()
    //     this.allDocsPrecedents = await this.getAllDocuementsPrecedentsByClient(this.form.value.client._id)
    //     this.allDocsPrecedents = this.allDocsPrecedents.map(doc => ({
    //       ...doc,
    //       numeroDate: doc.numero + " - " + getDateByForma(doc.date)
    //     }));
    //     hideLoading()
    //   } else {
    //     this.allDocsPrecedents = []
    //   }
    //   this.form.patchValue({ documentPrecedent: [] })
    //   this.form.patchValue({ isDownloadDocumentPrecedent: false })
    //   this.form.patchValue({ lignes: [] })
    //   this.changeTotals()

  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  save() {

    if (!this.form.valid) return
    showLoading()
    let item =  {
        _id:                this.form.value._id,
        libelle :           this.form.value.libelle ,
        default_page :      this.form.value.default_page ,
        modules :           this.listAccess,
        adminBonGest :      false,
        isSuperAdminGroup : this.selectedStatus == 1 ? true  : false,
        isAdminSociete :    this.selectedStatus == 2 ? true  : false,
    }

    if (this.mode === 'create') {
      item._id = undefined
        this.serviceRoleHttp.AddNew(item).subscribe((res) => {
        if(res.OK){
          succesAlerteAvecTimer('Rôle ajouté avec succès.')
          setTimeout(() => {
            this.router.navigate(['/roles']);
          }, 2000);
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    } else if (this.mode === 'update') {

      this.serviceRoleHttp.update(item).subscribe((res) => {
        if(res.OK){
          succesAlerteAvecTimer('Rôle modifié avec succès.')
          setTimeout(() => {
            this.router.navigate(['/roles']);
          }, 2000);
        }else{
          showAlertError('Erreur!', res.RESULTAT);
        }
      });
    }

  }


  async getDetails() {
    return new Promise((resolve) => {
      this.serviceRoleHttp.GetDetails(this.id).subscribe((res) => {
        this.serviceRoleHttp.successGetDetails(res, this.form, this.defaults)
        this.defaults = res.RESULTAT
        this.listAccess = res.RESULTAT.modules
        this.form.patchValue(this.defaults);
        resolve(null)
      });
    });
  }

}
