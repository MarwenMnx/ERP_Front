import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import {LoginComponent} from "./login/login.component";

export const appRoutes: VexRoutes = [

  
  { path: ':key/login', component: LoginComponent, pathMatch: 'prefix' },

   
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./login/login.component').then(
  //       (m) => m.LoginComponent
  //     )
  // },

  {
    path: 'error-404',
    loadComponent: () =>
      import('./erp_params/error-404/error-404.component').then(
        (m) => m.Error404Component
      )
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        loadChildren: () => import('./erp_params/erp_params.module').then(module => module.ShopsModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_documents_achat/base-document-achat.module').then(module => module.BaseDocumentAchatModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_documents_vente/base-document-vente.module').then(module => module.BaseDocumentVenteModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_stock/boncasse/base-document-casse.module').then(module => module.BaseDocumentCasseModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_stock/correction-stock/correction-stock.module').then(module => module.CorrectionStockModule),
      },

      {
        path: '',
        loadChildren: () => import('./erp_stock/bonentree/base-document-entree.module').then(module => module.BaseDocumentEntreeModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_stock/bonsorties/base-document-sorties.module').then(module => module.BaseDocumentSortiesModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_stock/demande-alimentation-stock/base-document-demande-alimentation.module').then(module => module.BaseDocumentDemandeAlimentationModule),
      },
      {
        path: '',
        loadChildren: () => import('./erp_stock/correction-stock/base-document-correction.module').then(module => module.BaseDocumentCorrectionModule),
      }
    ]
  },
  {
    path: "**",
    redirectTo: "error-404",
  },
];
