// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";
import { ISheduleItem } from "./components/SheduleItem";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("shedule", {
  init: () => {
    return ipcRenderer.invoke("init");
  },

  save: (value: ISheduleItem, date: string) => {
    return ipcRenderer.invoke("save", value, date);
  },
});
