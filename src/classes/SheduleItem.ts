export interface ISheduleItem {
  [key: string]: { ins: number; sug: number; xe: number };
}

export class SheduleItem {
  private sug;
  private xe;
  private ins;
  time: string;
  instance: null | ISheduleItem = null;
  constructor({
    sug = 0,
    xe = 0,
    ins = 0,
    time,
  }: {
    sug?: number;
    xe?: number;
    ins?: number;
    time?: string;
  } = {}) {
    this.sug = sug;
    this.xe = xe;
    this.ins = ins;
    if (time) this.time = time;
    else {
      const createdAt = new Date();
      this.time = `${createdAt.getHours().toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}:${createdAt.getSeconds().toString().padStart(2, "0")}`;
    }

    this.Instantiate();
  }

  private Instantiate() {
    this.instance = {
      [this.time]: { sug: this.sug, xe: this.xe, ins: this.ins },
    };
  }

  public toJson() {
    return JSON.stringify(this.instance);
  }

  public toString() {
    return this.instance.toString();
  }

  public getValue() {
    return this.instance[this.time];
  }

  public getKey() {
    return this.time;
  }
}
