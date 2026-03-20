import { File, Paths } from "expo-file-system";
import { SheduleItem } from "./SheduleItem";
export interface ISheduleItem {
  ins: number;
  sug: number;
  xe: number;
  time: string;
}

export class Shedule {
  static file = new File(Paths.cache, "shedule.json");
  /**
   * Проверяет сущетвует ли shedule.json
   * @returns bool
   */
  static sheduleIsExist(): boolean {
    return this.file.exists;
  }

  /**
   * Проверяет наличие нынешней даты в shedule.json
   * @returns bool
   */
  static async dateIsExist(date: string): Promise<boolean> {
    const shedule = await this.file.text();
    if (!shedule) {
      this.file.write("{}");
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
    this.file.write(shedule);
    console.log("shedule was created");
  }

  /**
   * Создает новое расписание на основе даты
   * и записывет в shedule.json
   */

  static async writeShedule(date: string) {
    const shedule = JSON.parse(await this.file.text());
    //const sheduleItem = new SheduleItem();
    shedule[date] = {};
    this.file.write(JSON.stringify(shedule));
  }

  /**
   * Добавляет новый sheduleItem в shedule.json по дате
   * @param date string - дата в формате дд/мм/гг
   */
  static async addToShedule(date: string) {
    const shedule = JSON.parse(await this.file.text());
    const sheduleItem = new SheduleItem();
    shedule[date][sheduleItem.getKey()] = sheduleItem.getValue();
    this.file.write(JSON.stringify(shedule));
    return shedule;
  }

  /**
   * Обновляет sheduleItem в shedule.json по дате и времени из sheduleItem
   * @param date string - дата в формате дд/мм/гг
   * @param sheduleItem sheduleItem на который мы будем заменять
   */
  static async updateSheduleByDate(date: string, sheduleItem: ISheduleItem) {
    const shedule = JSON.parse(await this.file.text());
    shedule[date][sheduleItem.time] = new SheduleItem({
      sug: sheduleItem.sug,
      ins: sheduleItem.ins,
      xe: sheduleItem.xe,
      time: sheduleItem.time,
    }).getValue();
    this.file.write(JSON.stringify(shedule));
  }
}
