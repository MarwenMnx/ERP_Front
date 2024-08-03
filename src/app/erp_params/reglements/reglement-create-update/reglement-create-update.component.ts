import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule, DatePipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../../utils/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../../utils/dateAdapter/date.adapter";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {ReglementHttpService} from "../../../erp_params/reglements/services/reglement-http.service";
import {UtilService} from "../../../utils/UtilService.service";
import {TokenService} from "../../../services/token.service";
import {BanqueHttpService} from "../../../erp_params/banque/services/banque-http.service";
import {UsersHttpService} from "../../../erp_params/users/services/users-http.service";
import {ClientHttpService} from "../../../erp_params/clients/services/client-http.service";
import {FournisseurHttpService} from "../../../erp_params/fournisseurs/services/fournisseur-http.service";
import {ImpressionPdfService} from "../../../impression/impression-pdf.service";
import {Banque} from "../../../erp_params/banque/models/banque.model";
import {typeChequeTicket} from "../../../erp_params/type-cheque-ticket/models/typeChequeTicket.model";
import {debounceTime, distinctUntilChanged, filter, map, startWith} from "rxjs/operators";
import {TypeChequeTicketHttpService} from "../../../erp_params/type-cheque-ticket/services/typeChequeTicket-http.service";
import {TicketHttpService} from "../../../erp_params/ticket/services/ticket-http.service";
import {dateVaidator, notEqualToZero, roundmMontantNumber, showAlertError} from "../../../global-functions";
import Swal from "sweetalert2";
import {DemoDialogComponent, set_ModePayement} from "../../../erp_pos/caisse/caisse.component";
import { Observable, of, ReplaySubject } from 'rxjs';
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {StandartAutocompleteComponent} from "../../../utils/autocompletes/standart-autocomplete/standart-autocomplete.component";
import {Client} from "../../../erp_params/clients/models/client.model";
import { Fournisseur } from '../../fournisseurs/models/fournisseur.model';
import {enum_type_document} from "../../../global-enums";
import { log } from 'console';

@Component({
  selector: 'vex-reglement-create-update',
  templateUrl: './reglement-create-update.component.html',
  styleUrls: ['./reglement-create-update.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, CommonModule,
    MatInputModule, SharedModule,
    MatDatepickerModule, FormsModule, MatOptionModule, MatAutocompleteModule,
    ReactiveFormsModule, MatTableModule, RouterLink,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    SharedModule,
    StandartAutocompleteComponent]
  ,
  providers:
    [
      { provide: AppDateAdapter ,  useClass: AppDateAdapter }, // Parse MatDatePicker Format
      // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      //{ provide: MAT_DATE_LOCALE, useValue: 'fr' },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
      DatePipe
    ]
})
export class CreateAndUpdateReglementComponent {


  displayedColumns_OP: string[]   = ['type_pay','date_reglement','num_pay' , 'banque_pay', 'date_echeance_pay','titulaire_pay' ,'billet_reg', 'total_pay','deel'];
  colorTablePanier  = '#6d6f6c0d';//'green';

  set_total_payement = 0;
  selectDate :any = this.datePipe.transform(new Date(), "yyyy-MM-dd")
  selectClient:any =''
  selectFournisseur:any =''
  selectNote:any=''
  selectMontantT:number=0


  especeValidations: any;//FormGroup;
  ticketValidations: any;//FormGroup;
  chTrValidations: any;//FormGroup;

  referenceTck: string = '';
  ticketType: string = '';
  ticketTypeObj: any = '';
  montantTck: number = 0;
  quantiteTck: number = 1;

  referenceCh_TR: string = '';
  montantCh_TR: number = 0;
  quantiteCh_TR: number = 1;
  banqueCh_TR: string = '';
  banqueCh_TR_Obj: string = '';
  titulaire_Ch_TR: string = '';
  date_echeance_Ch_TR: Date = new Date();

  clientCtrl = new UntypedFormControl();
  fournisseurCtrl = new UntypedFormControl();

  banqueCtrl = new UntypedFormControl();
  ticketCtrl = new UntypedFormControl();

  clients: Client[] = [];
  fournisseurs: Fournisseur[] = [];

  banques: Banque[] = [];
  tickets: typeChequeTicket[] = [];

  subjectClient$: ReplaySubject<Client[]> = new ReplaySubject<Client[]>();
  subjectFournisseur$: ReplaySubject<Fournisseur[]> = new ReplaySubject<Fournisseur[]>();

