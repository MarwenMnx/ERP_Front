import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface ElementData {
  fournisseur: string;
  nDoc: number;
  date: string;
  quantitRemise: number;
  prixAchatHT: number;
  fidelite: string;
  documents: string;
}

const ELEMENT_DATA: ElementData[] = [
  { fournisseur: 'Supplier 1', nDoc: 12345, date: '2023-11-20', quantitRemise: 5, prixAchatHT: 100, fidelite: 'Yes', documents: 'Doc1' },
  // Add more data here as needed
];

@Component({
  selector: 'vex-historiqueachat',
  templateUrl: './historiqueachat.component.html',
  styleUrls: ['./historiqueachat.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})
export class HistoriqueachatComponent {
  displayedColumns: string[] = ['fournisseur', 'nDoc', 'date', 'quantitRemise', 'prixAchatHT', 'fidelite', 'documents'];
  dataSource = ELEMENT_DATA;
}
