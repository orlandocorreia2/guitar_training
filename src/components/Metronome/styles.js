import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTitle: {
    marginBottom: 16,
  },
  containerTitleText: {
    fontWeight: "600",
    fontSize: 32,
  },
  content: {
    height: "240px",
    width: "300px",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#666",
    padding: "8px",
  },
  slider: {
    width: "100%",
  },
  containerProgress: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  progressNumber: {
    fontSize: 50,
    fontWeight: "600",
    marginRight: 4,
  },
  progressBPM: {
    fontSize: 20,
    fontWeight: "600",
  },
  containerTime: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    padding: 8,
    borderTopColor: "#666",
    borderTopWidth: 1,
  },
  containerTimeText: {
    fontWeight: "600",
    fontSize: 32,
  },
  containerTimeIcon: {
    marginTop: 10,
  },
});
