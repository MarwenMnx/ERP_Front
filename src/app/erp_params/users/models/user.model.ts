export class User {
    _id?: string;
    login: string;
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    password: string;
    passwordConfirm: string;
    adresse: string;
    codeForgotPassword: string;
    possedeCaisse: boolean;
    sessionCaisses: boolean;
    societes: any;
    adminBonGest: boolean;
    isSuperAdminGroup: boolean;
    isAdminSociete: boolean;

    constructor(user: any) {
      this._id                = user._id;
      this.nom                = user.nom;
      this.prenom             = user.prenom;
      this.telephone          = user.telephone;
      this.login              = user.login;
      this.email              = user.email;
      this.password           = user.password;
      this.passwordConfirm    = user.passwordConfirm;
      this.adresse            = user.adresse;
      this.codeForgotPassword = user.codeForgotPassword;
      this.possedeCaisse      = user?.possedeCaisse;
      this.sessionCaisses     = user?.possedeCaisse;
      this.societes           = user?.societes;
      this.adminBonGest       = user?.adminBonGest;
      this.isSuperAdminGroup  = user?.isSuperAdminGroup;
      this.isAdminSociete     = user?.isAdminSociete;

    }
  }

export interface IUser{
     _id: string | null;
    login :string | null;
    nom :string | null;
    prenom :string | null;
    telephone :string | null;
    email:string | null;
    password :string | null;
    passwordConfirm :string | null;
    adresse: string | null;
    codeForgotPassword :string | null;
    possedeCaisse :string | true | undefined;
    sessionCaisses :string | true | undefined;
}

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;

  RESULTAT:any
}


