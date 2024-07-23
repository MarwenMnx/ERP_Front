import { Component, WritableSignal, computed, signal } from '@angular/core';
import { SocieteService } from '../../societe-service.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vex-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule]
})
export class TestCardComponent {
  private _societeActive: WritableSignal<number | undefined> = signal(undefined);
  societeActive = computed(() => this._societeActive()?.toString() ?? '');

  constructor(private societeService: SocieteService, private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.societeService.getAllSocietes().subscribe((data: any) => {
      let responseData = data.RESULTAT;
      this._societeActive.set(responseData.actives);
    });
  }
}
