import { ISheduleItem } from "./components/SheduleItem";

export {};

declare global {
  interface Window {
    shedule: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      init: () => any;
      save: (value: ISheduleItem, date: string) => void;
    };
  }
}
