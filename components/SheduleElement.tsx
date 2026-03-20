import { Shedule } from "@/entities/Shedule";
import { Text } from "@react-navigation/elements";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
export interface ISheduleItem {
  ins: number;
  sug: number;
  xe: number;
  time: string;
}

interface Props extends ISheduleItem {
  date: string;
}

export default function SheduleElement({ ins, sug, xe, time, date }: Props) {
  const [value, setValue] = useState({ ins, sug, xe, time });
  const element = useRef<null | View>(null);
  const currTimeout = useRef<null | number>(null);
  const onChange = (text: string, name: string) => {
    if (currTimeout.current !== null) clearTimeout(currTimeout.current);
    setValue({ ...value, [name]: text });
  };

  useEffect(() => {
    if (JSON.stringify(value) === JSON.stringify({ ins, sug, xe, time }))
      return;
    currTimeout.current = setTimeout(async () => {
      await Shedule.updateSheduleByDate(date, value);
    }, 800);
    return () => {
      if (currTimeout.current) clearTimeout(currTimeout.current);
    };
  }, [date, ins, sug, time, value, xe]);

  useEffect(() => {
    if (element.current == null) return;
  }, []);

  return (
    <View style={styles.sheduleItem} className="flex-1">
      <Text style={styles.text}>
        ИНС:{" "}
        {
          <TextInput
            style={styles.textInput}
            value={
              value.ins !== undefined && value.ins !== null ?
                value.ins.toString()
              : "0"
            }
            keyboardType="numeric"
            textAlignVertical="bottom"
            onChangeText={(text) => onChange(text, "ins")}
          />
        }{" "}
      </Text>
      <Text style={styles.text}>
        САХ:{" "}
        {
          <TextInput
            defaultValue="0"
            style={styles.textInput}
            value={
              value.sug !== undefined && value.sug !== null ?
                value.sug.toString()
              : "0"
            }
            keyboardType="numeric"
            textAlignVertical="bottom"
            onChangeText={(text) => onChange(text, "sug")}
          />
        }
      </Text>
      <Text style={styles.text}>
        XА:{" "}
        {
          <TextInput
            style={styles.textInput}
            value={
              value.xe !== undefined && value.xe !== null ?
                value.xe.toString()
              : "0"
            }
            keyboardType="numeric"
            textAlignVertical="bottom"
            onChangeText={(text) => onChange(text, "xe")}
          />
        }
      </Text>
      <Text style={styles.text}>Время: {time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sheduleItem: {
    flexDirection: "row",
    textAlign: "center",
  },
  text: {
    color: "white",
    flex: 1,
    height: 40,
    textAlign: "center",
    fontSize: 17,
  },
  textInput: {
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 0,
    paddingBottom: 0,
    color: "white",
    fontSize: 20,
    textAlignVertical: "bottom",
  },
});