  subjectBanque$: ReplaySubject<Banque[]> = new ReplaySubject<Banque[]>();
  subjectTicket$: ReplaySubject<typeChequeTicket[]> = new ReplaySubject<typeChequeTicket[]>();

  dataClient$: Observable<Client[]> = this.subjectClient$.asObservable();
  dataFournisseur$: Observable<Fournisseur[]> = this.subjectFournisseur$.asObservable();

  dataBanque$: Observable<Banque[]> = this.subjectBanque$.asObservable();
  dataTicket$: Observable<typeChequeTicket[]> = this.subjectTicket$.asObservable();

  filteredClient$ = this.clientCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((client:any) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) ))
  );

  filteredFournisseur$ = this.fournisseurCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((fournisseur:any) => (fournisseur ? this.filterFournisseurs(fournisseur).slice(0, 500)  : this.fournisseurs.slice(0, 500) ))
  );

  filteredBanque$ = this.banqueCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((banque) => (banque ? this.filterBanques(banque).slice(0, 500) : this.banques.slice(0, 500)))

  );

  row_existeClient: boolean = false;
  onEnterClient(evt: any){

    this.row_existeClient = false;
    let get_val:string =evt.source.value
    const indexArr =  this.clients.filter(
      (clt) => clt.code.concat(' ',clt.raisonSociale).toLowerCase().indexOf(get_val.toLowerCase()) >= 0
    );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined
    if (evt.source.selected) {
      if(selectedState !=undefined){
        console.log("***********selectedState******",  selectedState)
        this.selectClient = selectedState;
      }
    }

  }

  row_existeFournisseur: boolean = false;
  onEnterFournisseur(evt: any){

    this.row_existeFournisseur = false;
    let get_val:string =evt.source.value
    const indexArr =  this.fournisseurs.filter(
      (fr) => fr.code.concat(' ',fr.raisonSociale).toLowerCase().indexOf(get_val.toLowerCase()) >= 0
    );
    const selectedState = indexArr.length> 0 ? indexArr[0] : undefined
    if (evt.source.selected) {
      if(selectedState !=undefined){
        console.log("***********selectedState******",  selectedState)
        this.selectFournisseur = selectedState;
      }
    }

  }

  set_list_banque() {
    this.filteredBanque$ = this.banqueCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((banque) => (banque ? this.filterBanques(banque).slice(0, 500) : this.banques.slice(0, 500)))

    );
  }

  set_list_ticket() {
    this.filteredTicket$ = this.ticketCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((ticket) => (ticket ? this.filterTickets(ticket).slice(0, 500) : this.tickets.slice(0, 500)))
    );
  }

  filteredTicket$ = this.ticketCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(150),
    distinctUntilChanged(),
    map((ticket) => (ticket ? this.filterTickets(ticket).slice(0, 500) : this.tickets.slice(0, 500)))
  );

  row_existeTicket: boolean = false;
  onEnterTicket(evt: any, typeTCK: any) {

    //this.ticketType = evt.source.value ;
    this.ticketValidations.patchValue({ ticketTypeObj: typeTCK })
    this.ticketValidations.patchValue({ ticketType: evt.source.value })
    this.row_existeTicket = false;
    const selectedState = this.dataSourceTicket.data.find(state =>
      state.libelle.toLowerCase() == evt.source.value.toLowerCase());
    if (evt.source.selected) {

      this.dataSourceTicket._updateChangeSubscription();

      /*
            if(selectedState) {
              setTimeout(()=>{
                console.log("xxxxxxxxxxxx : "+this.categoryCtrl.patchValue(selectedState.reference));
              }, 0);
            }
      */
    }
  }

  row_existeBanque: boolean = false;
  onEnterBanque(evt: any, typeBq: any) {

    //this.ticketType = evt.source.value ;

    this.row_existeBanque = false;
    const selectedState = this.dataSourceBanque.data.find(state =>
      state.libelle.toLowerCase() == evt.source.value.toLowerCase());
    if (evt.source.selected) {

      this.chTrValidations.patchValue({ banqueCh_TR_Obj: typeBq })
      this.chTrValidations.patchValue({ banqueCh_TR: evt.source.value })
      this.dataSourceBanque._updateChangeSubscription();
    }



  }

  panelOpenBanque = false;
  dataSourceBanque = new MatTableDataSource<Banque>();
  dataSourceTicket = new MatTableDataSource<typeChequeTicket>();

  constructor(@Inject(MAT_DIALOG_DATA) public getDetailsPanier: any, private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DemoDialogComponent>, private date_form: AppDateAdapter
    , private serviceHttpBanque: BanqueHttpService,private datePipe:DatePipe,
              private serviceHttpClient: ClientHttpService,
              private serviceHttpFournisseur: FournisseurHttpService,
              private serviceHttpTypeChequeTicket: TypeChequeTicketHttpService
    , public utilService: UtilService, private ticketHttpService: TicketHttpService,
              private tokenService:TokenService ,private reglementHTTPService: ReglementHttpService,) {

    //this.date_form.setLocale("en-in"); // DD/MM/YYYY
    this.set_Payement = [];
  }

  getDataBanque(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new Banque(items[key]))
    // }
    return items
  }
  getDataTicket(items: any) {
    // let newItems = []
    // for (let key of Object.keys(items)) {
    //   newItems.push(new typeChequeTicket(items[key]))
    // }
    return items
  }

  filterClients(name: string) {
    return this.clients.filter(
      (client:any) => client.code.concat(client.matriculeFiscale,client.raisonSociale,client.telephone).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  filterFournisseurs(name: string) {
    return this.fournisseurs.filter(
      (fournisseur:any) => fournisseur.code.concat(fournisseur.matriculeFiscale,fournisseur.raisonSociale,fournisseur.telephone).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  filterBanques(name: string) {
    return this.banques.filter(
      (banque) => banque.libelle.concat(banque.abreviation).toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }
  filterTickets(name: string) {
    return this.tickets.filter(
      (ticket) => ticket.libelle.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );
  }

  ngOnInit() {

    this.especeValidations  = this.formBuilder.group({
      date_reglement:[new Date(), Validators.compose([Validators.required, dateVaidator])],
      especeNumber: [0, [notEqualToZero()]],
      taux: [0, [notEqualToZero()]],
      note:[''],
      montantT: [0, ],


    });

    
    
    this.ticketValidations  = this.formBuilder.group({
      date_reglement:[new Date(), Validators.compose([Validators.required, dateVaidator])],
      montantTck: [0, [notEqualToZero()]],
      referenceTck: ['', [Validators.required,]],
      ticketType: ['', [Validators.required]],
      ticketTypeObj: [''],
      quantiteTck: [1, [Validators.required,]],
      note:[''],
      montantT: [0, ],


    });
    this.chTrValidations    = this.formBuilder.group({
      date_reglement:[new Date(), Validators.compose([Validators.required, dateVaidator])],
      montantCh_TR: [0, [notEqualToZero()]],
      quantiteCh_TR: [1, [notEqualToZero()]],
      referenceCh_TR: ['', [Validators.required,]],
      banqueCh_TR: ['', [Validators.required,]],
      banqueCh_TR_Obj: [''],
      // date_echeance_Ch_TR: [new Date(), [Validators.pattern("/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$/"),  ]],
      date_echeance_Ch_TR: [new Date(), Validators.compose([Validators.required, dateVaidator])],
      titulaire_Ch_TR: [''],
      note:[''],
      montantT: [0, ],


    });
    // console.log(" ----***OPEN  >>>>>>>>> panierCaisseEnCours*******---- : ",JSON.stringify(this.getDetailsPanier));

    this.serviceHttpClient.GetAll().subscribe((res) => {
      this.subjectClient$.next(res.RESULTAT);
    });

    this.serviceHttpFournisseur.GetAll().subscribe((res) => {
      this.subjectFournisseur$.next(res.RESULTAT);
    });

    this.serviceHttpBanque.GetAll().subscribe((res) => {
      this.subjectBanque$.next(res.RESULTAT);
      // this.subjectBanque$.next(this.getDataBanque(res.RESULTAT));
    });
    this.serviceHttpTypeChequeTicket.GetAll().subscribe((res) => {
      this.subjectTicket$.next(this.getDataTicket(res.RESULTAT));
    });

    this.dataClient$.pipe(filter<Client[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.clients = listItems;

    });

    this.dataFournisseur$.pipe(filter<Fournisseur[]>(Boolean)).subscribe((listItems) => {
      //this.listItems = listItems;
      this.fournisseurs = listItems;

    });

    this.dataBanque$.pipe(filter<Banque[]>(Boolean)).subscribe((listItems:any) => {
      //this.listItems = listItems;
      this.banques = listItems;
    });
    this.dataTicket$.pipe(filter<typeChequeTicket[]>(Boolean)).subscribe((listItems:any) => {
      //this.listItems = listItems;
      this.tickets = listItems;
    });

    this.calculateResteAPayer()

  }

  displayedColumns_CH_TR: string[] = ['num_pay', 'montant_pay', 'banque_pay', 'date_echeance_pay', 'titulaire_pay', 'qte_pay', 'total_pay', 'deel'];
  displayedColumns_TK: string[] = ['num_pay', 'montant_pay', 'type_ticket_pay', 'qte_pay', 'total_pay', 'deel'];
  dataSourceOp = new MatTableDataSource<set_ModePayement>();

  addTableChequeTraite() {

    this.montantRecuEspece = Number(this.montantRecuEspece) + Number(this.montantCh_TR * this.quantiteCh_TR)

    const obj = {
      date_reglement: this.selectDate,
      _id: '',
      num_pay: this.chTrValidations.controls['referenceCh_TR'].value, //this.referenceCh_TR,
      type_ticket_pay: "",
      ecartEspeceNegatif: 0,
      montant_pay: this.chTrValidations.controls['montantCh_TR'].value, //this.montantCh_TR,
      montant_Billet: this.chTrValidations.controls['montantCh_TR'].value, //this.montantCh_TR,
      qte_pay: this.chTrValidations.controls['quantiteCh_TR'].value, //this.quantiteCh_TR,
      total_pay: this.chTrValidations.controls['montantCh_TR'].value, //Number(this.montantCh_TR),
      type_pay: "ESPECE",
      banque_pay: this.chTrValidations.controls['banqueCh_TR_Obj'].value, //this.banqueCh_TR,
      titulaire_pay: this.chTrValidations.controls['titulaire_Ch_TR'].value, //this.titulaire_Ch_TR,
      date_echeance_pay: this.chTrValidations.controls['date_echeance_Ch_TR'].value, //this.date_form.format(this.date_echeance_Ch_TR,"DD/MM/YYYY")
      //date_echeance_pay:  this.date_form.format(this.chTrValidations.controls['date_echeance_Ch_TR'].value,"DD/MM/YYYY")
      note:this.selectNote,
      montantT:this.selectMontantT

    }

    let lig_trouvee = false
    this.dataSourceOp.data.forEach((item: any, index: any) => {
      if (item.num_pay == this.chTrValidations.controls['referenceCh_TR'].value) { lig_trouvee = true }
    });

    if (lig_trouvee == false) {
      this.updateEntetPaiement('add', Number(this.chTrValidations.controls['montantCh_TR'].value));
      this.dataSourceOp.data.unshift(obj)
      this.dataSourceOp._updateChangeSubscription();
    } else {
      Swal.fire({
        //toast: true,
        //position: 'top',
        showConfirmButton: false,
        icon: 'warning',
        //timerProgressBar,
        timer: 5000,
        title: 'N° pièce ' + this.chTrValidations.controls['referenceCh_TR'].value + ' existe déjà'
      })
    }

  }
  
  deleteRowChequeTraite_reg(x:any){

    var delBtn = confirm(" Voulez vous supprimer ce mode de paiement ?");
    if ( delBtn == true ) {
        console.log(this.set_total_payement+"*********--------***********"+this.dataSourceOp.data[x].total_pay)
        this.set_total_payement -= Number(this.dataSourceOp.data[x].total_pay)
        console.log("*********------this.set_total_payement --***********"+this.set_total_payement )
        this.dataSourceOp.data.splice(x, 1 );
        this.dataSourceOp._updateChangeSubscription();

    }

  }

  addTableEspece() {
    const obj = {
      date_reglement: this.selectDate,
      _id: '',
      num_pay: '', //this.referenceTck,
      type_ticket_pay: "ESPECE",//this.ticketType,
      ecartEspeceNegatif: 0,
      montant_pay: this.especeValidations.controls['especeNumber'].value,//this.montantTck,
      montant_Billet: this.especeValidations.controls['especeNumber'].value,//this.montantTck,
      qte_pay: 1,//this.quantiteTck,
      total_pay: this.especeValidations.controls['especeNumber'].value,
      type_pay: "ESPECE",
      banque_pay: "",
      titulaire_pay: "",
      date_echeance_pay: "",
      note:this.selectNote,
      montantT:this.selectMontantT
      
    }
    this.updateEntetPaiement('espece', this.especeValidations.controls['montantT'].value)
    this.dataSourceOp.data.unshift(obj)
    this.dataSourceOp._updateChangeSubscription();
  }
  addTableTicket() {

    this.set_total_payement += Number(Number(this.montantTck) * this.quantiteTck)
    let newHbp = this.ticketValidations.value
    // console.log("addTableTicket >>>>>>>>>>>>>>>>>>>>>>  "+this.ticketValidations.controls['referenceTck'].value);
    // console.log(JSON.stringify(newHbp));
    let totLigne = Number(this.ticketValidations.controls['montantTck'].value * this.ticketValidations.controls['quantiteTck'].value)
    const obj = {
      date_reglement: this.selectDate,
      _id: '',
      num_pay: this.ticketValidations.controls['referenceTck'].value, //this.referenceTck,
      type_ticket_pay: this.ticketValidations.controls['ticketTypeObj'].value,//this.ticketType,
      ecartEspeceNegatif: 0,
      montant_pay: this.ticketValidations.controls['montantTck'].value,//this.montantTck,
      montant_Billet: this.ticketValidations.controls['montantTck'].value,//this.montantTck,
      qte_pay: this.ticketValidations.controls['quantiteTck'].value,//this.quantiteTck,
      total_pay: totLigne,
      type_pay: this.getDetailsPanier.typePayment.value,
      banque_pay: "",
      titulaire_pay: "",
      date_echeance_pay: "",
      note:this.selectNote,
      montantT:this.selectMontantT

    }

    let lig_trouvee = false
    const selectedState = this.dataSourceOp.data.findIndex(state =>
      state.num_pay.toLowerCase() == this.ticketValidations.controls['referenceTck'].value.toLowerCase());
    if (selectedState > -1) {
      lig_trouvee = true
    }

    if (lig_trouvee == false) {

      this.updateEntetPaiement('add', totLigne);

      this.dataSourceOp.data.unshift(obj)
    } else {
      Swal.fire({
        //toast: true,
        //position: 'top',
        showConfirmButton: false,
        icon: 'warning',
        //timerProgressBar,
        timer: 5000,
        title: 'N° ticket ' + this.ticketValidations.controls['referenceTck'].value + ' existe déjà'
      })
    }

    this.dataSourceOp._updateChangeSubscription();
    this.ticketValidations.patchValue({ referenceTck: "" })
  }
  set_rest_Apayer:number = 0
  updateEntetPaiement(modeOperation: any = '', totLigne: any = 0) {

    if (modeOperation == 'add') {
      this.set_total_payement = Number(this.set_total_payement) + Number(totLigne)
      this.set_rest_Apayer -=  Number(totLigne)
    }

    if (modeOperation == 'del') {
      this.set_total_payement = Number(this.set_total_payement) - Number(totLigne)
      this.set_rest_Apayer +=  Number(totLigne)
    }

    if (modeOperation == 'espece') {
      this.set_total_payement = Number(this.set_total_payement) + Number(totLigne)
      this.set_rest_Apayer    -=  Number(totLigne)
    }

  }

  montantRecuEspece: number = 0;
  set_Payement: set_ModePayement[];

  async setPayement(dataReg:any){
    await this.reglementHTTPService.AddNew(dataReg).subscribe((res) => {
      if (res.OK === true) {
        //return '';
      } else {
       // msgErr = msgErr + res.MESSAGE+'/n'
        showAlertError(res.MESSAGE, res.RESULTAT)
        //return res.MESSAGE + '\n'+res.RESULTAT
      }

    });
  }

    close(answer: string) {
    if (answer == "1") {

      console.log("***********ccccc******", this.selectClient)
      let msgErr = ''
      this.dataSourceOp.data.forEach((item: any, index: any) => {

        let new_data:any = {
          "date":           item.date_reglement,
          "montant":        item.montant_pay,
          "montant_Billet": item.montant_Billet,
          "ecartEspeceNegatif": item.ecartEspeceNegatif,
          "utilisateur" :       {_id:this.tokenService.user?._id , nom:this.tokenService.user?.nom},
          "sessionCaisse" :     {_id:this.tokenService.sessionCaisseCourante?._id , numero:this.tokenService.sessionCaisseCourante?.numero},
          "client" :{
            "_id":            this.selectClient._id,
            "code":           this.selectClient.code,
            "raisonSociale":  this.selectClient.raisonSociale
          },
          "fournisseur":        {
            "_id":            this.selectFournisseur._id,
            "code":           this.selectFournisseur.code,
            "raisonSociale":  this.selectFournisseur.raisonSociale
          },
          "modeReglement":      this.utilService.getEnumKeyByValue('enum_modeReglement' , item.type_pay),
          "numPiece":           item.num_pay,
          "dateEcheance":       item.date_echeance_pay,
          "titulaire":          item.titulaire_pay,
          "banque":             item.banque_pay,
          //"lettrageReglement":{},
          // "lettrageReglement":
          //   {
          //     "montant_lettre":   item.montant_pay,
          //     "type":            enum_type_document.TICKET ,// item.lettrageReglement.type  , //"bonlivraisons"
              // "documents":
              //   [
              //     { "_id"     :   data.id_Ticket ,
              //       "numero"  :   data.numero ,
              //       "date"   :   data.date ,
              //       "type"  :   enum_type_document.TICKET ,//item.lettrageReglement.type
              //     }
              //   ]
            // }
          //,
          "code_societe":         this.tokenService.getCodeSociete(),
          "code_exercice":        this.tokenService.getCodeExercice(),
          "code_depotpv":         this.tokenService.getCodePointeVente(),
          "tab_reg":              "reglementclients",
          "note":           item.note,
         "montantT": item.montantT,


        }


          console.log(new_data)
          console.log("*************validerReglement avance ***************")
          this.setPayement(new_data)

      });

      if(msgErr==''){
        Swal.fire({
          title: "Règlement  validé",
          text: "",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then((result) => {
          setTimeout(() => {
            this.dialogRef.close(-1);
          }, 1000);
        });

      }

    }else{
      this.dialogRef.close(-1);
    }

  }

  onEnterTicketScan(evt: any) {
    let get_clt = evt.target.value;
    evt.target.value = ''; // vider le champs

    if (get_clt) {
      //this.tickets
      let prefixTck = get_clt.substring(0, 3);
      let mntTck = get_clt.substring(3, 9).toString();
      let formattedNumber1 = (mntTck.toString() / 1000).toFixed(3);
      let dateTck = get_clt.substring(9, 11);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      let curDate = currentYear.toString().substring(2, 4)

      if (dateTck === curDate) {
        let selectedState = this.tickets.find(state => state.code.toLowerCase() == prefixTck.toLowerCase());
        if (selectedState != undefined) {
          let montant_deduction = ((Number(selectedState.taux_deduction) * Number(formattedNumber1)) / 100)
          let valueTKT = Number(formattedNumber1) - Number(montant_deduction)
          this.ticketValidations.patchValue({ montantTck: roundmMontantNumber(valueTKT) })

          this.ticketValidations.patchValue({ referenceTck: get_clt })
          this.ticketValidations.patchValue({ ticketType: selectedState.libelle })

          selectedState.montant_ticket = Number(formattedNumber1)
          selectedState.montant_deduction = Number(montant_deduction)
          selectedState.valeur_ticket = roundmMontantNumber(valueTKT)


          this.ticketValidations.patchValue({ ticketTypeObj: selectedState })
          //this.referenceTck = get_clt
          this.addTableTicket();
        } else {
          Swal.fire({
            //toast: true,
            //position: 'top',
            showConfirmButton: false,
            icon: 'warning',
            //timerProgressBar,
            timer: 5000,
            title: 'Inavlid Ticket N° ' + get_clt
          })
        }
      } else {
        Swal.fire({
          //toast: true,
          //position: 'top',
          showConfirmButton: false,
          icon: 'warning',
          //timerProgressBar,
          timer: 5000,
          title: 'Date Ticket N° ' + get_clt + '<br>' + 'expirée !'
        })
      }

    }
  }

  typePayment: any

  changeModeReglement(event:any) {
    // this.getDetailsPanier.typePayment.value = event.source.value
      console.log(event);
      this.typePayment = event.value
  }

  set_foc_client(){
    this.filteredClient$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((client) => (client ? this.filterClients(client).slice(0, 500)  : this.clients.slice(0, 500) ))
    );
  }

  set_foc_fournisseur(){
    this.filteredFournisseur$ = this.fournisseurCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map((fournisseur) => (fournisseur ? this.filterFournisseurs(fournisseur).slice(0, 500)  : this.fournisseurs.slice(0, 500) ))
    );
  }

  calculateMontantRegle() {
    const especeNumber = parseFloat(this.especeValidations.get('especeNumber')?.value) || 0;
    const taux = parseFloat(this.especeValidations.get('taux')?.value) || 0;
    return especeNumber-((especeNumber * taux)/100);
  }

  rest:number=0
  calculateResteAPayer(){
    const montantT =this.selectMontantT;
    const montantRegle = this.calculateMontantRegle();
    this.set_rest_Apayer = montantT - montantRegle;
    this.rest = montantT - montantRegle
    return this.rest;
  }
  

}
