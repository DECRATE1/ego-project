// eslint-disable-next-line import/no-unresolved
import { IData } from "src/app";
import SheduleItem from "./SheduleItem";

export default function Main({ data, date }: { data: IData; date: string }) {
  return (
    <main>
      {Object.keys(data).map((time, index) => {
        return (
          <SheduleItem
            key={`sheduleItem-${index}`}
            time={time}
            xe={+data[time].xe}
            sug={+data[time].sug}
            ins={+data[time].ins}
            date={date}
          ></SheduleItem>
        );
      })}
    </main>
  );
}
