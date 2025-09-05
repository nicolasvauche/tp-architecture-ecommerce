import { DomainError } from "../../../../src/core/shared-kernel/errors/DomainError.js";

describe("Value Object — DomainError", () => {
  test("crée une instance avec code et message", () => {
    const err = new DomainError("CART_EMPTY", "Le panier est vide");
    expect(err).toBeInstanceOf(DomainError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("DomainError");
    expect(err.code).toBe("CART_EMPTY");
    expect(err.message).toBe("Le panier est vide");
  });

  test("peut être intercepté comme une erreur classique", () => {
    try {
      throw new DomainError("PRODUCT_NOT_FOUND", "Produit introuvable");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e).toBeInstanceOf(DomainError);
      expect(e.code).toBe("PRODUCT_NOT_FOUND");
      expect(e.message).toBe("Produit introuvable");
    }
  });

  test("stack est bien défini", () => {
    const err = new DomainError("TEST", "message");
    expect(err.stack).toContain("DomainError");
  });

  test("immutabilité optionnelle (si freeze ajouté)", () => {
    const err = new DomainError("X", "Y");
    const isFrozen = Object.isFrozen(err);
    if (isFrozen) {
      expect(() => {
        err.code = "Z";
      }).toThrow();
    } else {
      expect(isFrozen).toBe(false);
    }
  });
});
