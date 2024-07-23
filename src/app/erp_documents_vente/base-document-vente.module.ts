import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDocumentVenteRoutingModule } from './base-document-vente-routing.module';
import { ModalDocLignesComponent } from './components/modal-doc-lignes/modal-doc-lignes.component';
import { ListeLigneAccordionComponent } from './components/liste-ligne-accordion/liste-ligne-accordion.component';

@NgModule({
  declarations: [
  
    
   ],
  imports: [
    CommonModule,
    BaseDocumentVenteRoutingModule
  ]
})
export class BaseDocumentVenteModule { }
