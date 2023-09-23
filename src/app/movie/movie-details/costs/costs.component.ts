import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CostModel } from 'src/app/shared/Interface/cost.model';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent {

  @Input() costs: CostModel[];
  @Output() onCostClick: EventEmitter<CostModel> = new EventEmitter;

  onCostClicked = (cost: CostModel) =>{
    this.onCostClick.emit(cost);
  }
}
