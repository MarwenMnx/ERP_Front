import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '@vex/utils/track-by';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from 'src/app/services/token.service';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionReadyEvent ,ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import {showAlertSucess} from "../../../../../global-functions";
import { TranslateService, TranslateModule } from '@ngx-translate/core';


export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    NgFor,
    MatRippleModule,
    RouterLink,
    NgClass,
    NgIf,
    TranslateModule,
    //ServiceWorkerModule.register('ngsw-worker.js',{enabled:false,})
  ]
})
export class ToolbarUserDropdownComponent implements OnInit {

  isOnline: boolean;
  modalVersion: boolean;
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;

  items: MenuItem[] = [
    {
      id: '1',
      icon: 'mat:account_circle',
      label: 'Email',
      description:  this.tokenService.user!=null && this.tokenService.user.email != null ? this.tokenService.user.email : '' +'<br>'+
      (this.tokenService.user ? this.tokenService.societeCourante.code_unique : ''),
      colorClass: 'text-teal-600',
      route: '/apps/social'
    },
    {
      id: '2',
      icon: 'mat:move_to_inbox',
      label: 'Societé / Pointe du vente',
      description: this.tokenService.user ? this.tokenService.societeCourante.code_unique + " - " +this.tokenService.societeCourante.raisonSociale+ " / " +this.tokenService.pointVenteCourante.code_unique + ' - ' +this.tokenService.pointVenteCourante.libelle : '',
      colorClass: 'text-primary-600',
      route: '/apps/chat'
    },
    {
      id: '3',
      icon: 'mat:list_alt',
      label: 'Exercice',
      description: this.tokenService.user ? this.tokenService.exerciceCourante.annee_exercice: '',
      colorClass: 'text-amber-600',
      route: '/apps/scrumboard'
    },
    {
      id: '4',
      icon: 'mat:table_chart',
      label: 'Rôle',
      description: this.tokenService.societeCourante ? this.tokenService.societeCourante.role.libelle : '',
      colorClass: 'text-purple-600',
      route: '/pages/pricing'
    }
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: 'mat:check_circle',
      colorClass: 'text-green-600'
    },
    {
      id: 'away',
      label: 'Away',
      icon: 'mat:access_time',
      colorClass: 'text-orange-600'
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: 'mat:do_not_disturb',
      colorClass: 'text-red-600'
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: 'mat:offline_bolt',
      colorClass: 'text-gray-600'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;

  constructor(
    private cd: ChangeDetectorRef,
    private popoverRef: VexPopoverRef<ToolbarUserDropdownComponent>,
    public tokenService:TokenService ,
    private platform: Platform,
    private swUpdate: SwUpdate,
    private translate: TranslateService

  ) {
  this.isOnline = false;
  this.modalVersion = false;
}

  ngOnInit() {
    this.updateOnlineStatus();

    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map((evt: any) => {
          console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        }),
      );
    }

    this.loadModalPwa();
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
   // showAlertSucess(`isOnline=[${this.isOnline}]`,'info')
    console.info(`this.activeStatus=[${this.activeStatus}]`);
    this.activeStatus = this.isOnline == true ? this.statuses[0] : this.statuses[3]

    console.log("----------------",this.activeStatus);
     // (window.navigator.serviceWorker.ready as any).then((swRegistration:any)=>swRegistration.syncManager?.register('post-data'))
     //  .catch(console.log);
     //



  }

  async urlSync(){
    // reference registration
    const registration = await navigator.serviceWorker.ready;
    // feature detection
    if ("periodicSync" in registration) {
      // Background Periodic Sync functionality
      const periodicSync = registration.periodicSync;
    }
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload();
    console.log("i saved language",lang);
    
  }

  close() {
    this.popoverRef.close();
  }
}
