import { Component, WritableSignal, computed, signal } from '@angular/core';
import { venteService } from '../../societe-service.service';
import { Chart, registerables } from 'chart.js';
import { WidgetQuickValueCenterComponent } from 'src/app/pages/pages/dashboards/components/widgets/widget-quick-value-center/widget-quick-value-center.component';

@Component({
  selector: 'vex-vente-ttc',
  templateUrl: './vente-ttc.component.html',
  styleUrls: ['./vente-ttc.component.scss'],
  standalone: true,
  imports: [WidgetQuickValueCenterComponent]
})
export class VenteTTCComponent {
  societeActive: any;

  constructor(private bonlivraisonService: bonlivraisonService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.bonlivraisonService.getlivraison().subscribe((data: any) => {
      console.log(data);
      this.societeActive = data.RESULTAT;
    });
  }

}
