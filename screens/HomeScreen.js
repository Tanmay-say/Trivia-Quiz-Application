import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { QuizContext } from "../context/QuizContext";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const { setUsername, setCategory, setQuestions, setQuestionCount, username } =
    useContext(QuizContext);

  const [localUsername, setLocalUsername] = useState(username);
  const [localCategory, setLocalCategory] = useState(null);
  const [localQuestionCount, setLocalQuestionCount] = useState(10);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php`, {
        params: {
          amount: localQuestionCount,
          category: localCategory,
          type: "multiple",
        },
      });

      setUsername(localUsername);
      setCategory(localCategory);
      setQuestionCount(localQuestionCount);
      setQuestions(response.data.results);
      navigation.navigate("QuizScreen");
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const categories = [
    { label: "General Knowledge", value: 9 },
    { label: "Science", value: 17 },
    { label: "History", value: 23 },
    { label: "Sports", value: 21 },
  ];

  return (
    <ImageBackground
      source={require("../assets/images/game_background_active.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Trivia Quiz</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={localUsername}
          onChangeText={setLocalUsername}
        />
        <RNPickerSelect
          onValueChange={setLocalCategory}
          items={categories}
          placeholder={{ label: "Select a category", value: null }}
        />
        <View style={styles.countContainer}>
          <Button
            title="-"
            onPress={() =>
              setLocalQuestionCount(Math.max(5, localQuestionCount - 1))
            }
          />
          <Text>Questions: {localQuestionCount}</Text>
          <Button
            title="+"
            onPress={() =>
              setLocalQuestionCount(Math.min(20, localQuestionCount + 1))
            }
          />
        </View>
        <Button title="Start Quiz" onPress={fetchQuestions} />
        <Button
          title="Leaderboard"
          onPress={() => {
            navigation.navigate("LeaderboardScreen");
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center", 
    alignItems: "center", 
  },
  container: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15, 
    padding: 20,
  },
  title: {
    fontSize: 26, 
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold", 
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", 
    marginBottom: 15,
    padding: 10,
    width: "100%",
    borderRadius: 8, 
    backgroundColor: "white",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
});


export default HomeScreen;
