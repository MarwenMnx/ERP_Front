import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BonService } from '../../societe-service.service';
import { mergeMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'vex-bon',
  templateUrl: './bon.component.html',
  styleUrls: ['./bon.component.scss'],
  standalone: true
})
export class BonComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
} 