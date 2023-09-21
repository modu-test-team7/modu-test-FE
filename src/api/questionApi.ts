import axios from 'axios';
import { Question } from '../store/questionStore'

const baseURL = 'http://localhost:5000'; // json-server가 실행되는 주소

export const fetchQuestions = async () => {
  const response = await axios.get(`${baseURL}/questions`);
  return response.data;
};

export const addQuestion = async (question: Question) => {
  const response = await axios.post(`${baseURL}/questions`, question);
  return response.data;
};

export const updateQuestion = async (id: number, question: Question) => {
  const response = await axios.put(`${baseURL}/questions/${id}`, question);
  return response.data;
};

export const deleteQuestion = async (id: number) => {
  const response = await axios.delete(`${baseURL}/questions/${id}`);
  return response.data;
};
