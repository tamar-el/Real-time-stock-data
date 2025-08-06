
import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-nav-days',
  imports: [NgFor, NgIf],
  templateUrl: './nav-days.component.html',
  styleUrl: './nav-days.component.css'
})
export class NavDaysComponent {
  chosenStocklPeriod: string = 'month'; // Default fuel type
  //שם המשתנה שיקרא באבnotifyParentDay
  @Output() notifyParentPeriod = new EventEmitter<string>();
  periods = ['year', 'quarter', 'month', 'week']; 

  onStockDayeClick(fuelDay: string): void {
    console.log(`Selected fuel type: ${fuelDay}`);
    this.chosenStocklPeriod = fuelDay;
    this.notifyParentPeriod.emit(this.chosenStocklPeriod); // Emit the selected fuel day to the parent component
  }
  isSelected(type: string): boolean {
    return this.chosenStocklPeriod === type; // Check if the given fuel day is selected
  }
    
}