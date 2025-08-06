import { Injectable } from '@angular/core';

export interface QuizQuestion {
  logoPath: string;
  answer: string;
  options: string[];
}

@Injectable({ providedIn: 'root' })
export class LogoQuizService {
  private questions: QuizQuestion[] = [
    {
  
      logoPath: 'pictures/Game/AAPL.png',
      answer: 'Apple',
      options: ['Apple', 'Google', 'Samsung', 'Microsoft']
    },
    {
      logoPath: 'pictures/Game/GOOG.png',
      answer: 'Google',
      options: ['Google', 'Amazon', 'Meta', 'Netflix']
    },
    {
      logoPath: 'pictures/Game/NVIDIA.jpg',
      answer: 'NVIDIA',
      options: ['AMD', 'NVIDIA', 'Intel', 'Dell']
    },
    {
      logoPath: 'pictures/Game/Tesla.jpg',
      answer: 'Tesla',
      options: ['Ford', 'Tesla', 'GM', 'Toyota']
    },
    {
      logoPath: 'pictures/Game/Meta.jpg',
      answer: 'Meta',
      options: ['Meta', 'Zoom', 'Snapchat', 'X']
    },
    {
      logoPath: 'pictures/Game/Netflix.jpg',
      answer: 'Netflix',
      options: ['Netflix', 'HBO', 'Disney+', 'Prime Video']
    },
    {
      logoPath: 'pictures/Game/Amazon.jpg',
      answer: 'Amazon',
      options: ['Amazon', 'eBay', 'AliExpress', 'Shopify']
    },
    {
      logoPath: 'pictures/Game/Intel.jpg',
      answer: 'Intel',
      options: ['Intel', 'AMD', 'ASUS', 'HP']
    },
    {
      logoPath: 'pictures/Game/MSEFT.png',
      answer: 'Microsoft',
      options: ['Microsoft', 'Apple', 'IBM', 'Oracle']
    },
    {
      logoPath: 'pictures/Game/Starbucks.jpg',
      answer: 'Starbucks',
      options: ['Starbucks', 'Costa', 'Dunkin', 'Nespresso']
    },
    {
      logoPath: 'pictures/Game/Spotify.jpg',
      answer: 'Spotify',
      options: ['Spotify', 'Apple Music', 'Deezer', 'YouTube Music']
    }
    
  ];

  getRandomQuestion(): QuizQuestion {
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }
}
