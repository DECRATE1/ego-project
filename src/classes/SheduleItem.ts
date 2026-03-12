export class SheduleItem {
  private sug = 0;
  private xe = 0;
  private ins = 0;
  private time: string;
  instance: null | Record<string, Record<string, number>> = null;
  constructor({
    sug,
    xe,
    ins,
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
      this.time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
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
