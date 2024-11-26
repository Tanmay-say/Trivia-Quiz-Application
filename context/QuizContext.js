import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const storedLeaderboard = await AsyncStorage.getItem("quizLeaderboard");
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Error loading leaderboard", error);
    }
  };

  const updateLeaderboard = async () => {
    if (!username) return;

    const newEntry = {
      id: Date.now().toString(),
      username,
      score: currentScore,
      correct: correctAnswers,
      incorrect: incorrectAnswers,
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    try {
      await AsyncStorage.setItem(
        "quizLeaderboard",
        JSON.stringify(updatedLeaderboard)
      );
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error("Error saving leaderboard", error);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  return (
    <QuizContext.Provider
      value={{
        username,
        setUsername,
        category,
        setCategory,
        questionCount,
        setQuestionCount,
        questions,
        setQuestions,
        currentScore,
        setCurrentScore,
        correctAnswers,
        setCorrectAnswers,
        incorrectAnswers,
        setIncorrectAnswers,
        leaderboard,
        updateLeaderboard,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
