import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface ISheduleItem {
  ins: number;
  sug: number;
  xe: number;
  time: string;
}

interface Props extends ISheduleItem {
  date: string;
}

export default function SheduleItem({ ins, sug, xe, time, date }: Props) {
  const [value, setValue] = useState({ ins, sug, xe, time });
  const currTimeout = useRef(null);
  const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (e.currentTarget.value == null) return;
    if (currTimeout.current !== null) clearTimeout(currTimeout.current);
    setValue({ ...value, [e.currentTarget.name]: e.target.value });
  };

  useEffect(() => {
    if (JSON.stringify(value) === JSON.stringify({ ins, sug, xe, time }))
      return;
    currTimeout.current = setTimeout(() => {
      window.shedule.save(value, date);
    }, 5000);
    return () => clearTimeout(currTimeout.current);
  }, [value]);

  return (
    <ul id="shedule-item">
      <li>
        ИНС: {<input defaultValue={ins} name="ins" onChange={onChange} />}{" "}
      </li>
      <li>
        САХ: {<input defaultValue={sug} name="sug" onChange={onChange} />}
      </li>
      <li>XА: {<input defaultValue={xe} name="xe" onChange={onChange} />}</li>
      <li>Время: {time}</li>
    </ul>
  );
}
