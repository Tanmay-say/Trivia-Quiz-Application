import React, { useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { QuizContext } from "../context/QuizContext";

const ResultScreen = ({ navigation }) => {
  const { username, questions, currentScore, resetQuiz, updateLeaderboard } =
    useContext(QuizContext);

  useEffect(() => {
    updateLeaderboard();
  }, []);

  const calculatePercentage = () => {
    return questions && questions.length
      ? ((currentScore / questions.length) * 100).toFixed(2)
      : "0";
  };

  const handleRestart = () => {
    resetQuiz();
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.username}>Hi {username}</Text>
      <Text style={styles.scoreText}>
        Your Score: {currentScore} / {questions ? questions.length : 0}
      </Text>
      <Text style={styles.percentageText}>
        Percentage: {calculatePercentage()}%
      </Text>
      <Button title="Restart Quiz" onPress={handleRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
  },
  percentageText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ResultScreen;
