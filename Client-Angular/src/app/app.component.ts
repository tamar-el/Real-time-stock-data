
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTypeComponent } from './nav-type/nav-type.component';
import { NavDaysComponent } from './nav-days/nav-days.component';
import { LogInComponent } from './log-in/log-in.component';
import { GraphComponent } from './graph/graph.component';
import{StockCardComponent} from './stock-card/stock-card.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LogoQuizComponent } from './logo-quiz/logo-quiz.component';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavTypeComponent, NavDaysComponent,LogInComponent,GraphComponent,StockCardComponent,NgIf,CommonModule,LogoQuizComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {

  isLoggedIn = false;
  userData: any;

  handleLogin(user: any) {
    this.isLoggedIn = true;
    this.userData = user;
    console.log('המשתמש התחבר:', user);
  }
    title = 'Stock-indices';

//משתנים לקבלת המידע מבן
messageFromChildType = 'AAPL';
messageFromChildPeriod = 'month';
CompanysData: any[] = [];
//פונקציות קבלת המידע מבן
onChildNotifyType(message: string) {
  this.messageFromChildType = message;
}
onChildNotifyDay(message: string) {
  this.messageFromChildPeriod = message;
}
onCompanysData(data: any[]) {
  console.log("📡 RequestingTemp: ", data);
  // כאן אפשר לעשות משהו עם הנתונים שהתקבלו מהגרף
  // לדוגמה, לשלוח אותם לאחסון או לעבד אותם
  this.CompanysData = data;
  console.log("dadi",this.CompanysData) 
  this.calculateChange()// אם רוצים לשמור את הנתונים במשתנה
}



adImages: string[] = [
  //'../../public/pictures/g2.jpeg',
  'pictures/1.jpg',
  'pictures/2.jpg',
  'pictures/3.jpg',
  'pictures/4.jpg',
  'pictures/5.jpg',
  'pictures/6.jpg',
  'pictures/7.jpg',
  'pictures/8.jpg',
  'pictures/9.jpg',
  'pictures/10.jpg',
  'pictures/11.jpg',
  'pictures/AAPL.png',
  'pictures/TSLA.png',
  'pictures/g2.jpeg',
  'pictures/graph.jpeg',
  'pictures/g2.jpeg',
];

currentAdIndex = 0;

ngOnInit() {
  setInterval(() => {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.adImages.length;
  }, 4000);
 
}




  stockPrice: number = 0;
  change: number = 0;
  firstPrice: number = 0;
  lastPrice: number = 0;
  public calculateChange() {
    if (this.CompanysData && this.CompanysData.length >= 2) {
      this.firstPrice = this.CompanysData[0].price;
      console.log("📡 RequestingTempFromCard: ", this.CompanysData);
      this.firstPrice = this.CompanysData[0].price;
      this.lastPrice = this.CompanysData[this.CompanysData.length - 1].price;

      if (this.firstPrice !== 0) {
        this.change = ((this.lastPrice - this.firstPrice) / this.firstPrice) * 100;
      } else {
        this.change = -1;
      }
    }
  }
}

 
