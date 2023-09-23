import {create} from 'zustand';

type Question = {
  question: string;
  options: string[];
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
  addOption: (qIndex: number) => void;
  removeOption: (qIndex: number) => void;
  updateQuestion: (qIndex: number, newQuestion: string) => void;
  updateOption: (qIndex: number, oIndex: number, newOption: string) => void;
  card: Card;
  setCard: (update: Partial<Card>) => void;
};

export const useTestStore = create<TestStore>(set => ({
  questions: [
    { question: '', options: ['', ''] },
    { question: '', options: ['', ''] },
  ],
  addQuestion: () =>
    set(state => ({
      questions: [...state.questions, { question: '', options: ['', ''] }],
    })),
  removeQuestion: () =>
    set(state => {
      if (state.questions.length > 1) {
        const newQuestions = [...state.questions];
        newQuestions.pop();
        return { questions: newQuestions };
      }
      return state; // 이 부분을 추가
    }),
  addOption: qIndex =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].options.push('');
      return { questions: newQuestions };
    }),
  removeOption: qIndex =>
    set(state => {
      const newQuestions = [...state.questions];
      if (newQuestions[qIndex].options.length > 1) {
        newQuestions[qIndex].options.pop();
      }
      return { questions: newQuestions };
    }),
  updateQuestion: (qIndex, newQuestion) =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].question = newQuestion;
      return { questions: newQuestions };
    }),
  updateOption: (qIndex, oIndex, newOption) =>
    set(state => {
      const newQuestions = [...state.questions];
      newQuestions[qIndex].options[oIndex] = newOption;
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
