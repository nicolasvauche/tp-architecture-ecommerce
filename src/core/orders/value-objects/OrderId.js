import { Uuid } from "../../shared-kernel/value-objects/Uuid.js";
export class OrderId {
  constructor(value = Uuid.generate().value) {
    this.value = String(value);
  }
}
