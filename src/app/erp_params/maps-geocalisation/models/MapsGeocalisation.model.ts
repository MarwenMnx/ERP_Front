
export class MapsGeocalisation {
    _id?:       string;
    longitude:  number;
    latitude:   number;
    adresse:    string;
    url_maps:   string;

    constructor(mapsGeo: any) {
      this._id        = mapsGeo._id;
      this.longitude  = mapsGeo.longitude;
      this.latitude   = mapsGeo.latitude;
      this.adresse    = mapsGeo.adresse;
      this.url_maps   = mapsGeo.url_maps;
    }
  }

export interface ReponseList{
  MESSAGE:string;
  OK: Boolean;
  RESULTAT:any
}

