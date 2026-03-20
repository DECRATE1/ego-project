import { StyleSheet, Text } from "react-native";

export default function Header({ currDate }: { currDate: string }) {
  return (
    <Text id="header" style={styles.text}>
      {currDate}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});
