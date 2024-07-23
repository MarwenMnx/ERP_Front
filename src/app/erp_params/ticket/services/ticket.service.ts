import {Inject, Injectable} from '@angular/core';
import { showAlertError } from 'src/app/global-functions';
import {AsyncPipe, NgFor, NgIf , CommonModule ,DOCUMENT  } from "@angular/common";
import {UtilService} from "../../../utils/UtilService.service";
import { SharedModule } from 'src/app/utils/shared.module';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Margins, StyleDictionary, TDocumentDefinitions, PageSize, Alignment, PageOrientation} from 'pdfmake/interfaces';
import {TokenService} from "../../../services/token.service";


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(@Inject(DOCUMENT) document: Document, public utilService:UtilService , private tokenService:TokenService) {
    /////RAPPORT TICKET PDF////////
    (<any>pdfMake).fonts = {
      Amiri: {
        normal: document.baseURI+'assets/Amiri-Regular.ttf',
        bold:   document.baseURI+'assets/Amiri-Regular.ttf',
      },
      Arial: {
        normal: document.baseURI+'assets/ARIAL.ttf',
        bold:   document.baseURI+'assets/ARIAL.ttf',
      },
      Roboto: {
        normal:       'Roboto-Regular.ttf', // Replace with the actual path to your font file or URL
        bold:         'Roboto-Regular.ttf', // Replace with the actual path to your bold font file or URL
        italics:      'Roboto-Regular.ttf', // Replace with the actual path to your italic font file or URL
        bolditalics:  'Roboto-Regular.ttf', // Replace with the actual path to your bold italic font file or URL
      },
    };
  }

  isAccordionClientOpen:boolean = false



