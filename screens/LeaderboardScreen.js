import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { QuizContext } from "../context/QuizContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LeaderBoardScreen = () => {
  const { leaderboard } = useContext(QuizContext);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const insets = useSafeAreaInsets();

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return { color: "#FFD700", label: "1st" }; // Gold
      case 1:
        return { color: "#C0C0C0", label: "2nd" }; // Silver
      case 2:
        return { color: "#CD7F32", label: "3rd" }; // Bronze
      default:
        return { color: "#666666", label: `${index + 1}th` };
    }
  };

  const handlePressItem = (id) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item, index }) => {
    const rankStyle = getRankStyle(index);

    return (
      <View style={styles.itemContainer} key={index}>
        <TouchableOpacity
          onPress={() => handlePressItem(item.id)}
          style={styles.itemTouchable}
        >
          <View
            style={[
              styles.rankContainer,
              { backgroundColor: rankStyle.color + "20" },
            ]}
          >
            <Text style={[styles.rankText, { color: rankStyle.color }]}>
              {rankStyle.label}
            </Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score} pts</Text>
          </View>
        </TouchableOpacity>
        {expandedItemId === item.id && (
          <View style={styles.additionalInfo}>
            <Text style={styles.infoText}>Correct: {item.correct}</Text>
            <Text style={styles.infoText}>Incorrect: {item.incorrect}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/BG.jpg")}
      style={[styles.container, { paddingTop: insets.top }]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Leaderboard</Text>
        </View>
        <FlatList
          data={leaderboard.sort((a, b) => b.score - a.score)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backgroundImage: {
    opacity: 0.9,
  },
  headerContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  itemTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    fontWeight: "bold",
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  additionalInfo: {
    marginTop: 10,
    paddingLeft: 52,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
});

export default LeaderBoardScreen;
