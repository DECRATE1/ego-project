import { ChangeEvent, useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved

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
      window.shedule.update(value, date);
    }, 800);
    return () => clearTimeout(currTimeout.current);
  }, [value]);

  return (
    <ul id="shedule-item">
      <li>
        ИНС:{" "}
        {
          <input
            value={`${value.ins}`}
            name="ins"
            onChange={(e) => onChange(e)}
          />
        }{" "}
      </li>
      <li>
        САХ:{" "}
        {
          <input
            value={`${value.sug}`}
            name="sug"
            onChange={(e) => onChange(e)}
          />
        }
      </li>
      <li>
        XА:{" "}
        {
          <input
            value={`${value.xe}`}
            name="xe"
            onChange={(e) => onChange(e)}
          />
        }
      </li>
      <li>Время: {time}</li>
    </ul>
  );
}
