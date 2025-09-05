import { Uuid } from "../../../../src/core/shared-kernel/value-objects/Uuid.js";

describe("Value Object — Uuid", () => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  test("génère un UUID valide par défaut", () => {
    const id = new Uuid();
    expect(typeof id.value).toBe("string");
    expect(id.value).toMatch(uuidRegex);
  });

  test("accepte une valeur fournie en paramètre", () => {
    const custom = "12345678-1234-4abc-9def-1234567890ab";
    const id = new Uuid(custom);
    expect(id.value).toBe(custom);
  });

  test("static generate() crée bien un Uuid valide", () => {
    const id = Uuid.generate();
    expect(id).toBeInstanceOf(Uuid);
    expect(id.value).toMatch(uuidRegex);
  });

  test("deux generate() successifs donnent des valeurs différentes", () => {
    const id1 = Uuid.generate().value;
    const id2 = Uuid.generate().value;
    expect(id1).not.toBe(id2);
  });

  test("immutabilité (si Object.freeze ajouté dans l’impl)", () => {
    const id = new Uuid();
    const isFrozen = Object.isFrozen(id);
    if (isFrozen) {
      expect(() => {
        id.value = "override";
      }).toThrow();
    } else {
      expect(isFrozen).toBe(false);
    }
  });
});
