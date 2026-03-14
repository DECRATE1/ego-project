import fs from "fs";
import fsa from "node:fs/promises";
import { SheduleItem } from "./SheduleItem";
import { ISheduleItem } from "src/components/SheduleElement";

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
  static async dateIsExist(date: string): Promise<boolean> {
    const shedule = await fsa.readFile("./shedule.json", "utf-8");
    if (!shedule) {
      await fsa.writeFile("./shedule.json", "{}");
      return false;
    }
    return JSON.parse(shedule)[date] != null;
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
   * Создает новое расписание на основе даты
   * и записывет в shedule.json
   */

  static async writeShedule(date: string) {
    const shedule = JSON.parse(await fsa.readFile("./shedule.json", "utf-8"));
    const sheduleItem = new SheduleItem();
    shedule[date] = { [sheduleItem.getKey()]: sheduleItem.getValue() };
    await fsa.writeFile("./shedule.json", JSON.stringify(shedule));
  }

  /**
   * Добавляет новый sheduleItem в shedule.json по дате
   * @param date string - дата в формате дд/мм/гг
   */
  static async addToShedule(date: string) {
    const shedule = JSON.parse(await fsa.readFile("./shedule.json", "utf-8"));
    const sheduleItem = new SheduleItem();
    shedule[date][sheduleItem.getKey()] = sheduleItem.getValue();
    await fsa.writeFile("./shedule.json", JSON.stringify(shedule));
    return shedule;
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
