import {Inject, Injectable} from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ReponseList } from '../models/sessions-caisses.model';
import { showAlertError, succesAlerteAvecTimer } from 'src/app/global-functions';
import {AsyncPipe, NgFor, NgIf , CommonModule ,DOCUMENT  } from "@angular/common";
import {UtilService} from "../../../utils/UtilService.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Margins, StyleDictionary, TDocumentDefinitions, PageSize, Alignment, PageOrientation} from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})


export class SessionsCaissesService {


  constructor(@Inject(DOCUMENT) document: Document, public utilService:UtilService , private tokenService:TokenService) {
    /////RApport Clôture PDF////////
    (<any>pdfMake).fonts = {
      Amiri: {
        normal: document.baseURI+'assets/Amiri-Regular.ttf',
        bold:   document.baseURI+'assets/Amiri-Regular.ttf',
      },
      Roboto: {
        normal:       'Roboto-Regular.ttf', // Replace with the actual path to your font file or URL
        bold:         'Roboto-Regular.ttf', // Replace with the actual path to your bold font file or URL
        italics:      'Roboto-Regular.ttf', // Replace with the actual path to your italic font file or URL
        bolditalics:  'Roboto-Regular.ttf', // Replace with the actual path to your bold italic font file or URL
      },
    };
  }

