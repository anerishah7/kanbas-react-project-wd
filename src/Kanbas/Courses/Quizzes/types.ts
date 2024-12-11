import { Quiz } from "./reducer";

export interface RootState {
    quizzes: {
      quizzes: Quiz[];
      currentQuiz: Quiz | null;
      loading: boolean;
      error: string | null;
    }
  }