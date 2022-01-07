import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { FundDetails } from './fund-details.model';
import { Schemes } from './schemes.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  getMutualFundsByKeyword(searchValue: string){
    return this.httpClient.get<Schemes[]>(`https://api.mfapi.in/mf/search?q=`+searchValue);
  }

  getMutualFundBySchemeCode(schemeCode: number){
    return this.httpClient.get<FundDetails>(`https://api.mfapi.in/mf/`+schemeCode);
  }
}
