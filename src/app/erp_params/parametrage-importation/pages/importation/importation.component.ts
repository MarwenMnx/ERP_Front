import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { CommonModule, AsyncPipe, NgFor} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { enum_nomTable, enum_type_operation, enum_types_articles, enum_types_vente } from 'src/app/global-enums';
import { getData, hideLoading, showAlertError, showAlertErrorHTML, showAlertSucess, showLoading, succesAlerteAvecTimer } from 'src/app/global-functions';
import { TokenService } from 'src/app/services/token.service';
import { Product } from 'src/app/erp_params/products/models/product.model';
import { Client } from 'src/app/erp_params/clients/models/client.model';
import { Fournisseur } from 'src/app/erp_params/fournisseurs/models/fournisseur.model';
import { ParametrageImportationHttpServiceService } from '../../services/parametrage-importation-http-service.service';
import { ParametrageImportationServiceService } from '../../services/parametrage-importation-service.service';
import { DataImportation, IChampParametreImportation, ParametreImportation } from '../../models/parametrage-importation.model';
import { ExcelService } from 'src/app/utils/excel.service';
import * as XLSX from 'xlsx';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { ProductServiceService } from 'src/app/erp_params/products/services/product-service.service';
import { UtilService } from 'src/app/utils/UtilService.service';
import { ClientHttpService } from 'src/app/erp_params/clients/services/client-http.service';
import { promises } from 'dns';
import { FournisseurHttpService } from 'src/app/erp_params/fournisseurs/services/fournisseur-http.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject, filter } from 'rxjs';

const ELEMENT_DATA: IChampParametreImportation[] = [];

const ELEMENT_DATA_SELECTED: IChampParametreImportation[] = [];

