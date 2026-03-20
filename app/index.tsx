import Header from "@/components/Header";
import Main from "@/components/Main";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export default function Index() {
  const [date, setDate] = useState(
    new Date().toLocaleDateString().split(".").join("/"),
  );

  const dateShared = useSharedValue(
    new Date().toLocaleDateString().split(".").join("/"),
  );

  const pan = Gesture.Pan().onEnd((event) => {
    if (event.translationX < -50) {
      const [day, month, year] = date.split("/");
      const originalDate = new Date(+year, +month - 1, +day);
      const newDate = new Date(originalDate.setDate(originalDate.getDate() + 1))
        .toLocaleDateString()
        .split(".")
        .join("/");

      //setDate(newDate);
      dateShared.set(newDate);
    } else if (event.translationX > 50) {
      const [day, month, year] = date.split("/");
      const originalDate = new Date(+year, +month - 1, +day);
      const newDate = new Date(originalDate.setDate(originalDate.getDate() - 1))
        .toLocaleDateString()
        .split(".")
        .join("/");

      dateShared.set(newDate);
    }
  });

  useAnimatedReaction(
    () => {
      return dateShared.value;
    },
    (result, previous) => {
      if (result !== previous) {
        scheduleOnRN(setDate, result);
      }
    },
    [dateShared.value],
  );
  /*const [day, month, year] = date.split("/").map((item) => +item);
        const originalDate = new Date(year, month - 1, day);
        const newDate = new Date(
          type === "next" ?
            originalDate.setDate(originalDate.getDate() + 1)
          : originalDate.setDate(originalDate.getDate() - 1),
        )
          .toLocaleDateString()
          .split(".")
          .join("/");

        handleDate(newDate);*/

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1 }}>
          <Header currDate={date}></Header>
          <Main date={date} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  text: {
    color: "white",
  },
});
