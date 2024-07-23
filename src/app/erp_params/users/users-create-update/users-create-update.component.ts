import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import {
  FormsModule,
  UntypedFormControl
} from '@angular/forms';
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
import { NgFor, NgIf } from '@angular/common';
import { User } from '../models/user.model';
import { UsersHttpService } from '../services/users-http.service';
import { UsersService } from '../services/users.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import {Societe} from "../../societe/models/societe.model";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {SocieteHttpServiceService} from "../../societe/services/societe-http-service.service";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {RoleHttpService} from "../../role_users/services/role-http.service";
import {Role} from "../../role_users/models/role.model";
import { MatSelectModule } from '@angular/material/select';
import {TokenService} from "../../../services/token.service";
import { MatRadioModule } from '@angular/material/radio';

export interface PeriodicElement {
  _id:                    string;
  raisonSociale:          string;
  role:                   Role;
  possedeCaisse:          Boolean;
  sessionCaisses:         Boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [];
// const ELEMENT_DATA: Societe[] = [];

@Component({
  selector: 'vex-users-create-update',
  templateUrl: './users-create-update.component.html',
  styleUrls: ['./users-create-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stagger80ms, fadeInUp400ms, scaleIn400ms, fadeInRight400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,NgFor,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,MatRadioModule,
    MatCheckboxModule,MatTableModule,MatSlideToggleModule,
    MatSlideToggleModule,MatSelectModule,FormsModule
  ]
})
export class UsersCreateUpdateComponent implements OnInit {

  matchMessage: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: User | undefined,
    private dialogRef: MatDialogRef<UsersCreateUpdateComponent>,
    private fb: FormBuilder,
    private serviceHttp:UsersHttpService,
    private service:UsersService,
    private cd: ChangeDetectorRef,
    private societeHttpServiceService:SocieteHttpServiceService,
    private roleHttpService:RoleHttpService,
    private tokenService:TokenService,
  ) {}

  isAdminBongest:boolean    = false
  isSuperAdminGroup:boolean = false
  isAdminSociete:boolean    = false
  selectedStatus:  number   = 3 ;

  displayedColumns: string[] = ['select', 'raisonSociale' , 'role' ,  'possedeCaisse' , 'sessionCaisses'];
  dataSource      = new MatTableDataSource(ELEMENT_DATA);
  selection       = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows     = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    //console.log("************SELECT ALLI***************masterToggle>>>> ")
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    //console.log("************checkboxLabel*************",row)
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

      form = this.fb.group({
      _id:            [this.defaults?._id || ''],
      login:          [this.defaults?.login || '',Validators.required],
      nom:            [this.defaults?.nom || '',Validators.required],
      prenom:         [this.defaults?.prenom || '',Validators.required],
      telephone:      [this.defaults?.telephone || ''],
      email:          [this.defaults?.email || '', Validators.required],
      adresse:        [this.defaults?.adresse || ''],
      sessionCaisses: this.defaults?.sessionCaisses ,
      possedeCaisse:  this.defaults?.possedeCaisse ,
      password:       [this.defaults?.password || ''],
      passwordConfirm:[this.defaults?.passwordConfirm || ''],
      societes:       [this.defaults?.societes || ''],
      adminBonGest:       [this.defaults?.adminBonGest || false],
      isSuperAdminGroup:  [this.defaults?.isSuperAdminGroup || false],
      isAdminSociete:     [this.defaults?.isAdminSociete || false],
      isAdminGroupSociete:[0],

    // codeForgotPassword: [this.defaults?.codeForgotPassword || ''],

  });