@Component({
  selector: 'vex-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    NgFor,
    MatOptionModule, 
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,MatCheckboxModule,MatTableModule,
    VexBreadcrumbsComponent,
    VexSecondaryToolbarComponent,
    CdkDropList, 
    CdkDrag,
    MatPaginatorModule,
  ]
})
export class ImportationComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  defaults: ParametreImportation = new ParametreImportation()
  form:FormGroup = this.fb.group({
    table: ['', Validators.required],
    lignes: [null], 
    code_societe: this.tokenService.getCodeSociete()
  });

  selectCtrl: UntypedFormControl = new UntypedFormControl();

  mode: 'create' | 'update' = 'create';

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  async getDetails():Promise<ParametreImportation> {
    return new Promise((resolve) => {
      this.serviceHttp.getDetails(this.form.value).subscribe((res) => {
        if(res.OK){
          hideLoading()
          resolve(res.RESULTAT)
        }else{
          showAlertError(res.MESSAGE, res.RESULTAT)
          resolve(new ParametreImportation(null))
        }
      },(err) => {
        //showAlertError("Erreur", "")
        resolve(new ParametreImportation(null))
      });
    });
  }
  
  colonnes:IChampParametreImportation[] = []
  modele:any = null
  enumsColonnes:any = []
  stringsColonnes:any = []
  numbersColonnes:any = []
  booleansColonnes:any = []


  clearFileInput() {
    // Reset the value of the file input element
    this.fileInputRef.nativeElement.value = '';
  }

  async changeParametre(){
    this.clearFileInput()
    this.colonnes = []
    this.modele = null
    this.enumsColonnes = []
    this.stringsColonnes = []
    this.numbersColonnes = []
    this.booleansColonnes = []

    showLoading()
    this.defaults = await this.getDetails()
    this.colonnes = this.defaults.champs.sort((n1,n2) => Number(n1.ordre) - Number(n2.ordre)); 

    switch (this.form.value.table) {
      case enum_nomTable.K_articles:
        this.modele = new Product()
        this.enumsColonnes = [
          {
            nom:"typeArticle",
            valeurs: this.utilService.parseEnumToObject('enum_types_articles')
          },
          {
            nom:"venduPar",
            valeurs: this.utilService.parseEnumToObject('enum_types_vente')
          },
          {
            nom:"margeAppliqueeSur",
            valeurs: this.utilService.parseEnumToObject('enum_type_operation')
          }
        ]
        break;
      case enum_nomTable.K_clients:
        this.modele = new Client()
        this.enumsColonnes = [
          {
            nom:"conditionReglement",
            valeurs: this.utilService.parseEnumToObject('enum_conditionReglement')
          },
          {
            nom:"statusProspection",
            valeurs: this.utilService.parseEnumToObject('enum_statusProspection')
          },
          {
            nom:"modeReglement",
            valeurs: this.utilService.parseEnumToObject('enum_modeReglement')
          }
        ]
        break;
      case enum_nomTable.K_fournisseurs:
        this.modele = new Fournisseur()
        this.enumsColonnes = [
          {
            nom:"conditionReglement",
            valeurs: this.utilService.parseEnumToObject('enum_conditionReglement')
          },
          {
            nom:"statusProspection",
            valeurs: this.utilService.parseEnumToObject('enum_statusProspection')
          },
          {
            nom:"modeReglement",
            valeurs: this.utilService.parseEnumToObject('enum_modeReglement')
          }
        ]
        break;
      default:
        // Code to execute if libelle doesn't match any case
    }

    this.stringsColonnes = []
    this.numbersColonnes = []
    this.booleansColonnes = [] 
    this.displayedColumns = []
    this.colonnes.forEach(col => {
      if (['Number', 'number'].includes(typeof this.modele[col.nom])) {
          this.numbersColonnes.push(col.nom);
      } else if (['Boolean', 'boolean'].includes(typeof this.modele[col.nom])) {
          this.booleansColonnes.push(col.nom);
      } else {
        this.stringsColonnes.push(col.nom);
      }
      this.displayedColumns.push(col.nom)
    });
  }

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private serviceHttp:ParametrageImportationHttpServiceService,
    private service:ParametrageImportationServiceService,
    private clientHttpService:ClientHttpService, 
    private fournisseurHttpService:FournisseurHttpService, 
    private tokenService:TokenService,
    private excelService: ExcelService,
    private productServiceService:ProductServiceService
    ) {}

  /** The label for the checkbox on the passed row */
  
  enums:string[] = []
  
  ngOnInit() {
    //this.enums = getData(enum_nomTable)
    this.enums = [enum_nomTable.K_articles, enum_nomTable.K_clients, enum_nomTable.K_fournisseurs]
  
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter<any[]>(Boolean)).subscribe((products) => {
      this.dataSource.data = products;
    });

  }

  async ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  async save() {
    this.form.patchValue({lignes:this.dataTraitee})
    if (!this.form.valid){
      if(!this.form.value.table){
        showAlertError('Erreur!', 'Veuillez sélectionner la table.');
      }else if(!this.form.value.lignes){
        showAlertError('Erreur!', 'La liste des lignes est vide.');
      }
      return
    }

    let isValid = await this.checkErreurLigne()
    if(!isValid){
      return
    }

    let total = this.dataTraitee.length;
    let batchSize = 20;
    let batchesCount = Math.ceil(total / batchSize);    
    let ok = true
    showLoading("(0 / "+total+") Chargement...");
    for (let i = 0; i < batchesCount; i++) {
      let startIndex = i * batchSize;
      let endIndex = Math.min(startIndex + batchSize, total);
      let batchData = this.dataTraitee.slice(startIndex, endIndex);    
      ok = await this.sendLignes(batchData);
      if(!ok) {
        break
      }else{
        showLoading("("+endIndex+" / "+total+") Chargement...");
      }
    }  
    if(ok) succesAlerteAvecTimer('Vos informations ont été soumis avec succès.');
  }

  async sendLignes(lignes:any):Promise<boolean>  {
    this.form.patchValue({lignes:lignes})
    return new Promise((resolve) => {
      this.serviceHttp.sendLignes(this.form.value).subscribe((res) => {
        if(res.OK){
          resolve(true)
        }else{
          showAlertError(res.MESSAGE, res.RESULTAT)
          resolve(false)
        }
      },(err) => {
        resolve(false)
      });
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  //start upload fichier
  telechargerExcel(){
    //this.excelService.exportToExcel(this.data, this.form.value.table);

    if (!this.form.valid){
      if(!this.form.value.table){
        showAlertError('Erreur!', 'Veuillez sélectionner la table.');
      }      
      return
    }
    let itemNote:any = {}
    for(let col of this.colonnes){
      let ok = false
      this.enumsColonnes.forEach((x:any) => {
        if(x.nom === col.nom){
          ok = true
          let valeurs = ""
          x.valeurs.forEach((y:any) => {
            valeurs += "("+y.key+":"+y.value+"),"
          })
          itemNote[col.nom] = "Valeurs possibles:"+valeurs
        }
      })

      if(!ok){
        if (['Number', 'number'].includes(typeof this.modele[col.nom])) {
          itemNote[col.nom] = "nombre"
        } else if (['Boolean', 'boolean'].includes(typeof this.modele[col.nom])) {
          itemNote[col.nom] = "Valeurs possibles: (0:false), (1:true),"
        } else {
          itemNote[col.nom] = "chaine"
        }
      }
    }
    this.excelService.exportToExcel([itemNote], this.form.value.table);
  }
  
  data: any[] = [];
  dataSource!: MatTableDataSource<any>;
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  
  setDataSource(){
    this.subject$.next(this.dataTraitee);
  }
  
  displayedColumns: string[] = [];

  onFileChange(event: any): void {
    if (!this.form.valid){
      if(!this.form.value.table){
        showAlertError('Erreur!', 'Veuillez sélectionner la table.');
      }      
      return
    }
    const file = event.target.files[0];
    this.readFile(file);
  }

  async readFile(file: File) {
    this.data = []
    this.setDataSource()
    this.displayedColumns = []
    const fileReader = new FileReader();
    
    fileReader.onload = async (e: any) => { // Utilisez async ici pour pouvoir utiliser await
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let dataSansOrganization: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      showLoading();
      await new Promise((resolve) => setTimeout(resolve)); // Attendez la fin du setTimeout
      await this.checkData(dataSansOrganization); // Utilisez await pour attendre la fin de checkData
    };

    fileReader.readAsArrayBuffer(file);
  }

  async checkData(dataSansOrganization:any){
    this.displayedColumns = []
    this.colonnes.forEach(col => {
      this.displayedColumns.push(col.nom)
    });
    this.displayedColumns.push('notes')
    for(let i = 1; i < dataSansOrganization.length; i++){
      let item:any = {}
      let compteur = -1
      this.displayedColumns.forEach((x:string) => {
        if(x !== "notes"){
          compteur++
          item[x] = dataSansOrganization[i][compteur]
        }else{
          item["notes"] = ""
        }
      })
      this.data.push(item)
    }
    
    if(await this.checkErreurLigne()){
      this.traitementDeDonnees()
      //await this.checkErreurLigne()
    }
    this.setDataSource()
    hideLoading()
  }

  /*getDernierNumeroOfRaisonSociale(tab_repetation:any[], raisonSociale:string){
   
    let index = tab_repetation.findIndex(x => x.raisonSociale == raisonSociale)
    if(index == -1 ){
      tab_repetation.push({raisonSociale:raisonSociale, nbrRepetation:1})
      return 1
    }else{
      tab_repetation[index].nbrRepetation++
      return tab_repetation[index].nbrRepetation
    }

  }*/

  async checkErreurLigne(){
    let messages = []
    let compteur = 0
    let clients: Client[] = []
    let fournisseurs: Fournisseur[] = []
    let tab_repetation:any = []
    switch (this.form.value.table) {
      case enum_nomTable.K_clients:
        clients = await this.getClients()
        break;
      case enum_nomTable.K_fournisseurs:
        fournisseurs = await this.getFournisseurs()
        break;
      default:
    }
    

    for(let item of this.data){
      compteur++
      let erreurs = ""

      switch (this.form.value.table) {
        case enum_nomTable.K_clients:
          let client = clients.filter((x:any) => x.raisonSociale == item.raisonSociale+"")
          let clientInNewData = this.data.filter((x:any) => x.raisonSociale == item.raisonSociale+"")
          if(client.length > 1 || clientInNewData.length > 1){
            //item.newRaisonSocial = item.raisonSociale +" "+ this.getDernierNumeroOfRaisonSociale(tab_repetation, item.raisonSociale)
            erreurs += "-raisonSociale doit être unique. <br>"
          }else{
            //item.newRaisonSocial = item.raisonSociale
          }
          break;
        case enum_nomTable.K_fournisseurs:
          let fournisseur = fournisseurs.filter((x:any) => x.raisonSociale == item.raisonSociale+"")
          let fournisseurInNewData = this.data.filter((x:any) => x.raisonSociale == item.raisonSociale+"")
          if(fournisseur.length > 1 || fournisseurInNewData.length > 1){
            //item.newRaisonSocial = item.raisonSociale +" "+ this.getDernierNumeroOfRaisonSociale(tab_repetation, item.raisonSociale)
            erreurs += "-raisonSociale doit être unique. <br>"
          }else{
            //item.newRaisonSocial = item.raisonSociale
          }
          break;
        default:
      }

      for(let col of this.colonnes){
        let ok = false
        this.enumsColonnes.forEach((x:any) => {
          if(x.nom === col.nom){
            ok = true
            let valeurs:string[] = []
            x.valeurs.forEach((item:any) => {
              valeurs.push(item.key)
            })
            if(!valeurs.includes(item[col.nom]+"")){
              erreurs += "-"+col.nom + " n'est pas validé. <br>"
            }else{
              item[col.nom] = ""+item[col.nom]
            }
          }
        })
  
        if(!ok){
          if (['Number', 'number'].includes(typeof this.modele[col.nom])) {
            if(isNaN(Number(item[col.nom]))){
              erreurs += "-"+col.nom + " n'est pas validé. <br>"
            }else{
              item[col.nom] = Number(item[col.nom])
            }
          } else if (['Boolean', 'boolean'].includes(typeof this.modele[col.nom])) {
            if(!['1', '0', 'true', 'false'].includes(item[col.nom]+"")){
              erreurs += "-"+col.nom + " n'est pas validé. <br>"
            }else{
              item[col.nom] = item[col.nom]+"" === '1' || item[col.nom]+"" === 'true' ? true : false
            }
          }else{
            item[col.nom] = item[col.nom] ? ""+item[col.nom] : undefined
          }
        }
      } 

      if(erreurs.length > 0){
        messages.push("Ligne "+compteur+": "+erreurs)
      }

      item["notes"] = erreurs
    }

    //switch (this.form.value.table) {
    //  case enum_nomTable.K_clients:
    //    this.data.forEach(x => {
    //      x.raisonSociale = x.newRaisonSocial
    //    })
    //    break;
    //  default:
    //}
    
    if(messages.length > 0){
      showAlertErrorHTML("Erreur", messages.length+" de vos lignes ne sont pas validées.")
      return false
    }
    return true
  }

  dataTraitee:any = []
  traitementDeDonnees(){
    this.dataTraitee = []
    switch (this.form.value.table) {
      case enum_nomTable.K_articles:
        for(let item of this.data){
          let newItem = new Product(item)
          
          if(item.prixTTC){
            let prixTTC = item.prixTTC
            newItem = this.productServiceService.changePrixVHT(newItem)
            newItem.prixTTC = prixTTC
            newItem = this.productServiceService.changePrixVenteTTC(newItem);
            newItem = this.productServiceService.calculTauxMarge(newItem);
            newItem = this.productServiceService.changePrixVHT(newItem)
          }else if(item.prixNetVenteHT ||item.prixVenteHT){
            let prixNetVenteHT = item.prixNetVenteHT ? item.prixNetVenteHT : item.prixVenteHT
            newItem = this.productServiceService.changePrixVHT(newItem)
            newItem.prixNetVenteHT = prixNetVenteHT
            newItem = this.productServiceService.calculTauxMarge(newItem)
            newItem = this.productServiceService.changePrixVHT(newItem)
          }else if(item.prixAchatTTC){
            let prixAchatTTC = item.prixAchatTTC
            newItem = this.productServiceService.changePrixVHT(newItem)
            newItem.prixAchatTTC = prixAchatTTC 
            newItem = this.productServiceService.changePrixAchatTTC(newItem);
            newItem = this.productServiceService.changePrixVHT(newItem)
          }else if(item.prixAchat){
            let prixAchat = item.prixAchat
            newItem = this.productServiceService.changePrixVHT(newItem)
            newItem.prixFourn = prixAchat
            newItem = this.productServiceService.changePrixVHT(newItem)
          }else{
            newItem = this.productServiceService.changePrixVHT(newItem)
          }
          
          this.dataTraitee.push(newItem)
        }
        break;
      case enum_nomTable.K_clients:
        for(let item of this.data){
          let newItem = new Client(item)
          this.dataTraitee.push(newItem)
        }
        break;
      case enum_nomTable.K_fournisseurs:
        for(let item of this.data){
          let newItem = new Fournisseur(item)
          this.dataTraitee.push(newItem)
        }
        break;
      default:
    }
    this.dataSource.data = this.dataTraitee;
  }

  async getClients():Promise<Client[]>  {
    return new Promise((resolve) => {
      this.clientHttpService.GetAll().subscribe((res) => {
        if(res.OK){
          resolve(this.clientHttpService.getData(res.RESULTAT))
        }else{
          showAlertError(res.MESSAGE, res.RESULTAT)
          resolve([])
        }
      },(err) => {
        resolve([])
      });
    });
  }

  async getFournisseurs():Promise<Fournisseur[]>  {
    return new Promise((resolve) => {
      this.fournisseurHttpService.GetAll().subscribe((res) => {
        if(res.OK){
          resolve(this.fournisseurHttpService.getData(res.RESULTAT))
        }else{
          showAlertError(res.MESSAGE, res.RESULTAT)
          resolve([])
        }
      },(err) => {
        resolve([])
      });
    });
  }

  //end upload fichier
  trackByProperty<T>(index: number, column: string) {
    return column;
  }
}

