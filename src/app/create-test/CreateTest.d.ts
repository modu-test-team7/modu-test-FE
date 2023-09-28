interface CreateTest {
  title: string;
  content: string;
  image: string;
  category: string;
  questions: CreateTestQ[];
  results: CreateTestResult[];
  comments: CreateTestComment[];
}

interface CreateTestQ {
  title: string;
  image: string;
  choices: CreateTestQinChoices[];
}

interface CreateTestResult {
  image: string;
  content: string;
  score: number;
}

interface CreateTestQinChoices {
  content: string;
  isCorrect: boolean;
}

interface CreateTestComment {
  username: string;
  comment: string;
  commentId: number;
}