

export class DataParamRoute {
    title: string;
    titreDocumentPrecedent: string ;
    pageList: string ;
    pageDetails: string ;
    pageModifie: string ;
    pageAjoute: string ;
    apiAjoute: string ;
    apiParametres: string ;
    apiModifie: string ;
    apiGetById: string ;
    apiGetByIdDocumentPrecedent: string ;
    apiGetDocuments: string ;

    constructor(dataParamRoute?: any) {
        this.title = dataParamRoute ? dataParamRoute.title : ''
        this.titreDocumentPrecedent= dataParamRoute ? dataParamRoute.titreDocumentPrecedent : ''
        this.pageList= dataParamRoute ? dataParamRoute.pageList : ''
        this.pageDetails= dataParamRoute ? dataParamRoute.pageDetails : ''
        this.pageModifie= dataParamRoute ? dataParamRoute.pageModifie : ''
        this.pageAjoute= dataParamRoute ? dataParamRoute.pageAjoute : ''
        this.apiAjoute= dataParamRoute ? dataParamRoute.apiAjoute : ''
        this.apiParametres= dataParamRoute ? dataParamRoute.apiParametres : ''
        this.apiModifie= dataParamRoute ? dataParamRoute.apiModifie : ''
        this.apiGetById= dataParamRoute ? dataParamRoute.apiGetById : ''
        this.apiGetById= dataParamRoute ? dataParamRoute.apiGetById : ''
        this.apiGetByIdDocumentPrecedent= dataParamRoute ? dataParamRoute.apiGetByIdDocumentPrecedent : ''
        this.apiGetDocuments= dataParamRoute ? dataParamRoute.apiGetDocuments : ''
    }
}