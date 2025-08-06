
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit, OnChanges {
@Input() company: string = '';
@Input() stockPrice: number | null = null;
@Input()change: number = 1;
@Input() firstPrice: number = 0;
@Input() lastPrice: number = 0;
  
//מציג מגמת הגרף עולה\יורד
  readonly TREND_UP = '0,35 20,25 40,15 60,10 80,5 100,2';
  readonly TREND_DOWN = '0,5 20,10 40,20 60,30 80,35 100,38';

  get trendSvgPoints(): string {
    return this.change >= 0 ? this.TREND_UP : this.TREND_DOWN;
  }

  get changeColor(): string {
    return this.change >= 0 ? 'green' : 'red';
  }

  get changeSymbol(): string {
    return this.change >= 0 ? '+' : '';
  }

  ngOnInit(): void {
    this.calculateChange();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateChange();
  }

  calculateChange(): void {
    if (this.firstPrice && this.lastPrice) {
      this.change = ((this.lastPrice - this.firstPrice) / this.firstPrice) * 100;
    } else {
      this.change = 0; // Default value if firstPrice or lastPrice is not available
    }
  }
}
