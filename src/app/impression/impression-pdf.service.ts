import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  Inject,
  ElementRef,
} from "@angular/core";
//import { InformationsService } from "src/app/services/informations.service";
import { FormBuilder, FormGroup } from "@angular/forms";
//import { FonctionPartagesService } from "src/app/services/fonction-partages.service";
//import { UtiliteService } from "src/app/services/utilite.service";
//import { Paramliv } from "src/app/services/serviceBD_Commerce/paramliv.service";
import { Router } from "@angular/router";
//import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
//import { Bonlivraison } from "src/app/services/serviceBD_Commerce/Bonlivraison.service";
import { DOCUMENT, formatDate } from "@angular/common";

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, StyleDictionary, TDocumentDefinitions, PageSize, Alignment, PageOrientation } from 'pdfmake/interfaces';
import { environment } from '../../environments/environment';
//import { paramliv } from "src/app/model/modelCommerce/paramliv";
//import { ParampdfService } from "src/app/services/serviceBD_Commerce/parampdf.service";

import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalImpressionComponent } from "./modal-impression/modal-impression.component";
import { DocumentVenteService } from "../erp_documents_vente/services/document-vente.service";
import { DocumentVenteHttpService } from "../erp_documents_vente/services/document-vente-http.service";
import { DocumentVente, LigneDocumentVente } from "../erp_documents_vente/models/document-vente.model";
import { DocumentAchat, LigneDocumentAchat } from "../erp_documents_achat/models/document-achat.model";
import { UtilService } from "../utils/UtilService.service";
import { Client } from "../erp_params/clients/models/client.model";
import { SocieteLogin, TokenService } from "../services/token.service";
import { Societe } from "../erp_params/societe/models/societe.model";
//import { TokenStorageService } from "./authentication/token-storage.service";
import { NumberToLettreFrService } from "../utils/number-to-lettre-fr.service"
import { enum_modes_imprission, enum_type_document, enum_type_transport, page_orientation } from "../global-enums";
import { LigneDocumentVenteService } from "../erp_documents_vente/services/ligne-document-vente.service";
import { getDateByForma, hideLoading, roundmMontantNumber, roundmMontantString, showLoading } from "../global-functions";
import { Fournisseur } from "../erp_params/fournisseurs/models/fournisseur.model";
import { isDataSource } from "@angular/cdk/collections";
import { paramBonLivraison } from "../erp_documents_vente/parametres-vente";
import { ClientHttpService } from "../erp_params/clients/services/client-http.service";
import { FournisseurHttpService } from "../erp_params/fournisseurs/services/fournisseur-http.service";
import { SocieteHttpServiceService } from "../erp_params/societe/services/societe-http-service.service";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
import { ReglementHttpService } from "../erp_params/reglements/services/reglement-http.service";
import { Reglement } from "../erp_params/reglements/models/reglement.model";

@Injectable({
  providedIn: 'root'
})
export class ImpressionPdfService {

  getId: any;
  classCss = "modalAjoutElement";
  lienGetById = "/societes/getById/";
  modeTier = "Client";
  isLoading = false;

  title = "appBootstrap";
  formC?: FormGroup;
  objectKeys = Object.keys;
  closeResult?: string;
  constructor(
    //private bonlivraison: Bonlivraison,
    private router: Router,
    //private utilite: UtiliteService,
    //private fonctionPartagesService: FonctionPartagesService,
    private fb: FormBuilder,
    //private paramlivraison: Paramliv,
    // private ParamHeader: ParampdfService,
    //public informationGenerale: InformationsService,
    //private modalService: NgbModal,
    private http: HttpClient,
    private dialog: MatDialog,
    private serviceReglementHttp: ReglementHttpService,
    private utilService: UtilService,
    @Inject(DOCUMENT) private document: Document,
    //private tokenStorageService: TokenStorageService,
    private numberToLettreFrService: NumberToLettreFrService,
    private ligneDocumentVenteService: LigneDocumentVenteService,
    private tokenService: TokenService,
    private documentVenteHttpService: DocumentVenteHttpService,
    private clientHttpService: ClientHttpService,
    private fournisseurHttpService: FournisseurHttpService,
    private societeHttpServiceService: SocieteHttpServiceService
  ) {
    (<any>pdfMake).fonts = {
      Amiri: {
        normal: document.baseURI + 'assets/Amiri-Regular.ttf',
        bold: document.baseURI + 'assets/Amiri-Regular.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf', // Replace with the actual path to your font file or URL
        bold: document.baseURI + 'assets/fonts/Roboto/Roboto-Bold.ttf', // Replace with the actual path to your bold font file or URL
        italics: 'Roboto-Regular.ttf', // Replace with the actual path to your italic font file or URL
        bolditalics: 'Roboto-Regular.ttf', // Replace with the actual path to your bold italic font file or URL
      },
    };
  }

  ngOnInit(): void { }

