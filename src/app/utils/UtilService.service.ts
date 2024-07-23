import { Injectable } from '@angular/core';
import {
  enum_conditionReglement,
  enum_modeReglement,
  enum_statusProspection,
  enum_typeDepotPV,
  enum_types_articles,
  enum_typetiers,
  enum_type_document,
  enum_etat_bonsortie,
  enum_type_mouvement,
  enum_type_document_entree_sortie,
  enum_type_document_entree,
  enum_type_document_sortie,
  enum_table_piecejointe,
  enum_types_vente,
  enum_type_operation,
  list_date_range_label,
  enum_type_document_vente,
}
  from "../global-enums";

import {formatDate} from "@angular/common";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor(private tokenService:TokenService )
  {  }
  paramsGeneral:any={
    typeVentePOS  :'ticket',
    clientDefaut  : { id:'client'},
  }

  public formatMontant(nbr: any, typMT?: any): string {
    if (nbr === null || nbr === undefined) {
      return '0';
    }

    // Convert to string
    const nbrString = nbr.toString();

    // Remove commas and parse as float
    const numberValue = parseFloat(nbrString.replace(',', ''));

    if (isNaN(numberValue)) {
      return '';
    }
    const formattedNumber = new Intl.NumberFormat('de-DE', {

      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      minimumIntegerDigits: 1,}).format(
      nbrString,
    )

    // Replace the decimal point with a comma
    return formattedNumber.replace('.', ' ');
  }

  public getNameEnum(EnumName:any){

    let set_Enum:any
    switch (EnumName) {

      case "enum_modeReglement" :
        set_Enum =  enum_modeReglement
        break
      case "enum_types_vente" :
        set_Enum =  enum_types_vente
        break
      case "enum_type_operation" :
        set_Enum =  enum_type_operation
        break
      case "enum_typetiers" :
        set_Enum =  enum_typetiers
        break
      case "enum_statusProspection" :
        set_Enum =  enum_statusProspection
        break
      case "enum_conditionReglement" :
        set_Enum =  enum_conditionReglement
        break
      case "enum_types_articles" :
        set_Enum =  enum_types_articles
        break
      case "enum_typeDepotPV" :
        set_Enum =  enum_typeDepotPV
        break
        case "enum_etat_bonsortie" :
        set_Enum =  enum_etat_bonsortie
        break
      case "enum_type_document" :
        set_Enum =  enum_type_document
        break

      case "enum_type_mouvement" :
        set_Enum =  enum_type_mouvement
        break

      case "enum_type_document_entree_sortie" :
        set_Enum =  enum_type_document_entree_sortie
        break

      case "enum_type_document_entree" :
        set_Enum =  enum_type_document_entree
        break

      case "enum_type_document_sortie" :
        set_Enum =  enum_type_document_sortie
        break

      case "enum_table_piecejointe" :
        set_Enum =  enum_table_piecejointe
        break

      case "list_date_range_label" :
        set_Enum =  list_date_range_label
        break

      case "enum_type_document_vente" :
        set_Enum =  enum_type_document_vente
        break

      default : set_Enum =  null
        break
    }

     return set_Enum
}

  public parseEnumToObject(enum_list:any){

    function isStringEnumValue(value: string | number): value is string {
      return typeof value === 'string';
    }

    // Convert enum values to an array of objects (excluding numeric values)
    let enum_list_loc = this.getNameEnum(enum_list);
    const objArray = Object.keys(enum_list_loc)
      .filter((key:any) => isStringEnumValue(enum_list_loc[key]))
      .map((key:any) => ({ key: key, value: enum_list_loc[key] }));

    // console.log("********************************************");
    // console.log(objArray);
    // console.log("********************************************");

    return objArray

  }

  public getEnumKeyByValue(enum_list:any,searchKey:any){
    // console.log(enum_list+"********************************************"+searchKey);
    let enum_list_loc  = this.getNameEnum(enum_list);
    let res_val        =  Object.keys(enum_list_loc).find(key => enum_list_loc[key].toString() === searchKey.toString()) || null;
    return res_val ;

  }


  // Function to format the value with three digits after the decimal point
  public roundmMontantNumber(value?: number): number {
    try{
      return Number(Number(value).toFixed(3));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(3));
    }
  }

  public roundmQuantiteNumber(value?: number): number {
    try{
      return Number(Number(value).toFixed(2));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(2));
    }
  }

  public roundmTauxNumber(value?: number): number {
    try{
      return Number(Number(value).toFixed(2));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(5));
    }
  }

  public roundmMargeNumber(value?: number): number {
    try{
      return Number(Number(value).toFixed(5));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(5));
    }
  }

  // Function to format the value with three digits after the decimal point
  public roundmMontantString(value?: number): string {
    try{
      return Number(value).toFixed(3);
    }catch(e){
      let zero = 0
      return zero.toFixed(3);
    }
  }

  public roundmQuantiteString(value?: number): string {
    try{
      return Number(value).toFixed(3);
    }catch(e){
      let zero = 0
      return zero.toFixed(3);
    }
  }

  public roundmTauxString(value?: number): string {
    try{
      return Number(value).toFixed(2);
    }catch(e){
      let zero = 0
      return zero.toFixed(5);
    }
  }

  public roundmMargeString(value?: number): string {
    try{
      return Number(value).toFixed(5);
    }catch(e){
      let zero = 0
      return zero.toFixed(5);
    }
  }

  formatDate(date: Date, displayFormat?: string): string {
    // date = this.datePipe.transform(date.toDateString(), 'dd-MM-yyyy')
    ///console.log("-->1-*********format***********> " + date)
    let res_date = formatDate(date, "dd/MM/yyyy", 'en')
    return res_date;
  }

  public static formatDate(date: Date, displayFormat?: string): string {
    // date = this.datePipe.transform(date.toDateString(), 'dd-MM-yyyy')
    ///console.log("-->1-*********format***********> " + date)
    let res_date = formatDate(date, "dd/MM/yyyy", 'en')
    return res_date;
  }

  formatDateTime(inputDate: Date): string {
    //console.log("-->1-*********formatDateTime***********> " + inputDate)
    //////console.log("-->1-*********format***********> " + inputDate)
    const date = new Date(inputDate); ///  "2024-01-26T15:39:12.265Z" to the format "26/01/2024 15:39"
    //console.log("-->2-*********formatDateTime***********> " + date)

   //////// ce traitement appliqué pour POS TICKET////////
    // Vérifier si la chaîne d'entrée est au format "YYYY-MM-DD HH:MM" ///
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (regex.test(inputDate.toString())) {
      // Si oui, extraire les parties de la date
      const [datePart, timePart] = inputDate.toString().split(' ');
      const [year, month, day] = datePart.toString().split('-');
      const [hours, minutes] = timePart.toString().split(':');

      // Reformater la date au format "DD/MM/YYYY HH:MM"
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    if (isNaN(date.getTime())) {
      // throw new Error('Invalid date string');
      return inputDate.toString()
    }

    const day       = date.getUTCDate().toString().padStart(2, '0');
    const month     = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year      = date.getUTCFullYear();
    const hours     = date.getUTCHours().toString().padStart(2, '0');
    const minutes   = date.getUTCMinutes().toString().padStart(2, '0');


    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  formatDateTime_org(inputDate: Date): string {
    //////console.log("-->1-*********format***********> " + inputDate)
    const date = new Date(inputDate); ///  "2024-01-26T15:39:12.265Z" to the format "26/01/2024 15:39"

    if (isNaN(date.getTime())) {
     // throw new Error('Invalid date string');
      return inputDate.toString()
    }

    const day       = date.getUTCDate().toString().padStart(2, '0');
    const month     = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year      = date.getUTCFullYear();
    const hours     = date.getUTCHours().toString().padStart(2, '0');
    const minutes   = date.getUTCMinutes().toString().padStart(2, '0');


    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  public sommeTotalOfItemsByKey(key: string, items:any): number {
    let somme = 0
    try{
      items.forEach((element: any) => {
        // Check if element[key] is a valid number before adding to somme
        let value = Number(element[key]);
        if (!Number.isNaN(value)) {
          somme += value;
        }
      });
    }catch(e){
      somme = 0
    }

    return somme
  }

  public textIsArabic(text:string):boolean {
    var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    let result = pattern.test(text);
    return result;
  };

  getLibelleModeReglement(key:string){
    let modes:any = {1:"Espèce", 2: "Chèque", 3:"Traite", 4:"Virement", 5:"Versement"}
    return modes[key]
  }

  public listStringOfArrayObject(listObj:any,searchKey:any){
    var resultList = listObj.map((a:any) => a[searchKey]);
    return resultList
  }

  public setDateReel(date_loc:any){
    // let today         = new Date(date_loc)
    // let myToday_Start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);
    // return myToday_Start

    let adaptDate         = new Date(date_loc);
    const currentDate: Date = new Date();
    let myToday_Start = new Date(adaptDate.getFullYear(), adaptDate.getMonth(), adaptDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());

    let res_date:any =  formatDate(myToday_Start, 'yyyy-MM-dd HH:mm', 'en')
    console.log("********setDateReel***************"+res_date)
    return res_date

  }

  getPrivilegeAccess(){

    let isAdminBongest:boolean    = false
    let isSuperAdminGroup:boolean = false
    let isAdminSociete:boolean    = false
    let isUser:boolean            = false

    if (this.tokenService.user && 'adminBonGest' in this.tokenService.user) {
      isAdminBongest = (this.tokenService.user as any).adminBonGest;
    }
    if (this.tokenService.user && 'isSuperAdminGroup' in this.tokenService.user) {
      isSuperAdminGroup = (this.tokenService.user as any).isSuperAdminGroup;
    }
    if (this.tokenService.user && 'isAdminSociete' in this.tokenService.user) {
      isAdminSociete = (this.tokenService.user as any).isAdminSociete;
    }
    if(isAdminBongest==false && isSuperAdminGroup==false && isAdminSociete==false){
      isUser = true
    }

    let listPrivilege:any = {
      isAdminBongest: isAdminBongest, isSuperAdminGroup:isSuperAdminGroup , isAdminSociete:isAdminSociete , isUser:isUser
    }

    return listPrivilege

  }

  get_params_general(item_search:any){
    let result:any =""
    try{
      let paramsGen:any =  this.tokenService.getParamsGeneral()

      if(item_search=='pos_default_client'){result = paramsGen.RESULTAT[0].valeur.pos_vente.pos_default_client}

    }catch (e) {
      console.log("*************get_params_general >> errror**************",e)
    }
    console.log(item_search+"*************get_params_general**************",result)
    return result
  }

}
