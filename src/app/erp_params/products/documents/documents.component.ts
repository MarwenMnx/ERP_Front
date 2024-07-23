import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  type: string;
  titre: string;
  visualiser: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { type: 'Type 1', titre: 'Title 1', visualiser: 'Visualizer 1' },
  { type: 'Type 2', titre: 'Title 2', visualiser: 'Visualizer 2' },
  // ... Add other data as needed
];

@Component({
  selector: 'vex-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})
export class DocumentsComponent {
  displayedColumns: string[] = ['type', 'titre', 'visualiser'];
  dataSource = ELEMENT_DATA;
}
