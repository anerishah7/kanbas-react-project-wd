import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

export const findAllQuizzes = async () => {
  const response = await axios.get(`${API_BASE}/quizzes`);
  return response.data;
};

export const findQuizById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/quizzes/${id}`);
  return response.data;
};

export const updateQuiz = async (id: string, quiz: any) => {
  const response = await axios.put(`${API_BASE}/quizzes/${id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (id: string) => {
  const response = await axios.delete(`${API_BASE}/quizzes/${id}`);
  return response.data;
};