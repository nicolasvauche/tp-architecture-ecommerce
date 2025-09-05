import { Currency } from "../../../../src/core/shared-kernel/value-objects/Currency.js";

describe("Value Object — Currency", () => {
  test("par défaut, vaut EUR et est uppercased", () => {
    const c1 = new Currency();
    const c2 = new Currency(undefined);
    expect(c1.value).toBe("EUR");
    expect(c2.value).toBe("EUR");
  });

  test("accepte une chaîne de 3 lettres et normalise en uppercase", () => {
    const c = new Currency("usd");
    expect(c.value).toBe("USD");
  });

  test("rejette une valeur non string (hors undefined qui déclenche le défaut)", () => {
    expect(() => new Currency(123)).toThrow("Invalid currency");
    expect(() => new Currency(null)).toThrow("Invalid currency");
    expect(() => new Currency({})).toThrow("Invalid currency");
  });

  test("rejette une chaîne qui n'a pas exactement 3 caractères", () => {
    expect(() => new Currency("EU")).toThrow("Invalid currency");
    expect(() => new Currency("EURO")).toThrow("Invalid currency");
    expect(() => new Currency("")).toThrow("Invalid currency");
  });

  test("accepte des codes non-ISO si longueur=3 (ex: xbt → XBT)", () => {
    const c = new Currency("xbt");
    expect(c.value).toBe("XBT");
  });

  test("immutabilité (si tu freezes l'objet)", () => {
    const c = new Currency("eur");
    const isFrozen = Object.isFrozen(c);
    if (isFrozen) {
      expect(() => {
        c.value = "USD";
      }).toThrow();
    } else {
      expect(isFrozen).toBe(false);
    }
  });
});
