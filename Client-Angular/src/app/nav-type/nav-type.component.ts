
import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-nav-type',
  imports: [NgFor],
  templateUrl: './nav-type.component.html',
  styleUrls: ['./nav-type.component.css']
})
export class NavTypeComponent {
  chosenStockType: string = 'AAPL';
  @Output() notifyParentType = new EventEmitter<string>(); 
  companyTypes = ['AAPL', 'MSEFT', 'GOOG', 'NVDA', 'TSLA']; // List of fuel types
  
  onStockTypeClick(fuelType: string): void {
    this.chosenStockType = fuelType;
    this.notifyParentType.emit(this.chosenStockType);
  }

  isSelected(type: string): boolean {
    return this.chosenStockType === type;
  }
}