  successCreate(res:ReponseList, dialogRef:any){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.MESSAGE+": "+res.RESULTAT);
    }
  }

  successUpdate(res:ReponseList, dialogRef:any){
    if(res.OK){
      succesAlerteAvecTimer('Votre formulaire a été soumis avec succès.')
      dialogRef.close(res.RESULTAT);
    }else{
      showAlertError('Erreur!', res.MESSAGE+": "+res.RESULTAT);
    }
  }


  /////RAPPORT TICKET PDF////////
  generatePdf(panier_details:any='' ,action = 'open') {
    console.log(pdfMake);
    const documentDefinition =  this.getDocumentDefinition(panier_details);

    switch (action) {
      case 'open':      pdfMake.createPdf(documentDefinition).open(); break;
      case 'print':     pdfMake.createPdf(documentDefinition).print(); break;
      case 'download':  pdfMake.createPdf(documentDefinition).download(); break;

      default:          pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition(panier_details:any='') {
    // sessionStorage.setItem('resume', JSON.stringify(this.set_paiement));
    ////this.set_OnePanier[this.idPanier] /// panier_details
    //console.log("****************************",panier_details)
    let PvDpot_Loc = 'Clôture journée'
    if(this.tokenService.pointVenteCourante!=null || this.tokenService.pointVenteCourante!=undefined){
      PvDpot_Loc += " " + this.tokenService.pointVenteCourante.libelle
    }

    return {
      //pageSize: 'A7' as PageSize,
      pageSize: {
        width: 209.76 , //395.28,
        height: 'auto' as 'auto' , //300
      },
      pageMargins: [ 10, 10, 10, 10 ] as Margins ,
      pageOrientation: 'portrait' as PageOrientation,
      //header: 'simple text',
      alignment: 'center' as Alignment,
      content: [
        {
          text:  PvDpot_Loc , //PvDpot_Loc.toString(),
          //bold: true,
          fontSize: 12,
          alignment: 'center' as Alignment ,
          font: 'Amiri', // Use the defined font
          rtl: true, // Set RTL direction

          //margin: [0, 0, 0, 0]  as Margins
        },

        {
          alignment: 'center' as Alignment,
          text: "-------------------------------------------",
          //style: 'name'
        },
        {
          alignment: 'center' as Alignment,
          //margin: [20, 20, 20, 20]  as Margins,
          text: 'Clôture par : '+panier_details.utilisateur_cloture.nom ,
          bold: true,
        },

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,

        /////////////******* DEBUT  : CAISSIER**********///////////
        [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*', 0, '*', 0 ],
            body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
              .concat(
                [[{colSpan: 0,text: "Journée N° ",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".concat(panier_details.numero.toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Machine",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".concat(panier_details.nom_machine_caisse.toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "D.H ouverture",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".concat(this.utilService.formatDateTime(panier_details.date_ouverture).toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "D.H clôture",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".concat(this.utilService.formatDateTime(panier_details.date_cloture).toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Fond Caisse Superviseur",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: this.utilService.formatMontant(panier_details.fond_caisse_superviseur).toString() ,fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Fond Caisse Caissier",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: this.utilService.formatMontant(panier_details.fond_caisse_caissier).toString() ,fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Montant en espece",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: this.utilService.formatMontant(panier_details.montant_en_espece).toString() ,fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Total TTC articles",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: this.utilService.formatMontant(panier_details.totale_TTC_article).toString() ,fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
              .concat(
                [[{colSpan: 0,text: "Total vente espèce",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: this.utilService.formatMontant(panier_details.totale_vente_espece).toString() ,fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
          },
          layout: 'noBorders',
        }
        ] ,

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,

        /////////////En tête du tableau reglement****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            widths: ["*",0, 0, "*" ],
            body: [[ {colSpan: 0,text: 'Mode règlement',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'TOTAL solde',fontSize: 7,alignment: 'right' as Alignment,style: 'boldTrue'}
            ]]

          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          }

        },

        /////////////Lignes des reglements****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            //dontBreakRows: false,
            widths: [ "*",0, 0, "*" ],

            body: panier_details.detail_reglement.map((el:any, i:any) => [
              {colSpan: 0,text: this.utilService?.getEnumKeyByValue("enum_modeReglement",el._id)+"("+el.nbr+")",fontSize: 7,alignment: 'left' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: "",fontSize: 7,alignment: 'left' as Alignment,style:  'boldFalse' },
              {colSpan: 0,text: "",fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: this.utilService.formatMontant(Number(el.totalSolde)).toString(),fontSize: 9,alignment: 'right' as Alignment,style: 'boldFalse'}
            ])

          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          },

          /*
                            layout: {
                              fillColor: function (rowIndex:any, node:any, columnIndex:any) {
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                              }
                            }
          */

        },

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,
        /////////////En tête du tableau articles****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            widths: [ 30,'*', 0, 45 ],
            body: [[ {colSpan: 0,text: 'QTE',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'ARTICLE',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'TOTAL TTC',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'}
            ]]

          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          }

        },

        /////////////Lignes des articles****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            //dontBreakRows: false,
            widths: [ 30,'*', 0, 45 ],

            body: panier_details.listearticles.map((el:any, i:any) => [
              {colSpan: 0,text: this.utilService.roundmQuantiteString(el.vendu),fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: !this.utilService.textIsArabic(el.article.reference.concat(' ',el.article.designation)) ? el.article.reference.concat(' ',el.article.designation) : el.article.reference.concat(' ',el.article.designation).split(" ").reverse().join(" "),fontSize: 7,alignment: 'left' as Alignment,style:  'boldFalse' },
              {colSpan: 0,text: "",fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: this.utilService.formatMontant(Number(el.totalTTC)).toString(),fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'}
            ])
          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          },

          /*
                            layout: {
                              fillColor: function (rowIndex:any, node:any, columnIndex:any) {
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                              }
                            }
          */

        },

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,
        /////////////En tête du tableau tickets****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            widths: [ '*',0, 0, '*' ],
            body: [[ {colSpan: 0,text: 'Montant Ticket',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'Nombre ticket',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'}
            ]]

          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          }

        },

        /////////////Lignes des tickets****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            //dontBreakRows: false,
            widths: [ 30,'*', 0, 45 ],

            body: panier_details.listtickets.map((el:any, i:any) => [
              {colSpan: 0,text: this.utilService.formatMontant(Number(el._id)),fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: '',fontSize: 7,alignment: 'left' as Alignment,style:  'boldFalse' },
              {colSpan: 0,text: "",fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text: el.nombre.toString(),fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'}
            ])
              .concat(
                [[{colSpan: 4,text: "---------------------------------------------------------------",fontSize: 8,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
          },
          layout: {
            defaultBorder:false,
            paddingLeft: function (i:any, node:any) { return 0.5; },
            paddingRight: function (i:any, node:any) { return 0.5; },
            paddingTop: function (i:any, node:any) { return 0.5; },
            paddingBottom: function (i:any, node:any) { return 0.5; },
          },

          /*
                            layout: {
                              fillColor: function (rowIndex:any, node:any, columnIndex:any) {
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                              }
                            }
          */

        },

      ],
      styles: {
        boldTrue: {
          bold: true
        },
        boldFalse: {
          bold: false,
          font: 'Amiri', // Use the defined font
          //rtl: true, // Set RTL direction
        }

      },
      info: {
        title: "BonGest" + '_RESUME',
        author: "BonGest",
        subject: 'BonGest',
        keywords: 'RESUME,BonGest',
      },

    };
  }



}
