import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Main from "./components/Main";
import SelectBtn from "./components/SelectBtn";
export interface IData {
  [key: string]: {
    sug: string;
    xe: string;
    ins: string;
  };
}

export function App() {
  const [date, setDate] = useState(
    new Date().toLocaleDateString().split(".").join("/"),
  );

  const handleDate = (value: string) => {
    setDate(value);
  };

  return (
    <div id="main">
      <Header currDate={date}></Header>
      <Main date={date}></Main>
      <div id="select-date-bar">
        <SelectBtn date={date} handleDate={handleDate} type="prev" />
        <SelectBtn date={date} handleDate={handleDate} type="next" />
      </div>
    </div>
  );
}

/**
 <button
        onClick={() => {
          const [day, month, year] = date.split("/");
          const newDate = new Date(`${year}-${month}-${+day - 1}`)
            .toLocaleDateString()
            .split(".")
            .join("/");

          setDate(newDate);
        }}
      >
        left
      </button>
*/

const root = createRoot(document.body);
root.render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
