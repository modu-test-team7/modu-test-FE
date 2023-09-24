// src/store/testStore.ts
import { create } from 'zustand';
import * as api from '../api/questions'

export type Option = {
  optionId: string;
  optionContent: string;
};

export type Question = {
  id: number;
  questionContent: string;
  options: Option[];
};

type TestState = {
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: number) => void;
};

const useTestStore = create<TestState>((set) => ({
  questions: [],
  addQuestion: async (question) => {
    const newQuestion = await api.addQuestion(question);
    set((state) => ({ questions: [...state.questions, newQuestion] }));
  },
  updateQuestion: async (question) => {
    const updatedQuestion = await api.updateQuestion(question.id, question);
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === question.id ? updatedQuestion : q
      ),
    }));
  },
  deleteQuestion: async (id) => {
    await api.deleteQuestion(id);
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    }));
  },
}));

export default useTestStore;
