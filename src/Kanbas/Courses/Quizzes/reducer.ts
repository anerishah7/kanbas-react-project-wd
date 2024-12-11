import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  points: number;
  course: string;
  questions: any;
  start_date?: string;
  due_date?: string;
  dueDate?: string;
  untilDate?: string;
  quizType?: string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  numberOfAttempts?: number;
  showCorrectAnswers?: boolean;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  availableDate?: string;
}

interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  quizzes: quizzes,
  currentQuiz: null,
  loading: false,
  error: null
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Existing actions
    addQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
      const newQuiz: Quiz = {
        _id: new Date().getTime().toString(),
        title: action.payload.title || "",
        description: action.payload.description || "",
        points: action.payload.points || 0,
        course: action.payload.course || "",
        questions: action.payload.questions || [],
        start_date: action.payload.start_date || "",
        due_date: action.payload.due_date || "",
        quizType: action.payload.quizType || "Graded Quiz",
        assignmentGroup: action.payload.assignmentGroup || "Quizzes",
        shuffleAnswers: action.payload.shuffleAnswers || false,
        timeLimit: action.payload.timeLimit || 20,
        multipleAttempts: action.payload.multipleAttempts || false,
        numberOfAttempts: action.payload.numberOfAttempts || 1,
        showCorrectAnswers: action.payload.showCorrectAnswers || true,
        accessCode: action.payload.accessCode || "",
        oneQuestionAtATime: action.payload.oneQuestionAtATime || true,
        webcamRequired: action.payload.webcamRequired || false,
        lockQuestionsAfterAnswering: action.payload.lockQuestionsAfterAnswering || false,
        availableDate: action.payload.availableDate || "",
        untilDate: action.payload.untilDate || "",
        dueDate: action.payload.dueDate || ""
      };
      state.quizzes.push(newQuiz);
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
      if (state.currentQuiz?._id === action.payload) {
        state.currentQuiz = null;
      }
    },

    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
      if (state.currentQuiz?._id === action.payload._id) {
        state.currentQuiz = action.payload;
      }
    },

    // New actions for quiz details
    setCurrentQuiz: (state, action: PayloadAction<string>) => {
      state.currentQuiz = state.quizzes.find(quiz => quiz._id === action.payload) || null;
      console.log(state.currentQuiz);
      state.loading = false;
      state.error = null;
    },

    updateQuizField: (state,       
      action: PayloadAction<{ field: keyof Quiz; value: any }>
    ) => {
      if (state.currentQuiz) {
        state.currentQuiz = {
          ...state.currentQuiz,
          [action.payload.field]: action.payload.value
        };
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setCurrentQuiz,
  updateQuizField,
  setLoading,
  setError,
  clearCurrentQuiz
} = quizzesSlice.actions;

// Thunk for fetching quiz
export const fetchQuizById = (quizId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setCurrentQuiz(quizId));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export default quizzesSlice.reducer;