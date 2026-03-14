// eslint-disable-next-line import/no-unresolved
import { IData } from "src/app";
import { useEffect, useState } from "react";
import SheduleElement from "./SheduleElement";
import IncreaseBtn from "./IncreaseBtn";

async function initJSON(date: string) {
  return window.shedule.init(date);
}

export default function Main({ date }: { date: string }) {
  const [shedule, setShedule] = useState<null | IData>(null);

  useEffect(() => {
    const init = async () => {
      const json = await initJSON(date);
      return json;
    };
    init().then((json) => setShedule(json[date]));
  }, [date]);

  const handleShedule = (value: IData) => {
    setShedule(value);
  };

  return (
    <main>
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
    </main>
  );
}
