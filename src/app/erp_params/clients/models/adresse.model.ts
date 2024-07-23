export class AdresseLivraison {
    _id:          string;
    titre:        string;
    pays :        string;
    gouvernorat:  string;
    delegation:   string;
    localite:     string;
    codePostale:  number;
    adresse:      string;
    url_maps:     string;
    longitude:    string;
    latitude:     string;

    constructor(adress?: any) {
        this._id          = adress?._id || ''
        this.titre        = adress?.titre  || ''
        this.pays         = adress?.pays  || ''
        this.gouvernorat  = adress?.gouvernorat || ''
        this.delegation   = adress?.delegation || ''
        this.localite     = adress?.localite || ''
        this.codePostale  = adress?.codePostale || ''
        this.adresse      = adress?.adresse || ''
        this.url_maps     = adress?.url_maps || '';
        this.longitude    = adress?.longitude || '';
        this.latitude     = adress?.latitude || '';
    }
}


