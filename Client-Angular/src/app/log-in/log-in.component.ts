import { Component,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-log-in',
  imports: [FormsModule,NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
user={
  name:'',
  email:'',
  address:'',
  password:''
}

OnSubmit(){
  console.log(this.user)
  this.userName.emit(this.user)
}
@Output() userName=new EventEmitter<any>();
}
