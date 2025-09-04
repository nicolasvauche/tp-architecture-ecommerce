export class PositiveInt {
  constructor(value) {
    if (!Number.isInteger(value) || value <= 0)
      throw new Error("Not a positive integer");
    this.value = value;
  }
}