  public async openPopup(idDocument: string, typeDoc: string, apiDoc: string, modeImpression?: number, isDocAchat?: Boolean, isDirectDownload?: Boolean) {
    if (!isDocAchat) isDocAchat = false
    if (!modeImpression) modeImpression = enum_modes_imprission.modeNormale
    if (!isDirectDownload) isDirectDownload = false

    if (isDirectDownload === true) {
      await this.imprimer(idDocument, apiDoc, 'A4', modeImpression, typeDoc, isDocAchat)
      return -1
    }

    this.dialog
      .open(ModalImpressionComponent, {
        data: {
          idDocument: idDocument,
          typeDoc: typeDoc,
          apiDoc: apiDoc,
          modeImpression: modeImpression,
          isDocAchat: isDocAchat
        },
      })
      .afterClosed()
      .subscribe((item: any) => {
        if (item) {

        }
      });
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  getTransporteurNom() {
    if (this.transporteur && this.transporteur.nom) {
      return this.transporteur.nom;
    }
    return "";
  }

  getTransporteurVehicule() {
    if (this.transporteur && this.transporteur.numVehicule) {
      return this.transporteur.numVehicule;
    }
    return "";
  }

  transporteur: any = null;

  colonnesVente = [
    {
      champ: "reference",
      libelle: "Ref",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 1,
      type: "text"
    },
    {
      champ: "designation",
      libelle: "Designation",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "39",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "quantiteUnite1",
      libelle: "Qte",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "qte"
    },
    {
      champ: "unite1",
      libelle: "Unité",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "prixVenteUnitaireHT",
      libelle: "Prix.U-HT",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "prixVenteUnitaireTTC",
      libelle: "prix.U-TTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "totalTTC",
      libelle: "totalTTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "tauxTVA",
      libelle: "tauxTVA %",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 15,
      type: "taux"
    },
    {
      champ: "reference",
      libelle: "Ref",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 1,
      type: "text"
    },
    {
      champ: "designation",
      libelle: "Designation",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "39",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "quantiteUnite1",
      libelle: "Qte",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "qte"
    },
    {
      champ: "unite1",
      libelle: "Unité",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "prixVenteUnitaireHT",
      libelle: "Prix.U-HT",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "prixVenteUnitaireTTC",
      libelle: "prix.U-TTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "totalTTC",
      libelle: "totalTTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "tauxTVA",
      libelle: "tauxTVA %",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 15,
      type: "taux"
    }
  ]

  colonnesAchat = [
    {
      champ: "reference",
      libelle: "Ref",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 1,
      type: "text"
    },
    {
      champ: "designation",
      libelle: "Designation",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "39",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "quantiteUnite1",
      libelle: "Qte",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "qte"
    },
    {
      champ: "unite1",
      libelle: "Unité",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "prixAchatUnitaireNetHT",
      libelle: "Prix.U-HT",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "prixAchatUnitaireTTC",
      libelle: "prix.U-TTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "totalTTC",
      libelle: "totalTTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "tauxTVA",
      libelle: "tauxTVA %",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A4",
      width: "7",
      alignment: "left",
      ordre: 15,
      type: "taux"
    },
    {
      champ: "reference",
      libelle: "Ref",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 1,
      type: "text"
    },
    {
      champ: "designation",
      libelle: "Designation",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "39",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "quantiteUnite1",
      libelle: "Qte",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "qte"
    },
    {
      champ: "unite1",
      libelle: "Unité",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 2,
      type: "text"
    },
    {
      champ: "prixAchatUnitaireNetHT",
      libelle: "Prix.U-HT",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "prixAchatUnitaireTTC",
      libelle: "prix.U-TTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "totalTTC",
      libelle: "totalTTC",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "10",
      alignment: "left",
      ordre: 2,
      type: "montant"
    },
    {
      champ: "tauxTVA",
      libelle: "tauxTVA %",
      visibilite: true,
      typeDoc: "BonLivraison",
      format: "A5",
      width: "7",
      alignment: "left",
      ordre: 15,
      type: "taux"
    }
  ]
  genererColonnes(formatPdf = "A4", isDocAchat: Boolean): any {
    let typeDoc = "BonLivraison"
    let tabGener = []

    let colonnes: any = isDocAchat === false ? this.colonnesVente : this.colonnesAchat

    for (let i4 = 0; i4 < colonnes.length; i4++) {
      if (
        colonnes[i4].visibilite &&
        colonnes[i4].typeDoc === typeDoc &&
        formatPdf === colonnes[i4].format
      ) {
        tabGener.push({
          champ: colonnes[i4].champ,
          libelle: colonnes[i4].libelle,
          width: colonnes[i4].width,
          ordre: colonnes[i4].ordre,
          alignment: colonnes[i4].alignment,
          type: colonnes[i4].type,
        });
      }
    }
    tabGener.sort((a: any, b: any) => a.ordre - b.ordre);
    return tabGener
  }

  genererTableTaux(lignesBonLivraison: any, keyTotalTaux = "totalTVA", keyTaux = "tauxTVA", keyTotalHT = "totalNetHT") {
    let tabTVA: any = [];
    for (let i = 0; i < lignesBonLivraison.length; i++) {
      var isExiste = false;

      for (let j = 0; j < tabTVA.length; j++) {
        if (lignesBonLivraison[i][keyTaux] === tabTVA[j].taux) {
          isExiste = true;
          tabTVA[j].montant += lignesBonLivraison[i][keyTotalTaux];
          tabTVA[j].totalHT += lignesBonLivraison[i][keyTotalHT];
        }
      }

      if (!isExiste && lignesBonLivraison[i][keyTaux] != 0
        && Number(lignesBonLivraison[i][keyTotalTaux]) != 0
        && lignesBonLivraison[i][keyTaux] && lignesBonLivraison[i][keyTotalTaux] && lignesBonLivraison[i][keyTotalHT]
      ) {
        tabTVA.push({
          taux: lignesBonLivraison[i][keyTaux],
          montant: lignesBonLivraison[i][keyTotalTaux],
          totalHT: lignesBonLivraison[i][keyTotalHT],
        });
      }
    }
    tabTVA.sort((a: any, b: any) => a.taux - b.taux);
    return tabTVA;
  }

  factureNormale(document: DocumentAchat | DocumentVente, tabGener: any[]): any {
    let tabLignes: any = [];
    let lignesBonLivraison: any = document.lignes
    let ligne: any = [];
    tabGener.forEach((element: any) => {
      ligne.push({
        text: element.libelle,
        fontSize: 9,
        alignment: "center",
        bold: "true",
      });
    });
    tabLignes.push(ligne);
    for (let itemLigne of lignesBonLivraison) {
      tabLignes.push(this.remplirLignePDF(tabGener, itemLigne));
    }
    return tabLignes
  }

  factureWithRegroupement(document: DocumentAchat | DocumentVente, tabGener: any[]): any {
    let tabLignes: any = [];
    let lignes: any = document.lignes
    lignes = this.ligneDocumentVenteService.regroupementLigneDocument(lignes)
    let ligne: any = [];
    tabGener.forEach((element: any) => {
      ligne.push({
        text: element.libelle,
        fontSize: 9,
        alignment: "center",
        bold: "true",
      });
    });
    tabLignes.push(ligne);
    for (let itemLigne of lignes) {
      tabLignes.push(this.remplirLignePDF(tabGener, itemLigne));
    }
    return tabLignes
  }

  factureSansRegroupement(document: DocumentAchat | DocumentVente, tabGener: any[]): any {
    let tabLignes: any = [];
    let lignes: any = document.lignes
    lignes.sort((a: LigneDocumentVente, b: LigneDocumentVente) => {
      if (a.id_document_precedent !== b.id_document_precedent) {
        return a.id_document_precedent && b.id_document_precedent ? a.id_document_precedent.localeCompare(b.id_document_precedent) : 0;
      } else {
        return a.numero - b.numero
      }
    });
    //regrouper par document
    let ligne: any = [];
    tabGener.forEach((element: any) => {
      ligne.push({
        text: element.libelle,
        fontSize: 9,
        alignment: "center",
        bold: "true",
      });
    });
    tabLignes.push(ligne);
    let idDoc = ""
    for (let itemLigne of lignes) {
      if (itemLigne.id_document_precedent !== idDoc && document.documentPrecedent) {
        idDoc = itemLigne.id_document_precedent
        let doc = (document.documentPrecedent as (DocumentVente | DocumentAchat)[])
          .find((x: DocumentVente | DocumentAchat) => x._id === idDoc);
        if (doc) {
          ligne = [];
          ligne.push({ text: doc.numero + " - " + getDateByForma(doc.date), colSpan: tabGener.length, alignment: 'center', fontSize: 9 })
          let compteur = 0
          tabGener.forEach((element: any) => {
            if (compteur !== 0) {
              ligne.push({})
            }
            compteur++
          });
          tabLignes.push(ligne);
        }
      }

      tabLignes.push(this.remplirLignePDF(tabGener, itemLigne));
    }
    return tabLignes
  }

  remplirLignePDF(tabGener: any[], itemLigne: LigneDocumentAchat | LigneDocumentVente | any) {
    let ligne: any = [];
    tabGener.forEach((element: any) => {
      let value;
      switch (element.type) {
        case "montant":
          value = this.utilService.roundmMontantString(itemLigne[element.champ]);
          break;
        case "qte":
          value = this.utilService.roundmQuantiteString(itemLigne[element.champ]);
          break;
        case "taux":
          console.log("****itemLigne[element.champ]***********"+itemLigne[element.champ])
          value = itemLigne[element.champ] ? this.utilService.roundmTauxString(itemLigne[element.champ]) : 0 ;
          break;
        default:
          switch (element.champ) {
            case "unite1":
              value = itemLigne.unite1 ? (itemLigne.unite1.code ? itemLigne.unite1.code : itemLigne.unite1.libelle) : "";
              break;
            case "reference":
              value = itemLigne.article ? itemLigne.article.reference : "";
              break;
            case "designation":
              value = itemLigne.article ? itemLigne.article.designation : "";
              break;
            default:
              value = itemLigne[element.champ];
          }
      }

      ligne.push({
        fontSize: 9,
        alignment: element.type === "montant" || element.type === "qte" || element.type === "taux" ? "right" : "" + element.alignment,
        text: !this.utilService.textIsArabic(value) ? value : value.split(" ").reverse().join(" "),
        font: !this.utilService.textIsArabic(value) ? 'Roboto' : 'Amiri',
      });
    });
    return ligne
  }

  getTextArabicOrFrancais(text: string) {
    return !this.utilService.textIsArabic(text) ? text : text.split(" ").reverse().join(" ")
  }

  getFontArabicOrFrancais(text: string) {
    return !this.utilService.textIsArabic(text) ? 'Roboto' : 'Amiri'
  }

  async imprimer(idDocument: string, apiDoc: string, formatPDF: string, modeImpression: number, typeDoc: string, isDocAchat: Boolean) {
    showLoading()
    let doc = null
    if (isDocAchat === false) {
      doc = new DocumentVente(await this.getDocument(idDocument, apiDoc))
      doc.lignes.map((x: any) => {
        if (x.quantite == x.quantiteUnite2 && x.article.coefficient) {
          //x.prixVenteUnitaireHT = x.prixVenteUnitaireNetHT * x.article.coefficient
          //x.prixVenteUnitaireTTC = roundmMontantNumber(x.prixVenteUnitaireHT * (1 + x.tauxTVA / 100))
          x.prixVenteUnitaireTTC = roundmMontantNumber(x.totalTTC / x.quantiteUnite1)
          x.prixVenteUnitaireHT = roundmMontantNumber(x.prixVenteUnitaireTTC / (1 + x.tauxTVA / 100))
        }
      })
    } else if (isDocAchat === true) {
      doc = new DocumentAchat(await this.getDocument(idDocument, apiDoc))
      doc.lignes.map((x: any) => {
        if (x.quantite == x.quantiteUnite2 && x.article.coefficient) {
          //x.prixAchatUnitaireNetHT =  x.prixAchatUnitaireNetHT * x.article.coefficient
          //x.prixAchatUnitaireTTC = roundmMontantNumber(x.prixAchatUnitaireNetHT * (1 + x.tauxTVA / 100))
          x.prixAchatUnitaireTTC = roundmMontantNumber(x.totalTTC / x.quantiteUnite1)
          x.prixAchatUnitaireNetHT = roundmMontantNumber(x.prixAchatUnitaireTTC / (1 + x.tauxTVA / 100))
        }
      })
    }

    if (!(doc instanceof DocumentAchat || doc instanceof DocumentVente)) return hideLoading()

    let client = null
    let fournisseur = null

    if (isDocAchat === false && doc instanceof DocumentVente && doc?.client._id)
      client = new Client(await this.getClient(doc?.client._id))
    else if (doc instanceof DocumentAchat && doc?.fournisseur._id)
      fournisseur = new Fournisseur(await this.getFournisseur(doc?.fournisseur._id))

    if (!client && !fournisseur) return hideLoading()

    let idSo = this.tokenService.societeCourante && this.tokenService.societeCourante._id ? this.tokenService.societeCourante._id : ""
    let user_nom = this.tokenService.user?.nom
    let societe = new Societe(await this.getSociete(idSo))
    if (!societe) return hideLoading()
    await this.generatePdf(user_nom, doc, formatPDF, client ? client : fournisseur, societe, modeImpression, typeDoc, isDocAchat)
    hideLoading()
  }

  async getDocument(idDocument: string, apiDoc: string) {
    return new Promise((resolve) => {
      this.documentVenteHttpService.GetDetails(idDocument, apiDoc).subscribe((res) => {
        if (res.OK) {
          resolve(JSON.parse(JSON.stringify(res.RESULTAT)));
        } else {
          resolve(null)
        }
      });
    });
  }

  async getClient(idClient: string) {
    return new Promise((resolve) => {
      this.clientHttpService.GetDetails(idClient).subscribe((res) => {
        if (res.OK) {
          resolve(JSON.parse(JSON.stringify(res.RESULTAT)));
        } else {
          resolve(null)
        }
      });
    });
  }

  async getFournisseur(idFournisseur: string) {
    return new Promise((resolve) => {
      this.fournisseurHttpService.GetDetails(idFournisseur).subscribe((res) => {
        if (res.OK) {
          resolve(JSON.parse(JSON.stringify(res.RESULTAT)));
        } else {
          resolve(null)
        }
      });
    });
  }

  async getSociete(idSociete: string) {
    return new Promise((resolve) => {
      this.societeHttpServiceService.GetDetails(idSociete).subscribe((res) => {
        if (res.OK) {
          resolve(JSON.parse(JSON.stringify(res.RESULTAT)));
        } else {
          resolve(null)
        }
      });
    });
  }

  async generatePdf(nomUtilisateur: string | undefined, document: DocumentVente | DocumentAchat, formatPDF: string, tier: Client | Fournisseur | null, societe: Societe, modeImpression: number, typeDoc?: string, isDocAchat?: Boolean, action = "open") {
    //var urlImage = this.document.baseURI+"assets/icons/icon-72x72.png"
    //var image = await this.getBase64ImageFromURL(urlImage)
    //var image = await this.getImageDataUrl('https://i.imgur.com/tVE0WwI.jpg')
    if (!isDocAchat) isDocAchat = false

    let documentPrecedent: any = document.documentPrecedent
    if (!tier) return
    let image = societe.imagePath
    let totalHeight = formatPDF == 'A4' ? 550 : 300
    let marginLeftTableTaxe = formatPDF == 'A4' ? 0 : 88
    if (!image || image === "") {
      alert("Veuillez insérer votre logo en paramètre !");
      return;
    }
    let tabGener = this.genererColonnes(formatPDF, isDocAchat);
    let tabLignes = []
    switch (modeImpression) {
      case enum_modes_imprission.modeSansRegroupement:
        tabLignes = this.factureSansRegroupement(document, tabGener)
        break;
      case enum_modes_imprission.modeWithRegroupement:
        tabLignes = this.factureWithRegroupement(document, tabGener)
        break;
      default:
        tabLignes = this.factureNormale(document, tabGener)
        break;
    }
    let tableTVA = this.genererTableTaux(document.lignes)
    let tableFodec = this.genererTableTaux(document.lignes, "totalFodec", "tauxFodec", "totalHT")
    let tableDC = this.genererTableTaux(document.lignes, "totalDC", "tauxDC", "totalHT")
    let compteur2 = 0
    let compteur1 = 0

    let blockChauffeurCamion: any = []
    let paramsBL_Title = paramBonLivraison.title
    if (typeDoc && typeDoc == paramsBL_Title) {
      blockChauffeurCamion = [
        [
          [
            { text: "B.C: ", bold: true, fontSize: 8 },
            { text: documentPrecedent && documentPrecedent.length > 0 ? (!documentPrecedent[0].numeroDocClient) ? documentPrecedent[0].numero : documentPrecedent[0].numeroDocClient : "", bold: false, fontSize: 8 },
          ],
          [
            { text: "Chauffeur: ", bold: true, fontSize: 8 },
            { text: document.type_transport === enum_type_transport.EXTERNE ? document.nom_chauffeur : ((document.chauffeur && document.chauffeur.nom) ? document?.chauffeur.nom : ""), bold: false, fontSize: 8 }
          ],
          [
            { text: "Camion: ", bold: true, fontSize: 8 },
            { text: document.type_transport === enum_type_transport.EXTERNE ? document.matricule_vehicule : ((document.vehicule && document.vehicule.immatricule) ? document?.vehicule.immatricule : ""), bold: false, fontSize: 8 },
          ]
        ]
      ]
    } else { blockChauffeurCamion = null }


    //await this.getPramliv();
    //await this.generatePDF3();
    //this.getDocumentVente()
    let [firstNumber, secondNumber] = [
      +document.totalTTC.toFixed(3).split(".")[0],
      document.totalTTC.toFixed(3).split(".")[1],
    ];

    const rowHeights = Array(tabLignes.length).fill(10);
    let docDefinition: any = {
      pageOrientation: formatPDF === "A4" ? 'portrait' : 'portrait' , //'landscape',
      pagesize: formatPDF,
      pageMargins: [12, 90, 12, 70],
      header: function (page: any) {
        if (page != 1)
          return {
            margin: 12,
            columns: [
              {
                text: `${(new Date()).toLocaleDateString('en-GB')}`,
                cellFilter: 'date:\'MM/dd/yyyy\'',
                alignment: 'left',
                margin: [210, 5, 0, 0],
                fontSize: 9,
                // italics: true,
              }
            ]
          }
      },
      header1: {
        margin: 10,
        columns: [
          [
            {
              headerRows: 1,
              image: image,
              alignment: 'left',
              height: 60,
              width: 100,
              margin: [0, 0, 0, 0],
            }
          ],
          [
            {
              text: `${(new Date()).toLocaleDateString('en-GB')}`,
              cellFilter: 'date:\'MM/dd/yyyy\'',
              alignment: 'left',
              margin: [210, 5, 0, 0],
              fontSize: 9,
              // italics: true,
            }
          ]
        ]
      },
      content: [
        //header
        {
          layout: "noBorders",
          margin: [0, -90, 0, 0],
          table: {
            widths: ["50%", "50%",],
            headerRows: 0,
            body: [
              [
                {},
                {
                  text: `Imprimé par ${nomUtilisateur} à ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB')}`,
                  cellFilter: 'date:\'MM/dd/yyyy HH:mm:ss\'',
                  alignment: 'right',
                  margin: [0, 5, 0, 0],
                  fontSize: 8,
                  // italics: true,
                }
              ],
            ]
          }
        },

        //societe && document && client
        {
          layout: "noBorders",
          margin: [0, 0, 0, 0],
          table: {
            widths: ["50%", "50%"],
            headerRows: 0,
            body: [
              [
                [

                  //societe
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      bold: 'false',
                      widths: ['100%'],
                      body: [
                        [
                          {
                            layout: "noBorders",
                            margin: [0, 0, 0, 0],
                            table: {
                              widths: ["30%", "70%",],
                              headerRows: 0,
                              body: [
                                [
                                  {
                                    image: image,
                                    alignment: 'left',
                                    //height: 60,
                                    //width: 100,
                                    margin: [0, 0, 0, 0],
                                  },
                                  {
                                    layout: "noBorders",
                                    margin: [0, 0, 0, 0],
                                    table: {
                                      widths: ["30%", "*"],
                                      headerRows: 0,
                                      body: [
                                        [
                                          {
                                            text: "Sté: " + this.getTextArabicOrFrancais(societe.raisonSociale),
                                            fontSize: 15,
                                            bold: true, colSpan: 2, font: this.getFontArabicOrFrancais(societe.raisonSociale)
                                          },
                                          {}
                                        ],
                                        [
                                          { text: "Tél: ", bold: true, fontSize: 10 },
                                          { text: societe.telephone + '\n', fontSize: 9 }
                                        ],
                                        [
                                          { text: "Fax: ", bold: true, fontSize: 10 },
                                          { text: societe.fax + '\n', fontSize: 9 }
                                        ],
                                        [
                                          { text: "Adresse: ", bold: true, fontSize: 10 },
                                          { text: this.getTextArabicOrFrancais(societe.address) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(societe.address) }
                                        ],
                                        [
                                          { text: "M.F: ", bold: true, fontSize: 10 },
                                          { text: societe.matriculeFiscale, fontSize: 9 }
                                        ],
                                      ]
                                    }
                                  },
                                ],
                              ]
                            }
                          },
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                  (blockChauffeurCamion != null) ? [
                    //Chauffeur && Camion
                    {
                      margin: [0, 10, 0, 0],
                      //layout: "noBorders",
                      table: {
                        bold: 'false',
                        widths: ['20%', '40%', '40%'],
                        body: blockChauffeurCamion
                      }
                    },
                  ] : []

                ],
                [
                  //document
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      bold: 'false',
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [0, 0, 0, 0],
                            layout: "noBorders",
                            table: {
                              bold: 'false',
                              widths: ['40%', '60%'],
                              body: [
                                [
                                  { text: typeDoc + ": ", bold: true, fontSize: 10 },
                                  { text: document.numero + '\n', fontSize: 11 }
                                ],
                                [
                                  { text: "Date: ", bold: true, fontSize: 10 },
                                  { text: this.utilService.formatDate(document.date) + '\n', fontSize: 9 }
                                ]
                              ]
                            },
                          },
                        ]
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [0, 0, 0, 0],
                            layout: "noBorders",
                            table: {
                              bold: 'false',
                              widths: ['30%', '70%'],
                              body: [
                                [
                                  { text: (document instanceof DocumentVente) ? "Client: " : "Fournisseur: ", bold: true, fontSize: 10 },
                                  { text: this.getTextArabicOrFrancais(tier.raisonSociale) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(tier.raisonSociale), bold: true }
                                ],
                                [
                                  { text: "Adresse: ", bold: true, fontSize: 10 },
                                  { text: this.getTextArabicOrFrancais(tier.adresse) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(tier.adresse) }
                                ],
                                [
                                  { text: "Projet: ", bold: true, fontSize: 10 },
                                  { text: (tier.adresseLivraison.length > 0 ? this.getTextArabicOrFrancais(tier.adresseLivraison[0].adresse) : "") + '\n', fontSize: 9, font: this.getFontArabicOrFrancais((tier.adresseLivraison.length > 0 ? tier.adresseLivraison[0].adresse : "")) }
                                ],
                                [
                                  { text: "Tél: ", bold: true, fontSize: 10 },
                                  { text: tier.telephone + '\n', fontSize: 9 }
                                ],
                                [
                                  { text: "M.F: ", bold: true, fontSize: 10 },
                                  { text: tier.matriculeFiscale, fontSize: 9 }
                                ],
                              ]
                            },
                          },
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                ]
              ],
            ]
          }
        },

        //Transporteur
        {
          columns: [
            [
              [
                {
                  text: this.transporteur ? "Transporteur:" + this.getTransporteurNom() + " Vehicule: " + this.getTransporteurVehicule() + " ." : "",
                  fontSize: 9,
                }
              ],
              []
            ],
            []
          ],
          margin: [0, 0, 0, 10],
        },

        //Fournisseur
        {
          columns: [
            [
              [
                // {
                //   text: (this.facture.numeroFactureVenteFournisseur && this.facture.numeroFactureVenteFournisseur.length > 0) ? "Num Facture Fournisseur: " + this.facture.numeroFactureVenteFournisseur : "",
                //   fontSize: 9,
                // },
                // {
                //   text: (this.facture.dateFactureVenteFournisseur && this.facture.dateFactureVenteFournisseur.length > 0) ? "Date Facture Fournisseur: " + formatDate(new Date(this.facture.dateFactureVenteFournisseur), 'dd-MM-yyyy', 'en') : "",
                //   fontSize: 9,
                // }
              ],
              []
            ],
            []
          ],
          margin: [0, 0, 0, 0],
        },

        //Lignes
        {

          table: {
            headerRows: 1,
            widths: [
              ...tabGener.map((p: any) => (p.width + '%')),
            ],
            //heights:rowHeights,
            body: tabLignes,
            //heights: 100,
          },
          margin: [0, 0, 0, 0],
          layout: {
            //paddingTop: function (i:number, node:any, ) {
            //  if (node.positions.length > 0 && node.positions && node.table.body.length > 0 && node.table.body[0].length > 0 && i < node.table.body.length) {
            //    let nbrColonne = node.table.body[0].length
            //    let position = i * nbrColonne -1
            //    console.log("paddingTop");
            //    console.log(position);
            //    console.log(node.positions);
            //    if(!node.positions[position]) return 5
            //    console.log("paddingTop2");
            //
            //    let padding = 550 - node.positions[position].top
            //    if(i == node.table.body.length - 1)
            //      return 5;
            //    else{
            //      console.log(padding);
            //      return padding >= 0 ? 5 : 800;
            //    }
            //    console.log("paddingTop");
            //  }else {
            //    return 5;
            //  }
            //},
            paddingBottom: function (i: number, node: any,) {
              if (node.positions.length > 0 && node.positions && node.table.body.length > 0 && node.table.body[0].length > 0 && i < node.table.body.length) {
                let nbrColonne = node.table.body[0].length
                let position = (i + 1) * nbrColonne - 1
                if (!node.positions[position]) return 0
                let padding = totalHeight - node.positions[position].top
                if (i == node.table.body.length - 1)
                  return padding >= 0 ? padding : 200;
                else
                  return 5
                //return padding >= 0 ? 5 : 500;
              } else {
                return 0;
              }
            },
            hLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
            },
            vLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
            },
            hLineColor: (i: number, node: any) => {
              let isEmptyRow = true
              if (node.table && node.table.body[i])
                node.table.body[i].forEach((x: any) => {
                  if (x.text != "") isEmptyRow = false
                })

              if (!node.table.body[i])
                isEmptyRow = false
              return isEmptyRow ? 'white' : 'black';
            },
            vLineColor: (i: number) => 'black',
            pageBreakBefore: function (currentNode: any, followingNodesOnPage: any, nodesOnNextPage: any, previousNodesOnPage: any) {
              return currentNode.id === 'mediaRow' && currentNode.pageNumbers.length > 1;
            }
          },
        },

        ////Taxe
        [
          {
            margin: [0, 15, 0, 0],
            alignment: "left",
            layout: "noBorders",
            table: {
              widths: ['65%', '35%'],
              margin: [0, 0, 0, 0],
              fontSize: 8,
              body: [
                [
                  {
                    margin: [0, -5, 0, 0],
                    layout: "noBorders",
                    table: {
                      widths: ['50%', '50%'],
                      margin: [0, 0, 0, 0],
                      fontSize: 8,
                      body: [
                        [
                          {
                            margin: [0, 0, 10, 0],
                            border: [],
                            table: {
                              widths: ['auto', 'auto', 'auto', 'auto',],
                              fontSize: 8,
                              body:
                                [
                                  [{ text: 'N°', fontSize: 8 }, { text: 'Base HT ', fontSize: 8 }, { text: 'Taux TVA ', fontSize: 8 }, { text: 'Montant TVA ', fontSize: 8 }
                                  ],
                                  ...tableTVA.map((p: any) => ([
                                    { text: (compteur1++) + 1, compteur2: compteur2 = compteur1 + 2, alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    { text: p.taux.toFixed(2) + '%', alignment: 'right', fontSize: 9 },
                                    { text: p.montant.toFixed(3), alignment: 'right', fontSize: 9 }
                                  ])),
                                  [{ text: 'Total TVA', colSpan: 3, alignment: 'left', fontSize: 8 }, {}, {},
                                  { text: document.totalTVA.toFixed(3), alignment: 'right', fontSize: 8 }
                                  ],
                                ],
                              //headerRows: compteur2,
                              //keepWithHeaderRows: true,
                            },
                          },
                          {
                            margin: [0, 0, 10, 0],
                            border: [],
                            table: {
                              widths: ['auto', 'auto', 'auto', 'auto',],
                              fontSize: 8,
                              body: [
                                [{ text: 'Taxe', fontSize: 8 }, { text: 'Base HT ', fontSize: 8 }, { text: 'Taux', fontSize: 8 }, { text: ' Montant', fontSize: 8 }],
                                ...tableFodec.map((p: any) => (
                                  [
                                    { text: "Fodec", alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    {
                                      text: p.taux.toFixed(2) + '%',
                                      alignment: 'right',
                                      fontSize: 9
                                    },
                                    {
                                      text: p.montant.toFixed(3),
                                      alignment: 'right',
                                      fontSize: 9
                                    }
                                  ])),
                                ...tableDC.map((p: any) => (
                                  [
                                    { text: "DC", alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    {
                                      text: p.taux.toFixed(2) + '%',
                                      alignment: 'right',
                                      fontSize: 9
                                    },
                                    {
                                      text: p.montant.toFixed(3),
                                      alignment: 'right',
                                      fontSize: 9
                                    }
                                  ])),
                                [{ text: 'Total Taxe', colSpan: 3, alignment: 'left', fontSize: 9 }, {}, {}, {
                                  text: (document.totalDC + document.totalFodec + document.totalRedevance).toFixed(3),
                                  alignment: 'right', fontSize: 9
                                }
                                ],
                              ],
                            },
                          },
                        ],
                        [
                          {
                            text: `Arrété le présente ${typeDoc} à la somme de : ${this.numberToLettreFrService.convertToFrenchWords(firstNumber) + " dinars " + ((secondNumber == "000" ? " " : "et " + secondNumber.toString() + " millimes")) + "."} `,
                            alignment: "left", margin: [0, 0, 0, 0], fontSize: 10, border: [], colSpan: 2,
                          },
                        ]
                      ],
                    },
                  },
                  {
                    alignment: 'right',
                    fontSize: 8,
                    stack: [
                      {
                        margin: [-3, 0, 0, 10],
                        layout: "noBorders",
                        alignment: 'right',
                        table: {
                          widths: [1, '*'],
                          body: [
                            [
                              {},
                              {
                                margin: [0, 0, 0, 0], // margin: [marginLeftTableTaxe, -5, 0, 0],
                                bordure: [],
                                table: {
                                  headerRows: 4,
                                  keepWithHeaderRows: true,
                                  widths: [68, 103],
                                  alignment: 'right',
                                  body: [
                                    [
                                      { text: 'TOTAL HT', fontSize: 8 },
                                      { text: document.totalBrutHT.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL REMISE', fontSize: 8 },
                                      { text: document.totalRemise.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL NET HT', fontSize: 8 },
                                      { text: document.totalNetHT.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'Total T.V.A', fontSize: 8 },
                                      { text: document.totalTVA.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'Timbre Fiscale', fontSize: 8 },
                                      { text: document.timbreFiscale.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL TTC', fontSize: 8 },
                                      { text: document.totalTTC.toFixed(3), alignment: 'right', bold: true },
                                    ],
                                  ]
                                },
                              }
                            ],
                          ]
                        }
                      }
                    ]
                  }
                ],
                [
                  {},
                  { text: 'Cachet et signature', alignment: 'center', decoration: 'underline', margin: [0, 5, 0, 0], fontSize: 8, bold: true },
                ]
              ],
            },
          },
        ],

      ],
      /*pageBreakBefore: function(currentPage:any, pageCount:any, nodesOnNextPage:any, previousNodesOnPage:any) {
        return currentPage.headlineLevel === 1 && pageCount.length === 7;
      },*/
      footer: (currentPage: number, pageCount: number, pageSize: number) => {
        let footer = {
          margin: [20, 0, 20, 0],
          //absolutePosition: { x: 0, y: 200 },
          layout: {
            hLineColor: (i: number) => (i === 0) ? 'lightgray' : '',
            vLineWidth: (i: number) => 0,
            hLineWidth: (i: number) => (i === 0) ? 1 : 0,
          },
          bordure: [],
          table: {
            widths: [50, '*', 50],
            body: [
              [
                {},
                {
                  alignment: 'center',
                  fontSize: 8,
                  stack: [
                    { text: societe.raisonSociale + ':', margin: [0, 0, 0, 0] },
                    { text: societe.address, margin: [0, 0, 0, 0] },
                    { text: 'Tél:' + societe.telephone + '\t\t' + 'Mob:' + societe.mobile + '\t\t' + 'Fax:' + societe.fax + '\t\t' + 'Email:' + societe.email, margin: [0, 0, 0, 0] },
                    { text: 'M.F:' + societe.matriculeFiscale + '\t' + '/' + '\t' + 'RIB:' + societe.rib, margin: [0, 0, 0, 0] }
                  ]
                },
                { text: `${currentPage}/${pageCount}`, alignment: 'left', margin: [0, 0, 20, 0] }
              ],
            ]
          }
        }
        let tabFooter = []
        tabFooter.push(footer)
        return tabFooter;
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 2, 0, 5]
        },
      },
    };


    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }

  async exportToPdf(table: ElementRef | undefined, columns: any, title: string, pageOrientation?: string, soldeIniale?: number, soldePeriode?: number, soldeFinale?: number) {
    if (!table) return;

    const visibleColumns = columns.filter((column: any) => column.visible == true);
    const dataT = this.getDataFromTable(table, visibleColumns);
    const data = dataT[0];
    const nombreColonnes = dataT[1];
    let widths = dataT[2];
    const currentDate = new Date().toLocaleDateString(); // Get current date
    const currentTime = new Date().toLocaleTimeString(); // Get current time
    let orientation = pageOrientation && pageOrientation == page_orientation.portrait ? page_orientation.portrait : page_orientation.landscape

    let idSo = this.tokenService.societeCourante && this.tokenService.societeCourante._id ? this.tokenService.societeCourante._id : ""
    let user_nom = this.tokenService.user?.nom
    let societe = new Societe(await this.getSociete(idSo))
    if (!societe) return

    let image = societe.imagePath
    if (!image || image === "") {
      alert("Veuillez insérer votre logo en paramètre !");
      return;
    }

    let raisonSociale = this.getTextArabicOrFrancais(societe.raisonSociale)
    let adresse = this.getTextArabicOrFrancais(societe.address)
    let fontAdresse = this.getFontArabicOrFrancais(societe.address)
    let fontSociete = this.getFontArabicOrFrancais(societe.raisonSociale)
    const documentDefinition: any = {
      pageOrientation: orientation,
      pageMargins: [12, 60, 12, 50],
      content: [
        { text: title, style: 'header', margin: [0, 10, 0, 10] }, // Add title
        {
          margin: [0, 0, 0, 0],
          table: {
            headerRows: 1,
            body: data,
            widths: widths, // Adjust column widths as needed
          },
          style: 'tableStyle'
        },
      ],
      header: function (page: any) {
        return {
          margin: [5, 0, 5, 0],
          columns: [
            // { text: 'Date: ' + currentDate, alignment: 'left', margin: [20, 10], fontSize: 7 },
            // { text: 'Heure: ' + currentTime, alignment: 'right', margin: [20, 10], fontSize: 7 }
            //header
            {
              layout: "noBorders",
              //margin: [0, 0, 0, 0],
              table: {
                widths: ["50%", "50%",],
                headerRows: 0,
                body: [
                  [
                    {
                      layout: "noBorders",
                      margin: [0, 0, 0, 0],
                      table: {
                        widths: ["20%", "70%",],
                        headerRows: 0,
                        body: [
                          [
                            {
                              image: image,
                              alignment: 'left',
                              //height: 60,
                              width: 50,
                              margin: [0, 0, 0, 0],
                            },
                            {
                              layout: "noBorders",
                              margin: [0, 10, 0, 0],
                              table: {
                                widths: ["*", "*"],
                                headerRows: 0,
                                body: [
                                  [
                                    {
                                      text: "Sté: " + raisonSociale,
                                      fontSize: 10,
                                      bold: true, colSpan: 2, font: fontSociete
                                    },
                                    {}
                                  ],
                                ]
                              }
                            },
                          ],
                        ]
                      }
                    },
                    {
                      text: `Imprimé par ${user_nom} à ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB')}`,
                      cellFilter: 'date:\'MM/dd/yyyy HH:mm:ss\'',
                      alignment: 'right',
                      margin: [0, 5, 0, 0],
                      fontSize: 8,
                      // italics: true,
                    }
                  ],
                ]
              }
            },

          ]
        }
      },
      footer: (currentPage: number, pageCount: number, pageSize: number) => {
        let footer = {
          margin: [20, 0, 20, 0],
          //absolutePosition: { x: 0, y: 200 },
          layout: {
            hLineColor: (i: number) => (i === 0) ? 'lightgray' : '',
            vLineWidth: (i: number) => 0,
            hLineWidth: (i: number) => (i === 0) ? 1 : 0,
          },
          bordure: [],
          table: {
            widths: [50, '*', 50],
            body: [
              [
                {},
                {
                  alignment: 'center',
                  fontSize: 8,
                  stack: [
                    { text: societe.raisonSociale + ':', margin: [0, 0, 0, 0] },
                    { text: societe.address, margin: [0, 0, 0, 0] },
                    { text: 'Tél:' + societe.telephone + '\t\t' + 'Mob:' + societe.mobile + '\t\t' + 'Fax:' + societe.fax + '\t\t' + 'Email:' + societe.email, margin: [0, 0, 0, 0] },
                    { text: 'M.F:' + societe.matriculeFiscale + '\t' + '/' + '\t' + 'RIB:' + societe.rib, margin: [0, 0, 0, 0] }
                  ]
                },
                { text: `${currentPage}/${pageCount}`, alignment: 'left', margin: [0, 0, 20, 0] }
              ],
            ]
          }
        }
        let tabFooter = []
        tabFooter.push(footer)
        return tabFooter;
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10] // Add margin for spacing
        },
        footer: {
          fontSize: 10,
          alignment: 'center',
          margin: [0, 10, 0, 0] // Add margin for spacing
        },
        tableStyle: {
          header: {
            bold: true
          }
        }
      },
      defaultStyle: {
        fontSize: 7 // Set default font size for the table
      }
    };

    if (soldeIniale != undefined && soldePeriode != undefined && soldeFinale != undefined) {
      documentDefinition.content.push(
        {
          margin: [0, 10, 0, 0],
          table: {
            widths: ['*', '*', '*'],
            fontSize: 8,
            body: [
              [
                { text: 'Solde_initiale: ' + roundmMontantString(soldeIniale ? soldeIniale : 0), alignment: 'center', decoration: 'underline', margin: [0, 5, 0, 0], fontSize: 8, bold: true },
                { text: 'Solde_periode: ' + roundmMontantString(soldePeriode ? soldePeriode : 0), alignment: 'center', decoration: 'underline', margin: [0, 5, 0, 0], fontSize: 8, bold: true },
                { text: 'Solde_finale: ' + roundmMontantString(soldeFinale ? soldeFinale : 0), alignment: 'center', decoration: 'underline', margin: [0, 5, 0, 0], fontSize: 8, bold: true }
              ]
            ],
          },
        }
      )
    }

    pdfMake.createPdf(documentDefinition).download(title + '-data.pdf');
  }

