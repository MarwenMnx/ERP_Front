
export class Role {
  _id?:             string;
  libelle:          string;
  default_page:     string;
  modules:          any;
  adminBonGest: boolean;
  isSuperAdminGroup: boolean;
  isAdminSociete: boolean;

    constructor(role?: any) {
      this._id                = role?._id         ;
      this.libelle            = role?.libelle      ;
      this.default_page       = role?.default_page ;
      this.modules            = role?.modules      ;
      this.adminBonGest       = role?.adminBonGest;
      this.isSuperAdminGroup  = role?.isSuperAdminGroup;
      this.isAdminSociete     = role?.isAdminSociete;
    }
  }

export interface list_acces {
  access_list: string
}

export interface IRole{
  _id:                  string | null;
  libelle:              string | null;
  default_page:         string | null;
  modules:              string | null;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


