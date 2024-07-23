// import { Component, WritableSignal, computed, signal} from '@angular/core';
// import { factureService } from '../../societe-service.service';
// import { Chart, registerables } from 'chart.js';
// import { WidgetQuickValueCenterComponent } from 'src/app/pages copy/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';


// @Component({
//   selector: 'vex-nombrefacture',
//   templateUrl: './nombrefacture.component.html',
//   styleUrls: ['./nombrefacture.component.scss'],
//   standalone : true,
//   imports: [WidgetQuickValueCenterComponent]

// })
// export class NombrefactureComponent {
//   societeActive: any;

//   constructor(private factureService: factureService) {
//     Chart.register(...registerables);
//   }

//   ngAfterViewInit() {
//     this.loadChartData();
//   }

//   loadChartData() {
//     this.factureService.getFacturesActives().subscribe((data: any) => {
//       console.log(data);
//       this.societeActive = data.RESULTAT;
//     });
//   }



// }