  private getDataFromTable(table: ElementRef, columns: any): [any[][], number, string[], any[][]] {
    // Extract data from your table and convert it to the format expected by pdfmake
    // For example:
    const tableData: any = [];
    const tableHeader: any = [];
    const tableRows = table.nativeElement.querySelectorAll('tr');
    let compteur = 0;
    let nbrColonnes = 0;
    const columnWidths: number[] = [];
    let compteurColonne = 0

    tableRows.forEach((row: any) => {
      if (compteur !== 0) {
        let rowData: any = [];
        row.querySelectorAll('td').forEach((cell: any, index: number) => {

          if (columns[compteurColonne] && columns[compteurColonne].cssClasses && columns[compteurColonne].cssClasses.includes("right-aligned-input") > -1) {
            rowData.push({ text: cell.innerText, alignment: "right" });
          } else {
            rowData.push(cell.innerText);
          }
          compteurColonne++

          if (!columnWidths[index]) {
            columnWidths[index] = 0;
          }
          const cellTextLength = cell.innerText.length;
          if (cellTextLength > columnWidths[index]) {
            columnWidths[index] = cellTextLength;
          }
          nbrColonnes++;
        });
        compteurColonne = 0
        tableData.push(rowData);
      } else {
        let rowData: any = [];
        row.querySelectorAll('th').forEach((cell: any, index: number) => {
          let cell2 = { text: cell.innerText, bold: true, fontSize: 7 }

          rowData.push(cell2);
          if (!columnWidths[index]) {
            columnWidths[index] = 0;
          }
          const cellTextLength = cell.innerText.length;
          if (cellTextLength > columnWidths[index]) {
            columnWidths[index] = cellTextLength;
          }
        });
        tableData.push(rowData);
      }
      compteur++;
    });

    // Convert column widths to percentages based on the content length
    const totalWidths = columnWidths.reduce((acc, val) => acc + val, 0);
    //const widths = columnWidths.map(width => `${(width / totalWidths) * 100}%`);
    let widths2 = []
    if (columns.length && columns.length > 0) {
      let widthFix = 100 / columns.length
      widths2 = []
      let somme = 0
      for (let i = 0; i < columnWidths.length; i++) {
        somme += widthFix
        if (somme < 100)
          widths2.push((widthFix) + '%')
        else
          widths2.push((100 + widthFix - somme) + '%')
      }
    }

    return [tableData, nbrColonnes, widths2, tableHeader];
  }