  passwordFormGroup: UntypedFormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm: [null, Validators.required]
  });
  confirmFormGroup: UntypedFormGroup = this.fb.group({
    codeForgotPassword: [null, Validators.requiredTrue]
  });

  passwordInputType = 'password';

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  mode: 'create' | 'update' = 'create';

  @ViewChild('stateInputNom') stateInputNom!: ElementRef;
  @ViewChild('stateInputPrenom') stateInputPrenom!: ElementRef;

  ngOnInit() {

    if (this.tokenService.user && 'adminBonGest' in this.tokenService.user) {
       this.isAdminBongest = (this.tokenService.user as any).adminBonGest;
    }
    if (this.tokenService.user && 'isSuperAdminGroup' in this.tokenService.user) {
       this.isSuperAdminGroup = (this.tokenService.user as any).isSuperAdminGroup;
    }
    if (this.tokenService.user && 'isAdminSociete' in this.tokenService.user) {
       this.isAdminSociete = (this.tokenService.user as any).isAdminSociete;
    }

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as User;
    }

    this.form.patchValue(this.defaults);

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

    let _idUsr = this.tokenService.user?._id
    this.societeHttpServiceService.GetSocietesByUser(0,0,_idUsr).subscribe((res) => {
      this.listeSociete = this.getDataSocietes(res.RESULTAT) ;
    });
    // this.societeHttpServiceService.GetAll().subscribe((res) => {
    //   this.listeSociete = this.getDataSocietes(res.RESULTAT) ;
    // });

    let filtreRole:any = {_id:_idUsr}
    this.roleHttpService.roleByUser(filtreRole).subscribe((res) => {
      this.listeRoles = this.getDataRoles(res.RESULTAT) ;
    });

    ///ce traitement sert à  actualiser l'affichage des roles dans le tableau des societés
    setTimeout(() => {
      this.stateInputPrenom.nativeElement.focus();
      this.stateInputNom.nativeElement.focus();
    }, 500);

  }

  listeSociete: Societe[] = [];
  getDataSocietes(items:any) {

    this.dataSource.data = [];
    let newItems:any = []
    for (let key of Object.keys(items)){

      if(this.defaults?.societes){

        const selectedState =  this.defaults?.societes?.findIndex((sct:any) =>
          sct.code_unique == items[key].code_unique);

        if (selectedState>-1) {
          items[key] = this.defaults?.societes[selectedState]
          this.selection.select( items[key])
        }

      }

      newItems.push(new Societe(items[key]))
      this.dataSource.data.push(items[key])
    }

    this.dataSource._updateChangeSubscription();
    return newItems
  }

  selectRoles(role1: Role, role2: Role): boolean {
    return role1 && role2 ? role1._id === role2._id : role1 === role2;
  }

  listeRoles: Role[]      = [];
  getDataRoles(items:any) {
    // let newItems:any = []
    // for (let key of Object.keys(items)){
    //   newItems.push(new Role(items[key]))
    // }
    return items
  }

  save() {
    if (!this.form.valid) return
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create() {

    const item = this.form.value as User;
    // console.log("***********create111111111111************")
    item.societes = this.selection["_selected"]
    // console.log(item)
    // console.log("***********create222222222222************")

    this.serviceHttp.AddNew(item).subscribe((res) => {
      this.service.successCreate(res, this.dialogRef)
    });

  }

  update() {
    const item:any = this.form.value;
    if (!this.defaults) {
      throw new Error(
        'Item ID does not exist, this customer cannot be updated'
      );
    }

    item.adminBonGest      = false;
     switch(this.selectedStatus){
       case 1 : // Administrateur group
         item.isSuperAdminGroup = true;
         item.isAdminSociete    = false;
         break
       case 2 : //Administrateur societé
         item.isSuperAdminGroup = false;
         item.isAdminSociete    = true;
         break
       // case 3 : //utilisateur
       //   item.isSuperAdminGroup = false;
       //   item.isAdminSociete    = false;
       //   break
       //
       default : //utilisateur
         item.isSuperAdminGroup = false;
         item.isAdminSociete    = false;
         break

     }

    item.societes = this.selection["_selected"]
    this.serviceHttp.update(item).subscribe((res) => {
      this.service.successUpdate(res, this.dialogRef)
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
