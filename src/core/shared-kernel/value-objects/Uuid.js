import { randomUUID } from "node:crypto";
export class Uuid {
  constructor(value = randomUUID()) {
    this.value = String(value);
  }
  static generate() {
    return new Uuid();
  }
}
