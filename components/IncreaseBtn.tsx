import { Shedule } from "@/entities/Shedule";
import { Pressable, StyleSheet, Text } from "react-native";

type IncreaseBtnType = {
  date: string;
  handleShedule: (value: any) => void;
};

export default function IncreaseBtn({ date, handleShedule }: IncreaseBtnType) {
  return (
    <Pressable
      style={styles.btn}
      onPress={async () => {
        const newShedule = await Shedule.addToShedule(date);
        handleShedule(newShedule[date]);
      }}
    >
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },

  text: {
    color: "white",
    fontSize: 20,
  },
});
