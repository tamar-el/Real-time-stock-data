import { TestBed } from '@angular/core/testing';

import { LogoQuizService } from './logo-quiz.service';

describe('LogoQuizService', () => {
  let service: LogoQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
