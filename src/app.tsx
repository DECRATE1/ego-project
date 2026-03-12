import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Main from "./components/Main";
export interface IData {
  [key: string]: {
    sug: string;
    xe: string;
    ins: string;
  };
}

async function initJSON() {
  return window.shedule.init();
}

export function App() {
  const [shedule, setShedule] = useState<null | IData>(null);
  const [date, setDate] = useState(
    new Date().toLocaleDateString().split(".").join("/"),
  );
  useEffect(() => {
    initJSON().then((sh) => {
      setShedule(sh[date]);
    });
  }, []);
  return (
    <div id="main">
      <Header currDate={date}></Header>
      {shedule && <Main data={shedule} date={date}></Main>}
    </div>
  );
}

const root = createRoot(document.body);
root.render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
