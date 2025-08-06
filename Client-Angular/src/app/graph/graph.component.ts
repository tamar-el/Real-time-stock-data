// GraphComponent.ts
  import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Input,
    Output,
    EventEmitter,
  } from '@angular/core';
  import { StockService } from '../service/stock.service';
  import { Chart, registerables } from 'chart.js';
  import { BaseChartDirective } from 'ng2-charts';
  import 'chartjs-adapter-date-fns';
  import { LoadingSpinnerComponent } from '../Loadingspinner/Loading-spinner.component';
  import { NgIf } from '@angular/common';
  import { LogoQuizComponent } from '../logo-quiz/logo-quiz.component';
  
  Chart.register(...registerables);
  
  @Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css'],
    standalone: true,
    imports: [BaseChartDirective, LoadingSpinnerComponent, NgIf, LogoQuizComponent],
  })
  export class GraphComponent implements OnInit, OnChanges {
    @Input() company: string = '';
    @Input() range: string = '';
    @Output() CompanysData = new EventEmitter<any[]>();
  
    isLoading: boolean = true;
    errText: string = '';
    chartData: any[] = [];
    chartLabels: string[] = [];
    ToPlay: boolean = false;
    chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'dd/MM/yyyy',
            displayFormats: {
              day: 'dd/MM',
            },
          },
          title: {
            display: true,
            text: 'תאריך',
          },
        },
        y: {
          title: {
            display: true,
            text: 'מחיר סגירה',
          },
          beginAtZero: false,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
    };
  
    constructor(private stockService: StockService) {}
  
    ngOnInit() {
      if (this.company && this.range) {
        this.fetchData();
      }
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['range'] || changes['company']) {
        this.isLoading = true;
        this.errText = '';
        this.ToPlay = false;
        this.fetchData();
      }
    }
  
    fetchData(): void {
      this.stockService.getStockData(this.company, this.range).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.ToPlay = false;
          this.CompanysData.emit(response);
  
          // הגדרת המידע לגרף הקו
          this.chartData = [
            {
              data: response.map(item => ({
                x: new Date(item.date),
                y: item.close,
              })),
              label: this.company,
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)', // צבע מתחת לקו
              pointBackgroundColor: '#1E88E5',
              pointRadius: 3,
              fill: true,
              tension: 0.3, // קווים מעוגלים
            },
          ];
        },
        error: (err) => {
          this.isLoading = false;
          this.ToPlay=true;
          this.errText = 'שגיאה בקבלת הנתונים. נסה שוב מאוחר יותר.';
          console.error('Error fetching data:', err);
        },
      });
    }

    startGame(){
      this.ToPlay = true;
      this.isLoading = true;
      this.errText = '';
    }
  }
  









  // import {
  //   Component,
  //   OnInit,
  //   OnChanges,
  //   SimpleChanges,
  //   Input,
  //   Output,
  //   EventEmitter,
  // } from '@angular/core';
  // import { StockService } from '../service/stock.service';
  // import { Chart, registerables } from 'chart.js';
  // import { BaseChartDirective } from 'ng2-charts';
  // import 'chartjs-adapter-date-fns';
  // import { LoadingSpinnerComponent } from '../Loadingspinner/Loading-spinner.component';
  // import { NgIf } from '@angular/common';
  
  // Chart.register(...registerables);
  
  // @Component({
  //   selector: 'app-graph',
  //   templateUrl: './graph.component.html',
  //   styleUrls: ['./graph.component.css'],
  //   standalone: true,
  //   imports: [BaseChartDirective, LoadingSpinnerComponent, NgIf],
  // })
  // export class GraphComponent implements OnInit, OnChanges {
  //   @Input() company: string = '';
  //   @Input() range: string = '';
  //   @Output() CompanysData = new EventEmitter<any[]>();
  
  //   isLoading: boolean = true;
  //   errText: string = '';
  //   chartData: any[] = [];
  //   chartLabels: string[] = [];
  
  //   chartOptions = {
  //     responsive: true,
  //     elements: {
  //       line: {
  //         tension: 0.3, // עיגול קל של הקו
  //         borderWidth: 2,
  //       },
  //       point: {
  //         radius: 4,
  //         backgroundColor: '#1E88E5',
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: true,
  //       },
  //       tooltip: {
  //         mode: 'index',
  //         intersect: false,
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           maxTicksLimit: 10,
  //         },
  //         title: {
  //           display: true,
  //           text: 'תאריך',
  //         },
  //       },
  //       y: {
  //         title: {
  //           display: true,
  //           text: 'מחיר סגירה',
  //         },
  //       },
  //     },
  //   };
  
  //   constructor(private stockService: StockService) {}
  
  //   ngOnInit() {
  //     if (this.company && this.range) {
  //       this.fetchData();
  //     }
  //   }
  
  //   ngOnChanges(changes: SimpleChanges) {
  //     if (changes['range'] || changes['company']) {
  //       this.isLoading = true;
  //       this.errText = '';
  //       this.fetchData();
  //     }
  //   }
  
  //   fetchData(): void {
  //     this.stockService.getStockData(this.company, this.range).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         this.CompanysData.emit(response);
  
  //         // תרגום תאריכים לתוויות (labels)
  //         this.chartLabels = response.map(item =>
  //           new Date(item.date).toLocaleDateString('he-IL', {
  //             day: '2-digit',
  //             month: '2-digit',
  //           })
  //         );
  
  //         // רק מחירים (close) ב-data
  //         this.chartData = [
  //           {
  //             data: response.map(item => item.close),
  //             label: this.company,
  //             borderColor: '#42A5F5',
  //             backgroundColor: 'rgba(66, 165, 245, 0.2)',
  //             fill: false,
  //             tension: 0.3, // קווים מעוגלים
  //             pointRadius: 4,
  //             pointHoverRadius: 6,
  //           },
  //         ];
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         this.errText = 'שגיאה בטעינת הנתונים';
  //         console.error('Error fetching data:', err);
  //       },
  //     });
  //   }
  // }
  











