export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
  correctFeedback: string;
  incorrectFeedback: string;
  type: 'multiple' | 'single';
}

export interface QuizState {
  currentStep: number;
  selectedOptions: string[];
  isSubmitted: boolean;
  score: number;
  isFinished: boolean;
}
