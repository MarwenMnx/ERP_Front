import { AbstractControl, FormGroup, ValidatorFn  } from "@angular/forms";
import { throwError } from "rxjs";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AppDateAdapter } from "./utils/dateAdapter/date.adapter";
import moment from 'moment';
import { formatDate } from "@angular/common";
import {enum_modeReglement} from "./global-enums";

  export function onBlurInputMontant(event: any) {
    const enteredValue = parseFloat(event.target.value);
    event.target.value = roundmMontantString(enteredValue);
  }

  // Function to format the value with three digits after the decimal point
  export function roundmMontantNumber(value: number): number {
    try{
      if(isNaN(Number(Number(value).toFixed(3)))) return 0

      return Number(Number(value).toFixed(3))

    }catch(e){
      let zero = 0
      return Number(zero.toFixed(3));
    }
  }

  export function roundmQuantiteNumber(value: number): number {
    try{
      return Number(Number(value).toFixed(3));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(3));
    }
  }

  export function roundmTauxNumber(value: number): number {
    try{
      return Number(Number(value).toFixed(2));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(5));
    }
  }

  export function roundmMargeNumber(value: number): number {
    try{
      return Number(Number(value).toFixed(5));
    }catch(e){
      let zero = 0
      return Number(zero.toFixed(5));
    }
  }

  // Function to format the value with three digits after the decimal point
  export function roundmMontantString(value: number): string {
    try{
      return Number(value).toFixed(3);
    }catch(e){
      let zero = 0
      return zero.toFixed(3);
    }
  }

  export function roundmQuantiteString(value: number): string {
    try{
      return Number(value).toFixed(3);
    }catch(e){
      let zero = 0
      return zero.toFixed(3);
    }
  }

  export function roundmTauxString(value: number): string {
    try{
      return Number(value).toFixed(2);
    }catch(e){
      let zero = 0
      return zero.toFixed(5);
    }
  }

  export function roundmMargeString(value: number): string {
    try{
      return Number(value).toFixed(5);
    }catch(e){
      let zero = 0
      return zero.toFixed(5);
    }
  }

  export function setObjets1ToObjets2(Objets1:any, Objets2:any, toObjets1:boolean){
    for (let key of Object.keys(Objets2)){
      if(toObjets1){
        Objets1[key] = Objets2[key]
      }else{
        Objets2[key] = Objets1[key]
      }
    }
    if(toObjets1){
      return Objets1
    }else{
      return Objets2
    }
  }

  export function getData(items:any) {
    let newItems = []
    for (let key of Object.keys(items)){
      newItems.push(items[key])
    }
    return newItems
  }


  export function notEqualToZero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if(value ==undefined || isNaN(value)){
        return { 'notEqualToZero': true };
      }else{
        if (value != 0) {
          return null; // Return null if the value is not zero
        } else {
          return { 'notEqualToZero': true }; // Return an error object if the value is zero
        }
      }

    };
  }


  export function showLoading(message = 'Chargement...'): void {
    Swal.fire({
      title: message ? message : 'Chargement...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  export function hideLoading(): void {
    setTimeout(()=>{
      Swal.close()
    },50)
    //succesAlerteAvecTimer("", 50)
  }

  export function showAlertSucess(title: string, message: string): void {
    Swal.fire(title, message, 'info');
  }

  export function showAlertError(title: string, message: string): void {
    Swal.fire(title, message, 'error');
  }

  export function showAlertErrorHTML(title: string, message: string): void {
    Swal.fire({
      title: title,
      html: message,
      icon: 'error'
    });
  }

  export function showAlertInfoHTML(title: string, message: string): void {
    Swal.fire({
      title: title,
      html: message,
      icon: 'info'
    });
  }

  export function showConfirmationDialog(
    title: string,
    message: string,
    icon: SweetAlertIcon = 'warning'
  ): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON',
    });
  }

  export async function showConfirmationDialogAsync(
    title: string,
    message: string,
    icon: SweetAlertIcon = 'warning'
  ): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }

  export function succesAlerteAvecTimer(message: string, timer=3000): void {
    Swal.fire({
      icon: 'success',
      title: 'Succès!',
      text: message,
      timer: timer, // Ferme l'alerte après 3 secondes (3000 ms)
      timerProgressBar: true,
    });
  }

  export function erreurAlerteAvecTimer(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Erreur!',
      text: message,
      timer: 3000, // Ferme l'alerte après 3 secondes (3000 ms)
      timerProgressBar: true,
    });
  }

export function erreurToast(message: string): void {
  Swal.fire({
    icon: 'error',
    title: 'Erreur!',
    text: message,
    toast: true, // Display as a toast notification
    position: 'top', // Position the toast at the top-end corner
    showConfirmButton: true // Hide the "OK" button in the toast
  });
}

export function handleError(error: any) {
  try{
    if(error.error.MESSAGE)
      showAlertError('Erreur!', error.error.MESSAGE);
    else if(error.error.RESULTAT)
      showAlertError('Erreur!', error.error.RESULTAT);
    else if(error.error && error.error === "Forbidden"){
      showAlertError('Erreur!', error.error);
    }
  }catch(e){
    showAlertError('Erreur!', '');
  }
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Handle client error
    errorMessage = error.error.message;
  } else {
    // Handle server error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }

  return throwError(() => {
    errorMessage;
  });

}

//check string if objectId or no
export function isObjectIdMongoose(_id:string | undefined){
  if(!_id) return false
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    return true
  } else {
    return false
  }
}

export function getPatternOfNumeroTelephone(){
  return '[- +()0-9]+'
}
//up to adapter_date
export function getDateByForma(date:Date, format?:string){
  if(!date) return ""
  return AppDateAdapter.formatStatic(date, format ? format : 'DD/MM/YYYY')
}
/*Get date by heure*/
// export function getDateHeure(date:Date, format?:string){
//   if(!date) return ""
//   return AppDateAdapter.formatDateHeure(date, format ? format : 'DD/MM/YYYY , h:mm')
// }


export function  dateVaidator(AC: AbstractControl) {
  if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
    return { 'dateVaidator': true };
  }
  return null;
}

export function markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      markFormGroupTouched(control,);
    }
  });

}

export function markInputsAsTouchedByClass() {
  const elements = document.getElementsByClassName('autoCompleteClassSelectorRequired');

  // Convert the HTMLCollection to an array to use forEach
  const elementsArray = Array.from(elements);

  elementsArray.forEach((element:any) => {
    element.focus();
    /*setTimeout(() => {
      element.blur();
    }, 1000); // Adjust the delay (in milliseconds) as needed*/
  });

}

export function getDateInput(date:Date, format?:string){
  if(!date) return ""
  let str =  formatDate(date, format ? format : 'dd/MM/yyyy', 'en')
  return str
}
 export function parseEnumToObject(enum_list:any){

  function isStringEnumValue(value: string | number): value is string {
    return typeof value === 'string';
  }

// Convert enum values to an array of objects (excluding numeric values)
  const objArray = Object.keys(enum_list)
    .filter((key:any) => isStringEnumValue(enum_list[key]))
    .map((key:any) => ({ key: key, value: enum_list[key] }));

  // console.log("********************************************");
  // console.log(objArray);
  // console.log("********************************************");

  return objArray

}

export function parseNumberArround(value: number): number {
  try{
    if(isNaN(Number(Number(value).toFixed(3)))) return 0

    let resultat = parseFloat(value.toFixed(3));
    return resultat

  }catch(e){
    let zero = 0
    return Number(zero.toFixed(3));
  }
}