//פאי צבעוני



  // import {
  //   Component,
  //   OnInit,
  //   OnChanges,
  //   SimpleChanges,
  //   Input,
  //   Output,
  //   EventEmitter,
  // } from '@angular/core';
  // import { StockService } from '../service/stock.service';
  // import { Chart, registerables } from 'chart.js';
  // import { BaseChartDirective } from 'ng2-charts';
  // import 'chartjs-adapter-date-fns';
  // import { LoadingSpinnerComponent } from '../Loadingspinner/Loading-spinner.component';
  // import { NgIf } from '@angular/common';
  
  // Chart.register(...registerables);
  
  // @Component({
  //   selector: 'app-graph',
  //   templateUrl: './graph.component.html',
  //   styleUrls: ['./graph.component.css'],
  //   standalone: true,
  //   imports: [BaseChartDirective, LoadingSpinnerComponent, NgIf],
  // })
  // export class GraphComponent implements OnInit, OnChanges {
  //   @Input() company: string = '';
  //   @Input() range: string = '';
  //   @Output() CompanysData = new EventEmitter<any[]>();
  
  //   isLoading: boolean = true;
  //   errText: string = '';
  //   chartData: any[] = [];
  //   chartLabels: string[] = [];
  //   chartType: string = 'pie'; // הגדרת סוג גרף כ־Pie
  
  //   chartOptions = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         display: true,
  //         position: 'top',
  //       },
  //       tooltip: {
  //         callbacks: {
  //           label: function (context: any) {
  //             return `${context.label}: ${context.formattedValue}`;
  //           },
  //         },
  //       },
  //     },
  //   };
  
  //   constructor(private stockService: StockService) {}
  
  //   ngOnInit() {
  //     if (this.company && this.range) {
  //       this.fetchData();
  //     }
  //   }
  
  //   ngOnChanges(changes: SimpleChanges) {
  //     if (changes['range'] || changes['company']) {
  //       this.isLoading = true;
  //       this.errText = '';
  //       this.fetchData();
  //     }
  //   }
  
  //   fetchData(): void {
  //     this.stockService.getStockData(this.company, this.range).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         this.CompanysData.emit(response);
  
  //         // הגדרת הנתונים לגרף פאי
  //         this.chartData = [
  //           {
  //             data: response.map((item) => item.close),
  //             backgroundColor: [
  //               '#42A5F5', '#66BB6A', '#FFA726',
  //               '#FF6384', '#BA68C8', '#26C6DA',
  //               '#FFCA28', '#8D6E63', '#90CAF9',
  //               '#A1887F', '#D4E157', '#F06292',
  //             ],
  //             label: 'מחירי סגירה',
  //           },
  //         ];
  
  //         this.chartLabels = response.map((item) =>
  //           new Date(item.date).toLocaleDateString()
  //         );
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         this.errText = 'שגיאה בקבלת הנתונים. נסה שוב מאוחר יותר.';
  //         console.error('Error fetching data:', err);
  //       },
  //     });
  //   }
  // }
  