export class Contact {
  _id: string;
  typeContact :string;
  titre:string;
  civilite: string;                    
  nomPrenom: string;
  telephone: number;
  mobile: string;
  email:string;
  remarque:string;
 
  constructor(contact?: any) {
      this._id = contact?._id || '';
      this.typeContact = contact?.typeContact || '';
      this.titre = contact?.titre || '';
      this.civilite = contact?.civilite || 'Mr';
      this.nomPrenom = contact?.nomPrenom || '';
      this.telephone = contact?.telephone || '';
      this.mobile = contact?.mobile || '';
      this.email = contact?.email || '';
      this.remarque = contact?.remarque || '';
  }
}
  
//     get name() {
//       let name = '';
  
//       if (this.firstName && this.lastName) {
//         name = this.firstName + ' ' + this.lastName;
//       } else if (this.firstName) {
//         name = this.firstName;
//       } else if (this.lastName) {
//         name = this.lastName;
//       }
  
//       return name;
//     }
  
//     set name(value) {}
  
//     get address() {
//       return `${this.street}, ${this.zipcode} ${this.city}`;
//     }
  
//     set address(value) {}
//   }
  

