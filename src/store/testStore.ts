import { create } from 'zustand';

type Question = {
  question: string;
  Choices: string[];
};

type Card = {
  id: number;
  writer: string;
  title: string;
  content: string;
  image: string;
  views: number;
  likes: number;
  category: string;
};

type TestStore = {
  questions: Question[];
  addQuestion: () => void;
  removeQuestion: () => void;
  addChoice: (qIndex: number) => void;
  removeChoice: (qIndex: number) => void;
  updateQuestion: (qIndex: number, newQuestion: string) => void;
  updateChoice: (qIndex: number, oIndex: number, newChoice: string) => void;
  card: Card;
  setCard: (update: Partial<Card>) => void;
};

export const useTestStore = create<TestStore>(set => ({
  questions: [
    { question: '', Choices: ['', ''] },
    { question: '', Choices: ['', ''] },
  ],
  addQuestion: () => {
    console.log('add');
    set(state => ({
      questions: [...state.questions, { question: '', Choices: ['', ''] }],
    }));
  },
  removeQuestion: () =>
    set(state => {
      if (state.questions.length > 1) {
        const newQuestions = [...state.questions];
        newQuestions.pop();
        return { questions: newQuestions };
      }
      return state; // 이 부분을 추가
    }),
  addChoice: qIndex =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].Choices.push('');
      return { questions: newQuestions };
    }),
  removeChoice: qIndex =>
    set(state => {
      const newQuestions = [...state.questions];
      if (newQuestions[qIndex].Choices.length > 1) {
        newQuestions[qIndex].Choices.pop();
      }
      return { questions: newQuestions };
    }),
  updateQuestion: (qIndex, newQuestion) =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].question = newQuestion;
      return { questions: newQuestions };
    }),
  updateChoice: (qIndex, oIndex, newChoice) =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].Choices[oIndex] = newChoice;
      return { questions: newQuestions };
    }),
  card: {
    id: 1,
    writer: '',
    title: '',
    content: '',
    image:
      'https://image.newsis.com/2023/05/04/NISI20230504_0001258444_web.jpg?rnd=20230504142607​',
    views: 1,
    likes: 1,
    category: '',
  },
  setCard: update => set(state => ({ card: { ...state.card, ...update } })),
}));