/////RAPPORT TICKET PDF////////
  generatePdf(panier_details:any='' ,action = 'open') {
    //console.log(pdfMake);
    const documentDefinition =  this.getDocumentDefinition(panier_details);

    switch (action) {
      case 'open':      pdfMake.createPdf(documentDefinition).open(); break;
      case 'print':     pdfMake.createPdf(documentDefinition).print(); break;
      case 'download':  pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition(panier_details:any='') {
    // sessionStorage.setItem('resume', JSON.stringify(this.set_paiement));
     ////this.set_OnePanier[this.idPanier] /// panier_details
    //console.log("*************panier_details***************",panier_details)
    let PvDpot_Loc = 'ESPACE xxxxx'
    if(this.tokenService.pointVenteCourante!=null || this.tokenService.pointVenteCourante!=undefined){
      PvDpot_Loc =  this.tokenService.pointVenteCourante.libelle
    }

    return {
      //pageSize: 'A7' as PageSize,
           pageSize: {
             width: 209.76 , //395.28,
             height: 'auto' as 'auto' , //300
           },

      pageMargins: [ 5, 5, 5, 20 ] as Margins ,
      pageOrientation: 'portrait' as PageOrientation,
      //header: 'simple text',
      alignment: 'center' as Alignment,
      content:
        [
          (this.tokenService.pointVenteCourante && this.getFontArabicOrFrancais(this.tokenService.pointVenteCourante.libelle))?
            [ {
              text:    this.tokenService.pointVenteCourante.libelle.split(" ").reverse().join(" ") , //PvDpot_Loc.toString(),
              //bold: true,
              fontSize: 12,
              alignment: 'center' as Alignment ,
              font: 'Amiri', // Use the defined font
              rtl: true, // Set RTL direction
            }

            ]:[
              {
                text: this.tokenService.pointVenteCourante.libelle ,
                fontSize: 12,
                alignment: 'center' as Alignment ,
                fontFamily: 'Arial' , //'Amiri', // Use the defined font
                rtl: true, // Set RTL direction
              }
            ] ,
        {
          alignment: 'center' as Alignment,
          text: "-------------------------------------------",
          //style: 'name'
        },
        {
          alignment: 'center' as Alignment,
          //margin: [20, 20, 20, 20]  as Margins,
          text: 'N° '+panier_details.numero, //"TICKET N° 1",
          bold: true,
        },

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,

        /////////////******* DEBUT  : CARTE FIDELITE**********///////////
        (panier_details.client.raisonSociale) ? [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ 40 , '*' ],
            body:
              (panier_details.client.raisonSociale && this.getFontArabicOrFrancais(panier_details.client.raisonSociale))?
                [[
                  {colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse', fontFamily:'Arial'},
                  {colSpan: 0,
                    text: panier_details.client.raisonSociale.split(" ").reverse().join(" "),
                    fontSize: 8,alignment: 'right' as Alignment,style:  'boldFalse', font : 'Amiri'
                  },
                ] ]:
                [[
                  {colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse', fontFamily:'Arial'},
                  {colSpan: 0,
                    text: panier_details.client.raisonSociale,
                    fontSize: 8,alignment: 'right' as Alignment,style:  'boldFalse', fontFamily:'Arial'
                  },
                ] ],
            /*  .concat(
                [[{colSpan: 0,text: "SOLDE INITIAL CASHBACK",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: panier_details.client.code,fontSize: 5,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              ).concat(
                [[{colSpan: 0,text: "NOUVEAU SOLDE CASHBACK",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: panier_details.client.code,fontSize: 5,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )

             */
          },
          layout: 'noBorders',
        }
        ] : [{
          alignment: 'center' as Alignment ,
          table: {
            widths: [ 30, '*'],
            body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '' ]]
              .concat(
                [[{colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse'},
                  //{colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "PASSAGER".toString(),fontSize: 9,alignment: 'right' as Alignment,style: 'boldFalse'}
                  //{colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'}
                ]]
              )
          },
          layout: 'noBorders',
        }],
        /////////////******* FIN  : CARTE FIDELITE**********///////////

        /////////////******* DEBUT  : CAISSIER**********///////////
        [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*', 0, '*', 0 ],
            body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
              .concat(
                [[{colSpan: 0,text: "CAISSIER : ".concat(panier_details.sessionCaisse.utilisateur_caissier.nom),fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "Date : ".concat(this.utilService.formatDateTime(panier_details.date).toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
          },
          layout: 'noBorders',
        }
        ] ,
        /////////////******* FIN  : CAISSIER**********///////////

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,
        /////////////En tête du tableau****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            widths: [ 30,'*', 35, 40 ],
            body: [[ {colSpan: 0,text: 'QTE',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'DESIGNATION',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'P.U',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
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

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,
        /////////////Lignes des articles****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            //dontBreakRows: false,
            widths: [ 30,'*', 35, 40 ],

            body: panier_details.lignes.map((el:any, i:any) => [
                {colSpan: 0,text:
                    el.article.unite1._id==el.unite._id ? el.quantiteUnite1.toString() : el.quantiteUnite2.toString()
                  ,fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              (this.getFontArabicOrFrancais(el.article.reference.concat(' ',el.article.designation)))?
                [ {colSpan: 0,
                  text: el.article.designation.split(" ").reverse().join(" "),
                  fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' , font : 'Amiri'
                }, ]:
                [ {colSpan: 0,
                  text:  el.article.designation ,
                  fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' , fontFamily:'Arial'
                },],

                //{colSpan: 0,text: el.reference.concat(' ',el.designation).split(' ').reverse().join(' '),fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' },
                //{colSpan: 0,text: 'X',fontSize: 7,alignment: 'center' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text:
                    el.article.unite1._id==el.unite._id ? this.utilService.formatMontant(el.pu_ttc1).toString() : this.utilService.formatMontant(el.pu_ttc2).toString()
                  ,fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text:
                    el.article.unite1._id==el.unite._id ? this.utilService.formatMontant(Number(el.quantiteUnite1)*Number(el.pu_ttc1)).toString() :this.utilService.formatMontant(Number(el.quantiteUnite2)*Number(el.pu_ttc2)).toString()
                   ,fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'}
              ])

              /*
              .concat(
                [[{colSpan: 0,text: "",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "9".toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: "Article(s)",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'} ]]
              )
              */

              .concat(
                [[{colSpan: 4,text: "---------------------------------------------------------------",fontSize: 8,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'} ]]
              )

              .concat(
                [[{colSpan: 2,text: panier_details.timbreTicket> 0 ? "Timbre" : ''
                    ,fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ':',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: panier_details.timbreTicket> 0 ?
                        this.utilService.formatMontant(panier_details.timbreTicket).toString() : ''
                    ,fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'}]]
              )
              .concat(
                [[{colSpan: 2,text: "TOTAL",fontSize: 10,alignment: 'left' as Alignment,style: 'boldTrue'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: this.utilService.formatMontant(panier_details.totalAchat).toString(),fontSize: 10,alignment: 'right' as Alignment,style: 'boldTrue'},
                  {colSpan: 0,text: '',fontSize: 0,alignment: 'center' as Alignment,style: 'boldFalse'},
                ]]
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

        /////////////*******DEBUT : BON D'ACHAT**********///////////
        (this.isAccordionClientOpen) ? [
          {
            alignment: 'center' as Alignment ,
            table: {
              widths: [ '*', 25, 0, 35 ],
              body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
                .concat(
                  [[{colSpan: 1,text: "BON D'ACHAT          4 X",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "7000".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "28000".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
                ).concat(
                  [[{colSpan: 2,text: "FRAIS SUR BON D'ACHAT",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "-2800".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
                ).concat(
                  [[{colSpan: 2,text: "RESTE A PAYER",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                    {colSpan: 0,text: "4380".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
                )
            },
            layout: 'noBorders',
          }       /////////////*******FIN : BON D'ACHAT**********///////////
        ] : [],

        /////////////*******DEBUT : ChEQUE & TRAITE**********///////////
        {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*', 20, 0, 50 ],
            body: [[ {colSpan: 0,text: '',fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
              .concat(panier_details.listPayements.map((el:any, i:any) => [
                {colSpan: 0,text: (el.type_pay!='ESPECE') ? el.type_pay : el.type_pay
                  ,fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
               // {colSpan: 0,text: (el.type_pay!='ESPECE') ? el.type_pay+" - " + el.banque_pay+" - "+ el.date_echeance_pay : el.type_pay
                //  ,fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                {colSpan: 2,text: el.num_pay.toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text: '',fontSize: 5,alignment: 'right' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text: this.utilService.formatMontant(el.montant_Billet).toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'}
              ]))
          },
          layout: 'noBorders',
        },       /////////////*******FIN : ChEQUE & TRAITE***********///////////

        /////////////******* ESPECE /RENDU**********///////////

        {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*', 5, 0, 50 ],
            body: [[ {text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
              .concat(
                [[{text: "RESTE",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {text: this.utilService.formatMontant(panier_details.totalReste).toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              ).concat(
                [[{text: "RENDU",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                  {text: this.utilService.formatMontant(panier_details.totalRendu).toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
            /*       .concat(
                    [[{text: "PAYEMENT",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                      {text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                      {text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
                      {text: "BON + ESP".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
                  )
            */
          },
          layout: 'noBorders',
        },

/*
        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        },
*/
      ],
      styles: {
        boldTrue: {
          bold: true
        },
        boldFalse: {
          bold: false,
          fontFamily: 'Arial' , //'Amiri', // Use the defined font
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

  generatePdfTalent(panier_details:any='' ,action = 'open') {
    console.log("*********panier_details***********");
    console.log(panier_details);
    const documentDefinition =  this.getDocumentDefinitionTalent(panier_details);

    switch (action) {
      case 'open':      pdfMake.createPdf(documentDefinition).open(); break;
      case 'print':     pdfMake.createPdf(documentDefinition).print(); break;
      case 'download':  pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinitionTalent(panier_details:any='') {
    // sessionStorage.setItem('resume', JSON.stringify(this.set_paiement));
    ////this.set_OnePanier[this.idPanier] /// panier_details
    //console.log("*************panier_details Talent***************",panier_details)
    let PvDpot_Loc = 'ESPACE xxxxx'
    if(this.tokenService.pointVenteCourante!=null || this.tokenService.pointVenteCourante!=undefined){
      PvDpot_Loc = "" + this.tokenService.pointVenteCourante.libelle
      // PvDpot_Loc = " مرحبابك في " + this.tokenService.pointVenteCourante.libelle
    }

    return {
      //pageSize: 'A7' as PageSize,
      pageSize: {
        width: 209.76 , //395.28,
        height: 'auto' as 'auto' , //300
      },
      pageMargins: [ 5, 5, 5, 20 ] as Margins ,
      pageOrientation: 'portrait' as PageOrientation,
      //header: 'simple text',
      alignment: 'center' as Alignment,
      content:
        [
          (this.tokenService.pointVenteCourante && this.getFontArabicOrFrancais(this.tokenService.pointVenteCourante.libelle))?
            [ {
              text:    this.tokenService.pointVenteCourante.libelle.split(" ").reverse().join(" ") , //PvDpot_Loc.toString(),
              //bold: true,
              fontSize: 12,
              alignment: 'center' as Alignment ,
              font: 'Amiri', // Use the defined font
              rtl: true, // Set RTL direction
            }

            ]:[
              {
                text: this.tokenService.pointVenteCourante.libelle ,
                fontSize: 12,
                alignment: 'center' as Alignment ,
                fontFamily: 'Arial' , //'Amiri', // Use the defined font
                rtl: true, // Set RTL direction
              }
            ] ,
        // [
        //   {
        //     alignment: 'center' as Alignment,
        //     margin: [5, 5, 5, 5]  as Margins,
        //     text: 'TALENT #'+panier_details.numero+'#', //"TICKET N° 1",
        //     color: 'white',
        //     background: 'black',
        //     bold: true,
        //     "width": '5rem',
        //     "height": '2rem'
        //   },
        // ],
        [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*'],
            body: [[ {colSpan: 0,text: 'N° '+panier_details.numero,fontSize: 16,alignment: 'center' as Alignment,style: 'titleTB'}]]

          },
          layout: {
            defaultBorder:false,
            fillColor: function (rowIndex:any, node:any, columnIndex:any) {
              return (rowIndex % 2 === 0) ? 'black' : null;
            }
          }
        }
        ] ,

        /////////////******* DEBUT  : CARTE FIDELITE**********///////////
        (panier_details.client.raisonSociale) ? [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ 40 , '*' ],
            body:
                (panier_details.client.raisonSociale && this.getFontArabicOrFrancais(panier_details.client.raisonSociale))?
                  [[
                    {colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse', fontFamily:'Arial'},
                    {colSpan: 0,
                      text: panier_details.client.raisonSociale.split(" ").reverse().join(" "),
                      fontSize: 8,alignment: 'right' as Alignment,style:  'boldFalse', font : 'Amiri'
                    },
                  ] ]:
                  [[
                    {colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse', fontFamily:'Arial'},
                    {colSpan: 0,
                      text: panier_details.client.raisonSociale,
                      fontSize: 8,alignment: 'right' as Alignment,style:  'boldFalse', fontFamily:'Arial'
                    },
                  ] ],

            /*  .concat(
                [[{colSpan: 0,text: "SOLDE INITIAL CASHBACK",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: panier_details.client.code,fontSize: 5,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              ).concat(
                [[{colSpan: 0,text: "NOUVEAU SOLDE CASHBACK",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 2,text: panier_details.client.code,fontSize: 5,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )

             */
          },
          layout: 'noBorders',
        }
        ] : [{
          alignment: 'center' as Alignment ,
          table: {
            widths: [ 30 , '*' ],
            body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '' ]]
              .concat(
                [[{colSpan: 0,text: "CLIENT",fontSize: 9,alignment: 'left' as Alignment,style: 'boldFalse'},
                  //{colSpan: 0,text: ":".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "PASSAGER".toString(),fontSize: 9,alignment: 'right' as Alignment,style: 'boldFalse'},
                  //{colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'}
                ]]
              )
          },
          layout: 'noBorders',
        }],
        /////////////******* FIN  : CARTE FIDELITE**********///////////

        /////////////******* DEBUT  : CAISSIER**********///////////
        [  {
          alignment: 'center' as Alignment ,
          table: {
            widths: [ '*', 0, '*', 0 ],
            body: [[ {colSpan: 0,text: '',fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}, '','' , '' ]]
              .concat(
                [[{colSpan: 0,text: "CAISSIER : ".concat(panier_details.sessionCaisse.utilisateur_caissier.nom),fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "".toString() , fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "Date : ".concat(this.utilService.formatDateTime(panier_details.date).toString()),fontSize: 8 ,alignment: 'right' as Alignment,style: 'boldFalse'},
                  {colSpan: 0,text: "",fontSize: 1,alignment: 'right' as Alignment,style: 'boldFalse'} ]]
              )
          },
          layout: 'noBorders',
        }
        ] ,

        // {
        //   alignment: 'center' as Alignment,
        //   text: "--------------------------------------------------------",
        //   //style: 'name'
        // } ,

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,

        /////////////En tête du tableau****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            widths: [ 30,35,'*' ], //widths: [ 15,'*', 35, 40 ],
            body: [[ {colSpan: 0,text: 'QTE',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'UNITE'.toString(),fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              {colSpan: 0,text: 'ARTICLE',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
              //{colSpan: 0,text: 'P.U',fontSize: 7,alignment: 'center' as Alignment,style: 'boldTrue'},
             // {colSpan: 0,text: 'TOTAL TTC',fontSize: 7,alignment: 'left' as Alignment,style: 'boldTrue'}
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

        {
          alignment: 'center' as Alignment,
          text: "--------------------------------------------------------",
          //style: 'name'
        } ,
        /////////////Lignes des articles****////////////////
        {
          alignment: 'center' as Alignment ,
          table: {
            //headerRows: 1,
            //dontBreakRows: false,
            widths: [ 30,35,'*' ],

            body: panier_details.lignes.map((el:any, i:any) => [
              {colSpan: 0,text:
                  el.article.unite1._id==el.unite._id ? el.quantiteUnite1.toString() : el.quantiteUnite2.toString()
                ,fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'},
              {colSpan: 0,text : ' '+el.unite.libelle.toString() +' | '  ,fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
              //{colSpan: 0,text: !this.utilService.textIsArabic(el.article.reference.concat(' ',el.article.designation)) ? el.article.reference.concat(' ',el.article.designation) : el.article.reference.concat(' ',el.article.designation).split(" ").reverse().join(" "),fontSize: 7,alignment: 'left' as Alignment,style:  'boldFalse' },
              (this.getFontArabicOrFrancais(el.article.reference.concat(' ',el.article.designation)))?
                [ {colSpan: 0,
                  text: el.article.designation.split(" ").reverse().join(" "),
                  fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' , font : 'Amiri'
                }, ]:
                [ {colSpan: 0,
                  text: el.article.designation ,
                  fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' , fontFamily:'Arial'
                },],
              //{colSpan: 0,text: el.reference.concat(' ',el.designation).split(' ').reverse().join(' '),fontSize: 8,alignment: 'left' as Alignment,style:  'boldFalse' },
              //{colSpan: 0,text: 'X',fontSize: 7,alignment: 'center' as Alignment,style: 'boldFalse'},
              // {colSpan: 0,text:
              //     el.article.unite1.code==el.unite.code ? this.utilService.formatMontant(el.pu_ttc1).toString() : this.utilService.formatMontant(el.pu_ttc2).toString()
              //   ,fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'},
              // {colSpan: 0,text:
              //     el.article.unite1.code==el.unite.code ? this.utilService.formatMontant(Number(el.quantiteUnite1)*Number(el.pu_ttc1)).toString() :this.utilService.formatMontant(Number(el.quantiteUnite2)*Number(el.pu_ttc2)).toString()
              //   ,fontSize: 7,alignment: 'right' as Alignment,style: 'boldFalse'}
            ])

            /*
            .concat(
              [[{colSpan: 0,text: "",fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text: "9".toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldFalse'},
                {colSpan: 2,text: "Article(s)",fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'},
                {colSpan: 0,text: "".toString(),fontSize: 8,alignment: 'left' as Alignment,style: 'boldFalse'} ]]
            )
            */
              // .concat(
              //   [[{colSpan: 3,text: "---------------------------------------------------------------",fontSize: 8,alignment: 'center' as Alignment,style: 'boldFalse'},
              //     {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
              //    {colSpan: 0,text: '',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'}
              //     // {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'left' as Alignment,style: 'boldFalse'}
              //   ]]
              // )
              //
              //
              // .concat(
              //   [[{colSpan: 2,text: "TOTAL ACHAT",fontSize: 8,alignment: 'left' as Alignment,style: 'boldTrue'},
              //     {colSpan: 0,text: "".toString(),fontSize: 6,alignment: 'right' as Alignment,style: 'boldFalse'},
              //     {colSpan: 0,text: ':',fontSize: 5,alignment: 'center' as Alignment,style: 'boldFalse'},
              //     {colSpan: 0,text: this.utilService.formatMontant(panier_details.totalAchat).toString(),fontSize: 8,alignment: 'right' as Alignment,style: 'boldTrue'}
              //   ]]
              // )
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

        /////////////*******DEBUT : BON D'ACHAT**********///////////

        /////////////*******DEBUT : ChEQUE & TRAITE**********///////////

        /////////////*******FIN : ChEQUE & TRAITE***********///////////

        /////////////******* ESPECE /RENDU**********///////////

        /*
                {
                  alignment: 'center' as Alignment,
                  text: "--------------------------------------------------------",
                  //style: 'name'
                } ,

                {
                  alignment: 'center' as Alignment,
                  text: "--------------------------------------------------------",
                  //style: 'name'
                },
        */
      ],
      styles: {
        boldTrue: {
          bold: true
        },
        boldFalse: {
          bold: false,
          fontFamily: 'Arial' , //font: 'Amiri', // Use the defined font
          //rtl: true, // Set RTL direction
        },
        titleTB: {
          bold: true,
          fontFamily:  'Arial' , //font: 'Amiri',
          color: 'white',
          // background: 'black',
          // "width": '100%',
          // "height": '100%'
          // Use the defined font
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

  getFontArabicOrFrancais(text: string) {
    return !this.utilService.textIsArabic(text) ? false : true
  }

  getTextArabicOrFrancais(text: string) {
    return !this.utilService.textIsArabic(text) ? text : text.split(" ").reverse().join(" ")
  }

}
