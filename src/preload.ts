// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";
import { ISheduleItem } from "./components/SheduleElement";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("shedule", {
  init: (date: string) => {
    return ipcRenderer.invoke("init", date);
  },

  update: (value: ISheduleItem, date: string) => {
    ipcRenderer.invoke("update", value, date);
  },

  add: (date: string) => {
    return ipcRenderer.invoke("add", date);
  },
});
