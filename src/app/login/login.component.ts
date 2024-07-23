import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Event, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink} from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginHttpService } from './services/login-http.service';
import { LoginService } from './services/login.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ListSocieteModalComponent } from './components/list-societe-modal/list-societe-modal.component';
import { hideLoading, showLoading, succesAlerteAvecTimer } from '../global-functions';
import {TokenService} from "../services/token.service";

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule
  ]
})
export class LoginComponent {

  inputType = 'password';
  visible = false;
  title = 'detect-route-change-from-login';
  currentRoute: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private loginhttpservice: LoginHttpService,
    private loginservice: LoginService,
    private tokenService:TokenService
  ) {

    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentRoute = event.url;
        if(this.currentRoute.includes("/login")){
          let grp =  this.currentRoute.split("/");
          this.tokenService.savePrefix_Grp(grp[1])
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    console.log("888888888888888888888")
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ListSocieteModalComponent, {
      data: {name: ''},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
     // if(result === true){
      console.log("************dialogRef.afterClosed()*********",result)
      if(result != false){
        // switch (result.libelle.toUpperCase()) {
        //   case "CAISSIER" :
        //     this.loginservice.navigateToDashbord("erp_pos/caisse");
        //     break
        //   case "ADMINISTRATEUR" :
        //     this.loginservice.navigateToDashbord("products");
        //     break
        //   case "SUPER ADMIN" :
        //     this.loginservice.navigateToDashbord("products");
        //     break
        //   default :
        //     this.loginservice.navigateToDashbord("login")
        //     break
        // }
        this.loginservice.navigateToDashbord(result.default_page)
      }else{
        this.loginservice.navigateToDashbord("login")
      }
    });
  }

  form = this.fb.group({
    login: ['', Validators.required],
    //email: ['', Validators.email],
    password: ['', [ Validators.required, Validators.minLength(6)]],
    prefix_grp : this.tokenService.getPrefix_Grp()
  });

  send() {
    if (!this.form.valid) return
    showLoading()
    this.loginhttpservice.login(this.form.value).subscribe((res) => {
      hideLoading()
      this.loginservice.sucessLogin(res)
      if(res.OK){
        this.openDialog()
      }
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}

