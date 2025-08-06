import { Component, OnInit } from '@angular/core';
import { LogoQuizService, QuizQuestion } from '../logo-quiz.service';
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-logo-quiz',
  templateUrl: './logo-quiz.component.html',
  styleUrls: ['./logo-quiz.component.css']
})
export class LogoQuizComponent implements OnInit {
  currentQuestion!: QuizQuestion;
  choices: string[] = [];
  feedback: string = '';
  score: number = 0;
  timeLeft: number = 10;
  timer: any;
  gameOver = false;

  constructor(private quizService: LogoQuizService) {}

  ngOnInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    this.feedback = '';
    this.currentQuestion = this.quizService.getRandomQuestion();
    this.choices = this.shuffle([...this.currentQuestion.options]);
    this.startTimer();
  }
//מערבב את התשובות
  //הפונקציה מקבלת מערך של תשובות ומערבבת אותן באקראי
  shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft =4;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.timer);
        this.feedback = '⏱️ הזמן נגמר!';
        setTimeout(() => this.loadQuestion(), 1500);
      }
    }, 1000);
  }

  selectAnswer(choice: string) {
    clearInterval(this.timer);
    if (choice === this.currentQuestion.answer) {
      this.feedback = '✅ תשובה נכונה!';
      this.score++;
    } else {
      this.feedback = `❌ טעות! התשובה הנכונה: ${this.currentQuestion.answer}`;
    }
    setTimeout(() => this.loadQuestion(), 1500);
  }
}
