import fs from "fs";
import fsa from "node:fs/promises";
import { SheduleItem } from "./SheduleItem";
// eslint-disable-next-line import/no-unresolved
import { ISheduleItem } from "src/components/SheduleItem";

export class Shedule {
  /**
   * Проверяет сущетвует ли shedule.json
   * @returns bool
   */
  static sheduleIsExist(): boolean {
    return fs.existsSync("./shedule.json");
  }

  /**
   * Проверяет наличие нынешней даты в shedule.json
   * @returns bool
   */
  static async currDateIsExist(): Promise<boolean> {
    const currDate = new Date().toLocaleDateString();
    const shedule = JSON.parse(await fsa.readFile("./shedule.json", "utf-8"));
    return shedule[currDate] != null;
  }

  /**
   * Инициализация shedule.json
   */

  static initShedule() {
    const currDate = new Date().toLocaleDateString();
    const sheduleItem = new SheduleItem().instance;
    const shedule = JSON.stringify({ [currDate]: sheduleItem });
    fs.writeFile("./shedule.json", shedule, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Succesfully init");
    });
  }

  /**
   * Создает новое расписание на основе сегоднешней даты
   * и записывет в shedule.json
   */

  static async writeShedule() {
    const shedule = JSON.parse(await fsa.readFile("./shedule.json", "utf-8"));
    const currDate = new Date().toLocaleDateString();
    const sheduleItem = new SheduleItem().instance;
    shedule[currDate] = sheduleItem;
    await fsa.writeFile("./shedule.json", JSON.stringify(shedule));
  }

  /**
   * Добавляет новый sheduleItem в shedule.json по дате
   * @param date string - дата в формате дд/мм/гг
   */
  static addToShedule(date: string) {
    fs.readFile("./shedule.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const shedule = JSON.parse(data);
      const sheduleItem = new SheduleItem();
      shedule[date][sheduleItem.getKey()] = sheduleItem.getValue();
      fs.writeFile("./shedule.json", JSON.stringify(shedule), (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("SheduleItem succesfully added");
      });
    });
  }

  /**
   * Обновляет sheduleItem в shedule.json по дате и времени из sheduleItem
   * @param date string - дата в формате дд/мм/гг
   * @param sheduleItem sheduleItem на который мы будем заменять
   */
  static async updateSheduleByDate(date: string, sheduleItem: ISheduleItem) {
    const shedule = JSON.parse(await fsa.readFile("./shedule.json", "utf-8"));
    shedule[date][sheduleItem.time] = new SheduleItem({
      sug: sheduleItem.sug,
      ins: sheduleItem.ins,
      xe: sheduleItem.xe,
      time: sheduleItem.time,
    }).getValue();

    await fsa.writeFile("./shedule.json", JSON.stringify(shedule));
  }
}
