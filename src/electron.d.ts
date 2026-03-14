import { ISheduleItem } from "./components/SheduleElement";

export {};

declare global {
  interface Window {
    shedule: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      init: (date: string) => any;
      update: (value: ISheduleItem, date: string) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      add: (date: string) => any;
    };
  }
}
