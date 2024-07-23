

export class DataParamRoute {
    title: string;
    pageList: string ;
    pageDetails: string ;
    pageModifie: string ;
    pageAjoute: string ;
    uriDocApi: string;
    apiGetByIdDocumentPrecedent: string;
    apiGetDocuments: string;
    titleButton: string ;

    apiGetDocumentsPrecedentByTier?:string; 
    titreDocumentPrecedent?: string ;
    tableDocumentPrecedent?: string ;
    withCheckMultipleDocumentPrecedent?:boolean
    apiGetMultipleDocumentPrecedent?:string
    withReglementDocumentPrecedent?:boolean
    withBlockageIfExisteDocSuivante?:boolean
    withReglementDocPrecedent?:boolean
    withDocumentPrecedent?:boolean
    withBonCommandeClient?:boolean
    withTransporteur?:boolean
    withReglement?:boolean
    withQuantiteRestante?:boolean
    withCheckQuantiteStock?:boolean
    withCheckQuantiteRestante?:boolean
    withCheckSolde?:boolean
    withNotCheckSoldeIfWithDocPrecedent?:boolean

    withTimbreFiscal?:boolean
    withControlDocEtDateFournisseur?:boolean
    type_doc_reg?:string
    withDocFournisseur?:Boolean

    estDocumentPrecedentTicket?:Boolean
    
    getDocPrecedentbloquante?:Boolean

    constructor(dataParamRoute?: any) {
        this.title = dataParamRoute ? dataParamRoute.title : ''
        this.titreDocumentPrecedent= dataParamRoute ? dataParamRoute.titreDocumentPrecedent : ''
        this.titleButton= dataParamRoute ? dataParamRoute.titleButton : ''
        this.pageList= dataParamRoute ? dataParamRoute.pageList : ''
        this.pageDetails= dataParamRoute ? dataParamRoute.pageDetails : ''
        this.pageModifie= dataParamRoute ? dataParamRoute.pageModifie : ''
        this.pageAjoute= dataParamRoute ? dataParamRoute.pageAjoute : ''
        this.uriDocApi= dataParamRoute ? dataParamRoute.uriDocApi : ''
        
        this.apiGetByIdDocumentPrecedent= dataParamRoute ? dataParamRoute.apiGetByIdDocumentPrecedent : ''
        this.apiGetDocumentsPrecedentByTier = dataParamRoute ? dataParamRoute.apiGetDocumentsPrecedentByTier : ''
        this.tableDocumentPrecedent = dataParamRoute ? dataParamRoute.tableDocumentPrecedent : ''
        this.withCheckMultipleDocumentPrecedent = dataParamRoute ? dataParamRoute.withCheckMultipleDocumentPrecedent : false

        this.apiGetDocuments= dataParamRoute ? dataParamRoute.apiGetDocuments : ''
        this.withDocumentPrecedent = dataParamRoute ? dataParamRoute.withDocumentPrecedent : undefined
        this.withBonCommandeClient = dataParamRoute ? dataParamRoute.withBonCommandeClient : undefined
        this.withTransporteur = dataParamRoute ? dataParamRoute.withTransporteur : undefined
        this.withReglement = dataParamRoute ? dataParamRoute.withReglement : undefined
    }
}