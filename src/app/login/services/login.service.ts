import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import {UpperCasePipe} from "@angular/common";
import {NavigationLoaderService} from "../../core/navigation/navigation-loader.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private tokenService:TokenService, private router:Router , private navLoad:NavigationLoaderService) {

  }

  sucessLogin(res:any){
    if(res.OK){
      this.tokenService.saveToken(res.RESULTAT.accessToken)
      this.tokenService.saveRefreshToken(res.RESULTAT.refreshToken)
      this.tokenService.saveUser(res.RESULTAT.user)
    }else{
      alert(res.MESSAGE)
    }
  }

  navigateToDashbord(to_page:any){
    this.navLoad.loadNavigation()
    this.router.navigate([to_page]);
    // this.router.navigate(["/"+to_page]);
  }

}
