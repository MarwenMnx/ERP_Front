import { PointVente } from "src/app/services/token.service";
import { Excercice } from "../../exercices/models/exercice.model";
import { Role } from "../../role_users/models/role.model";

export class Societe {
  _id?: string
  id_unique: number;
  code_unique: string;
  raisonSociale: string;
  matriculeFiscale: string;
  responsable: string;
  cin_responsable: string;
  telephone: string;
  mobile: string;
  fax: string;
  address: string;
  email: string;
  pays: string;
  gouvernorat: string;
  delegation: string;
  codePostale: string;
  rib: string;
  imagePath: string;
  exemptTimbreFiscale?: boolean;
  exemptVAT?: boolean;
  dateLancementSystem: Date;
  exercices?: Excercice[]
  point_ventes?: PointVente[]
  role?:Role
  sessionCaisses?:Boolean
  possedeCaisse?:Boolean

  constructor(societe?: any) {
    this._id = societe._id ? societe._id : ""
    this.id_unique = societe.id_unique ? societe.id_unique : undefined
    this.code_unique = societe.code_unique ? societe.code_unique : ""
    this.raisonSociale = societe.raisonSociale ? societe.raisonSociale : ""
    this.matriculeFiscale = societe.matriculeFiscale ? societe.matriculeFiscale : ""
    this.responsable = societe.responsable ? societe.responsable : ""
    this.cin_responsable = societe.cin_responsable ? societe.cin_responsable : ""
    this.telephone = societe.telephone ? societe.telephone : ""
    this.mobile = societe.mobile ? societe.mobile : ""
    this.fax = societe.fax ? societe.fax : ""
    this.address = societe.address ? societe.address : ""
    this.email = societe.email ? societe.email : ""
    this.pays = societe.pays ? societe.pays : ""
    this.gouvernorat = societe.gouvernorat ? societe.gouvernorat : ""
    this.delegation = societe.delegation ? societe.delegation : ""
    this.codePostale = societe.codePostale ? societe.codePostale : ""
    this.rib = societe.rib ? societe.rib : ""
    this.imagePath = societe.imagePath ? societe.imagePath : ""
    this.exemptTimbreFiscale = societe.exemptTimbreFiscale ? societe.exemptTimbreFiscale : false
    this.exemptVAT = !societe.exemptVAT ? false : societe.exemptVAT
    this.dateLancementSystem = societe.dateLancementSystem ? societe.dateLancementSystem : ""
  }
}



