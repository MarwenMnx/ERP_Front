import { Component } from '@angular/core';
import { venteService1 } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';


@Component({
  selector: 'vex-ventenet',
  templateUrl: './ventenet.component.html',
  styleUrls: ['./ventenet.component.scss'],
  standalone : true,
  imports: [WidgetQuickValueCenterComponent]
})
export class VentenetComponent {
  societeActive: any;

  constructor(private venteService1: venteService1) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.venteService1.getvente1().subscribe((data: any) => {
      console.log(data);
      this.societeActive = data.RESULTAT + ' TND';
    });
  }


}
