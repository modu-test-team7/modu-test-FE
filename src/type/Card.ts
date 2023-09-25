export type Tester = {
  testerId: number;
  userId: string;
  title: string;
  content: string;
  image: string;
  views: string | number;
  likes: string | number;
  category: string;
  username?: string;
  comments: string[];
  questions: string[];
  comment: string;
};

export type Questions = {
  id: number;
  title: string;
  image: string;
  testId: number;
  choices: Choice[];
};

export type Choice = {
  id: number;
  questionId: number;
  content: string;
  isCorrect: boolean;
};

export type Comment = {
  id: number;
  content: string;
  userId: number;
  testId: number;
};

export type User = {
  id: number;
  userId: string;
  password: string;
  nickname: string;
  image: string;
};
