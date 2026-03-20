import { Shedule } from "@/entities/Shedule";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IncreaseBtn from "./IncreaseBtn";
import SheduleElement from "./SheduleElement";
export interface IData {
  [key: string]: {
    sug: string;
    xe: string;
    ins: string;
  };
}

async function initJson(date: string) {
  if (!Shedule.sheduleIsExist()) Shedule.initShedule();
  const currDateIsExist = await Shedule.dateIsExist(date);
  if (!currDateIsExist) await Shedule.writeShedule(date);
  const shedule = await Shedule.file.text();
  return JSON.parse(shedule);
}

export default function Main({ date }: { date: string }) {
  const [shedule, setShedule] = useState<null | IData>(null);
  const handleShedule = (value: IData) => {
    setShedule(value);
  };
  useEffect(() => {
    const init = async () => {
      const json = await initJson(date);
      return json;
    };
    init().then((json) => setShedule(json[date]));
  }, [date]);

  return (
    <View style={styles.main}>
      {shedule &&
        Object.keys(shedule).map((time, index) => {
          return (
            <SheduleElement
              key={`sheduleItem-${time + index}`}
              time={time}
              xe={+shedule[time].xe}
              sug={+shedule[time].sug}
              ins={+shedule[time].ins}
              date={date}
            ></SheduleElement>
          );
        })}

      <IncreaseBtn date={date} handleShedule={handleShedule}></IncreaseBtn>
    </View>
  );
}
//<IncreaseBtn date={date} handleShedule={handleShedule}></IncreaseBtn>

const styles = StyleSheet.create({
  main: {
    display: "flex",
    width: "auto",
    height: "auto",
    justifyContent: "center",
  },
});
