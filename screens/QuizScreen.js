import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { QuizContext } from "../context/QuizContext";
import he from "he";

const QuizScreen = ({ navigation }) => {
  const { questions, currentScore, setCurrentScore } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setCurrentScore(currentScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("ResultScreen");
    }
  };

  const shuffleAnswers = () => {
    const allAnswers = [
      ...questions[currentQuestion].incorrect_answers,
      questions[currentQuestion].correct_answer,
    ];
    return allAnswers.sort(() => Math.random() - 0.5);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {he.decode(questions[currentQuestion].question)}
      </Text>
      {shuffleAnswers().map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={styles.answerText}>{he.decode(answer)}</Text>
        </TouchableOpacity>
      ))}
      <Text>
        Question {currentQuestion + 1} of {questions.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  answerButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  answerText: {
    textAlign: "center",
  },
});

export default QuizScreen;