  ExportTOExcel(table: ElementRef | undefined, columns: any, title: string, soldeIniale?: number, soldePeriode?: number, soldeFinale?: number) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table?.nativeElement);

    if (soldeIniale != undefined && soldePeriode != undefined && soldeFinale != undefined) {
      const newRows = [
        {
          Solde_initiale: roundmMontantNumber(soldeIniale ? soldeIniale : 0),
          Solde_periode: roundmMontantNumber(soldePeriode ? soldePeriode : 0),
          Solde_finale: roundmMontantNumber(soldeFinale ? soldeFinale : 0)
        }
      ];
      XLSX.utils.sheet_add_json(ws, newRows, { origin: -1 }); // 'origin: -1' appends the rows at the end
    }
    // Add new rows to the worksheet

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, title + '-data.xlsx');
  }

  async getReglement(idReglement: string, tab_reg?:string) {
    return new Promise((resolve) => {
      this.serviceReglementHttp.GetDetails(idReglement, tab_reg ? tab_reg : undefined).subscribe((res) => {
        if (res.OK) {
          resolve(JSON.parse(JSON.stringify(res.RESULTAT)));
        } else {
          resolve(null)
        }
      });
    });
  }

  async imprimerReglement(idReglement: string, tab_reg?:string) {
    showLoading()
    let reg = null
    reg = new Reglement(await this.getReglement(idReglement, tab_reg ? tab_reg : undefined))

    let client = null
    let fournisseur = null

    if (reg?.client && reg?.client._id)
      client = new Client(await this.getClient(reg?.client._id))
    else if (reg?.fournisseur && reg?.fournisseur._id)
      fournisseur = new Fournisseur(await this.getFournisseur(reg?.fournisseur._id))

    if (!client && !fournisseur) return hideLoading()

    let idSo = this.tokenService.societeCourante && this.tokenService.societeCourante._id ? this.tokenService.societeCourante._id : ""
    let user_nom = this.tokenService.user?.nom
    let societe = new Societe(await this.getSociete(idSo))
    if (!societe) return hideLoading()
    await this.generatePdfReglement(user_nom, reg, 'A5', client ? client : fournisseur, societe)
    hideLoading()

  }

  async generatePdfReglement(nomUtilisateur: string | undefined, reg: Reglement, formatPDF: string, tier: Client | Fournisseur | null, societe: Societe, action = "open") {
    //var urlImage = this.document.baseURI+"assets/icons/icon-72x72.png"
    //var image = await this.getBase64ImageFromURL(urlImage)
    //var image = await this.getImageDataUrl('https://i.imgur.com/tVE0WwI.jpg')

    let image = societe.imagePath
    let totalHeight = formatPDF == 'A4' ? 550 : 300
    let marginLeftTableTaxe = formatPDF == 'A4' ? 0 : 88
    if (!image || image === "") {
      alert("Veuillez insérer votre logo en paramètre !");
      return;
    }

    if (!tier) {
      return;
    }

    let docDefinition: any = {
      pageOrientation: formatPDF === "A4" ? 'portrait' : 'landscape',
      pagesize: formatPDF,
      pageMargins: [12, 90, 12, 70],
      header: function (page: any) {
        if (page != 1)
          return {
            margin: 12,
            columns: [
              {
                text: `${(new Date()).toLocaleDateString('en-GB')}`,
                cellFilter: 'date:\'MM/dd/yyyy\'',
                alignment: 'left',
                margin: [210, 5, 0, 0],
                fontSize: 9,
                // italics: true,
              }
            ]
          }
      },
      header1: {
        margin: 10,
        columns: [
          [
            {
              headerRows: 1,
              image: image,
              alignment: 'left',
              height: 60,
              width: 100,
              margin: [0, 0, 0, 0],
            }
          ],
          [
            {
              text: `${(new Date()).toLocaleDateString('en-GB')}`,
              cellFilter: 'date:\'MM/dd/yyyy\'',
              alignment: 'left',
              margin: [210, 5, 0, 0],
              fontSize: 9,
              // italics: true,
            }
          ]
        ]
      },
      content: [
        //header
        {
          layout: "noBorders",
          margin: [0, -90, 0, 0],
          table: {
            widths: ["50%", "50%",],
            headerRows: 0,
            body: [
              [
                {},
                {
                  text: `Imprimé par ${nomUtilisateur} à ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB')}`,
                  cellFilter: 'date:\'MM/dd/yyyy HH:mm:ss\'',
                  alignment: 'right',
                  margin: [0, 5, 0, 0],
                  fontSize: 8,
                  // italics: true,
                }
              ],
            ]
          }
        },

        //societe && document && client
        {
          layout: "noBorders",
          margin: [0, 0, 0, 0],
          table: {
            widths: ["50%", "50%"],
            headerRows: 0,
            body: [
              [
                [
                  //societe
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      bold: 'false',
                      widths: ['100%'],
                      body: [
                        [
                          {
                            layout: "noBorders",
                            margin: [0, 0, 0, 0],
                            table: {
                              widths: ["30%", "70%",],
                              headerRows: 0,
                              body: [
                                [
                                  {
                                    image: image,
                                    alignment: 'left',
                                    //height: 60,
                                    //width: 100,
                                    margin: [0, 0, 0, 0],
                                  },
                                  {
                                    layout: "noBorders",
                                    margin: [0, 0, 0, 0],
                                    table: {
                                      widths: ["30%", "*"],
                                      headerRows: 0,
                                      body: [
                                        [
                                          {
                                            text: "Sté: " + this.getTextArabicOrFrancais(societe.raisonSociale),
                                            fontSize: 15,
                                            bold: true, colSpan: 2, font: this.getFontArabicOrFrancais(societe.raisonSociale)
                                          },
                                          {}
                                        ],
                                        [
                                          { text: "Tél: ", bold: true, fontSize: 10 },
                                          { text: societe.telephone + '\n', fontSize: 9 }
                                        ],
                                        [
                                          { text: "Fax: ", bold: true, fontSize: 10 },
                                          { text: societe.fax + '\n', fontSize: 9 }
                                        ],
                                        [
                                          { text: "Adresse: ", bold: true, fontSize: 10 },
                                          { text: this.getTextArabicOrFrancais(societe.address) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(societe.address) }
                                        ],
                                        [
                                          { text: "M.F: ", bold: true, fontSize: 10 },
                                          { text: societe.matriculeFiscale, fontSize: 9 }
                                        ],
                                      ]
                                    }
                                  },
                                ],
                              ]
                            }
                          },
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                ],
                [
                  //document
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      bold: 'false',
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [0, 0, 0, 0],
                            layout: "noBorders",
                            table: {
                              bold: 'false',
                              widths: ['40%', '60%'],
                              body: [
                                [
                                  { text: "Règlement: ", bold: true, fontSize: 10 },
                                  { text: reg.numero + '\n', fontSize: 11 }
                                ],
                                [
                                  { text: "Date: ", bold: true, fontSize: 10 },
                                  { text: this.utilService.formatDate(reg.date) + '\n', fontSize: 9 }
                                ]
                              ]
                            },
                          },
                        ]
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                  {
                    margin: [0, 5, 0, 0],
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [0, 0, 0, 0],
                            layout: "noBorders",
                            table: {
                              bold: 'false',
                              widths: ['30%', '70%'],
                              body: [
                                [
                                  { text: (reg.client && reg.client._id) ? "Client: " : "Fournisseur: ", bold: true, fontSize: 10 },
                                  { text: this.getTextArabicOrFrancais(tier.raisonSociale) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(tier.raisonSociale), bold: true }
                                ],
                                [
                                  { text: "Adresse: ", bold: true, fontSize: 10 },
                                  { text: this.getTextArabicOrFrancais(tier.adresse) + '\n', fontSize: 9, font: this.getFontArabicOrFrancais(tier.adresse) }
                                ],
                                [
                                  { text: "Projet: ", bold: true, fontSize: 10 },
                                  { text: (tier.adresseLivraison.length > 0 ? this.getTextArabicOrFrancais(tier.adresseLivraison[0].adresse) : "") + '\n', fontSize: 9, font: this.getFontArabicOrFrancais((tier.adresseLivraison.length > 0 ? tier.adresseLivraison[0].adresse : "")) }
                                ],
                                [
                                  { text: "Tél: ", bold: true, fontSize: 10 },
                                  { text: tier.telephone + '\n', fontSize: 9 }
                                ],
                                [
                                  { text: "M.F: ", bold: true, fontSize: 10 },
                                  { text: tier.matriculeFiscale, fontSize: 9 }
                                ],
                              ]
                            },
                          },
                        ],
                      ]
                    },
                    layout: {
                      hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 2;
                      },
                      vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                      },
                      hLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                      },
                      vLineColor: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                      },
                    }
                  },
                ]
              ],
            ]
          }
        },

        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  margin: [0, 0, 0, 0],
                  layout: "noBorders",
                  table: {
                    bold: 'false',
                    widths: ['50%', '50%'],
                    body: [
                      [
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Montant: ", style: 'titreChamp' },
                            { text: this.utilService.roundmMontantString(reg.montant), style: 'valueChamp' }
                          ]
                        },
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Mode Règlement: ", style: 'titreChamp' },
                            { text: reg.modeReglement != undefined ? this.utilService.getLibelleModeReglement(reg.modeReglement + "") : "", style: 'valueChamp' }
                          ],
                        },
                      ],
                      [
                        {
                          //alignment: 'center',
                          text:[
                            { text: "N° Piece: ", style: 'titreChamp' },
                            { text: reg.numPiece ? reg.numPiece : "-", style: 'valueChamp' }
                          ]
                        },
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Date Échéance: ", style: 'titreChamp' },
                            { text: reg.dateEcheance ? this.utilService.formatDate(reg.dateEcheance) : "-", style: 'valueChamp' }
                          ],
                        },
                      ],
                      [
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Titulaire: ", style: 'titreChamp' },
                            { text: reg.titulaire ? reg.titulaire : "-", style: 'valueChamp' }
                          ]
                        },
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Compte bancaire: ", style: 'titreChamp' },
                            { text: reg.compteBancaire ? reg.compteBancaire.libelle : '-', style: 'valueChamp' }
                          ],
                        },
                      ],
                      [
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Agence: ", style: 'titreChamp' },
                            { text: reg.agence ? reg.agence : "-", style: 'valueChamp' }
                          ],
                        },
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Banque: ", style: 'titreChamp' },
                            { text: reg.banque ? reg.banque.abreviation : '-', style: 'valueChamp' }
                          ],
                        },
                      ],
                      [
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Créer par: ", style: 'titreChamp' },
                            { text: reg.utilisateur ? reg.utilisateur.nom : "", style: 'valueChamp' }
                          ],
                        },
                        {
                          //alignment: 'center',
                          text:[
                            { text: "Session caisse: ", style: 'titreChamp' },
                            { text: reg.sessionCaisse && reg.sessionCaisse.numero ? reg.sessionCaisse.numero : "", style: 'valueChamp' }
                          ],
                        },
                      ],
                      [
                        {
                          text:[
                            { text: "Document: ", style: 'titreChamp' },
                            { text: (reg.lettrageReglement && reg.lettrageReglement.documents && reg.lettrageReglement.documents.length > 0) ? reg.lettrageReglement.documents[reg.lettrageReglement.documents.length - 1].numero : '-', style: 'valueChamp' }
                          ]
                        },
                        {
                          text:[
                            { text: "Notes: ", style: 'titreChamp' },
                            { text: reg.note ? reg.note : "-", style: 'valueChamp' }
                          ]
                        },
                      ],

                    ]
                  },
                },
              ],
            ]
          },
          layout: {
            hLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.body.length) ? 2 : 2;
            },
            vLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 2;
            },
            hLineColor: function (i: number, node: any) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
          }
        },

        //Transporteur
        {
          columns: [
            [
              [
                {
                  text: this.transporteur ? "Transporteur:" + this.getTransporteurNom() + " Vehicule: " + this.getTransporteurVehicule() + " ." : "",
                  fontSize: 9,
                }
              ],
              []
            ],
            []
          ],
          margin: [0, 0, 0, 10],
        },

        //Fournisseur
        {
          columns: [
            [
              [
                // {
                //   text: (this.facture.numeroFactureVenteFournisseur && this.facture.numeroFactureVenteFournisseur.length > 0) ? "Num Facture Fournisseur: " + this.facture.numeroFactureVenteFournisseur : "",
                //   fontSize: 9,
                // },
                // {
                //   text: (this.facture.dateFactureVenteFournisseur && this.facture.dateFactureVenteFournisseur.length > 0) ? "Date Facture Fournisseur: " + formatDate(new Date(this.facture.dateFactureVenteFournisseur), 'dd-MM-yyyy', 'en') : "",
                //   fontSize: 9,
                // }
              ],
              []
            ],
            []
          ],
          margin: [0, 0, 0, 0],
        },

        /*
        //Lignes
        {

          table: {
            headerRows: 1,
            widths: [
              ...tabGener.map((p: any) => (p.width + '%')),
            ],
            //heights:rowHeights,
            body: tabLignes,
            //heights: 100,
          },
          margin: [0, 0, 0, 0],
          layout: {
            //paddingTop: function (i:number, node:any, ) {
            //  if (node.positions.length > 0 && node.positions && node.table.body.length > 0 && node.table.body[0].length > 0 && i < node.table.body.length) {
            //    let nbrColonne = node.table.body[0].length
            //    let position = i * nbrColonne -1
            //    console.log("paddingTop");
            //    console.log(position);
            //    console.log(node.positions);
            //    if(!node.positions[position]) return 5
            //    console.log("paddingTop2");
            //
            //    let padding = 550 - node.positions[position].top
            //    if(i == node.table.body.length - 1)
            //      return 5;
            //    else{
            //      console.log(padding);
            //      return padding >= 0 ? 5 : 800;
            //    }
            //    console.log("paddingTop");
            //  }else {
            //    return 5;
            //  }
            //},
            paddingBottom: function (i: number, node: any,) {
              if (node.positions.length > 0 && node.positions && node.table.body.length > 0 && node.table.body[0].length > 0 && i < node.table.body.length) {
                let nbrColonne = node.table.body[0].length
                let position = (i + 1) * nbrColonne - 1
                if (!node.positions[position]) return 0
                let padding = totalHeight - node.positions[position].top
                if (i == node.table.body.length - 1)
                  return padding >= 0 ? padding : 200;
                else
                  return 5
                //return padding >= 0 ? 5 : 500;
              } else {
                return 0;
              }
            },
            hLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
            },
            vLineWidth: function (i: number, node: any) {
              return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
            },
            hLineColor: (i: number, node: any) => {
              let isEmptyRow = true
              if (node.table && node.table.body[i])
                node.table.body[i].forEach((x: any) => {
                  if (x.text != "") isEmptyRow = false
                })

              if (!node.table.body[i])
                isEmptyRow = false
              return isEmptyRow ? 'white' : 'black';
            },
            vLineColor: (i: number) => 'black',
            pageBreakBefore: function (currentNode: any, followingNodesOnPage: any, nodesOnNextPage: any, previousNodesOnPage: any) {
              return currentNode.id === 'mediaRow' && currentNode.pageNumbers.length > 1;
            }
          },
        },

        ////Taxe
        [
          {
            margin: [0, 15, 0, 0],
            alignment: "left",
            layout: "noBorders",
            table: {
              widths: ['65%', '35%'],
              margin: [0, 0, 0, 0],
              fontSize: 8,
              body: [
                [
                  {
                    margin: [0, -5, 0, 0],
                    layout: "noBorders",
                    table: {
                      widths: ['50%', '50%'],
                      margin: [0, 0, 0, 0],
                      fontSize: 8,
                      body: [
                        [
                          {
                            margin: [0, 0, 10, 0],
                            border: [],
                            table: {
                              widths: ['auto', 'auto', 'auto', 'auto',],
                              fontSize: 8,
                              body:
                                [
                                  [{ text: 'N°', fontSize: 8 }, { text: 'Base HT ', fontSize: 8 }, { text: 'Taux TVA ', fontSize: 8 }, { text: 'Montant TVA ', fontSize: 8 }
                                  ],
                                  ...tableTVA.map((p: any) => ([
                                    { text: (compteur1++) + 1, compteur2: compteur2 = compteur1 + 2, alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    { text: p.taux.toFixed(2) + '%', alignment: 'right', fontSize: 9 },
                                    { text: p.montant.toFixed(3), alignment: 'right', fontSize: 9 }
                                  ])),
                                  [{ text: 'Total TVA', colSpan: 3, alignment: 'left', fontSize: 8 }, {}, {},
                                  { text: document.totalTVA.toFixed(3), alignment: 'right', fontSize: 8 }
                                  ],
                                ],
                              //headerRows: compteur2,
                              //keepWithHeaderRows: true,
                            },
                          },
                          {
                            margin: [0, 0, 10, 0],
                            border: [],
                            table: {
                              widths: ['auto', 'auto', 'auto', 'auto',],
                              fontSize: 8,
                              body: [
                                [{ text: 'Taxe', fontSize: 8 }, { text: 'Base HT ', fontSize: 8 }, { text: 'Taux', fontSize: 8 }, { text: ' Montant', fontSize: 8 }],
                                ...tableFodec.map((p: any) => (
                                  [
                                    { text: "Fodec", alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    {
                                      text: p.taux.toFixed(2) + '%',
                                      alignment: 'right',
                                      fontSize: 9
                                    },
                                    {
                                      text: p.montant.toFixed(3),
                                      alignment: 'right',
                                      fontSize: 9
                                    }
                                  ])),
                                ...tableDC.map((p: any) => (
                                  [
                                    { text: "DC", alignment: 'right', fontSize: 9 },
                                    { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                                    {
                                      text: p.taux.toFixed(2) + '%',
                                      alignment: 'right',
                                      fontSize: 9
                                    },
                                    {
                                      text: p.montant.toFixed(3),
                                      alignment: 'right',
                                      fontSize: 9
                                    }
                                  ])),
                                [{ text: 'Total Taxe', colSpan: 3, alignment: 'left', fontSize: 9 }, {}, {}, {
                                  text: (document.totalDC + document.totalFodec + document.totalRedevance).toFixed(3),
                                  alignment: 'right', fontSize: 9
                                }
                                ],
                              ],
                            },
                          },
                        ],
                        [
                          {
                            text: `Arrété le présente ${typeDoc} à la somme de : ${this.numberToLettreFrService.convertToFrenchWords(firstNumber) + " dinars " + ((secondNumber == "000" ? " " : "et " + secondNumber.toString() + " millimes")) + "."} `,
                            alignment: "left", margin: [0, 0, 0, 0], fontSize: 10, border: [], colSpan: 2,
                          },
                        ]
                      ],
                    },
                  },
                  {
                    alignment: 'right',
                    fontSize: 8,
                    stack: [
                      {
                        margin: [-3, 0, 0, 10],
                        layout: "noBorders",
                        alignment: 'right',
                        table: {
                          widths: [1, '*'],
                          body: [
                            [
                              {},
                              {
                                margin: [marginLeftTableTaxe, -5, 0, 0],
                                bordure: [],
                                table: {
                                  headerRows: 4,
                                  keepWithHeaderRows: true,
                                  widths: [68, 103],
                                  alignment: 'right',
                                  body: [
                                    [
                                      { text: 'TOTAL HT', fontSize: 8 },
                                      { text: document.totalBrutHT.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL REMISE', fontSize: 8 },
                                      { text: document.totalRemise.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL NET HT', fontSize: 8 },
                                      { text: document.totalNetHT.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'Total T.V.A', fontSize: 8 },
                                      { text: document.totalTVA.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'Timbre Fiscale', fontSize: 8 },
                                      { text: document.timbreFiscale.toFixed(3), alignment: 'right', fontSize: 9, },
                                    ],
                                    [
                                      { text: 'TOTAL TTC', fontSize: 8 },
                                      { text: document.totalTTC.toFixed(3), alignment: 'right', bold: true },
                                    ],
                                  ]
                                },
                              }
                            ],
                          ]
                        }
                      }
                    ]
                  }
                ],
                [
                  {},
                  { text: 'Cachet et signature', alignment: 'center', decoration: 'underline', margin: [0, 5, 0, 0], fontSize: 8, bold: true },
                ]
              ],
            },
          },
        ],*/

      ],
      /*pageBreakBefore: function(currentPage:any, pageCount:any, nodesOnNextPage:any, previousNodesOnPage:any) {
        return currentPage.headlineLevel === 1 && pageCount.length === 7;
      },*/
      footer: (currentPage: number, pageCount: number, pageSize: number) => {
        let footer = {
          margin: [20, 0, 20, 0],
          //absolutePosition: { x: 0, y: 200 },
          layout: {
            hLineColor: (i: number) => (i === 0) ? 'lightgray' : '',
            vLineWidth: (i: number) => 0,
            hLineWidth: (i: number) => (i === 0) ? 1 : 0,
          },
          bordure: [],
          table: {
            widths: [50, '*', 50],
            body: [
              [
                {},
                {
                  alignment: 'center',
                  fontSize: 8,
                  stack: [
                    { text: societe.raisonSociale + ':', margin: [0, 0, 0, 0] },
                    { text: societe.address, margin: [0, 0, 0, 0] },
                    { text: 'Tél:' + societe.telephone + '\t\t' + 'Mob:' + societe.mobile + '\t\t' + 'Fax:' + societe.fax + '\t\t' + 'Email:' + societe.email, margin: [0, 0, 0, 0] },
                    { text: 'M.F:' + societe.matriculeFiscale + '\t' + '/' + '\t' + 'RIB:' + societe.rib, margin: [0, 0, 0, 0] }
                  ]
                },
                { text: `${currentPage}/${pageCount}`, alignment: 'left', margin: [0, 0, 20, 0] }
              ],
            ]
          }
        }
        let tabFooter = []
        tabFooter.push(footer)
        return tabFooter;
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 2, 0, 5]
        },
        titreChamp: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 2, 0, 5]
        },
        valueChamp: {
          bold: false,
          fontSize: 14,
        },
      },
    };


    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }


}
